/**
 * Servidor MCP (Streamable HTTP, un solo endpoint POST /mcp, respuestas JSON síncronas, sin sesiones).
 * Dual: 2026-07-28 (sin estado, _meta por solicitud, server/discover) y el handshake `initialize`
 * para clientes 2025-11-25 / 2025-06-18.
 */
import type { APIRoute } from 'astro';
import { TOOLS, callTool, json, MCP_MODERN, MCP_SUPPORTED_VERSIONS, SERVER_INFO, INSTRUCTIONS } from '../lib/agent';

export const prerender = false;

const CAPABILITIES = { tools: { listChanged: false } };
const CACHE = { ttlMs: 300000, cacheScope: 'public' };
type Id = string | number | null | undefined;

const rpcResult = (id: Id, result: Record<string, unknown>) =>
  json({ jsonrpc: '2.0', id, result: { resultType: 'complete', ...result, _meta: { 'io.modelcontextprotocol/serverInfo': SERVER_INFO } } });
const rpcError = (id: Id, code: number, message: string, data?: unknown) => json({ jsonrpc: '2.0', id: id ?? null, error: { code, message, ...(data ? { data } : {}) } });

export const OPTIONS: APIRoute = () => new Response(null, { status: 204, headers: { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type, accept, mcp-protocol-version' } });
export const GET: APIRoute = () => json({ error: 'Método no permitido: envía mensajes JSON-RPC 2.0 por POST a este endpoint.' }, 405);

export const POST: APIRoute = async ({ request }) => {
  let body: { id?: Id; method?: string; params?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    return rpcError(null, -32700, 'Parse error');
  }
  const { id, method, params } = body;

  const requested = (params?._meta as Record<string, unknown> | undefined)?.['io.modelcontextprotocol/protocolVersion'];
  if (typeof requested === 'string' && method !== 'initialize' && !MCP_SUPPORTED_VERSIONS.includes(requested)) {
    return rpcError(id, -32022, 'Unsupported protocol version', { supported: MCP_SUPPORTED_VERSIONS, requested });
  }

  switch (method) {
    case 'initialize': {
      const want = String(params?.protocolVersion ?? '');
      const protocolVersion = MCP_SUPPORTED_VERSIONS.includes(want) && want !== MCP_MODERN ? want : '2025-11-25';
      return json({ jsonrpc: '2.0', id, result: { protocolVersion, capabilities: CAPABILITIES, serverInfo: SERVER_INFO, instructions: INSTRUCTIONS } });
    }
    case 'notifications/initialized':
    case 'notifications/cancelled':
      return new Response(null, { status: 202 });
    case 'ping':
      return rpcResult(id, {});
    case 'server/discover':
      return rpcResult(id, { supportedVersions: MCP_SUPPORTED_VERSIONS, capabilities: CAPABILITIES, instructions: INSTRUCTIONS, ...CACHE });
    case 'tools/list':
      return rpcResult(id, { tools: TOOLS, ...CACHE });
    case 'tools/call': {
      const name = String(params?.name ?? '');
      if (!TOOLS.some((t) => t.name === name)) return rpcError(id, -32602, `Unknown tool: ${name}`);
      return rpcResult(id, (await callTool(name, (params?.arguments as Record<string, unknown>) ?? {})) as Record<string, unknown>);
    }
    default:
      return rpcError(id, -32601, `Method not found: ${method}`);
  }
};
