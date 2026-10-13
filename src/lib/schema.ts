/** Generadores de JSON-LD a partir de los mismos datos que pinta la página. */
import { SITE, fullAddress } from './site';
import type { Modelo } from '../data/modelos';
import type { Faq } from '../data/faqs';

const ORG_ID = `${SITE.url}/#organizacion`;
const WEBSITE_ID = `${SITE.url}/#sitio`;

export function organization() {
  return {
    '@type': ['LocalBusiness', 'Organization'],
    '@id': ORG_ID,
    name: SITE.name,
    alternateName: 'Vexon',
    slogan: SITE.tagline,
    description: SITE.description,
    url: SITE.url,
    logo: `${SITE.url}/brand/vexon-logo-1024.png`,
    image: `${SITE.url}/brand/vexon-logo-1024.png`,
    telephone: SITE.phoneE164,
    email: SITE.email,
    priceRange: 'Cotización por WhatsApp',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    hasMap: SITE.mapsUrl,
    openingHoursSpecification: SITE.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.schema,
      opens: h.open,
      closes: h.close,
    })),
    areaServed: SITE.areaServed.map((name) => ({ '@type': 'City', name })),
    sameAs: [SITE.instagram],
    parentOrganization: { '@type': 'Organization', name: SITE.parent.name, url: SITE.parent.url },
    knowsAbout: ['oficinas móviles', 'renta de oficinas móviles', 'oficinas de obra', 'casetas de obra', 'oficinas temporales'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phoneE164,
      contactType: 'sales',
      areaServed: 'MX',
      availableLanguage: 'es',
    },
  };
}

export function website() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    inLanguage: SITE.locale,
    publisher: { '@id': ORG_ID },
  };
}

export function webPage(opts: { url: string; title: string; description: string; type?: string }) {
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': `${opts.url}#pagina`,
    url: opts.url,
    name: opts.title,
    description: opts.description,
    inLanguage: SITE.locale,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
  };
}

export function breadcrumbs(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  };
}

export function faqPage(faqs: Faq[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function productModelo(m: Modelo, url: string, imageUrl: string) {
  const prop = (name: string, value: string | number, unitCode?: string) => ({
    '@type': 'PropertyValue',
    name,
    value,
    ...(unitCode ? { unitCode } : {}),
  });
  return {
    '@type': 'Product',
    '@id': `${url}#producto`,
    name: `Oficina móvil ${m.code}`,
    sku: m.code,
    model: m.code,
    category: 'Oficinas móviles',
    description: m.respuesta,
    image: imageUrl,
    brand: { '@type': 'Brand', name: SITE.name },
    manufacturer: { '@type': 'Organization', name: SITE.parent.name, url: SITE.parent.url },
    url,
    width: { '@type': 'QuantitativeValue', value: m.ancho, unitCode: 'MTR' },
    depth: { '@type': 'QuantitativeValue', value: m.largo, unitCode: 'MTR' },
    height: { '@type': 'QuantitativeValue', value: m.alto, unitCode: 'MTR' },
    weight: { '@type': 'QuantitativeValue', value: m.pesoRemolqueKg, unitCode: 'KGM' },
    additionalProperty: [
      prop('Tipo', m.tipo),
      prop('Capacidad sugerida (personas)', m.personas),
      prop('Mesas de trabajo', m.mesas),
      prop('Área privada', m.areaPrivada ? 'Sí' : 'No'),
      prop('Minisplits', m.minisplits),
      prop('Ventanas', m.ventanas),
      prop('Lámparas LED', m.lamparasLed),
      prop('Contactos 127 V', 'Sí'),
      prop('Sanitario', 'No'),
      prop('Cocineta', 'No'),
      prop('Ejes', m.ejes),
      prop('Torres de nivelación', m.torresNivelacion),
      prop('Capacidad de carga', m.capacidadCargaKg, 'KGM'),
    ],
    offers: {
      '@type': 'Offer',
      businessFunction: 'http://purl.org/goodrelations/v1#LeaseOut',
      availability: 'https://schema.org/InStock',
      areaServed: SITE.areaServed.map((name) => ({ '@type': 'City', name })),
      seller: { '@id': ORG_ID },
      url,
    },
  };
}

export function rentalService(url: string) {
  return {
    '@type': 'Service',
    '@id': `${url}#servicio`,
    name: 'Renta de oficinas móviles en Guadalajara',
    serviceType: 'Renta de oficinas móviles',
    provider: { '@id': ORG_ID },
    areaServed: SITE.areaServed.map((name) => ({ '@type': 'City', name })),
    description: `Renta de oficinas móviles equipadas para obra, remodelación e industria en ${SITE.areaServed.join(', ')}. Dirección: ${fullAddress}.`,
    url,
  };
}

export function itemList(urls: { name: string; url: string }[]) {
  return {
    '@type': 'ItemList',
    itemListElement: urls.map((u, i) => ({ '@type': 'ListItem', position: i + 1, name: u.name, url: u.url })),
  };
}

export function blogPosting(p: { url: string; title: string; description: string; date: Date; updated?: Date; author: string; image: string }) {
  return {
    '@type': 'BlogPosting',
    '@id': `${p.url}#articulo`,
    headline: p.title,
    description: p.description,
    datePublished: p.date.toISOString(),
    dateModified: (p.updated ?? p.date).toISOString(),
    author: { '@type': 'Person', name: p.author, worksFor: { '@id': ORG_ID } },
    publisher: { '@id': ORG_ID },
    image: p.image,
    mainEntityOfPage: p.url,
    inLanguage: SITE.locale,
  };
}

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
