/** Páginas de solución por tipo de cliente (personas del plan). */
import type { Faq } from './faqs';
import type { PersonaKey } from './modelos';

export interface Solucion {
  slug: string;
  persona: PersonaKey;
  personaSecundaria?: PersonaKey;
  title: string;
  description: string;
  h1: string;
  respuesta: string;
  dolores: { t: string; d: string }[];
  modelos: { slug: string; por: string }[];
  checklist: string[];
  faqs: Faq[];
  ctaFinal: string;
}

export const SOLUCIONES: Solucion[] = [
  {
    slug: 'constructoras',
    persona: 'residente',
    personaSecundaria: 'compras',
    title: 'Oficinas Móviles para Obra en Guadalajara | Vexon',
    description: 'Renta de oficinas móviles para constructoras en Guadalajara y Zapopan: oficina de obra con clima, mesas y privado opcional. De 3 a 10 m. Cotiza por WhatsApp.',
    h1: 'Oficinas móviles para obra: tu caseta de obra lista desde el primer día',
    respuesta:
      'Para una obra en Guadalajara, una oficina móvil Vexon sustituye a la caseta construida: llega sobre remolque con mesas de trabajo, minisplit, luz LED, contactos de 127 V y salidas de voz y datos, se nivela con torres en terreno de obra y se recoge al terminar. Hay 8 modelos, de 3 a 9 personas.',
    dolores: [
      { t: 'Arrancas sin perder días', d: 'No hay que levantar muros ni instalar clima: la oficina llega equipada y nivelada.' },
      { t: 'El equipo trabaja a gusto', d: 'Clima, mesas para planos y luz LED para revisar documentos a cualquier hora.' },
      { t: 'Se mueve cuando avanza la obra', d: 'Si cambia el frente de trabajo, la oficina se traslada en su propio remolque.' },
      { t: 'Cero escombro al final', d: 'Al cerrar la obra la recogemos. No hay caseta que demoler.' },
    ],
    modelos: [
      { slug: 'vx-6m', por: 'Oficina central para residente, supervisores y control de obra.' },
      { slug: 'vx-6p', por: 'Cuando el jefe de obra necesita privado para juntas.' },
      { slug: 'vx-10m', por: 'Obras grandes con varios frentes y hasta 9 personas.' },
    ],
    checklist: [
      'Espacio plano o con desnivel moderado para el remolque y sus torres de nivelación.',
      'Acceso para que el remolque llegue hasta el punto de instalación.',
      'Toma eléctrica de 127 V para clima, luces y contactos.',
      'Ubicación lejos de zonas de maniobra de maquinaria pesada.',
      'Si necesitas internet o teléfono, la oficina trae salidas de voz y datos.',
    ],
    faqs: [
      { q: '¿Una oficina móvil sirve como caseta de obra?', a: 'Sí. Cumple la función de la caseta de obra pero llega equipada con mesas, clima, luz y contactos, y se retira al terminar sin demoler nada.' },
      { q: '¿Qué modelo conviene para una obra mediana?', a: 'Para un equipo de 4 a 7 personas, la VX-6M es la más versátil. Si el jefe de obra necesita privado, la VX-6P mantiene el mismo largo con un área privada y dos minisplits.' },
      { q: '¿Pueden mandarme una cotización formal para el área de compras?', a: 'Sí. Pídela por WhatsApp o marca "Quiero cotización formal por correo" en el formulario de contacto.' },
      { q: '¿Se puede mover la oficina dentro de la misma obra?', a: 'Sí. Va sobre remolque con luces de navegación, así que puede reubicarse cuando cambia el frente de trabajo. Coordínalo con nosotros por WhatsApp.' },
    ],
    ctaFinal: 'Cotiza la oficina de tu obra',
  },
  {
    slug: 'remodelaciones',
    persona: 'remodelacion',
    title: 'Oficina Temporal para Remodelación en Guadalajara | Vexon',
    description: 'Sigue atendiendo mientras remodelas: renta una oficina móvil temporal con clima y mesas en Guadalajara y Zapopan. Modelos compactos desde 3 m.',
    h1: 'Oficina temporal mientras remodelas tu negocio',
    respuesta:
      'Si vas a remodelar tu local, clínica o despacho en Guadalajara, una oficina móvil Vexon te permite seguir trabajando a unos pasos: la VX-3M mide 3 × 2.5 m y recibe a 3 personas, y la VX-4M a 5. Llegan con clima, mesas, luz y contactos de 127 V, y se retiran cuando termina la obra.',
    dolores: [
      { t: 'Tu negocio no se detiene', d: 'Atiendes clientes, cobras y coordinas la obra desde una oficina junto a tu local.' },
      { t: 'Sin rentar otro local', d: 'Evitas mudarte, contratar otro espacio o pagar un depósito por meses.' },
      { t: 'Cabe en espacios reducidos', d: 'Los modelos de 3 y 4 metros se acomodan en un estacionamiento o patio de maniobras.' },
      { t: 'Cómoda para tu equipo', d: 'Clima, luz LED, mesas de trabajo y salidas para internet y teléfono.' },
    ],
    modelos: [
      { slug: 'vx-3m', por: 'Para el dueño y una o dos personas más.' },
      { slug: 'vx-4m', por: 'Para un equipo administrativo de hasta 5 personas.' },
      { slug: 'vx-6p', por: 'Si necesitas recibir clientes en un espacio privado.' },
    ],
    checklist: [
      'Un espacio dentro de tu predio, como estacionamiento o patio, con acceso para el remolque.',
      'Una toma de 127 V de tu local para conectar clima, luces y contactos.',
      'Si piensas usar la vía pública, consulta antes los permisos de tu municipio.',
      'Define cuántas personas trabajarán al mismo tiempo para elegir el tamaño.',
    ],
    faqs: [
      { q: '¿Cabe en el estacionamiento de mi negocio?', a: 'La VX-3M mide 3 × 2.5 m más 1.15 m de lanza del remolque, por eso suele caber en un espacio amplio de estacionamiento. Mándanos una foto o las medidas por WhatsApp y te confirmamos.' },
      { q: '¿Cómo se conecta a la luz?', a: 'Funciona con una toma de 127 V, la misma corriente de un contacto común de tu local. Con ella operan el minisplit, la iluminación LED y los contactos.' },
      { q: '¿Puedo rentarla solo por el tiempo de la remodelación?', a: 'Sí, la renta se ajusta a la duración de tu obra. Dinos la fecha de inicio y el tiempo aproximado y lo incluimos en la cotización.' },
      { q: '¿Necesito saber de construcción para rentarla?', a: 'No. Nosotros la llevamos, la nivelamos y te explicamos cómo conectarla. Tú solo nos dices dónde la quieres.' },
    ],
    ctaFinal: 'Cotiza tu oficina temporal',
  },
  {
    slug: 'naves-e-industria',
    persona: 'planta',
    title: 'Oficinas Móviles para Naves e Industria en Jalisco | Vexon',
    description: 'Oficinas móviles en renta para plantas y naves industriales en Zapopan, El Salto y la ZMG: espacio para contratistas y privado para el supervisor.',
    h1: 'Oficinas móviles para plantas y naves industriales',
    respuesta:
      'Para ampliaciones, paros programados o proyectos con contratistas en plantas de Zapopan, El Salto o Tlajomulco, Vexon renta oficinas móviles de hasta 10 m: la VX-10P recibe a 8 personas con un privado para el supervisor, y la VX-10M a 9 en espacio abierto. Llegan equipadas y se retiran al terminar el proyecto.',
    dolores: [
      { t: 'Contratistas fuera de tus oficinas', d: 'Los equipos externos tienen su propio espacio sin ocupar salas de juntas de la planta.' },
      { t: 'Privado para el responsable', d: 'Los modelos P separan al gerente o supervisor del área de trabajo del equipo.' },
      { t: 'Instalación sin obra civil', d: 'No hay que construir dentro del predio: la oficina llega sobre remolque y se nivela.' },
      { t: 'Se retira al cerrar el proyecto', d: 'Cuando terminas, la recogemos y el espacio queda libre.' },
    ],
    modelos: [
      { slug: 'vx-10p', por: 'Supervisor en privado y equipo de contratistas en área abierta.' },
      { slug: 'vx-8p', por: 'Proyectos medianos con privado amplio para 6 personas.' },
      { slug: 'vx-10m', por: 'Hasta 9 personas en un solo espacio abierto.' },
    ],
    checklist: [
      'Punto de instalación con acceso para el remolque dentro del predio.',
      'Toma de 127 V cercana para clima, luces y contactos.',
      'Revisa con el área de seguridad de la planta los requisitos de acceso para el traslado.',
      'Considera salidas de voz y datos si el equipo necesita conectarse a la red.',
    ],
    faqs: [
      { q: '¿Qué modelo conviene para un proyecto con contratistas?', a: 'Si el responsable necesita privado, la VX-10P recibe a 8 personas con área privada y dos minisplits. Si todos trabajan juntos, la VX-10M recibe a 9.' },
      { q: '¿Se puede instalar dentro de una nave?', a: 'Depende del acceso y la altura disponibles: la oficina mide hasta 3.49 m de alto sobre su remolque. Envíanos las medidas del acceso y te confirmamos.' },
      { q: '¿Entregan en parques industriales de El Salto y Zapopan?', a: 'Sí. Atendemos toda la zona metropolitana de Guadalajara, incluidos El Salto, Zapopan y Tlajomulco.' },
      { q: '¿Pueden enviar la información para nuestro proveedor registrado?', a: 'Sí. Pídelo por WhatsApp o en el formulario con la opción de cotización formal y te enviamos lo que necesite tu área de compras.' },
    ],
    ctaFinal: 'Cotiza la oficina para tu proyecto',
  },
];
