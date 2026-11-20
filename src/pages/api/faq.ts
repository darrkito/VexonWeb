import type { APIRoute } from 'astro';
import { faqCorpus, json } from '../../lib/agent';
export const GET: APIRoute = () => json({ faq: faqCorpus().map(({ url, faq }) => ({ ...faq, url })) });
