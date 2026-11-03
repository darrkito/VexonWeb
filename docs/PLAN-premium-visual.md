# PLAN: Vexon se siente premium (inspirado en capeltonmexico.com, sin copiarlo)

Autor: Claude (cerebro). Ejecutor: Codex (no piensa, ejecuta). Fecha: 2026-11-03.
Evidencia: capturas en `docs/audit-capelton/` (Capelton, 10 de ellas). Vexon actual: https://vexonmexico.com.mx.

## 0. Reglas para Codex (leer primero, aplican a TODAS las fases)

PROHIBIDO:
1. Agregar dependencias (npm/pnpm). Todo con CSS, SVG inline y Astro. Cero librerías de animación.
2. Cambiar el catálogo: `src/data/modelos.ts`, `personas.ts`, `faqs.ts`, `soluciones.ts` NO se tocan (ni valores, ni nombres, ni orden).
3. Cambiar textos existentes (H1, H2, párrafos, labels de botones), `data-wa`, `data-block`, `data-call`, `data-model`, `id`, `aria-*`, schema JSON-LD, meta, canonical, rutas. Solo se AGREGA markup decorativo y clases. Excepción: los textos nuevos que este plan da literalmente (eyebrows).
4. Usar verde Capelton (#00b140 o similar), el logo de Capelton, sus fotos, sus clientes, sus textos o su tipografía de pesos extremos. Vexon es naranja `#f1482b` / negro `#0f0f10` / arena `#f4f3f1`. El verde `--color-vx-capelton` solo existe en el puntito "respaldo Capelton" que ya está.
5. Inventar contenido: nada de logos de clientes, testimonios, números o proyectos. Solo se usan los 2 fotos de `src/assets/fotos/` y los renders de `src/assets/modelos/`.
6. Animaciones que muevan layout. Solo `transform`, `opacity`, `stroke-dashoffset`, `background-position`. Toda animación va dentro de `@media (prefers-reduced-motion: no-preference)`.
7. Texto con contraste < 4.5:1. Sobre fondo claro el naranja de TEXTO es `--color-vx-orange-text` (#d33a1f); `--color-vx-orange` solo para rellenos, líneas y sobre fondo negro.
8. Cualquier elemento decorativo nuevo lleva `aria-hidden="true"`, `pointer-events-none`, y no entra al orden de tab.

OBLIGATORIO:
- Tailwind v4 (`@theme` en `src/styles/global.css`). Clases nuevas reutilizables van en `@layer components` de ese archivo.
- Imágenes con `astro:assets` (`Picture`/`Image`), AVIF+WebP, `loading="lazy"` salvo la LCP del hero (no se toca).
- Al terminar CADA fase pegar la salida de: `pnpm check` , `pnpm build` y `git status --short`. Si algo falla, reportar `BLOCKED:` con la razón; no "arreglar" tests ni relajar umbrales.
- Presupuesto Lighthouse (`lighthouserc.json`): performance ≥ 0.95, a11y ≥ 0.95, best-practices ≥ 0.95, SEO = 1, CLS ≤ 0.05. No se puede empeorar. Los fondos nuevos no deben pedir imágenes extra sobre el fold salvo el SVG inline.
- Trabajo directo en `main`, sin ramas ni PRs. Un commit por fase, push inmediato después del commit. Mensaje: `style(premium): fase N - <título>`.
- Móvil primero: probar 390×844 y 1440×900.

## 1. Audit: qué hace bien Capelton (y cómo lo traducimos a Vexon)

| # | Idea en Capelton (captura) | Por qué se ve premium | Traducción Vexon (NO copia) |
|---|---|---|---|
| A | Hero con mapa de México a 10% de opacidad, puntos con etiquetas, rutas punteadas que salen de la fábrica, halo verde radial arriba, producto flotando (01) | El fondo no es color plano: cuenta una historia (llegamos a todo el país) y da profundidad | Mapa ESQUEMÁTICO de la ZMG (no geográfico): anillos concéntricos, rutas punteadas animadas desde "Base Zapopan" a Guadalajara, Tlaquepaque, Tonalá, Tlajomulco, El Salto; halo naranja radial; cuadrícula tipo plano técnico; render flota 6 s |
| B | Eyebrow en mayúsculas espaciadas sobre cada H2, píldora con puntitos en el hero | Jerarquía editorial, se lee "ficha técnica" | Eyebrow mono naranja en cada sección (textos exactos abajo) |
| C | Orbes/gradientes de color de fondo en cada sección (bgs de 350 px con degradado 10%) | Rompe el blanco plano sin ensuciar | Glows naranja 8–14% + blueprint grid enmascarado en secciones arena; secciones negras con hatch + glow |
| D | Visor de exterior con pestañas tipo píldora y 4 pines pulsantes; tarjetas debajo con barra superior en la activa (02) | Interactivo, tangible | Los 14 pines numerados de Vexon ya existen: ponerlos en un "escenario" (tarjeta con degradado, sombra de suelo, pines con anillo pulsante) |
| E | Comparador: barra oscura tipo panel de control con icono, etiqueta mono "8 MODELOS" y luz de estado (03) | Parece un instrumento, no un `<select>` | Cabecera oscura del Comparador igual de "instrumento"; filas con etiqueta centrada en mayúsculas mono y valor en Kanit |
| F | Tarjetas de categoría: icono en círculo blanco, tag, render fantasma a 8% abajo a la derecha, botón flecha circular (04) | Profundidad por capas | Tarjetas de personas/soluciones y de cobertura con render fantasma del modelo sugerido + flecha circular |
| G | Tarjeta de modelo: panel blanco para el render, bandeja gris con mini-tiles MEDIDAS/AFORO, acordeón "Ver equipamiento", botón CTA (05) | Información escaneable en 2 s | ModelCard con bandeja de mini-tiles y `<details>` "Ver equipamiento" con lista del modelo (datos ya existentes) |
| H | Fotos de proyecto con overlay degradado oscuro y pin de ubicación (06) | Prueba social visual | Vexon NO tiene proyectos propios: usar las 2 fotos reales como bandas translúcidas de fondo (ver fases 3 y 5), sin inventar proyectos |
| I | Tarjetas lado a lado con borde de acento y chip (07) | Decisión clara | Aplicar el borde/halo a la columna "Oficina móvil Vexon" de la tabla comparativa |
| J | Footer negro con líneas verticales que "respiran", viga de luz que baja y nodos pulsantes (08) | Cierra la página con vida | Footer negro con 4 líneas verticales, vigas y nodos en NARANJA alineados a las 4 columnas |
| K | Botón flotante de WhatsApp grande con halo | Siempre a la mano | FAB solo desktop (≥1024 px) con halo; en móvil ya existe BottomBar |
| L | Ficha de modelo: sub-barra sticky con código+medidas+categoría, tiles de specs con icono, CTAs apilados (10) | Contexto siempre visible | Sub-barra existente de la página de modelo gana código + medidas + chip; specs como tiles con icono |
| M | Header con chips-píldora (teléfono, ventas/rentas) y glass | Pulido | Teléfono en píldora con borde, header glass con hairline degradado al hacer scroll |

Cosas de Capelton que NO traemos (decisión mía): marquee de logos de clientes (no tenemos), videos/reels (no tenemos), selector de idioma (no aplica), tipografía de 10 px (ilegible), etiquetas del mapa encima del texto del hero (en su captura 01 "Monterrey" se cruza con el subtítulo: error a evitar), errores de consola (7 en su home).

Lo que ya hace bien Vexon y se conserva: hatch diagonal naranja de las fichas, pines numerados, `.model-code` con barra naranja, selector de 2 toques, cotizador en hoja inferior, BottomBar móvil, view-transitions, reveal por scroll, a11y AA.

## 2. Fase 1 - Fundaciones visuales (`src/styles/global.css`)

Archivo único. Agregar en `@theme`:
```
--font-mono: ui-monospace, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;
--color-vx-paper: #faf9f7;
--shadow-float: 0 2px 0 rgb(15 15 16 / 0.04), 0 24px 60px -28px rgb(15 15 16 / 0.35);
--shadow-glass: 0 1px 0 rgb(255 255 255 / 0.8) inset, 0 18px 48px -24px rgb(15 15 16 / 0.28);
```
Agregar en `@layer components` estas clases EXACTAS (nombres y valores):

1. `.eyebrow` — `inline-flex items-center gap-2 font-mono uppercase text-[0.75rem] font-medium text-vx-orange-text`; `letter-spacing:0.16em`; `::before` = punto 6×6 px redondo `var(--color-vx-orange)`. `.eyebrow-dark` — mismo pero color `var(--color-vx-orange)`.
2. `.bg-grid` — `position:absolute; inset:0; pointer-events:none;` `background-image: linear-gradient(rgb(15 15 16 / .045) 1px, transparent 1px), linear-gradient(90deg, rgb(15 15 16 / .045) 1px, transparent 1px); background-size: 48px 48px;` `mask-image: radial-gradient(70% 60% at 50% 40%, #000 30%, transparent 100%)` (+`-webkit-mask-image`). `.bg-grid-dark` — mismas reglas con líneas `rgb(255 255 255 / .05)`.
3. `.bg-glow` — `position:absolute; pointer-events:none;` `background: radial-gradient(closest-side, rgb(241 72 43 / .14), transparent)`; tamaño lo da cada uso con utilidades `h-/w-`. Siempre con `blur-2xl` no; NO usar `filter` (costoso). Solo el radial-gradient.
4. `.photo-fade` — para `<img>` o `<Picture>` decorativa: `position:absolute; inset:0; width:100%; height:100%; object-fit:cover; pointer-events:none;` `mask-image: linear-gradient(to bottom, transparent 0%, #000 28%, #000 62%, transparent 100%)` (+webkit). Opacidad la pone cada uso (`opacity-20` a `opacity-35`).
5. `.glass` — `background: rgb(255 255 255 / .72); backdrop-filter: blur(14px) saturate(1.3); box-shadow: var(--shadow-glass); border-radius: 1.25rem;` y `@supports not (backdrop-filter: blur(1px)) { background: #fff }`.
6. `.tray` — bandeja de mini-tiles: `background: var(--color-vx-sand); border-radius: .9rem; padding: .5rem; display:grid; gap:.5rem;`. `.tile` — `background:#fff; border-radius:.65rem; padding:.55rem .7rem; box-shadow: inset 0 0 0 1px rgb(15 15 16 / .06)`. `.tile-label` — `font-mono uppercase text-[.62rem] tracking-[.12em] text-vx-slate`. `.tile-value` — `font-display font-medium text-[1.05rem] text-vx-black`.
7. `.arrow-btn` — círculo 2.5rem blanco con `box-shadow: var(--shadow-lift)` que contiene `Icon name="arrow-up-right"` (si el ícono no existe en `src/lib/icons.ts`, agregarlo con path de flecha diagonal simple). En `:hover` del padre con clase `group`: `transform: translate(2px,-2px)`; fondo `vx-orange`.
8. `.ghost-render` — render fantasma: `position:absolute; right:-1rem; bottom:-.5rem; width:55%; opacity:.09; filter:grayscale(1); pointer-events:none;`. En fondo negro `opacity:.12` con `filter:grayscale(1) invert(1)`.
9. Animaciones (todas dentro de `@media (prefers-reduced-motion: no-preference)`):
   - `.float { animation: float 6s ease-in-out infinite }` `@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }`. IMPORTANTE: el hero ya usa `.arrive` en la misma imagen: aplicar `.float` a un `<div>` contenedor, no a la `<Picture>`.
   - `.route { stroke-dasharray: 3 7; animation: route 28s linear infinite }` `@keyframes route { to { stroke-dashoffset: -200 } }`.
   - `.node-pulse::after` — mismo patrón que `.pulse::after` existente pero 2.8 s, color naranja.
   - `.beam { animation: beam 5s ease-in-out infinite }` `@keyframes beam { 0%{transform:translateY(-120%);opacity:0} 15%{opacity:1} 85%{opacity:1} 100%{transform:translateY(520%);opacity:0} }`.
   - `.breathe { animation: breathe 5s ease-in-out infinite }` `@keyframes breathe { 0%,100%{opacity:.25} 50%{opacity:.6} }`.
   - `.halo::before` — anillo `inset:-10px`, `border-radius:inherit`, `background: rgb(241 72 43 / .18)`, `animation: halo 3s ease-out infinite` `@keyframes halo { from{transform:scale(.9);opacity:.9} to{transform:scale(1.5);opacity:0} }`.
10. Header: `.site-header.is-scrolled` además de `border-color` agrega `box-shadow: 0 10px 30px -22px rgb(15 15 16 / .45)`. Nueva `.site-header::after` hairline de 1 px con `linear-gradient(90deg, transparent, rgb(241 72 43 / .55), transparent)` `opacity:0` → `1` cuando `.is-scrolled` (transición 0.3 s).

Aceptación fase 1: `pnpm build` pasa; ninguna página cambia visualmente salvo el header al hacer scroll.

## 3. Fase 2 - Hero con fondo vivo (`src/pages/index.astro` líneas 54-95 + nuevo `src/components/ServiceMap.astro`)

### 3.1 Componente nuevo `ServiceMap.astro`
Props: `variant: 'hero' | 'panel'` (default `panel`). Devuelve un `<svg>` inline `viewBox="0 0 1200 700"`, `class="h-full w-full"`, `aria-hidden="true"` en `hero`; en `panel` `role="img"` y `aria-label="Esquema de cobertura: base en Zapopan y municipios atendidos de la zona metropolitana de Guadalajara (no está a escala)"`.
Contenido, en este orden:
1. Anillos concéntricos centrados en Guadalajara (520,300): radios 90, 190, 300, 420; `fill="none"` `stroke="#0f0f10"` `stroke-opacity=".10"` `stroke-dasharray="2 8"`.
2. Ejes finos: línea horizontal y vertical que pasan por (520,300), `stroke-opacity=".06"`.
3. Rutas desde Base (300,130) con `class="route"`, `fill="none"`, `stroke="#f1482b"`, `stroke-opacity=".55"`, `stroke-width="1.5"`, curvas cuadráticas (Q con punto de control desplazado 60 px hacia arriba del punto medio) a: Zapopan (360,210), Guadalajara (520,300), Tlaquepaque (620,370), Tonalá (760,330), Tlajomulco (470,520), El Salto (700,560).
4. Nodos: círculo r=5 `#f1482b` + círculo r=12 `fill="#f1482b" fill-opacity=".12"`; el de Base r=7 negro `#0f0f10` con anillo pulsante (clase `node-pulse` no aplica en SVG: usar `<circle>` extra con `<animate attributeName="r" values="9;22" dur="2.8s" repeatCount="indefinite"/>` y `<animate attributeName="opacity" values=".5;0" dur="2.8s" repeatCount="indefinite"/>`; solo si no hay reduced-motion: envolver en `<style>` con `@media (prefers-reduced-motion: reduce){ .pulse-ring{display:none} }`).
5. Etiquetas (`font-family: var(--font-mono)`, `font-size: 13`, `letter-spacing: .08em`, `fill="#474d54"`, `text-transform` no soportado en SVG: escribir en mayúsculas): `BASE ZAPOPAN`, `ZAPOPAN`, `GUADALAJARA`, `TLAQUEPAQUE`, `TONALÁ`, `TLAJOMULCO`, `EL SALTO`. Textos de municipios deben salir de `SITE.areaServed` (mapear nombre → coordenada; "Tlajomulco de Zúñiga" se muestra "TLAJOMULCO"). Etiqueta 14 px a la derecha de cada nodo (a la izquierda si x>700).
6. Nota en la esquina inferior izquierda solo en variant `panel`: `ESQUEMA NO A ESCALA` mono 11 px.
En variant `hero` NO se dibujan etiquetas de municipios que caigan en x<420 (zona del texto).

### 3.2 Cambios en la sección hero
Dentro de `<section ... aria-labelledby="hero-title">` y ANTES del `<div class="wrap ...">` insertar capas absolutas (todas `aria-hidden="true" pointer-events-none`):
1. `<div class="bg-grid" style="mask-image:...">` usando `.bg-grid` (fase 1).
2. Halo superior: `<div class="bg-glow left-1/2 top-[-8rem] h-[34rem] w-[60rem] -translate-x-1/2"></div>`.
3. Mapa: `<div class="absolute inset-y-0 right-0 hidden w-[62%] opacity-70 lg:block" style="mask-image: linear-gradient(to right, transparent 0%, #000 38%); -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 38%)"><ServiceMap variant="hero" /></div>`. En móvil: mismo `ServiceMap` en `absolute inset-x-0 top-0 h-72 opacity-40 lg:hidden` con máscara vertical (`to bottom, #000 40%, transparent`).
4. Foto: `oficina-movil-obra-portada.jpg` como `<Picture class="photo-fade opacity-[.10]">` (`formats={['avif']}`, `widths={[720,1100]}`, `sizes="100vw"`, `alt=""`, `loading="lazy"`, `decoding="async"`) en la mitad derecha (`absolute inset-y-0 right-0 hidden w-1/2 lg:block`), debajo del mapa en z-order. Solo desktop. Ojo: la foto tiene el producto; a 10% sirve de textura, no debe competir con el render del hero.

Cambios sobre el contenido existente (solo clases/envoltorios):
- Eyebrow: la píldora existente "Renta en Guadalajara…" se queda igual pero pasa a `font-mono text-[.78rem] uppercase tracking-[.1em]` y borde `ring-1 ring-vx-line` en vez de `bg-vx-sand` (se mantiene el texto exacto).
- Envolver `<Picture>` del render en `<div class="float relative">`. Debajo del render agregar `<div class="absolute inset-x-[10%] bottom-[4%] h-6" style="background: radial-gradient(closest-side, rgb(15 15 16 / .22), transparent)">` (sombra de suelo; `aria-hidden`).
- El hatch existente se mantiene.
- `section` pasa de `bg-white` a `bg-vx-paper` y agrega `isolate`; las capas absolutas llevan `-z-10`.
- Chips `Solo renta / Clima incluido / Respaldo` → agregar `shadow-lift` y `backdrop-blur`.

Aceptación: LCP sigue siendo el render del hero (verificar con `pnpm lhci` o Playwright: `largest-contentful-paint` element = img del render); CLS 0; a 1440 el mapa no cruza el H1 ni el párrafo (verificar visualmente: ninguna etiqueta dentro de x<45% del ancho del hero); en 390 px no hay scroll horizontal.

## 4. Fase 3 - Secciones del home con profundidad (`src/pages/index.astro`)

Para CADA sección listada: agregar eyebrow (`<p class="eyebrow mb-3">TEXTO</p>`) ANTES del `<h2>` y la capa de fondo indicada. Secciones `bg-white` pasan a `bg-vx-paper`. Todas llevan `relative isolate overflow-hidden` y capas `-z-10`.

| Sección (id/aria) | Eyebrow (texto exacto) | Fondo nuevo |
|---|---|---|
| `#encuentra` (selector, arena) | `SELECTOR DE MODELO` | `.bg-grid` + glow naranja arriba-derecha 36 rem. El card del selector: clase `.glass` y `shadow-float`. El resultado (`.rec`) gana esquina con `.hatch` 5 rem × 5 rem arriba-derecha con `opacity-60` y `rounded-tr-2xl` |
| trust strip (`aria-label="Por qué confiar en Vexon"`) | (sin eyebrow) | separadores verticales de 1 px entre los 4 items (`divide-x divide-vx-line` en lg); icono dentro de círculo 2.5 rem `bg-vx-orange-soft`; fondo `bg-white` con sombra `inset 0 -1px` |
| `#dolor` (`dolor-title`) | `OBRA SIN ESPERAS` | La foto existente `fotoObra` queda; agregar detrás un marco `.hatch` desplazado (`absolute -bottom-4 -left-4 h-full w-full rounded-2xl opacity-60`) para que la foto "salga" del hatch; chip flotante `.glass` sobre la foto abajo-izquierda con el texto `VX-024` en `font-mono` (es el número que aparece en la unidad de la foto) |
| `#modelos` (arena) | `LÍNEA VX · 8 MODELOS` | `.bg-grid` + 2 glows (izq-arriba y der-abajo) |
| `incluye-title` (Hotspots) | `EQUIPAMIENTO DE SERIE` | glow naranja centrado detrás del render; ver fase 4 para el escenario |
| `cmp-title` (Comparador, arena) | `COMPARADOR TÉCNICO` | `.bg-grid` |
| `como-title` (Steps) | `PROCESO DE RENTA` | `.bg-grid` muy tenue (`opacity-60`) |
| `quien-title` (negra) | `CASOS DE USO` (clase `eyebrow-dark`) | `.hatch-dark` actual + `.bg-grid-dark` + glow naranja abajo-izquierda; foto `oficinas-moviles-obra-atardecer.jpg` como `.photo-fade opacity-[.14]` cubriendo toda la sección con overlay `bg-gradient-to-b from-vx-black via-vx-black/70 to-vx-black` (la foto se ve apenas, atardecer cálido) |
| `porque-title` (tabla) | `COMPARATIVO` | glow suave; la columna "Oficina móvil Vexon" (th y td) gana `ring-2 ring-vx-orange/70` en el th, `shadow-float` en la tabla y una barra superior naranja de 4 px en el th |
| `cob-title` (cobertura) | `COBERTURA ZMG` | Reemplazar el `<svg>` inline por `<ServiceMap variant="panel" />` dentro del mismo contenedor `aspect-[4/3]`, que ahora es `.glass` con `.bg-grid` detrás. Los chips de municipios se mantienen |
| `#cotizar` (CTA final, negra) | (sin eyebrow nuevo) | Foto `oficina-movil-obra-portada.jpg` como `.photo-fade` `opacity-[.22]` a la derecha (`absolute inset-y-0 right-0 w-full lg:w-3/5`) con overlay izquierda→derecha `from-vx-black via-vx-black/80 to-transparent`; glow naranja `h-[28rem] w-[28rem]` abajo-derecha; se mantienen hatch-dark y el form |
| `blog-title` | `BLOG` | `.bg-grid` tenue. Cada card de artículo: barra naranja superior de 3 px (`.model-code::before` no; usar `border-t-[3px] border-vx-orange`), `.arrow-btn` abajo-derecha, hover `-translate-y-1` + `shadow-float` |

Steps (`src/components/Steps.astro`): reemplazar el grid de `gap-px bg-vx-line` por tarjetas separadas (`gap-4`, cada `li` `rounded-2xl bg-white shadow-lift p-6`). En lg agregar una línea conectora horizontal detrás: `<div class="absolute left-[12%] right-[12%] top-[3.1rem] hidden h-px lg:block" style="background: repeating-linear-gradient(90deg, rgb(241 72 43 / .6) 0 6px, transparent 6px 14px)"></div>` y el número pasa a ser un círculo 3rem `bg-vx-orange text-vx-black font-display` encima de la línea (`relative z-10`). El `<ol>` pasa a `relative`. Mismo contenido.

Aceptación: Ninguna sección se ve plana; las fotos nunca tapan texto (contraste del texto sobre foto ≥ 4.5:1: verificar con axe en `/`); `pnpm test` pasa los tests existentes.

## 5. Fase 4 - Tarjetas y componentes

### 5.1 `src/components/ModelCard.astro`
Mantener todo el contenido y los CTAs. Cambios:
- Contenedor `.card` + `shadow-lift`, hover `-translate-y-1`, `transition-transform duration-200`.
- Panel del render: fondo `linear-gradient(180deg, #fff, #f4f3f1)` + el hatch actual + sombra de suelo (radial 22% negro, 1.2 rem de alto bajo el render).
- Chip "Oficina" / "Oficina + privado": prefijar `font-mono uppercase tracking-[.08em] text-[.68rem]`.
- Los 3 mini-datos (largo / personas / mesas) pasan a `.tray` de 3 columnas con `.tile`, `.tile-label` (largo, personas, mesas) y `.tile-value`. Los valores salen de los mismos campos `m.largo`, `m.personas`, `m.mesas`.
- NUEVO `<details class="group mt-3">` debajo de la bandeja: `<summary>` con icono `sliders`/`list` + texto `Ver equipamiento` + chevron que rota en `group-open:`. Dentro, lista de equipamiento construida con los campos ya existentes del modelo (ventanas, lámparas LED, minisplits, contactos 127 V, torres de nivelación, ejes, área privada si aplica, cocineta si aplica). Prohibido inventar items: solo los booleanos/números que existan en el tipo `Modelo`. Cada item `<li>` con `Icon name="check"` naranja.
- El `<details>` NO debe disparar tracking ni mover los CTAs: queda ENTRE la bandeja y los botones.

### 5.2 Hotspots como escenario (`src/components/Hotspots.astro`)
Solo CSS/markup alrededor; JS y datos no se tocan. El contenedor del render (`div.relative` de la izquierda) pasa a `.glass` con padding `p-4 sm:p-8`, `rounded-3xl`, fondo degradado `linear-gradient(180deg,#fff,#f4f3f1)`; mantener `.hatch` interno; agregar sombra de suelo bajo el render; los pines existentes ganan `.pulse::after` (ya existe en global.css) cuando están en estado activo. La lista de la derecha: el item activo gana barra izquierda naranja de 3 px y fondo `bg-vx-orange-soft/60`.

### 5.3 Comparador (`src/components/Comparador.astro`)
- Encabezado: nueva barra oscura antes de los selects: `<div class="rounded-2xl bg-vx-black text-white p-4 flex items-center gap-4 shadow-float" style="background: linear-gradient(180deg,#252529,#121214)">` con icono `compare`/`grid` en cuadro 3 rem (`bg-vx-orange/15 ring-1 ring-white/10`, punto verde-NO: punto naranja `halo`), texto `COMPARADOR` mono 11 px gris y debajo `Modelos Vexon` Kanit 20 px, y a la derecha chip mono `8 MODELOS` (número = `MODELOS.length`). Es solo decorativa; los `<select>` existentes siguen debajo y funcionales.
- Filas de la tabla de specs: etiqueta centrada `font-mono uppercase text-[.7rem] tracking-[.14em] text-vx-slate`, valor `font-display text-xl`, filas alternas `bg-vx-paper`/`bg-white`, valor que "gana" (mayor personas/largo) en `text-vx-orange-text`. Si la lógica de "gana" no existe, NO la inventes: solo estilo.
- Contenedor externo `rounded-[2rem] bg-vx-sand/70 p-3 sm:p-6` con `shadow-float`.

### 5.4 Tarjetas de personas (sección negra, `index.astro` ~líneas 199-211) y soluciones (`src/pages/soluciones/index` si lista tarjetas)
Cada `li`: agregar `relative overflow-hidden group`, `.ghost-render` con el render del primer modelo de `p.modelos` (buscar por código con `MODELOS`), `.arrow-btn` arriba-derecha enlazado al mismo `p.href` (decorativo: `aria-hidden`, el link real "Ver solución" ya existe), icono en círculo 2.75 rem `bg-white/10 ring-1 ring-white/15`. Hover: `ring-vx-orange/50` y `-translate-y-1`.

### 5.5 Tabla comparativa (`porque-title`)
Ver fase 3. Además header sticky NO.

Aceptación: las 8 tarjetas del catálogo siguen mostrando exactamente los mismos datos que `modelos.ts`; test `selector recomienda el modelo correcto` y `cotizador de 3 pasos` siguen pasando.

## 6. Fase 5 - Header, footer, FAB, página de modelo

### 6.1 Header (`src/components/Header.astro`)
- Teléfono: pasa de texto a píldora `rounded-full ring-1 ring-vx-line bg-white/80 px-3.5 py-2`, icono en círculo `bg-vx-orange-soft`. Sigue `hidden xl:inline-flex`.
- Nav activo: además del fondo arena agregar punto naranja de 5 px debajo (`after:` centrado, `-bottom-0.5`).
- Header `bg-white/85 backdrop-blur-xl`.

### 6.2 Footer (`src/components/Footer.astro`)
- Footer `relative overflow-hidden`. Capa de fondo `aria-hidden`: `.bg-grid-dark` + `.hatch-dark opacity-30` con máscara radial + glow naranja abajo-derecha.
- 4 líneas verticales absolutas (`left` en 6%, 34%, 58%, 82%): cada una `div.absolute.top-0.bottom-0.w-px.breathe` con `background: linear-gradient(to bottom, transparent, rgb(241 72 43 / .5), transparent)` y duraciones `4.8s,5.5s,4.2s,5s` (inline `animation-duration`). Dentro, una viga `.beam` (`w-[3px] h-28 rounded-full`, gradiente naranja a transparente, `left:-1px`, duración 4.4–5.8 s distinta por línea) y un nodo `h-2 w-2 rounded-full bg-vx-orange` a una altura distinta por línea (`top` 28%, 62%, 40%, 74%). Todo `pointer-events-none`, contenido real con `relative z-10`.
- Texto del footer no cambia. Logo blanco se queda.

### 6.3 FAB de WhatsApp solo desktop (nuevo `src/components/WaFab.astro`, montado en `BaseLayout.astro` después de `<BottomBar>`)
`<a>` con `href={buildWhatsAppLink({ model })}` (recibir prop `model` igual que BottomBar), `target="_blank" rel="noopener"`, `data-wa data-block="fab" data-model={model}`, `aria-label="Cotizar por WhatsApp"`. Clases: `fixed bottom-6 right-6 z-40 hidden lg:grid h-14 w-14 place-items-center rounded-full bg-vx-orange text-vx-black shadow-float halo relative`, icono `whatsapp` 28 px. Aparece solo después de 600 px de scroll: `opacity-0 translate-y-3 pointer-events-none` → `.is-visible` con un `<script>` de 6 líneas en el mismo componente (IntersectionObserver no; usar scroll listener passive como el header). Con `prefers-reduced-motion` aparece sin transición. NO tapar el footer: `lg:bottom-6` siempre; el footer tiene padding suficiente.
El texto tracking de `data-block="fab"` es nuevo: no requiere cambios de analítica.

### 6.4 Página de modelo (`src/pages/oficinas-moviles/[slug].astro`)
- Sub-barra sticky existente (línea ~137, `nav aria-label="Secciones del modelo"`): agregar a la izquierda, antes de los anchors y visible desde `sm`: `<span class="model-code text-xl">{m.code}</span>`, `<span class="font-mono text-xs text-vx-slate">{m.largo} × {m.ancho} × {m.alto} m</span>` y `<span class="chip">{m.tipo}</span>`. En móvil solo el código. Los anchors siguen.
- Hero de la ficha: fondo `bg-vx-paper` + glow + `.bg-grid`; render con sombra de suelo; `.float` NO (la ficha debe sentirse estable).
- `#specs`: las celdas `.spec-cell` pasan a tiles con icono (`Icon`: regla para largo, peso, carga, personas, mesas, torres, ejes, etc.; si no existe un icono adecuado en `icons.ts`, usar `check`). Mantener `.spec-label`/`.spec-value` y TODOS los textos que el test `modelo: toda la ficha está en la página` busca ('6 m', '2.5 m', '3.38 m', '1,000 kg', '1,500 kg', 'Torres de nivelación', 'Lámparas LED', 'Minisplits', 'Área privada').
- `#plano`: el plano SVG dentro de `.glass` con `.bg-grid` detrás (se ve como plano arquitectónico).
- CTA final y ficha: mismo tratamiento de fase 3 (foto translúcida + glow).

Aceptación fase 5: el FAB no aparece en móvil ni antes de 600 px; `Tab` recorre header → contenido → footer sin quedarse en elementos decorativos; ninguna página tiene scroll horizontal a 390 px.

## 7. Fase 6 - Páginas internas y QA final

Aplicar el mismo patrón (eyebrow + `bg-vx-paper` + `.bg-grid`/glow + foto translúcida cuando aplique) SOLO a: `oficinas-moviles/index.astro`, `soluciones/[slug].astro`, `nosotros.astro`, `contacto.astro`, `blog/index.astro`. No tocar plantillas de artículos de blog ni `src/content/`. Eyebrows: Modelos `CATÁLOGO VX`; Soluciones `SOLUCIONES`; Nosotros `VEXON BY CAPELTON`; Contacto `CONTACTO`; Blog `GUÍAS PARA TU OBRA`. Fotos: `nosotros` y `soluciones/[slug]` pueden usar `oficina-movil-obra-portada.jpg` (hero lateral a 10-14%); no repetir la misma foto en 2 secciones de la misma página.

QA que Codex debe correr y pegar:
1. `pnpm check`
2. `pnpm build`
3. `pnpm test` (Playwright + axe AA; no se puede saltar ni editar tests; si un test falla por cambio de markup legítimo, reportar `BLOCKED:` con el test y la causa, no editarlo).
4. Screenshots con Playwright (script temporal en `/tmp`, NO commitear): `/`, `/oficinas-moviles`, `/oficinas-moviles/vx-6p` a 1440×900 y 390×844 → guardar en `docs/audit-vexon-after/`.

## 8. Orden de ejecución y entregables

Una fase = un ticket = un commit = un push a `main`. Orden: 1 → 2 → 3 → 4 → 5 → 6. Claude revisa cada fase (diff + build + tests + capturas contra Capelton/antes) y da OK o lista de cambios. Máximo 3 rondas por fase.

Si hay que recortar, se recorta en este orden: fase 6, luego 5.4, luego 5.3, luego 6.4 y la tabla comparativa de la fase 3. Lo que NO se recorta: fase 1, fase 2, 5.1 (ModelCard), 5.2 (Hotspots), 6.2 (footer) y 6.3 (FAB).

## 9. Pendientes que NO son de Codex (dueño)
- Si Vexon tiene fotos propias de unidades entregadas en obra (con permiso del cliente), traerlas: habilita la sección "Obras entregadas" estilo overlay (idea H de la tabla) sin inventar nada.
- Si hay logos de clientes reales con autorización, se agrega marquee (idea no traída por ahora).
- Videos/reels propios: sección "Vexon en acción".
