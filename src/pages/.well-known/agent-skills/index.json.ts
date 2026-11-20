import type { APIRoute } from 'astro';
import { json } from '../../../lib/agent';
import { skillsIndex } from '../../../lib/agent-cards';
export const GET: APIRoute = () => json(skillsIndex());
