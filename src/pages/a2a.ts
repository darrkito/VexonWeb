/**
 * Agente A2A: A2A 1.0 ("SendMessage", ROLE_*, resultado {message}) y 0.3 ("message/send", kind).
 * Sin versión en el encabezado A2A-Version se asume 0.3. Reglas sobre los datos reales del sitio, sin LLM.
 */
import type { APIRoute } from 'astro';
import { answerText, json } from '../lib/agent';

export const prerender = false;

const extractText = (message: unknown): string => {
  const parts = (message as { parts?: unknown } | null)?.parts;
  return Array.isArray(parts) ? parts.map((p) => (typeof p?.text === 'string' ? p.text : '')).filter(Boolean).join(' ') : '';
};
const rpcError = (id: unknown, code: number, message: string, data?: unknown) => json({ jsonrpc: '2.0', id: id ?? null, error: { code, message, ...(data ? { data } : {}) } });

export const OPTIONS: APIRoute = () => new Response(null, { status: 204, headers: { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type, a2a-version' } });
export const GET: APIRoute = () => json({ error: 'Método no permitido: envía JSON-RPC 2.0 SendMessage (o message/send) por POST.' }, 405);

export const POST: APIRoute = async ({ request }) => {
  let body: { id?: unknown; method?: string; params?: { message?: unknown } };
  try {
    body = await request.json();
  } catch {
    return rpcError(null, -32700, 'Parse error');
  }
  const { id, method, params } = body;
  const v1 = method === 'SendMessage';
  if (!v1 && method !== 'message/send') return rpcError(id, -32601, `Method not found: ${method}`);

  const ver = request.headers.get('a2a-version');
  if (ver && !['0.3', '1.0'].includes(ver.split('.').slice(0, 2).join('.'))) return rpcError(id, -32009, 'Unsupported A2A version', { supported: ['1.0', '0.3'], requested: ver });

  const text = extractText(params?.message);
  if (!text) return rpcError(id, -32602, 'Invalid params: message.parts[].text required');
  const reply = await answerText(text);
  const messageId = crypto.randomUUID();
  const contextId = crypto.randomUUID();
  return json({
    jsonrpc: '2.0',
    id,
    result: v1
      ? { message: { messageId, contextId, role: 'ROLE_AGENT', parts: [{ text: reply, mediaType: 'text/plain' }] } }
      : { kind: 'message', role: 'agent', messageId, contextId, parts: [{ kind: 'text', text: reply }] },
  });
};
