import { test, expect } from '@playwright/test';

// Superficie para agentes: MCP (2026-07-28 y handshake heredado), A2A (1.0 y 0.3), NLWeb /ask y tarjetas.
const rpc = (method: string, params: object = {}) => ({ data: { jsonrpc: '2.0', id: 1, method, params } });
const modern = { _meta: { 'io.modelcontextprotocol/protocolVersion': '2026-07-28' } };

test('MCP: descubrimiento, herramientas y versiones', async ({ request }) => {
  const d = await (await request.post('/mcp', rpc('server/discover', modern))).json();
  expect(d.result.supportedVersions).toContain('2026-07-28');
  const t = await (await request.post('/mcp', rpc('tools/list', modern))).json();
  expect(t.result.resultType).toBe('complete');
  expect(t.result.tools.map((x: { name: string }) => x.name)).toContain('request_quote');
  const bad = await (await request.post('/mcp', rpc('tools/list', { _meta: { 'io.modelcontextprotocol/protocolVersion': '1900-01-01' } }))).json();
  expect(bad.error.code).toBe(-32022);
  const init = await (await request.post('/mcp', rpc('initialize', { protocolVersion: '2025-06-18' }))).json();
  expect(init.result.protocolVersion).toBe('2025-06-18');
});

test('A2A: 1.0 y 0.3 en la misma URL', async ({ request }) => {
  const msg = (part: object) => ({ message: { messageId: 'm', parts: [part] } });
  const v1 = await (await request.post('/a2a', { headers: { 'A2A-Version': '1.0' }, ...rpc('SendMessage', msg({ text: 'oficina para 6 personas con privado' })) })).json();
  expect(v1.result.message.role).toBe('ROLE_AGENT');
  expect(v1.result.message.parts[0].text).toContain('VX-6P');
  const v03 = await (await request.post('/a2a', rpc('message/send', msg({ kind: 'text', text: 'hola' })))).json();
  expect(v03.result.kind).toBe('message');
  const bad = await (await request.post('/a2a', { headers: { 'A2A-Version': '9.0' }, ...rpc('SendMessage') })).json();
  expect(bad.error.code).toBe(-32009);
});

test('NLWeb /ask y tarjetas de descubrimiento', async ({ request }) => {
  const a = await (await request.get('/ask?query=oficina+movil+para+obra')).json();
  expect(a.mode).toBe('list');
  expect(a.results.length).toBeGreaterThan(0);
  expect((await request.get('/ask')).status()).toBe(400);
  const card = await (await request.get('/.well-known/agent-card.json')).json();
  expect(card.supportedInterfaces.map((i: { protocolVersion: string }) => i.protocolVersion)).toEqual(['1.0', '0.3']);
  expect((await request.get('/mcp/server-card')).status()).toBe(200);
});
