// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// En Vercel se usa su adaptador; en local (o cualquier servidor Node) el adaptador de Node.
const adapter = process.env.VERCEL
  ? vercel({ webAnalytics: { enabled: true } })
  : node({ mode: 'standalone' });

export default defineConfig({
  site: 'https://vexonmexico.com.mx',
  trailingSlash: 'never',
  build: { format: 'directory', inlineStylesheets: 'always' },
  adapter,
  image: {
    layout: 'constrained',
    responsiveStyles: false,
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !/\/(gracias|404|api)(\/|$)/.test(page),
      i18n: { defaultLocale: 'es', locales: { es: 'es-MX' } },
    }),
  ],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Kanit',
      cssVariable: '--font-kanit',
      fallbacks: ['Arial', 'sans-serif'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/kanit-latin-400-normal.woff2'], weight: 400, style: 'normal' },
          { src: ['./src/assets/fonts/kanit-latin-500-normal.woff2'], weight: 500, style: 'normal' },
          { src: ['./src/assets/fonts/kanit-latin-700-normal.woff2'], weight: 700, style: 'normal' },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Roboto',
      cssVariable: '--font-roboto',
      fallbacks: ['Arial', 'sans-serif'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/roboto-latin-wght-normal.woff2'], weight: '100 900', style: 'normal' },
        ],
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
