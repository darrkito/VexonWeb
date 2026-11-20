/**
 * Endpoint estilo NLWeb (github.com/microsoft/NLWeb, nlweb-rest-api.md): `query` obligatorio,
 * opcionales `query_id` y `decontextualized_query`. Solo mode=list, sin LLM, un JSON no streaming.
 */
import type { APIRoute } from 'astro';
import { json, searchDocs } from '../lib/agent';

export const prerender = false;

async function handle(params: Record<string, unknown>) {
  const query = String(params.decontextualized_query || params.query || '').trim().slice(0, 300);
  if (!query) return json({ error: 'Falta el argumento obligatorio: query' }, 400);
  const hits = await searchDocs(query);
  return json({
    query_id: String(params.query_id || crypto.randomUUID()),
    mode: 'list',
    results: hits.map((d) => ({ url: d.url, name: d.name, site: 'vexonmexico.com.mx', score: d.score, description: d.description.slice(0, 300), schema_object: d.schema_object })),
  });
}

export const OPTIONS: APIRoute = () => new Response(null, { status: 204, headers: { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'GET, POST, OPTIONS' } });
export const GET: APIRoute = ({ url }) => handle(Object.fromEntries(url.searchParams));
export const POST: APIRoute = async ({ request }) => handle(await request.json().catch(() => ({})));
