import type { APIRoute } from 'astro';
import { blogList, json } from '../../lib/agent';
export const GET: APIRoute = async () => json({ posts: (await blogList()).map(({ faqs: _f, ...p }) => p) });
