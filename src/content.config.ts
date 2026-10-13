import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(160),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('Equipo Vexon'),
    category: z.enum(['Guías', 'Obra', 'Remodelación', 'Normatividad', 'Casos']),
    /** Modelo cuyo render ilustra el artículo y al que apunta el CTA */
    model: z.string().default('vx-6m'),
    persona: z.enum(['residente', 'compras', 'remodelacion', 'planta']).optional(),
    draft: z.boolean().default(false),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

export const collections = { blog };
