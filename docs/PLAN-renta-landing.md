# PLAN: página de intención "renta" + municipios faltantes (Vexon vs Capelton)

Origen: comparación con capeltonmexico.com (2026-11-11). Capelton no tiene blog, ni páginas de Guadalajara, ni llms.txt; Vexon sí. Vexon no tiene una página que responda directo a "renta de oficina móvil en Guadalajara". Sin precios (decisión de negocio, el Offer queda sin price).

Modelo de trabajo: Claude planea y verifica, Codex escribe (tickets en /tmp/claude-1000/tickets).

## Fase 1 (ticket 1): `/renta-oficina-movil-guadalajara`
Página estática nueva con: H1, respuesta corta, qué incluye (solo lo ya publicado en FAQ_HOME), 4 pasos (`Steps`), modelos (ModelCard x3), zonas atendidas, FAQ propia (`FAQ_RENTA`), CTA WhatsApp. Schema: `rentalService`, `breadcrumbs`, `faqPage`. Enlaces desde Footer, llms.txt, home (CTA secundario). Test Playwright añadido a `paginas`.
Reglas: ningún precio, plazo mínimo, depósito ni flete inventado; todo "se confirma en la cotización por WhatsApp".

## Fase 2 (ticket 2, después de verificar la 1): Tlaquepaque y Tonalá
Solo si cada artículo aporta algo propio. Requiere datos reales de zonas industriales/obras de cada municipio (pendiente del dueño o de fuentes verificables). No clonar el artículo de Tlajomulco (riesgo de canibalización).

## Fase 3: medir
Search Console: consultas "renta oficina móvil guadalajara/zapopan/tlaquepaque/tonalá"; revisar a las 3 y 6 semanas.

## Abiertos para el dueño
Plazo mínimo, flete/instalación incluidos o aparte, depósito/contrato, precio "desde" por modelo. Mientras no se confirmen, la página los remite a WhatsApp.
