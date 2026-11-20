/**
 * Superficie para agentes de IA (MCP, A2A, NLWeb /ask, REST). Todo sale de los mismos datos
 * que muestra el sitio (modelos, preguntas frecuentes, blog); nada se inventa aquí.
 * Vexon solo renta oficinas móviles y no publica precios: toda cotización va por WhatsApp.
 */
import { getCollection } from 'astro:content';
import { MODELOS, getModelo, recomendar, type Modelo } from '../data/modelos';
import { FAQ_HOME, FAQ_CATALOGO, FAQ_NOSOTROS, FAQ_CONTACTO, FAQ_RENTA, faqsModelo, type Faq } from '../data/faqs';
import { SITE, fullAddress } from './site';
import { buildWhatsAppLink } from './whatsapp';

export const MCP_MODERN = '2026-07-28';
export const MCP_SUPPORTED_VERSIONS = [MCP_MODERN, '2025-11-25', '2025-06-18'];
export const AGENT_VERSION = '1.0.0';
export const SERVER_INFO = { name: 'vexon-mcp', title: SITE.name, version: AGENT_VERSION };
export const INSTRUCTIONS =
  'Datos reales y de solo lectura de Vexon by Capelton: renta de oficinas móviles (línea VX, 8 modelos de 3 a 10 m) en Guadalajara y la ZMG. Vexon solo renta (no vende) y no publica precios: usa request_quote para obtener un enlace de WhatsApp prellenado. No requiere autenticación.';
export const DESCRIPTION =
  'Renta de oficinas móviles para obra, remodelación y plantas industriales en Guadalajara y Zapopan. 8 modelos VX de 3 a 10 metros, con clima y mesas de trabajo. Solo renta; cotización por WhatsApp.';

export const modeloView = (m: Modelo) => ({
  slug: m.slug,
  code: m.code,
  tipo: m.tipo,
  medidas: { largoM: m.largo, anchoM: m.ancho, altoM: m.alto },
  personas: m.personas,
  mesas: m.mesas,
  areaPrivadaM: m.areaPrivada,
  sanitario: m.sanitario,
  minisplits: m.minisplits,
  lamparasLed: m.lamparasLed,
  ventanas: m.ventanas,
  pesoRemolqueKg: m.pesoRemolqueKg,
  respuesta: m.respuesta,
  resumen: m.resumen,
  url: `${SITE.url}/oficinas-moviles/${m.slug}`,
  markdown: `${SITE.url}/oficinas-moviles/${m.slug}.md`,
  fichaTecnicaPdf: `${SITE.url}${m.ficha}`,
});

export const businessView = () => ({
  name: SITE.name,
  description: DESCRIPTION,
  url: SITE.url,
  modalidad: 'solo renta',
  phone: SITE.phoneDisplay,
  email: SITE.email,
  address: fullAddress,
  areaServed: SITE.areaServed,
  hours: SITE.hours.map((h) => `${h.days} ${h.open}-${h.close}`),
  parent: SITE.parent,
});

export function faqCorpus(): { url: string; faq: Faq }[] {
  const pages: [string, Faq[]][] = [
    ['/', FAQ_HOME],
    ['/oficinas-moviles', FAQ_CATALOGO],
    ['/nosotros', FAQ_NOSOTROS],
    ['/contacto', FAQ_CONTACTO],
    ['/renta-oficina-movil-guadalajara', FAQ_RENTA],
    ...MODELOS.map((m): [string, Faq[]] => [`/oficinas-moviles/${m.slug}`, faqsModelo(m)]),
  ];
  const seen = new Set<string>();
  return pages.flatMap(([path, list]) =>
    list.filter((f) => !seen.has(f.q) && seen.add(f.q)).map((faq) => ({ url: `${SITE.url}${path === '/' ? '' : path}`, faq })),
  );
}

export async function blogList() {
  const posts = (await getCollection('blog', (p) => !p.data.draft)).sort((a, b) => +b.data.date - +a.data.date);
  return posts.map((p) => ({
    slug: p.id,
    title: p.data.title,
    description: p.data.description,
    category: p.data.category,
    date: p.data.date.toISOString().slice(0, 10),
    url: `${SITE.url}/blog/${p.id}`,
    faqs: p.data.faqs,
  }));
}

// ---- Búsqueda de texto (sin LLM) -------------------------------------------------------------
const strip = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const STOP = new Set('cuanto cuesta cuestan como donde que los las del con una por para tienen hacen esta este son'.split(' '));
const tokens = (s: string) => strip(s).split(/[^a-z0-9]+/).filter((t) => t.length > 2 && !STOP.has(t));

export type Doc = { url: string; name: string; description: string; schema_object: Record<string, unknown>; n: string; nn: string };
let corpus: Promise<Doc[]> | undefined;
export function getCorpus(): Promise<Doc[]> {
  corpus ??= (async () => {
    const raw: Omit<Doc, 'n' | 'nn'>[] = [];
    for (const m of MODELOS) {
      const v = modeloView(m);
      raw.push({ url: v.url, name: `Oficina móvil ${m.code}`, description: `${m.resumen} ${m.respuesta}`, schema_object: { '@type': 'Product', name: `Oficina móvil ${m.code}`, url: v.url, category: 'Renta de oficina móvil' } });
    }
    for (const { url, faq } of faqCorpus()) {
      raw.push({ url, name: faq.q, description: faq.a, schema_object: { '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } } });
    }
    for (const b of await blogList()) {
      raw.push({ url: b.url, name: b.title, description: b.description, schema_object: { '@type': 'Article', headline: b.title, url: b.url, datePublished: b.date } });
    }
    return raw.map((d) => ({ ...d, n: strip(d.name), nn: strip(d.description) }));
  })();
  return corpus;
}

export async function searchDocs(query: string, limit = 10) {
  const qt = [...new Set(tokens(query))];
  const scored = (await getCorpus())
    .map((d) => ({ d, s: qt.reduce((a, t) => a + (d.n.includes(t) ? 3 : 0) + (d.nn.includes(t) ? 1 : 0), 0) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit);
  const max = scored[0]?.s ?? 1;
  return scored.map(({ d, s }) => ({ ...d, score: Math.round((s / max) * 100) }));
}

export function quoteLink(a: { model?: string; people?: number; location?: string; startDate?: string; duration?: string }) {
  const model = a.model ? getModelo(a.model.toLowerCase().replace(/\s+/g, '-'))?.code : undefined;
  const parts = ['Hola Vexon.', model ? `Me interesa rentar la ${model}${a.people ? ` para ${a.people} personas` : ''}.` : a.people ? `Quiero rentar una oficina móvil para ${a.people} personas.` : 'Quiero cotizar la renta de una oficina móvil.'];
  parts.push(`Mi obra está en: ${a.location || '___'}. Empezaría el: ${a.startDate || '___'}. Tiempo de renta aproximado: ${a.duration || '___'}.`);
  return buildWhatsAppLink({ text: parts.join(' ') });
}

// ---- Herramientas MCP --------------------------------------------------------------------------
const textResult = (value: unknown, isError = false) => ({ content: [{ type: 'text', text: typeof value === 'string' ? value : JSON.stringify(value, null, 2) }], ...(isError ? { isError: true } : {}) });

export const TOOLS = [
  { name: 'get_models', description: 'Los 8 modelos de oficina móvil VX (3 a 10 m) con medidas, capacidad, equipamiento y enlaces. Vexon no publica precios.', inputSchema: { type: 'object', properties: {} } },
  { name: 'get_model', description: 'Detalle de un modelo por slug (vx-3m, vx-4m, vx-6m, vx-6p, vx-8m, vx-8p, vx-10m, vx-10p) con sus preguntas frecuentes.', inputSchema: { type: 'object', properties: { slug: { type: 'string' } }, required: ['slug'] } },
  { name: 'recommend_model', description: 'Recomienda el modelo más pequeño que cubre a N personas, con o sin oficina privada.', inputSchema: { type: 'object', properties: { people: { type: 'integer', minimum: 1, maximum: 9 }, private_office: { type: 'boolean' } }, required: ['people'] } },
  { name: 'search_faq', description: 'Busca en las preguntas frecuentes de Vexon (qué incluye la renta, zonas, instalación, requisitos).', inputSchema: { type: 'object', properties: { query: { type: 'string' } }, required: ['query'] } },
  { name: 'get_blog_posts', description: 'Guías y artículos publicados de Vexon sobre oficinas móviles para obra, remodelación y naves.', inputSchema: { type: 'object', properties: {} } },
  { name: 'get_business_info', description: 'Datos de contacto, dirección, horario y zona de servicio de Vexon.', inputSchema: { type: 'object', properties: {} } },
  { name: 'request_quote', description: 'Enlace de WhatsApp prellenado para cotizar la renta (Vexon no publica precios). El cliente lo abre y envía el mensaje.', inputSchema: { type: 'object', properties: { model: { type: 'string', description: 'slug o código, p. ej. vx-6m' }, people: { type: 'integer' }, location: { type: 'string' }, start_date: { type: 'string' }, duration: { type: 'string' } } } },
];

export async function callTool(name: string, args: Record<string, unknown>) {
  switch (name) {
    case 'get_models':
      return textResult(MODELOS.map(modeloView));
    case 'get_model': {
      const m = getModelo(String(args.slug ?? '').toLowerCase());
      if (!m) return textResult(`Modelo desconocido: ${String(args.slug)}`, true);
      return textResult({ ...modeloView(m), faqs: faqsModelo(m) });
    }
    case 'recommend_model': {
      const people = Math.min(Math.max(Number(args.people) || 1, 1), 9);
      return textResult(modeloView(recomendar(people, Boolean(args.private_office))));
    }
    case 'search_faq': {
      const q = tokens(String(args.query ?? ''));
      const hits = faqCorpus().filter(({ faq }) => q.some((t) => strip(faq.q + ' ' + faq.a).includes(t)));
      return textResult((q.length ? hits : faqCorpus()).map(({ url, faq }) => ({ ...faq, url })));
    }
    case 'get_blog_posts':
      return textResult((await blogList()).map(({ faqs: _f, ...p }) => p));
    case 'get_business_info':
      return textResult(businessView());
    case 'request_quote':
      return textResult({ quoteUrl: quoteLink({ model: args.model as string, people: Number(args.people) || undefined, location: args.location as string, startDate: args.start_date as string, duration: args.duration as string }), channel: 'WhatsApp', note: 'Abre el enlace y envía el mensaje; Vexon responde con precio y disponibilidad.' });
    default:
      return textResult(`Herramienta desconocida: ${name}`, true);
  }
}

// ---- Respuesta de texto para A2A (reglas, sin LLM) -----------------------------------------------
export async function answerText(text: string): Promise<string> {
  const q = strip(text);
  const n = q.match(/(\d{1,2})\s*(personas|gente|residentes|trabajadores)/)?.[1];
  if (n) {
    const m = recomendar(Number(n), /privad/.test(q));
    return `Para ${n} personas te recomendamos la ${m.code}: ${m.respuesta} Detalle: ${SITE.url}/oficinas-moviles/${m.slug}. Cotiza por WhatsApp: ${quoteLink({ model: m.slug, people: Number(n) })}`;
  }
  if (/precio|cuesta|cotiz|renta mensual|costo/.test(q)) {
    return `Vexon no publica precios: dependen del modelo, el tiempo de renta y la ubicación de la obra. Cotiza sin compromiso por WhatsApp: ${quoteLink({})}`;
  }
  const hit = (await searchDocs(text, 1))[0];
  if (hit && hit.score >= 50) return `${hit.description} Más información: ${hit.url}`;
  return `${SITE.name}: ${DESCRIPTION} Modelos: ${MODELOS.map((m) => m.code).join(', ')}. Catálogo: ${SITE.url}/oficinas-moviles. Cotiza por WhatsApp: ${quoteLink({})}`;
}

export const json = (data: unknown, status = 200, contentType = 'application/json; charset=utf-8'): Response =>
  new Response(JSON.stringify(data, null, 2), { status, headers: { 'content-type': contentType, 'access-control-allow-origin': '*', 'cache-control': status === 200 ? 'public, max-age=300' : 'no-store' } });
