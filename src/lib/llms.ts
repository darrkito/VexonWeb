/** Contenido en texto plano / Markdown para asistentes de IA (llms.txt, llms-full.txt y .md por modelo). */
import { MODELOS, EQUIPAMIENTO, ACABADOS, fmtKg, type Modelo } from '../data/modelos';
import { FAQ_HOME, faqsModelo } from '../data/faqs';
import { SITE, fullAddress } from './site';

export function modeloMarkdown(m: Modelo): string {
  const faqs = faqsModelo(m);
  return `# Oficina móvil ${m.code} · Vexon by Capelton

> ${m.respuesta}

URL: ${SITE.url}/oficinas-moviles/${m.slug}
Modalidad: solo renta. Cotización por WhatsApp: https://wa.me/${SITE.whatsappNumber}
Ficha técnica (PDF): ${SITE.url}${m.ficha}

## Especificaciones

| Concepto | Valor |
| --- | --- |
| Tipo | ${m.tipo} |
| Medidas (largo × ancho × alto) | ${m.largo} × ${m.ancho} × ${m.alto} m |
| Capacidad sugerida | ${m.personas} personas |
| Mesas de trabajo | ${m.mesas} |
| Área privada | ${m.areaPrivada ? 'Sí' : 'No'} |
| Sanitario | No |
| Cocineta | No |
| Accesos | ${m.accesos} |
| Ventanas | ${m.ventanas} |
| Lámparas LED | ${m.lamparasLed} |
| Minisplits | ${m.minisplits} |
| Contactos 127 V | Sí |
| Salidas de voz y datos | Sí |
| Ejes | ${m.ejes} |
| Torres de nivelación | ${m.torresNivelacion} |
| Capacidad de carga | ${fmtKg(m.capacidadCargaKg)} |
| Peso del remolque | ${fmtKg(m.pesoRemolqueKg)} |

## Equipamiento

${EQUIPAMIENTO.map((e) => `${e.n}. ${e.nombre}${e.adicional ? ' (equipo adicional)' : ''}: ${e.detalle}`).join('\n')}

## Acabados interiores

${ACABADOS.map((a) => `- ${a.nombre}: ${a.detalle}`).join('\n')}

## Ideal para

${m.idealPara.map((p) => `- ${p.titulo}: ${p.texto}`).join('\n')}

## Preguntas frecuentes

${faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}
`;
}

export function llmsTxt(): string {
  return `# ${SITE.name}

> Vexon renta oficinas móviles para obra, remodelación e industria en Guadalajara y su zona metropolitana (Zapopan, Tlaquepaque, Tonalá, Tlajomulco, El Salto). 8 modelos de 3 a 10 metros de largo por 2.5 m de ancho, para 3 a 9 personas, todos con minisplit, mesas de trabajo, iluminación LED, contactos de 127 V y salidas de voz y datos. Solo renta. Respaldado por Capelton.

- Dirección: ${fullAddress}
- Teléfono y WhatsApp: ${SITE.phoneE164} (https://wa.me/${SITE.whatsappNumber})
- Correo: ${SITE.email}
- Horario: ${SITE.hours.map((h) => `${h.days} ${h.open}–${h.close}`).join('; ')}
- Instagram: ${SITE.instagram}

## Modelos

${MODELOS.map((m) => `- [${m.code}](${SITE.url}/oficinas-moviles/${m.slug}): ${m.tipo.toLowerCase()} de ${m.largo} m para ${m.personas} personas, ${m.mesas} mesas. Versión Markdown: ${SITE.url}/oficinas-moviles/${m.slug}.md`).join('\n')}

## Páginas principales

- [Renta de oficina móvil en Guadalajara](${SITE.url}/renta-oficina-movil-guadalajara)
- [Catálogo y comparador](${SITE.url}/oficinas-moviles)
- [Soluciones para constructoras](${SITE.url}/soluciones/constructoras)
- [Soluciones para remodelaciones](${SITE.url}/soluciones/remodelaciones)
- [Soluciones para naves e industria](${SITE.url}/soluciones/naves-e-industria)
- [Nosotros](${SITE.url}/nosotros)
- [Contacto](${SITE.url}/contacto)
- [Blog](${SITE.url}/blog)

## Acceso para agentes

- [Servidor MCP](${SITE.url}/.well-known/mcp/server-card.json) en ${SITE.url}/mcp: herramientas get_models, get_model, recommend_model, search_faq, get_blog_posts, get_business_info y request_quote (enlace de WhatsApp prellenado)
- [Agente A2A](${SITE.url}/.well-known/agent-card.json) en ${SITE.url}/a2a (A2A 1.0 SendMessage y 0.3 message/send): recomienda modelo y responde preguntas frecuentes
- [Búsqueda NLWeb /ask](${SITE.url}/ask?query=oficina+movil+para+obra): búsqueda en lenguaje natural sobre modelos, preguntas frecuentes y blog, JSON con objetos schema.org
- [API REST pública](${SITE.url}/api/openapi.json): /api/modelos, /api/faq, /api/blog
- Vexon solo renta y no publica precios: la cotización va por WhatsApp.

## Opcional

- [Catálogo completo en texto](${SITE.url}/llms-full.txt)
`;
}

export function llmsFull(): string {
  return `${llmsTxt()}

## Preguntas frecuentes generales

${FAQ_HOME.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

---

${MODELOS.map(modeloMarkdown).join('\n---\n\n')}`;
}
