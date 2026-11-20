import type { APIRoute } from 'astro';
import { json } from '../../lib/agent';
import { SITE } from '../../lib/site';
const get = (summary: string) => ({ get: { summary, responses: { '200': { description: 'OK', content: { 'application/json': { schema: { type: 'object' } } } } } } });
export const GET: APIRoute = () =>
  json({
    openapi: '3.1.0',
    info: { title: 'API pública de Vexon', version: '1.0.0', description: 'Datos de solo lectura de las oficinas móviles VX en renta. Vexon no publica precios.' },
    servers: [{ url: SITE.url }],
    paths: {
      '/api/modelos': get('Los 8 modelos VX con medidas, capacidad y enlaces, más datos del negocio'),
      '/api/faq': get('Preguntas frecuentes de Vexon'),
      '/api/blog': get('Artículos publicados del blog'),
      '/ask': { get: { summary: 'Búsqueda NLWeb en lenguaje natural (mode=list)', parameters: [{ name: 'query', in: 'query', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'OK' }, '400': { description: 'Falta query' } } } },
    },
  }, 200, 'application/vnd.oai.openapi+json;version=3.1; charset=utf-8');
