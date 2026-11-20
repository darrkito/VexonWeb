// Alias de /.well-known/mcp/server-card.json en <endpoint>/server-card (la otra ubicación que nombra el borrador SEP-2127).
export { GET } from '../.well-known/mcp/server-card.json';
// Sin extensión: prerenderizado saldría como application/octet-stream, así que se sirve bajo demanda.
export const prerender = false;
