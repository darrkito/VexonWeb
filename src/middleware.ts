/**
 * Negociación de contenido para agentes: con `Accept: text/markdown` (y sin preferir text/html) la portada,
 * el catálogo y cada modelo responden en Markdown con los mismos datos del sitio. Todo lo demás pasa tal cual.
 * Corre como Edge Middleware de Vercel (middlewareMode: 'edge'), por eso alcanza páginas prerenderizadas.
 */
import { defineMiddleware } from 'astro:middleware';
import { getModelo } from './data/modelos';
import { llmsFull, llmsTxt, modeloMarkdown } from './lib/llms';

const prefersMarkdown = (accept: string) => {
  const md = accept.indexOf('text/markdown');
  const html = accept.indexOf('text/html');
  return md !== -1 && (html === -1 || md < html);
};

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.request.method !== 'GET' || !prefersMarkdown(context.request.headers.get('accept') ?? '')) return next();
  const path = new URL(context.request.url).pathname.replace(/\/$/, '') || '/';
  let body: string | undefined;
  if (path === '/') body = llmsTxt();
  else if (path === '/oficinas-moviles') body = llmsFull();
  else {
    const m = path.match(/^\/oficinas-moviles\/([^/.]+)$/);
    const modelo = m && getModelo(m[1]);
    if (modelo) body = modeloMarkdown(modelo);
  }
  if (body === undefined) return next();
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8', Vary: 'Accept' } });
});
