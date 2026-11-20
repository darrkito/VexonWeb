import type { APIRoute } from 'astro';
import { json } from '../../lib/agent';
import { aiCatalog } from '../../lib/agent-cards';
export const GET: APIRoute = () => json(aiCatalog(), 200, 'application/ai-catalog+json; charset=utf-8');
