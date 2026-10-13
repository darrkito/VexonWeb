// Sirve dist/client como lo haría el CDN de Vercel (brotli + caché inmutable) para medir
// rendimiento realista con Lighthouse en local o en CI. No incluye el endpoint /api.
//   node scripts/preview-cdn.mjs   →  http://127.0.0.1:4322
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/client', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.md': 'text/markdown; charset=utf-8', '.pdf': 'application/pdf', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' };
const port = Number(process.env.PORT ?? 4322);

async function resolve(url) {
  const path = decodeURIComponent(url.split('?')[0]);
  for (const c of [path, join(path, 'index.html'), `${path}.html`]) {
    try { const p = join(root, c); if ((await stat(p)).isFile()) return p; } catch {}
  }
  return null;
}

http.createServer(async (req, res) => {
  const file = await resolve(req.url);
  const target = file ?? join(root, '404.html');
  const body = await readFile(target);
  const type = types[extname(target)] ?? 'application/octet-stream';
  const headers = { 'content-type': type, 'cache-control': req.url.startsWith('/_astro/') ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate' };
  const compressible = /text|javascript|json|xml|svg|manifest/.test(type);
  if (compressible && /\bbr\b/.test(req.headers['accept-encoding'] ?? '')) {
    headers['content-encoding'] = 'br';
    res.writeHead(file ? 200 : 404, headers);
    res.end(zlib.brotliCompressSync(body));
  } else {
    res.writeHead(file ? 200 : 404, headers);
    res.end(body);
  }
}).listen(port, '127.0.0.1', () => console.log(`CDN preview listening on http://127.0.0.1:${port}`));
