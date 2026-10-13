// Notifica a IndexNow (Bing, Yandex, etc.) todas las URLs del sitemap. Úsalo después de cada deploy:
//   node scripts/indexnow.mjs
// Bing alimenta a ChatGPT Search y Copilot, así que los cambios se ven en horas.
import { readFileSync } from 'node:fs';
const SITE = 'https://vexonmexico.com.mx';
const key = readFileSync(new URL('../.indexnow-key', import.meta.url), 'utf8').trim();
const xml = await fetch(`${SITE}/sitemap-0.xml`).then((r) => r.text());
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(SITE).host, key, keyLocation: `${SITE}/${key}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} (${urlList.length} URLs)`);
