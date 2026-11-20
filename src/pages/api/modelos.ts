import type { APIRoute } from 'astro';
import { MODELOS } from '../../data/modelos';
import { businessView, json, modeloView } from '../../lib/agent';
export const GET: APIRoute = () => json({ business: businessView(), modelos: MODELOS.map(modeloView) });
