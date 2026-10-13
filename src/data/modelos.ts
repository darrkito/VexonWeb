/**
 * Fuente única de datos de la línea VX. Todo viene de las fichas técnicas oficiales (2026).
 * Si cambia una ficha, se cambia aquí y se actualizan: páginas de modelo, catálogo, comparador,
 * selector, schema JSON-LD, llms.txt, versiones .md y pruebas automáticas.
 */
import type { ImageMetadata } from 'astro';
import img3m from '../assets/modelos/vx-3m.png';
import img4m from '../assets/modelos/vx-4m.png';
import img6m from '../assets/modelos/vx-6m.png';
import img6p from '../assets/modelos/vx-6p.png';
import img8m from '../assets/modelos/vx-8m.png';
import img8p from '../assets/modelos/vx-8p.png';
import img10m from '../assets/modelos/vx-10m.png';
import img10p from '../assets/modelos/vx-10p.png';
import plan3m from '../assets/planos/vx-3m.svg?url';
import plan4m from '../assets/planos/vx-4m.svg?url';
import plan6m from '../assets/planos/vx-6m.svg?url';
import plan6p from '../assets/planos/vx-6p.svg?url';
import plan8m from '../assets/planos/vx-8m.svg?url';
import plan8p from '../assets/planos/vx-8p.svg?url';
import plan10m from '../assets/planos/vx-10m.svg?url';
import plan10p from '../assets/planos/vx-10p.svg?url';

export type PersonaKey = 'residente' | 'compras' | 'remodelacion' | 'planta';

export interface Hotspot {
  n: number;
  x: number; // % sobre el ancho del render
  y: number; // % sobre el alto del render
}

export interface Modelo {
  slug: string;
  code: string;
  tipo: 'Oficina' | 'Oficina + privado';
  distribucion: 'M' | 'P';
  largo: number;
  ancho: number;
  alto: number;
  personas: number;
  mesas: number;
  sanitario: boolean;
  areaPrivada: number;
  cocineta: boolean;
  accesos: number;
  ventanas: number;
  lamparasLed: number;
  minisplits: number;
  contactos127v: boolean;
  ejes: number;
  torresNivelacion: number;
  capacidadCargaKg: number;
  pesoRemolqueKg: number;
  image: ImageMetadata;
  plan: string;
  /** Proporción del plano (ancho, alto) para reservar espacio y evitar saltos de layout */
  planSize: [number, number];
  ficha: string;
  hotspots: Hotspot[];
  /** Frase corta para tarjetas */
  resumen: string;
  /** Respuesta directa (40–60 palabras) para el inicio de la página, Google y asistentes de IA */
  respuesta: string;
  idealPara: { persona: PersonaKey; titulo: string; texto: string }[];
  faqsExtra?: { q: string; a: string }[];
}

// Posiciones de los puntos numerados sobre cada render (misma numeración que las fichas técnicas).
const hs3 = [
  { n: 3, x: 69, y: 30 }, { n: 4, x: 75, y: 52 }, { n: 5, x: 44, y: 38 }, { n: 6, x: 60, y: 72 },
  { n: 7, x: 32, y: 82 }, { n: 9, x: 88, y: 82 }, { n: 10, x: 16, y: 69 }, { n: 11, x: 66, y: 82 }, { n: 13, x: 48, y: 12 },
];
const hs4 = [
  { n: 3, x: 74, y: 30 }, { n: 4, x: 63, y: 40 }, { n: 5, x: 46, y: 30 }, { n: 6, x: 68, y: 70 },
  { n: 7, x: 32, y: 80 }, { n: 9, x: 88, y: 82 }, { n: 10, x: 16, y: 67 }, { n: 11, x: 65, y: 82 }, { n: 13, x: 49, y: 12 },
];
const hs6 = [
  { n: 2, x: 82, y: 50 }, { n: 3, x: 51, y: 30 }, { n: 4, x: 63, y: 35 }, { n: 5, x: 33, y: 30 }, { n: 6, x: 60, y: 72 },
  { n: 7, x: 20, y: 80 }, { n: 9, x: 89, y: 85 }, { n: 10, x: 66, y: 10 }, { n: 11, x: 53, y: 85 }, { n: 13, x: 35, y: 15 },
];
const hs8 = [
  { n: 2, x: 86, y: 49 }, { n: 3, x: 52, y: 40 }, { n: 4, x: 63, y: 30 }, { n: 5, x: 33, y: 40 }, { n: 6, x: 66, y: 66 },
  { n: 7, x: 22, y: 72 }, { n: 9, x: 90, y: 74 }, { n: 10, x: 71, y: 19 }, { n: 11, x: 59, y: 78 }, { n: 13, x: 36, y: 25 },
];
const hs10 = [
  { n: 2, x: 91, y: 49 }, { n: 3, x: 68, y: 32 }, { n: 4, x: 22, y: 45 }, { n: 5, x: 36, y: 40 }, { n: 6, x: 68, y: 73 },
  { n: 7, x: 24, y: 77 }, { n: 9, x: 91, y: 87 }, { n: 10, x: 80, y: 14 }, { n: 11, x: 77, y: 82 }, { n: 13, x: 37, y: 24 },
];

const base = { ancho: 2.5, sanitario: false, cocineta: false, accesos: 1, contactos127v: true } as const;

export const MODELOS: Modelo[] = [
  {
    ...base, slug: 'vx-3m', code: 'VX-3M', tipo: 'Oficina', distribucion: 'M',
    largo: 3, alto: 3.38, personas: 3, mesas: 2, areaPrivada: 0, ventanas: 2, lamparasLed: 2, minisplits: 1,
    ejes: 1, torresNivelacion: 4, capacidadCargaKg: 1250, pesoRemolqueKg: 750,
    image: img3m, plan: plan3m, planSize: [182, 246], ficha: '/fichas/vexon-vx-3m-ficha-tecnica.pdf', hotspots: hs3,
    resumen: 'La más compacta: oficina de obra para el residente y su equipo cercano.',
    respuesta:
      'La VX-3M es la oficina móvil más compacta de Vexon: mide 3 × 2.5 m, tiene 2 mesas de trabajo, minisplit, 2 ventanas, 2 lámparas LED y contactos de 127 V. Trabajan cómodamente hasta 3 personas. Pesa 750 kg sobre un remolque de un eje, así que se acomoda en espacios reducidos de obra o en un estacionamiento.',
    idealPara: [
      { persona: 'residente', titulo: 'Residente de obra y supervisor', texto: 'Un escritorio para planos y otro para el supervisor, con clima para revisar documentos a mediodía sin salir de la obra.' },
      { persona: 'remodelacion', titulo: 'Remodelación de un local', texto: 'Por su tamaño cabe en un cajón amplio de estacionamiento o en el patio de maniobras de tu negocio mientras remodelas.' },
    ],
  },
  {
    ...base, slug: 'vx-4m', code: 'VX-4M', tipo: 'Oficina', distribucion: 'M',
    largo: 4, alto: 3.38, personas: 5, mesas: 3, areaPrivada: 0, ventanas: 2, lamparasLed: 3, minisplits: 1,
    ejes: 1, torresNivelacion: 4, capacidadCargaKg: 1250, pesoRemolqueKg: 800,
    image: img4m, plan: plan4m, planSize: [182, 291], ficha: '/fichas/vexon-vx-4m-ficha-tecnica.pdf', hotspots: hs4,
    resumen: 'Un metro más que la VX-3M y lugar para 5 personas con 3 mesas.',
    respuesta:
      'La VX-4M es una oficina móvil de 4 × 2.5 m para hasta 5 personas. Incluye 3 mesas de trabajo, minisplit, 2 ventanas abatibles, 3 lámparas LED, contactos de 127 V y salidas de voz y datos. Pesa 800 kg, va sobre un eje y se nivela con 4 torres, ideal para obras medianas o remodelaciones.',
    idealPara: [
      { persona: 'residente', titulo: 'Equipo técnico de obra mediana', texto: 'Residente, supervisor y un auxiliar administrativo con mesa propia cada uno.' },
      { persona: 'remodelacion', titulo: 'Oficina temporal de un despacho', texto: 'Tu equipo sigue atendiendo mientras se remodela la oficina principal, con clima y conexión de datos.' },
    ],
  },
  {
    ...base, slug: 'vx-6m', code: 'VX-6M', tipo: 'Oficina', distribucion: 'M',
    largo: 6, alto: 3.38, personas: 7, mesas: 4, areaPrivada: 0, ventanas: 2, lamparasLed: 4, minisplits: 1,
    ejes: 1, torresNivelacion: 4, capacidadCargaKg: 1500, pesoRemolqueKg: 1000,
    image: img6m, plan: plan6m, planSize: [180, 360], ficha: '/fichas/vexon-vx-6m-ficha-tecnica.pdf', hotspots: hs6,
    resumen: 'Oficina abierta de 6 m para 7 personas con 4 mesas de trabajo.',
    respuesta:
      'La VX-6M es una oficina móvil abierta de 6 × 2.5 m con capacidad para 7 personas. Tiene 4 mesas de trabajo, minisplit, 2 ventanas, 4 lámparas LED, contactos de 127 V y salidas de voz y datos. Pesa 1,000 kg y se nivela con 4 torres: una medida versátil para obras de tamaño medio.',
    idealPara: [
      { persona: 'residente', titulo: 'Oficina central de obra', texto: 'Residente, supervisores y control de obra en un mismo espacio abierto, con mesa larga para extender planos.' },
      { persona: 'compras', titulo: 'Equipo administrativo en sitio', texto: 'Compras, almacén y control de estimaciones trabajando junto a la obra.' },
    ],
  },
  {
    ...base, slug: 'vx-6p', code: 'VX-6P', tipo: 'Oficina + privado', distribucion: 'P',
    largo: 6, alto: 3.38, personas: 7, mesas: 3, areaPrivada: 1, ventanas: 2, lamparasLed: 4, minisplits: 2,
    ejes: 1, torresNivelacion: 4, capacidadCargaKg: 1500, pesoRemolqueKg: 1000,
    image: img6p, plan: plan6p, planSize: [184, 352], ficha: '/fichas/vexon-vx-6p-ficha-tecnica.pdf', hotspots: hs6,
    resumen: '6 m con área privada y 2 minisplits: equipo y jefe de obra separados.',
    respuesta:
      'La VX-6P es una oficina móvil de 6 × 2.5 m con área privada para 7 personas. Incluye 3 mesas de trabajo en el área abierta, un privado de 2.50 m, 2 minisplits (uno por área), 2 ventanas, 4 lámparas LED y contactos de 127 V. Pesa 1,000 kg y va sobre un eje con 4 torres de nivelación.',
    idealPara: [
      { persona: 'residente', titulo: 'Jefe de obra con privado', texto: 'Juntas con clientes o subcontratistas en el privado mientras el equipo sigue trabajando afuera.' },
      { persona: 'planta', titulo: 'Supervisión de proyecto en planta', texto: 'El gerente del proyecto en el privado y el equipo de contratistas en el área abierta.' },
    ],
  },
  {
    ...base, slug: 'vx-8m', code: 'VX-8M', tipo: 'Oficina', distribucion: 'M',
    largo: 8, alto: 3.42, personas: 7, mesas: 4, areaPrivada: 0, ventanas: 2, lamparasLed: 6, minisplits: 1,
    ejes: 1, torresNivelacion: 6, capacidadCargaKg: 3000, pesoRemolqueKg: 1800,
    image: img8m, plan: plan8m, planSize: [141, 354], ficha: '/fichas/vexon-vx-8m-ficha-tecnica.pdf', hotspots: hs8,
    resumen: '8 m de oficina abierta, 6 lámparas LED y espacio de sobra para 7 personas.',
    respuesta:
      'La VX-8M es una oficina móvil abierta de 8 × 2.5 m para 7 personas, con más espacio de circulación que la VX-6M. Tiene 4 mesas de trabajo, minisplit, 2 ventanas, 6 lámparas LED, contactos de 127 V y salidas de voz y datos. Pesa 1,800 kg y se nivela con 6 torres.',
    idealPara: [
      { persona: 'residente', titulo: 'Obra con archivo y mesa de juntas', texto: 'Las 4 mesas de trabajo y espacio libre para archivo de planos, impresora o una mesa de reuniones.' },
      { persona: 'planta', titulo: 'Oficina temporal en nave industrial', texto: 'Un área amplia para coordinar contratistas durante una ampliación o un paro programado.' },
    ],
  },
  {
    ...base, slug: 'vx-8p', code: 'VX-8P', tipo: 'Oficina + privado', distribucion: 'P',
    largo: 8, alto: 3.42, personas: 6, mesas: 3, areaPrivada: 1, ventanas: 2, lamparasLed: 6, minisplits: 2,
    ejes: 1, torresNivelacion: 6, capacidadCargaKg: 3000, pesoRemolqueKg: 1800,
    image: img8p, plan: plan8p, planSize: [142, 354], ficha: '/fichas/vexon-vx-8p-ficha-tecnica.pdf', hotspots: hs8,
    resumen: '8 m con privado amplio y 2 minisplits para 6 personas.',
    respuesta:
      'La VX-8P es una oficina móvil de 8 × 2.5 m con área privada de 2.50 m y capacidad para 6 personas. Incluye 3 mesas de trabajo, 2 minisplits, 2 ventanas, 6 lámparas LED, contactos de 127 V y salidas de voz y datos. Pesa 1,800 kg y se nivela con 6 torres.',
    idealPara: [
      { persona: 'residente', titulo: 'Gerencia de obra', texto: 'Un privado cómodo para el gerente y su archivo, y un área de trabajo amplia para el equipo técnico.' },
      { persona: 'compras', titulo: 'Oficina de obra con atención a proveedores', texto: 'Recibe proveedores y subcontratistas en el privado sin interrumpir al resto del equipo.' },
    ],
  },
  {
    ...base, slug: 'vx-10m', code: 'VX-10M', tipo: 'Oficina', distribucion: 'M',
    largo: 10, alto: 3.49, personas: 9, mesas: 5, areaPrivada: 0, ventanas: 3, lamparasLed: 8, minisplits: 1,
    ejes: 2, torresNivelacion: 8, capacidadCargaKg: 6000, pesoRemolqueKg: 2000,
    image: img10m, plan: plan10m, planSize: [118, 354], ficha: '/fichas/vexon-vx-10m-ficha-tecnica.pdf', hotspots: hs10,
    resumen: 'La más grande: 10 m, 5 mesas y lugar para 9 personas.',
    respuesta:
      'La VX-10M es la oficina móvil más grande de Vexon: 10 × 2.5 m con capacidad para 9 personas. Tiene 5 mesas de trabajo, minisplit, 3 ventanas, 8 lámparas LED, contactos de 127 V y salidas de voz y datos. Va sobre 2 ejes, pesa 2,000 kg y se nivela con 8 torres.',
    idealPara: [
      { persona: 'residente', titulo: 'Obra grande con varios frentes', texto: 'Residentes de cada frente, control de calidad y administración trabajando en un solo lugar.' },
      { persona: 'planta', titulo: 'Proyecto industrial con muchos contratistas', texto: 'Espacio para coordinar a varios contratistas a la vez durante una ampliación de planta.' },
    ],
  },
  {
    ...base, slug: 'vx-10p', code: 'VX-10P', tipo: 'Oficina + privado', distribucion: 'P',
    largo: 10, alto: 3.49, personas: 8, mesas: 4, areaPrivada: 1, ventanas: 3, lamparasLed: 8, minisplits: 2,
    ejes: 2, torresNivelacion: 8, capacidadCargaKg: 6000, pesoRemolqueKg: 2000,
    image: img10p, plan: plan10p, planSize: [126, 354], ficha: '/fichas/vexon-vx-10p-ficha-tecnica.pdf', hotspots: hs10,
    resumen: '10 m con privado, 4 mesas y 2 minisplits para 8 personas.',
    respuesta:
      'La VX-10P es una oficina móvil de 10 × 2.5 m con área privada y capacidad para 8 personas. Incluye 4 mesas de trabajo, un privado de 2.50 m, 2 minisplits, 3 ventanas, 8 lámparas LED y contactos de 127 V. Va sobre 2 ejes, pesa 2,000 kg y se nivela con 8 torres.',
    idealPara: [
      { persona: 'planta', titulo: 'Gerente de proyecto en planta', texto: 'Privado para el gerente o el supervisor de seguridad y área abierta para el equipo de contratistas.' },
      { persona: 'residente', titulo: 'Oficina principal de una obra grande', texto: 'El jefe de proyecto en privado y hasta 4 mesas para residentes y administración.' },
    ],
  },
];

export const getModelo = (slug: string) => MODELOS.find((m) => m.slug === slug);

/** Equipamiento con la numeración de las fichas técnicas. */
export const EQUIPAMIENTO: { n: number; nombre: string; detalle: string; adicional?: boolean }[] = [
  { n: 1, nombre: 'Mesas de trabajo', detalle: 'Cubierta de MDF de 15 mm con melamina negra, resistente al uso diario de obra.' },
  { n: 2, nombre: 'Aire acondicionado', detalle: 'Minisplit para trabajar fresco en los meses de calor de Guadalajara. Los modelos P traen dos.' },
  { n: 3, nombre: 'Ventanas de aluminio abatibles', detalle: 'Ventilación e iluminación natural sin perder seguridad.' },
  { n: 4, nombre: 'Muros de lámina Pintro de 3"', detalle: 'Panel de lámina Pintro de 3 pulgadas; por dentro, acabado blanco brillante.' },
  { n: 5, nombre: 'Puerta de aluminio', detalle: 'Acceso principal con cierre, al pie de la escalera.' },
  { n: 6, nombre: 'Estructura de acero', detalle: 'Chasis y estructura de acero para uso continuo y traslados entre obras.' },
  { n: 7, nombre: 'Escalera de acero antiderrapante', detalle: 'Acceso seguro con pasamanos.' },
  { n: 9, nombre: 'Gato mecánico', detalle: 'Para apoyar y ajustar la lanza del remolque.' },
  { n: 10, nombre: 'Luces de navegación', detalle: 'Señalización para el traslado por carretera.' },
  { n: 11, nombre: 'Torres de nivelación', detalle: 'Nivelan la oficina en terreno irregular de obra. De 4 a 8 según el modelo.' },
  { n: 12, nombre: 'Sillas acojinadas', detalle: 'Sillas con forro de tela.', adicional: true },
  { n: 13, nombre: 'Cierrapuertas', detalle: 'La puerta cierra sola y conserva el clima.', adicional: true },
  { n: 14, nombre: 'Salidas de voz y datos', detalle: 'Listas para conectar internet y teléfono.', adicional: true },
];

export const ACABADOS = [
  { nombre: 'Muros interiores', detalle: 'Lámina Pintro blanco brillante, fácil de limpiar.' },
  { nombre: 'Mesas de trabajo', detalle: 'MDF de 15 mm con melamina negra.' },
  { nombre: 'Piso', detalle: 'Laminado SPC (aleación de minerales y PVC), resistente al tránsito con botas de obra.' },
];

export const fmtKg = (n: number) => `${n.toLocaleString('es-MX')} kg`;
export const fmtM = (n: number) => `${n.toLocaleString('es-MX', { minimumFractionDigits: n % 1 ? 2 : 0 })} m`;

/** Recomendación del selector: menor modelo que cubre a las personas, con o sin privado. */
export function recomendar(personas: number, privado: boolean): Modelo {
  const pool = MODELOS.filter((m) => (privado ? m.distribucion === 'P' : m.distribucion === 'M')).sort((a, b) => a.largo - b.largo);
  return pool.find((m) => m.personas >= personas) ?? pool[pool.length - 1];
}
