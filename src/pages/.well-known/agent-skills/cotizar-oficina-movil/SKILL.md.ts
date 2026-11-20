import type { APIRoute } from 'astro';
import { skillMd } from '../../../../lib/agent-cards';
export const GET: APIRoute = () => new Response(skillMd(), { headers: { 'content-type': 'text/markdown; charset=utf-8', 'access-control-allow-origin': '*' } });
