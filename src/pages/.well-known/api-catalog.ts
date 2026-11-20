import type { APIRoute } from 'astro';
import { json } from '../../lib/agent';
import { apiCatalog } from '../../lib/agent-cards';
export const GET: APIRoute = () => json(apiCatalog(), 200, 'application/linkset+json; charset=utf-8');
