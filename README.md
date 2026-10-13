# Vexon by Capelton · Sitio web

Sitio de **renta de oficinas móviles en Guadalajara** para Vexon by Capelton. Está pensado como landing de venta: cada sección termina en un botón de WhatsApp con el mensaje ya escrito. Está optimizado para SEO local, para que lo citen los asistentes de IA (GEO) y para sacar más de 95 en PageSpeed móvil.

## Resultados medidos (Lighthouse móvil, build de producción con compresión)

| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
| --- | --- | --- | --- | --- |
| Inicio | 99 | 100 | 100 | 100 |
| Catálogo `/oficinas-moviles` | 98 | 100 | 100 | 100 |
| Modelo `/oficinas-moviles/vx-6m` | 97 | 100 | 100 | 100 |
| Soluciones `/soluciones/constructoras` | 99 | 100 | 100 | 100 |
| Contacto | 99 | 100 | 100 | 100 |
| Artículo de blog | 99 | 100 | 100 | 100 |

En escritorio la home saca 100 en las cuatro categorías. CLS es 0 en todas las páginas medidas.

## Stack

- **Astro 7** con salida estática; solo `/api/cotizacion` corre en servidor. Usa el adaptador de Vercel en producción y el de Node en local.
- **Tailwind CSS 4** con los tokens de marca medidos del PDF de las fichas: naranja `#F1482B`, negro `#0F0F10`, pizarra `#474D54`, arena `#F4F3F1`.
- **Kanit** (títulos, como en las fichas) y **Roboto** (texto, como en el catálogo). Ambas se sirven desde el propio sitio (licencia OFL) y tienen fuentes de respaldo con métricas ajustadas para que el layout no salte.
- **Sin framework de JavaScript.** Las interacciones (selector, comparador, cotizador, hotspots y galería) son scripts pequeños. En la home suman unos 12 KB de JS sin comprimir (4 KB comprimido).
- **MDX** para el blog, con colecciones de contenido validadas con Zod.
- **Playwright + axe** para las pruebas y **Lighthouse CI** para cuidar el rendimiento.

## Requisitos

- Node 22.12 o superior (`.nvmrc`)
- pnpm 10 (`corepack enable`)

## Comandos

```bash
pnpm install          # dependencias
pnpm dev              # desarrollo en http://localhost:4321
pnpm build            # build de producción en dist/
pnpm start            # sirve el build (con el formulario funcionando) en http://localhost:4321
pnpm preview:cdn      # sirve dist/client con brotli, como el CDN, en http://127.0.0.1:4322
pnpm check            # TypeScript y Astro
pnpm test             # pruebas Playwright: SEO, CTAs, accesibilidad, selector, cotizador, formulario
pnpm lhci             # Lighthouse CI: falla si una página baja de 95 en móvil
pnpm og               # regenera las imágenes Open Graph de public/og
pnpm indexnow         # avisa a Bing/IndexNow de todas las URLs (correr después de cada deploy)
```

Si ya tienes un Chromium instalado, puedes usarlo para las pruebas con `CHROMIUM_PATH=/ruta/chromium pnpm test`.

## Estructura

```
src/
  data/modelos.ts       ← FUENTE ÚNICA de las 8 fichas técnicas (specs, textos, hotspots)
  data/faqs.ts          ← preguntas frecuentes por página (texto visible y schema)
  data/soluciones.ts    ← páginas para constructoras, remodelaciones e industria
  data/personas.ts      ← user personas (sección "Para quién" y mensajes de WhatsApp)
  content/blog/*.mdx    ← artículos del blog
  lib/site.ts           ← NAP: teléfono, dirección, horario, redes (cámbialo aquí y se actualiza todo)
  lib/whatsapp.ts       ← mensajes prellenados de WhatsApp
  lib/schema.ts         ← JSON-LD (LocalBusiness, Product, FAQPage, BlogPosting…)
  lib/llms.ts           ← llms.txt, llms-full.txt y versiones .md de cada modelo
  components/           ← Header, barra inferior tipo app, cotizador, selector, comparador, hotspots…
  pages/                ← rutas
  pages/api/cotizacion.ts ← backend del formulario
public/
  fichas/               ← PDFs oficiales con metadatos corregidos
  brand/                ← logo SVG/PNG (color y blanco), isotipo e íconos PWA
  og/                   ← imágenes Open Graph por página
  sw.js, manifest.webmanifest
scripts/                ← og.mjs, indexnow.mjs, preview-cdn.mjs
tests/                  ← pruebas Playwright
```

## Cómo editar contenido

- **Cambiar un dato de un modelo:** edita `src/data/modelos.ts`. Se actualizan solos la página del modelo, el catálogo, el comparador, el selector, el schema, el `llms.txt` y los `.md`.
- **Nuevo artículo:** crea `src/content/blog/mi-articulo.mdx` con el frontmatter de los demás (título de 70 caracteres o menos, descripción de 160 o menos, categoría, modelo relacionado y FAQs). Para el CTA a mitad del texto usa `<CtaInline />`. Después corre `pnpm og` para generar su imagen social.
- **Cambiar teléfono, dirección u horario:** edita `src/lib/site.ts`.

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Landing de venta con 12 CTAs de WhatsApp, selector, comparador, hotspots y FAQ |
| `/oficinas-moviles` | Catálogo de los 8 modelos, filtros, tabla completa y comparador |
| `/oficinas-moviles/vx-3m` … `/vx-10p` | Ficha completa en HTML; el PDF y "Compartir" quedan al final |
| `/oficinas-moviles/vx-*.md` | Versión Markdown de cada modelo para asistentes de IA |
| `/soluciones/constructoras`, `/remodelaciones`, `/naves-e-industria` | Páginas por persona |
| `/nosotros`, `/contacto`, `/gracias` (noindex), `/aviso-de-privacidad`, `/404` | Institucionales |
| `/blog`, `/blog/[slug]` | Blog (8 artículos iniciales) |
| `/robots.txt`, `/sitemap-index.xml`, `/llms.txt`, `/llms-full.txt`, `/rss.xml` | Archivos para buscadores e IA |

## Backend del formulario

`POST /api/cotizacion` valida los datos, frena spam con un campo oculto y, opcionalmente, con Cloudflare Turnstile, y limita los envíos por IP. Después:

1. Envía el lead por correo con **Resend** a `LEADS_TO_EMAIL`, con un botón para responder por WhatsApp, y manda un acuse de recibo al cliente si dejó su correo.
2. Manda el lead en JSON a `LEADS_WEBHOOK_URL`, si está configurado (por ejemplo, Google Sheets vía Apps Script o un CRM).
3. Sin variables configuradas, escribe el lead en la consola del servidor. Así funciona en local.

El formulario también funciona sin JavaScript (POST normal que redirige a `/gracias`). Las variables están en `.env.example`.

## Publicar en GitHub

```bash
git remote add origin git@github.com:<organizacion>/vexon-web.git
git push -u origin main
```

El workflow `.github/workflows/ci.yml` corre tipos, build, pruebas y Lighthouse CI en cada PR.

## Deploy en Vercel

1. Importa el repositorio en Vercel. Detecta Astro solo, y `astro.config.mjs` usa el adaptador de Vercel cuando existe la variable `VERCEL`.
2. Carga las variables de `.env.example` en Settings → Environment Variables.
3. Conecta el dominio `vexonmexico.com.mx` y redirige `www` al dominio raíz.
4. En Resend, verifica el dominio (registros DNS) para que los correos lleguen.
5. Después del primer deploy:
   - Search Console y Bing Webmaster Tools: verifica el dominio y envía `https://vexonmexico.com.mx/sitemap-index.xml`.
   - Corre `pnpm indexnow`.
   - Valida el schema en Rich Results Test.

`vercel.json` agrega headers de seguridad, caché inmutable para `/_astro/` y redirecciones cortas (`/modelos`, `/cotizar`).

## SEO local y GEO

- Un solo H1 por página, títulos y descripciones únicos, canonical, Open Graph con imagen por página y meta geo de Zapopan.
- JSON-LD en todas las páginas: `LocalBusiness` + `Organization`, con `parentOrganization` Capelton, horario, `areaServed` y geo. Además, `Product` con todas las specs y `Offer` de renta para cada modelo, y `FAQPage`, `BreadcrumbList`, `BlogPosting` e `ItemList`.
- `robots.txt` abierto a los buscadores de IA: OAI-SearchBot, GPTBot, Claude-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended y Bingbot, entre otros.
- `llms.txt`, `llms-full.txt` y una versión `.md` de cada modelo.
- Cada página abre con una respuesta directa con cifras, y los datos van en tablas HTML, nunca solo en el PDF.
- IndexNow para que Bing, que alimenta a ChatGPT Search y Copilot, vea los cambios en horas.

## Pendientes por confirmar con Vexon

Los textos marcados con `POR CONFIRMAR` en `src/data/faqs.ts` están redactados sin prometer cifras. Hay que validarlos:

- [ ] Plazo mínimo de renta y qué incluye exactamente (traslado, instalación, recolección, mantenimiento).
- [ ] Tiempo de entrega y cobertura real (¿solo ZMG o todo Jalisco?).
- [ ] Facturación y cotización formal.
- [ ] **Teléfono propio para Vexon** antes de crear su perfil de Google Business. Hoy el sitio usa el número y la dirección de Luvory; si dos perfiles comparten teléfono, Google puede fusionarlos o suspenderlos.
- [ ] Confirmar el dominio `vexonmexico.com.mx` y el acceso al DNS.
- [ ] Renders en alta resolución, fotos reales de entregas e interiores. Hoy se usan los renders y fotos del catálogo 2026.
- [ ] Permiso para usar logos de clientes de Capelton.
- [ ] Autor real del blog (nombre y foto) para E-E-A-T.
- [ ] Revisión legal del aviso de privacidad (razón social y RFC).
- [ ] Google Trends y Keyword Planner para fijar el término principal.
- [ ] CMS visual para el blog (Keystatic o Decap) si el equipo prefiere no editar MDX.
