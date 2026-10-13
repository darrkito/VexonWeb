/**
 * Datos de negocio en un solo lugar (NAP). Cualquier cambio de teléfono, dirección
 * u horario se hace aquí y se refleja en todo el sitio, el schema y los llms.txt.
 *
 * Nota: por ahora se usan el teléfono, la dirección y el horario de la ficha de Google de Luvory.
 * Antes de crear el perfil de Google Business de Vexon conviene una línea propia.
 */
export const SITE = {
  name: 'Vexon by Capelton',
  shortName: 'Vexon',
  url: 'https://vexonmexico.com.mx',
  locale: 'es-MX',
  tagline: 'Espacios que se mueven contigo',
  description:
    'Renta de oficinas móviles para obra y remodelación en Guadalajara y Zapopan. 8 modelos de 3 a 10 metros, para 3 a 9 personas, con clima y mesas de trabajo.',
  phoneDisplay: '33 3324 4946',
  phoneE164: '+523333244946',
  whatsappNumber: '523333244946',
  email: 'a.martinez@vexonmexico.com.mx',
  instagram: 'https://www.instagram.com/vexonmexico/',
  instagramHandle: '@vexonmexico',
  parent: { name: 'Capelton', url: 'https://capeltonmexico.com' },
  address: {
    street: '6 de Enero Ote. 63',
    neighborhood: 'Nuevo México',
    city: 'Zapopan',
    region: 'Jalisco',
    regionCode: 'JAL',
    postalCode: '45138',
    country: 'MX',
  },
  geo: { lat: 20.7579628, lng: -103.4335266 },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=6+de+Enero+Ote.+63,+Nuevo+M%C3%A9xico,+45138+Zapopan,+Jal.',
  hours: [
    { days: 'Lunes a viernes', open: '08:00', close: '18:00', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
    { days: 'Sábado', open: '09:00', close: '14:00', schema: ['Saturday'] },
  ],
  areaServed: ['Guadalajara', 'Zapopan', 'Tlaquepaque', 'Tonalá', 'Tlajomulco de Zúñiga', 'El Salto'],
} as const;

export const fullAddress = `${SITE.address.street}, ${SITE.address.neighborhood}, ${SITE.address.postalCode} ${SITE.address.city}, Jal.`;

export const NAV = [
  { href: '/oficinas-moviles', label: 'Modelos' },
  { href: '/soluciones/constructoras', label: 'Soluciones' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
] as const;

export const absoluteUrl = (path = '/') => new URL(path, SITE.url).toString().replace(/\/$/, path === '/' ? '/' : '');
