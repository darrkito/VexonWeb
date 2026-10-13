/**
 * Backend del formulario de cotización (función serverless en Vercel, servidor Node en local).
 * 1) Valida campos y antispam (honeypot + Cloudflare Turnstile si está configurado).
 * 2) Envía el lead por correo con Resend (si hay RESEND_API_KEY).
 * 3) Lo manda a un webhook opcional (Google Sheets vía Apps Script, CRM, etc.).
 * Sin variables de entorno, registra el lead en la consola y responde OK (útil en desarrollo).
 */
import type { APIRoute } from 'astro';
import { SITE } from '../../lib/site';

export const prerender = false;

const clean = (v: FormDataEntryValue | null, max = 200) => String(v ?? '').replace(/[<>]/g, '').trim().slice(0, max);
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Límite simple por IP (en memoria por instancia; suficiente contra envíos repetidos).
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

export const POST: APIRoute = async ({ request, clientAddress, redirect }) => {
  const wantsJson = request.headers.get('accept')?.includes('application/json');
  const fail = (error: string, status = 400) =>
    wantsJson ? new Response(JSON.stringify({ ok: false, error }), { status, headers: { 'content-type': 'application/json' } }) : redirect('/contacto?error=1#formulario', 303);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail('Formato inválido');
  }

  // Honeypot: si un bot llenó el campo oculto, fingimos éxito.
  if (clean(form.get('empresa_web'))) {
    return wantsJson ? new Response(JSON.stringify({ ok: true }), { headers: { 'content-type': 'application/json' } }) : redirect('/gracias', 303);
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || clientAddress || 'local';
  if (rateLimited(ip)) return fail('Recibimos varias solicitudes seguidas. Intenta en unos minutos', 429);

  const lead = {
    nombre: clean(form.get('nombre'), 120),
    telefono: clean(form.get('telefono'), 30),
    modelo: clean(form.get('modelo'), 60),
    municipio: clean(form.get('municipio'), 60),
    correo: clean(form.get('correo'), 120),
    empresa: clean(form.get('empresa'), 120),
    fecha: clean(form.get('fecha'), 20),
    duracion: clean(form.get('duracion'), 40),
    formal: clean(form.get('formal')) === 'si',
    origen: clean(form.get('origen'), 60),
    pagina: clean(request.headers.get('referer'), 300),
    recibido: new Date().toISOString(),
  };

  const digits = lead.telefono.replace(/\D/g, '');
  if (lead.nombre.length < 2 || digits.length < 10 || !lead.modelo || !lead.municipio) {
    return fail('Faltan datos: nombre, teléfono de 10 dígitos, modelo y municipio');
  }
  if (lead.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.correo)) return fail('El correo no es válido');

  // Turnstile (opcional)
  const secret = import.meta.env.TURNSTILE_SECRET_KEY;
  if (secret) {
    const token = clean(form.get('cf-turnstile-response'), 2048);
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    }).then((x) => x.json()).catch(() => ({ success: false }));
    if (!r.success) return fail('No pudimos verificar el envío. Recarga la página e intenta de nuevo');
  }

  const waCliente = `https://wa.me/52${digits.slice(-10)}?text=${encodeURIComponent(`Hola ${lead.nombre}, te escribimos de Vexon por tu solicitud de cotización de oficina móvil (${lead.modelo}).`)}`;
  const tasks: Promise<unknown>[] = [];

  const resendKey = import.meta.env.RESEND_API_KEY;
  if (resendKey) {
    const rows = Object.entries({
      Nombre: lead.nombre,
      Teléfono: lead.telefono,
      Modelo: lead.modelo,
      Municipio: lead.municipio,
      Correo: lead.correo || '—',
      Empresa: lead.empresa || '—',
      'Fecha de inicio': lead.fecha || '—',
      'Tiempo de renta': lead.duracion || '—',
      'Cotización formal': lead.formal ? 'Sí' : 'No',
      Página: lead.pagina || '—',
    })
      .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#474d54">${k}</td><td style="padding:6px 12px;color:#0f0f10"><b>${esc(String(v))}</b></td></tr>`)
      .join('');
    const html = `<div style="font-family:Arial,sans-serif"><h2 style="color:#0f0f10">Nueva solicitud de cotización</h2><table>${rows}</table><p><a href="${waCliente}" style="background:#f1482b;color:#0f0f10;padding:12px 18px;border-radius:99px;text-decoration:none;font-weight:bold">Responder por WhatsApp</a></p></div>`;
    tasks.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: import.meta.env.LEADS_FROM_EMAIL || `Vexon Web <web@vexonmexico.com.mx>`,
          to: [import.meta.env.LEADS_TO_EMAIL || SITE.email],
          reply_to: lead.correo || undefined,
          subject: `Cotización ${lead.modelo} · ${lead.municipio} · ${lead.nombre}`,
          html,
        }),
      }),
    );
    if (lead.correo) {
      tasks.push(
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: import.meta.env.LEADS_FROM_EMAIL || `Vexon Web <web@vexonmexico.com.mx>`,
            to: [lead.correo],
            subject: 'Recibimos tu solicitud de cotización · Vexon',
            html: `<div style="font-family:Arial,sans-serif;color:#1d1f22"><p>Hola ${esc(lead.nombre)},</p><p>Recibimos tu solicitud para rentar una oficina móvil (${esc(lead.modelo)}) en ${esc(lead.municipio)}. Te contactamos por WhatsApp o teléfono en horario de atención.</p><p>Si quieres adelantar, escríbenos: <a href="https://wa.me/${SITE.whatsappNumber}">WhatsApp ${SITE.phoneDisplay}</a>.</p><p>Vexon by Capelton</p></div>`,
          }),
        }),
      );
    }
  }

  const webhook = import.meta.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    tasks.push(fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) }));
  }

  if (!resendKey && !webhook) console.info('[lead]', JSON.stringify(lead));

  const results = await Promise.allSettled(tasks);
  const failed = results.filter((r) => r.status === 'rejected' || (r.status === 'fulfilled' && r.value instanceof Response && !r.value.ok));
  if (tasks.length && failed.length === tasks.length) {
    console.error('[lead] fallo de envío', JSON.stringify(lead));
    return fail('No pudimos registrar tu solicitud', 502);
  }

  return wantsJson ? new Response(JSON.stringify({ ok: true }), { headers: { 'content-type': 'application/json' } }) : redirect('/gracias', 303);
};

export const GET: APIRoute = () => new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
