import type { APIRoute } from 'astro';
import { json } from '../../lib/agent';
import { agentCard } from '../../lib/agent-cards';
export const GET: APIRoute = () => json(agentCard());
