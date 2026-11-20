/** Tarjetas y catálogos de descubrimiento para agentes. Una sola fuente de versiones y herramientas. */
import { SITE } from './site';
import { AGENT_VERSION, DESCRIPTION, MCP_MODERN, MCP_SUPPORTED_VERSIONS, TOOLS } from './agent';

const U = SITE.url;

export const agentCard = () => ({
  // Los campos 0.3 de primer nivel se conservan para que los clientes 0.3 puedan leer la tarjeta; los 1.0 leen supportedInterfaces.
  protocolVersion: '0.3.0',
  name: 'Vexon Assistant',
  description: `Responde en español sobre las oficinas móviles VX de Vexon by Capelton (renta en Guadalajara y la ZMG): modelos, capacidad, qué incluye la renta, zonas y cómo cotizar por WhatsApp. Vexon solo renta y no publica precios.`,
  url: `${U}/a2a`,
  preferredTransport: 'JSONRPC',
  supportedInterfaces: [
    { url: `${U}/a2a`, protocolBinding: 'JSONRPC', protocolVersion: '1.0' },
    { url: `${U}/a2a`, protocolBinding: 'JSONRPC', protocolVersion: '0.3', transport: 'JSONRPC' },
  ],
  version: AGENT_VERSION,
  documentationUrl: `${U}/llms.txt`,
  provider: { organization: SITE.name, url: U },
  capabilities: { streaming: false, pushNotifications: false, stateTransitionHistory: false, extendedAgentCard: false },
  securitySchemes: {},
  security: [],
  defaultInputModes: ['text/plain'],
  defaultOutputModes: ['text/plain'],
  skills: [
    { id: 'recomendar-modelo', name: 'Recomendar modelo', description: 'Recomienda el modelo VX según el número de personas y si se necesita oficina privada.', tags: ['modelos', 'capacidad'], examples: ['Necesito una oficina móvil para 6 personas con privado', '¿Qué modelo conviene para 3 personas?'], inputModes: ['text/plain'], outputModes: ['text/plain'] },
    { id: 'responder-preguntas', name: 'Responder preguntas', description: 'Responde preguntas frecuentes: qué incluye la renta, zonas de servicio, instalación y requisitos.', tags: ['faq', 'renta'], examples: ['¿Qué incluye la renta?', '¿Venden las oficinas o solo las rentan?'], inputModes: ['text/plain'], outputModes: ['text/plain'] },
    { id: 'cotizar', name: 'Cotizar por WhatsApp', description: 'Entrega un enlace de WhatsApp prellenado para cotizar. Vexon no publica precios.', tags: ['cotizacion', 'contacto'], examples: ['¿Cuánto cuesta rentar una oficina móvil?'], inputModes: ['text/plain'], outputModes: ['text/plain'] },
  ],
});

export const mcpServerCard = () => ({
  $schema: 'https://modelcontextprotocol.io/schemas/draft/server-card.json',
  schemaVersion: '2025-11-25',
  serverInfo: { name: 'vexon-mcp', title: SITE.name, version: AGENT_VERSION, description: DESCRIPTION, websiteUrl: U },
  protocolVersion: MCP_MODERN,
  supportedVersions: MCP_SUPPORTED_VERSIONS,
  transport: { type: 'streamable-http', url: `${U}/mcp` },
  capabilities: { tools: { listChanged: false } },
  authentication: { type: 'none', description: 'Público y de solo lectura. No requiere credenciales.' },
  tools: TOOLS.map(({ name, description }) => ({ name, description })),
});

export const aiCatalog = () => ({
  specVersion: '1.0',
  host: { displayName: SITE.name, description: DESCRIPTION, url: U, contact: SITE.email },
  entries: [
    { identifier: 'urn:air:vexonmexico.com.mx:api:public', displayName: 'API REST pública de Vexon', description: 'JSON de solo lectura: modelos VX, preguntas frecuentes y blog.', type: 'application/json', url: `${U}/api/openapi.json`, representativeQueries: ['qué oficina móvil conviene para 6 personas', 'qué incluye la renta de una oficina móvil en Guadalajara'] },
    { identifier: 'urn:air:vexonmexico.com.mx:server:mcp', displayName: 'Servidor MCP de Vexon', description: 'Modelos, recomendación por número de personas, preguntas frecuentes, blog y enlace de cotización por WhatsApp.', type: 'application/mcp-server-card+json', url: `${U}/.well-known/mcp/server-card.json`, representativeQueries: ['recomienda una oficina móvil para 5 personas', 'cotizar renta de oficina móvil en Zapopan'] },
    { identifier: 'urn:air:vexonmexico.com.mx:nlweb:ask', displayName: 'Búsqueda NLWeb /ask de Vexon', description: 'Búsqueda en lenguaje natural sobre modelos, preguntas frecuentes y blog (mode=list, sin LLM).', type: 'application/json', url: `${U}/ask`, representativeQueries: ['oficina móvil para obra con aire acondicionado'] },
    { identifier: 'urn:air:vexonmexico.com.mx:agent:a2a', displayName: 'Vexon Assistant (A2A)', description: 'Agente A2A que responde preguntas y recomienda modelo desde el contenido real del sitio.', type: 'application/json', url: `${U}/.well-known/agent-card.json`, representativeQueries: ['qué modelo VX necesito para 8 personas'] },
  ],
});

export const apiCatalog = () => ({
  linkset: [{ anchor: `${U}/api`, 'service-desc': [{ href: `${U}/api/openapi.json`, type: 'application/vnd.oai.openapi+json;version=3.1', title: 'API REST pública de Vexon (OpenAPI 3.1)' }], 'service-doc': [{ href: `${U}/llms.txt`, type: 'text/markdown', title: 'Guía de Vexon para agentes' }] }],
});

export const skillsIndex = () => ({
  $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
  version: '0.2.0',
  publisher: { name: SITE.name, url: U, contact: SITE.email },
  skills: [{ name: 'cotizar-oficina-movil', type: 'skill-md', description: 'Ayuda a elegir un modelo de oficina móvil VX y a pedir una cotización de renta por WhatsApp en Guadalajara.', url: `${U}/.well-known/agent-skills/cotizar-oficina-movil/SKILL.md`, version: '1.0.0' }],
});

export const skillMd = () => `---
name: cotizar-oficina-movil
description: Ayuda a elegir un modelo de oficina móvil VX de Vexon y a pedir una cotización de renta por WhatsApp en Guadalajara.
---

# Cotizar una oficina móvil con Vexon

Vexon by Capelton **solo renta** oficinas móviles (línea VX, 8 modelos de 3 a 10 m) en Guadalajara, Zapopan, Tlaquepaque, Tonalá, Tlajomulco y El Salto. **No publica precios**: dependen del modelo, el tiempo de renta y la ubicación de la obra.

## Pasos

1. Pregunta cuántas personas trabajarán en la oficina y si necesitan un área privada.
2. Usa la herramienta MCP \`recommend_model\` (${U}/mcp) con \`people\` y \`private_office\`, o consulta ${U}/oficinas-moviles.
3. Para preguntas sobre qué incluye la renta, zonas o instalación usa \`search_faq\`.
4. Para cotizar usa \`request_quote\` con modelo, ubicación de la obra, fecha de inicio y tiempo de renta: devuelve un enlace de WhatsApp prellenado que el cliente abre y envía.

## Reglas

- No inventes precios, plazos de entrega ni descuentos; remite a la cotización por WhatsApp.
- Los modelos no incluyen sanitario ni cocineta.
- Documentación para agentes: ${U}/llms.txt
`;
