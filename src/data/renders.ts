import type { ImageMetadata } from 'astro';
import elevacion3 from '../assets/renders/3m/elevacion.webp';
import isometrica3 from '../assets/renders/3m/isometrica.webp';
import abierta3 from '../assets/renders/3m/planta-abierta.webp';
import elevacion4 from '../assets/renders/4m/elevacion.webp';
import isometrica4 from '../assets/renders/4m/isometrica.webp';
import abierta4 from '../assets/renders/4m/planta-abierta.webp';
import elevacion6 from '../assets/renders/6m/elevacion.webp';
import isometrica6 from '../assets/renders/6m/isometrica.webp';
import abierta6 from '../assets/renders/6m/planta-abierta.webp';
import privado6 from '../assets/renders/6m/planta-privado.webp';
import elevacion8 from '../assets/renders/8m/elevacion.webp';
import isometrica8 from '../assets/renders/8m/isometrica.webp';
import abierta8 from '../assets/renders/8m/planta-abierta.webp';
import privado8 from '../assets/renders/8m/planta-privado.webp';
import elevacion10 from '../assets/renders/10m/elevacion.webp';
import isometrica10 from '../assets/renders/10m/isometrica.webp';
import abierta10 from '../assets/renders/10m/planta-abierta.webp';
import privado10 from '../assets/renders/10m/planta-privado.webp';

type Renders = { elevacion?: ImageMetadata; isometrica?: ImageMetadata; planta: ImageMetadata };

const renders: Record<string, Renders> = {
  'vx-3m': { elevacion: elevacion3, isometrica: isometrica3, planta: abierta3 },
  'vx-4m': { elevacion: elevacion4, isometrica: isometrica4, planta: abierta4 },
  'vx-6m': { elevacion: elevacion6, isometrica: isometrica6, planta: abierta6 },
  'vx-6p': { planta: privado6 },
  'vx-8m': { elevacion: elevacion8, isometrica: isometrica8, planta: abierta8 },
  'vx-8p': { planta: privado8 },
  'vx-10m': { elevacion: elevacion10, isometrica: isometrica10, planta: abierta10 },
  'vx-10p': { planta: privado10 },
};

export function getRenders(slug: string): Renders | undefined {
  return renders[slug];
}
