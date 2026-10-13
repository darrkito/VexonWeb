import { SITE } from './site';

export interface WhatsAppContext {
  /** Modelo, p. ej. "VX-6P" */
  model?: string;
  /** Número de personas o rango, p. ej. "6 a 7" */
  people?: string;
  /** Perfil del cliente para personalizar el saludo */
  persona?: 'residente' | 'compras' | 'remodelacion' | 'planta';
  /** Mensaje completo personalizado (reemplaza la plantilla) */
  text?: string;
}

const personaIntro: Record<NonNullable<WhatsAppContext['persona']>, string> = {
  residente: 'Soy residente de obra y necesito una oficina móvil',
  compras: 'Estoy cotizando la renta de una oficina móvil para nuestra obra',
  remodelacion: 'Voy a remodelar mi negocio y necesito una oficina temporal',
  planta: 'Necesito una oficina móvil para un proyecto en nuestra planta',
};

/** Mensaje prellenado. Deja espacios para ubicación y fecha para que el cliente solo complete. */
export function buildWhatsAppText(ctx: WhatsAppContext = {}): string {
  if (ctx.text) return ctx.text;
  const parts: string[] = ['Hola Vexon.'];
  if (ctx.persona) parts.push(`${personaIntro[ctx.persona]}.`);
  if (ctx.model) {
    parts.push(`Me interesa rentar la ${ctx.model}${ctx.people ? ` para ${ctx.people} personas` : ''}.`);
  } else if (ctx.people) {
    parts.push(`Quiero rentar una oficina móvil para ${ctx.people} personas.`);
  } else if (!ctx.persona) {
    parts.push('Quiero cotizar la renta de una oficina móvil.');
  }
  parts.push('Mi obra está en: ___. Empezaría el: ___. Tiempo de renta aproximado: ___.');
  return parts.join(' ');
}

export function buildWhatsAppLink(ctx: WhatsAppContext = {}): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(buildWhatsAppText(ctx))}`;
}

export const telLink = `tel:${SITE.phoneE164}`;
