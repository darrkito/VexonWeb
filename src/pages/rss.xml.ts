import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../lib/site';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: 'Blog de Vexon: oficinas móviles para obra en Guadalajara',
    description: 'Guías para elegir, instalar y rentar oficinas móviles en Guadalajara.',
    site: context.site ?? SITE.url,
    customData: '<language>es-mx</language>',
    items: posts.map((p) => ({ title: p.data.title, description: p.data.description, pubDate: p.data.date, link: `/blog/${p.id}` })),
  });
}
