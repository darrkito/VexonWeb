import type { APIRoute } from 'astro';
import { MODELOS } from '../../data/modelos';
import { modeloMarkdown } from '../../lib/llms';

export function getStaticPaths() {
  return MODELOS.map((m) => ({ params: { slug: m.slug }, props: { m } }));
}
export const GET: APIRoute = ({ props }) =>
  new Response(modeloMarkdown(props.m), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
