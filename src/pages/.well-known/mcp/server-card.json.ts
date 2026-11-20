import type { APIRoute } from 'astro';
import { json } from '../../../lib/agent';
import { mcpServerCard } from '../../../lib/agent-cards';
export const GET: APIRoute = () => json(mcpServerCard());
