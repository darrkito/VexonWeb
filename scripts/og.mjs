// Genera las imágenes Open Graph (1200×630) de cada página con Playwright.
// Uso: node scripts/og.mjs   (opcional: CHROMIUM_PATH=/ruta/a/chromium)
// Se versionan en public/og para no depender de nada en el build de Vercel.
import { chromium } from '@playwright/test';
import { readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const b64 = (p) => readFileSync(root + p).toString('base64');
const font = (f) => `url(data:font/woff2;base64,${b64('src/assets/fonts/' + f)}) format('woff2')`;
const logo = readFileSync(root + 'src/assets/brand/vexon-logo.svg', 'utf8');
const img = (slug) => `data:image/png;base64,${b64(`src/assets/modelos/${slug}.png`)}`;

const M = [
  ['vx-3m', 'VX-3M', 3, 3, 2, false], ['vx-4m', 'VX-4M', 4, 5, 3, false], ['vx-6m', 'VX-6M', 6, 7, 4, false], ['vx-6p', 'VX-6P', 6, 7, 3, true],
  ['vx-8m', 'VX-8M', 8, 7, 4, false], ['vx-8p', 'VX-8P', 8, 6, 3, true], ['vx-10m', 'VX-10M', 10, 9, 5, false], ['vx-10p', 'VX-10P', 10, 8, 4, true],
];
const pages = [
  { file: 'default', kicker: 'Renta de oficinas móviles', title: 'Tu oficina en obra, lista desde el primer día', sub: 'Guadalajara, Zapopan y la zona metropolitana', model: 'vx-10m' },
  { file: 'oficinas-moviles', kicker: 'Línea VX', title: '8 oficinas móviles de 3 a 10 metros', sub: 'Oficina abierta o con privado, de 3 a 9 personas', model: 'vx-8m' },
  { file: 'nosotros', kicker: 'Vexon by Capelton', title: 'Espacios que se mueven contigo', sub: 'Movilidad, funcionalidad y durabilidad', model: 'vx-6m' },
  { file: 'contacto', kicker: 'Cotiza por WhatsApp', title: '33 3324 4946', sub: 'Lunes a viernes 8:00–18:00 · Sábado 9:00–14:00', model: 'vx-4m' },
  { file: 'blog', kicker: 'Blog', title: 'Guías de oficinas móviles para obra', sub: 'Tamaños, requisitos y comparativas', model: 'vx-6p' },
  { file: 'soluciones-constructoras', kicker: 'Para constructoras', title: 'Tu caseta de obra, lista desde el primer día', sub: 'Oficinas móviles de 3 a 10 m', model: 'vx-6m' },
  { file: 'soluciones-remodelaciones', kicker: 'Para remodelaciones', title: 'Sigue atendiendo mientras remodelas', sub: 'Oficinas temporales desde 3 m', model: 'vx-3m' },
  { file: 'soluciones-naves-e-industria', kicker: 'Para naves e industria', title: 'Oficinas para tus proyectos en planta', sub: 'Privado para el supervisor y espacio para contratistas', model: 'vx-10p' },
  ...M.map(([slug, code, l, p, mesas, priv]) => ({ file: slug, code, title: `Oficina móvil en renta`, sub: `${l} × 2.5 m · ${p} personas · ${mesas} mesas${priv ? ' · con privado' : ''}`, model: slug })),
];

// Artículos del blog
import { readdirSync } from 'node:fs';
for (const f of readdirSync(root + 'src/content/blog').filter((x) => x.endsWith('.mdx'))) {
  const src = readFileSync(root + 'src/content/blog/' + f, 'utf8');
  const title = src.match(/^title:\s*'(.+)'/m)?.[1] ?? '';
  const model = src.match(/^model:\s*'(.+)'/m)?.[1] ?? 'vx-6m';
  const cat = src.match(/^category:\s*'(.+)'/m)?.[1] ?? 'Blog';
  pages.push({ file: 'blog-' + f.replace('.mdx', ''), kicker: `Blog · ${cat}`, title, sub: 'vexonmexico.com.mx/blog', model, small: true });
}

const html = (p) => `<!doctype html><html><head><style>
@font-face{font-family:K;font-weight:400;src:${font('kanit-latin-400-normal.woff2')}}
@font-face{font-family:K;font-weight:500;src:${font('kanit-latin-500-normal.woff2')}}
@font-face{font-family:K;font-weight:700;src:${font('kanit-latin-700-normal.woff2')}}
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;font-family:K;background:#fff;position:relative;overflow:hidden;color:#0f0f10}
.hatch{position:absolute;right:-60px;top:70px;bottom:120px;width:640px;border-radius:48px 0 0 48px;background-image:repeating-linear-gradient(-58deg,transparent 0 18px,rgba(241,72,43,.55) 18px 20px)}
.logo{position:absolute;left:64px;top:56px;width:250px}.logo svg{width:100%;height:auto;display:block}
.txt{position:absolute;left:64px;top:170px;width:${p.code ? 520 : 500}px}
.kicker{font-size:28px;font-weight:500;color:#474d54}
.code{font-size:150px;font-weight:700;line-height:.95;letter-spacing:-3px}
.code:before{content:'';display:block;width:120px;height:12px;background:#f1482b;margin-bottom:14px}
h1{font-size:${p.small ? 44 : 56}px;font-weight:700;line-height:1.04;margin-top:14px;letter-spacing:-1px}
.sub{font-size:28px;color:#474d54;margin-top:18px}
.img{position:absolute;right:16px;top:130px;width:560px;height:380px;object-fit:contain}
.bar{position:absolute;left:0;right:0;bottom:0;height:84px;background:#0f0f10;color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 64px;font-size:28px}
.bar b{color:#f1482b;font-weight:500}
</style></head><body>
<div class="hatch"></div><div class="logo">${logo}</div>
<div class="txt">${p.code ? `<div class="code">${p.code}</div><h1 style="font-size:46px">${p.title}</h1>` : `<div class="kicker">${p.kicker}</div><h1>${p.title}</h1>`}<div class="sub">${p.sub}</div></div>
<img class="img" src="${img(p.model)}">
<div class="bar"><span>vexonmexico.com.mx</span><span><b>WhatsApp</b> 33 3324 4946</span></div>
</body></html>`;

mkdirSync(root + 'public/og', { recursive: true });
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const p of pages) {
  await page.setContent(html(p), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${root}public/og/${p.file}.jpg`, type: 'jpeg', quality: 85 });
}
await browser.close();
console.log(`OG: ${pages.length} imágenes en public/og`);
