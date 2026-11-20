import type { APIRoute } from 'astro';
import { SITE } from '../lib/site';

/** Abierto a buscadores y asistentes de IA (búsqueda y entrenamiento) para máxima visibilidad. */
const aiBots = [
  'OAI-SearchBot', 'ChatGPT-User', 'GPTBot',
  'Claude-SearchBot', 'Claude-User', 'ClaudeBot',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot', 'Applebot-Extended',
  'Bingbot', 'DuckAssistBot', 'meta-externalagent', 'CCBot',
];

export const GET: APIRoute = () => {
  const body = [
    'User-agent: *',
    // Solo el formulario es privado; /api/modelos, /api/faq, /api/blog y /api/openapi.json son para agentes.
    'Content-Signal: search=yes, ai-input=yes, ai-train=yes',
    'Allow: /',
    'Disallow: /api/cotizacion',
    'Disallow: /gracias',
    '',
    ...aiBots.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', 'Disallow: /api/cotizacion', '']),
    `Sitemap: ${SITE.url}/sitemap-index.xml`,
    '',
    `# Resumen para modelos de lenguaje: ${SITE.url}/llms.txt`,
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
