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
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /gracias',
    '',
    ...aiBots.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', 'Disallow: /api/', '']),
    `Sitemap: ${SITE.url}/sitemap-index.xml`,
    '',
    `# Resumen para modelos de lenguaje: ${SITE.url}/llms.txt`,
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
