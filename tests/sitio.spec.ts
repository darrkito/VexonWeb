import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const paginas = [
  '/', '/oficinas-moviles', '/oficinas-moviles/vx-3m', '/oficinas-moviles/vx-10p',
  '/soluciones/constructoras', '/soluciones/remodelaciones', '/soluciones/naves-e-industria',
  '/nosotros', '/contacto', '/blog', '/blog/guia-oficinas-moviles-obra-guadalajara', '/aviso-de-privacidad',
];

for (const path of paginas) {
  test(`SEO y CTA básicos: ${path}`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    expect((await page.title()).length).toBeLessThanOrEqual(75);
    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(desc && desc.length > 50 && desc.length <= 170).toBeTruthy();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https:\/\/vexonmexico\.com\.mx/);
    const ld = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(() => JSON.parse(ld!)).not.toThrow();
    // Siempre hay al menos un CTA de WhatsApp con mensaje prellenado
    expect(await page.locator('a[data-wa][href^="https://wa.me/523333244946?text="]').count()).toBeGreaterThan(0);
  });

  test(`accesibilidad (axe, WCAG AA): ${path}`, async ({ page }) => {
    await page.goto(path);
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    expect(r.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });
}

test('modelo: toda la ficha está en la página y el PDF es la última opción', async ({ page }) => {
  await page.goto('/oficinas-moviles/vx-6p');
  for (const dato of ['6 m', '2.5 m', '3.38 m', '1,000 kg', '1,500 kg', 'Torres de nivelación', 'Lámparas LED', 'Minisplits', 'Área privada']) {
    await expect(page.locator('#specs')).toContainText(dato);
  }
  const html = await page.content();
  const primerWa = html.indexOf('data-wa');
  const pdf = html.indexOf('data-ficha');
  expect(primerWa).toBeGreaterThan(-1);
  expect(pdf).toBeGreaterThan(html.indexOf('id="preguntas"'));
  expect(pdf).toBeGreaterThan(primerWa);
});

test('selector recomienda el modelo correcto', async ({ page }) => {
  await page.goto('/');
  const sel = page.locator('[data-selector="home"]');
  await sel.locator('text=8 a 9').click();
  await expect(sel.locator('.rec:not([hidden])')).toContainText('VX-10M');
  await sel.locator('input[type=checkbox]').check();
  await expect(sel.locator('.rec:not([hidden])')).toContainText('VX-10P');
  await sel.locator('text=1 a 3').click();
  await expect(sel.locator('.rec:not([hidden])')).toContainText('VX-6P');
});

test('cotizador de 3 pasos arma el mensaje de WhatsApp', async ({ page }) => {
  await page.goto('/oficinas-moviles');
  await page.locator('[data-open-cotizador]').first().click();
  const dlg = page.locator('#cotizador');
  await expect(dlg).toBeVisible();
  await dlg.locator('text=4–5').click();
  const href = await dlg.locator('[data-cot-wa]').getAttribute('href');
  expect(decodeURIComponent(href!)).toContain('VX-4M');
});

test('formulario de cotización envía y lleva a /gracias', async ({ page }) => {
  await page.goto('/contacto');
  const f = page.locator('#formulario');
  await f.locator('[name=nombre]').fill('Prueba Automatizada');
  await f.locator('[name=telefono]').fill('33 1234 5678');
  await f.locator('[name=modelo]').selectOption('VX-6M');
  await f.locator('[name=municipio]').selectOption('Zapopan');
  await f.locator('button[type=submit]').click();
  await expect(page).toHaveURL(/\/gracias$/);
});

test('archivos para buscadores e IA', async ({ request }) => {
  for (const p of ['/robots.txt', '/llms.txt', '/llms-full.txt', '/sitemap-index.xml', '/rss.xml', '/oficinas-moviles/vx-6m.md', '/manifest.webmanifest']) {
    const r = await request.get(p);
    expect(r.status(), p).toBe(200);
  }
  expect(await (await request.get('/robots.txt')).text()).toContain('OAI-SearchBot');
});
