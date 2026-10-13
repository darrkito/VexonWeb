/**
 * Preguntas frecuentes por página. Mismo texto visible y en el schema FAQPage.
 * Las respuestas marcadas con "POR CONFIRMAR" dependen de condiciones comerciales que Vexon debe validar
 * (plazos, entrega, facturación). Están redactadas sin prometer cifras.
 */
import type { Modelo } from './modelos';
import { fmtKg } from './modelos';

export type Faq = { q: string; a: string };

export const FAQ_HOME: Faq[] = [
  {
    q: '¿Qué es una oficina móvil?',
    a: 'Es una oficina completa construida sobre un remolque: muros, ventanas, puerta, clima, iluminación, contactos y mesas de trabajo. Llega a tu obra lista para usarse, se nivela con torres y, cuando terminas, se retira sin dejar construcción.',
  },
  {
    q: '¿Qué modelos de oficina móvil rentan en Guadalajara?',
    a: 'Rentamos 8 modelos de la línea VX: de 3, 4, 6, 8 y 10 metros de largo por 2.5 m de ancho, para 3 a 9 personas. Los modelos M son oficina abierta y los modelos P incluyen un área privada con un segundo minisplit.',
  },
  {
    q: '¿Venden las oficinas o solo las rentan?',
    a: 'Vexon trabaja solo con renta. Así no inmovilizas capital en una oficina que solo necesitas durante la obra o la remodelación, y al terminar la devuelves.',
  },
  {
    q: '¿En qué zonas entregan?',
    a: 'Atendemos la Zona Metropolitana de Guadalajara: Guadalajara, Zapopan, Tlaquepaque, Tonalá, Tlajomulco y El Salto. Si tu obra está en otro punto de Jalisco, escríbenos por WhatsApp y lo revisamos.',
  },
  {
    // POR CONFIRMAR: qué incluye exactamente la renta
    q: '¿Qué incluye la renta?',
    a: 'La oficina se entrega equipada: mesas de trabajo, aire acondicionado, ventanas, iluminación LED, contactos de 127 V, escalera y torres de nivelación. Cada cotización detalla traslado, instalación y recolección para tu caso.',
  },
  {
    // POR CONFIRMAR: tiempos de entrega
    q: '¿En cuánto tiempo me la entregan?',
    a: 'Depende del modelo y de la disponibilidad al momento de cotizar. Al escribirnos con la ubicación y la fecha de inicio de tu obra, te confirmamos la fecha de entrega.',
  },
  {
    q: '¿Qué necesito en la obra para instalarla?',
    a: 'Un espacio con acceso para el remolque y una toma eléctrica de 127 V para el clima, las luces y los contactos. El terreno no tiene que estar perfecto: las torres de nivelación compensan desniveles normales de obra.',
  },
  {
    q: '¿Tienen baño?',
    a: 'No. Los modelos VX son oficinas de trabajo sin sanitario ni cocineta. Si tu obra también necesita sanitarios, pregúntanos por WhatsApp.',
  },
  {
    q: '¿Cuánto cuesta rentar una oficina móvil?',
    a: 'El precio depende del modelo, del tiempo de renta y de la ubicación de la obra. Escríbenos por WhatsApp con esos tres datos y te enviamos la cotización sin compromiso.',
  },
  {
    q: '¿Quién está detrás de Vexon?',
    a: 'Vexon es la línea de oficinas móviles en renta respaldada por Capelton, fabricante mexicano de espacios modulares y móviles.',
  },
];

export const FAQ_CATALOGO: Faq[] = [
  {
    q: '¿Qué diferencia hay entre los modelos M y P?',
    a: 'Los modelos M son oficina abierta. Los modelos P (VX-6P, VX-8P y VX-10P) tienen un área privada de 2.50 m para el jefe de obra o juntas, y traen dos minisplits, uno por área.',
  },
  {
    q: '¿Cómo elijo el tamaño correcto?',
    a: 'Cuenta cuántas personas trabajarán al mismo tiempo: la VX-3M es para 3, la VX-4M para 5, la VX-6M y la VX-8M para 7 y la VX-10M para 9. Si alguien necesita privado, elige la versión P del largo que te sirva.',
  },
  {
    q: '¿Cuál es la oficina móvil más grande?',
    a: 'La VX-10M: 10 × 2.5 m, 5 mesas de trabajo y capacidad para 9 personas. Su versión con privado, la VX-10P, recibe a 8 personas.',
  },
  {
    q: '¿Todas tienen aire acondicionado?',
    a: 'Sí. Todos los modelos traen minisplit; los modelos con privado traen dos.',
  },
  {
    q: '¿Puedo ver la ficha técnica de cada modelo?',
    a: 'Sí. Cada página de modelo tiene todas las especificaciones a la vista y, al final, la ficha técnica en PDF para descargar o compartir.',
  },
];

export function faqsModelo(m: Modelo): Faq[] {
  const base: Faq[] = [
    {
      q: `¿Para cuántas personas es la ${m.code}?`,
      a: `La ${m.code} tiene capacidad sugerida para ${m.personas} personas y trae ${m.mesas} mesas de trabajo${m.areaPrivada ? ', además de un área privada' : ''}.`,
    },
    {
      q: `¿Cuáles son las medidas de la ${m.code}?`,
      a: `Mide ${m.largo} m de largo, ${m.ancho} m de ancho y ${m.alto} m de alto, incluyendo el remolque.`,
    },
    {
      q: `¿Cuánto pesa la ${m.code} y cómo se transporta?`,
      a: `El remolque pesa ${fmtKg(m.pesoRemolqueKg)}, tiene ${m.ejes === 1 ? 'un eje' : `${m.ejes} ejes`} y luces de navegación para circular. Nosotros la llevamos a tu obra.`,
    },
    {
      q: `¿Qué conexión eléctrica necesita la ${m.code}?`,
      a: `Una toma de 127 V. Con ella funcionan ${m.minisplits === 1 ? 'el minisplit' : 'los 2 minisplits'}, las ${m.lamparasLed} lámparas LED y los contactos.`,
    },
    {
      q: '¿Se puede instalar en terreno irregular?',
      a: `Sí. Trae ${m.torresNivelacion} torres de nivelación y gato mecánico para dejarla firme y a nivel en terreno de obra.`,
    },
    {
      q: `¿La ${m.code} tiene baño o cocineta?`,
      a: 'No. Es una oficina de trabajo sin sanitario ni cocineta. Si tu obra necesita sanitarios, pregúntanos por WhatsApp.',
    },
    {
      // POR CONFIRMAR
      q: '¿Cuánto tiempo puedo rentarla?',
      a: 'Se renta por el tiempo que dure tu obra o remodelación. Dinos la fecha de inicio y el tiempo aproximado y lo incluimos en la cotización.',
    },
  ];
  return [...base, ...(m.faqsExtra ?? [])];
}

export const FAQ_NOSOTROS: Faq[] = [
  {
    q: '¿Qué relación tiene Vexon con Capelton?',
    a: 'Vexon es la línea de oficinas móviles en renta respaldada por Capelton, fabricante mexicano de espacios modulares y móviles. Las unidades VX se diseñan con la experiencia de Capelton en estructuras para obra e industria.',
  },
  {
    q: '¿Dónde están ubicados?',
    a: 'Estamos en 6 de Enero Ote. 63, colonia Nuevo México, Zapopan, Jalisco, y atendemos toda la Zona Metropolitana de Guadalajara.',
  },
  {
    q: '¿Por qué rentar en lugar de construir una oficina de obra?',
    a: 'Porque llega lista para trabajar, no consume tiempo ni material de la obra, se mueve cuando avanza el proyecto y al terminar se retira sin demoler nada.',
  },
];

export const FAQ_CONTACTO: Faq[] = [
  {
    q: '¿Cuál es la forma más rápida de cotizar?',
    a: 'WhatsApp. Envíanos el modelo o el número de personas, la ubicación de la obra y la fecha de inicio, y te respondemos con la cotización.',
  },
  {
    q: '¿En qué horario atienden?',
    a: 'De lunes a viernes de 8:00 a 18:00 y sábados de 9:00 a 14:00. Puedes escribirnos por WhatsApp en cualquier momento y te contestamos en horario de atención.',
  },
  {
    // POR CONFIRMAR: facturación
    q: '¿Pueden enviarme una cotización formal para mi empresa?',
    a: 'Sí. En el formulario marca "Quiero cotización formal por correo" y déjanos los datos de tu empresa; te la enviamos por correo.',
  },
  {
    q: '¿Puedo ver una oficina antes de rentarla?',
    a: 'Escríbenos por WhatsApp y coordinamos fotos, video o una visita según la disponibilidad de unidades.',
  },
];
