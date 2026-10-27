import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import path from 'node:path';
import { build, root } from './build.mjs';
await build();
let pending = Promise.resolve();
for (const folder of ['apps/portfolio', 'libs/ui']) {
  watch(path.join(root, folder), { recursive: true }, () => {
    pending = pending.then(build).catch(error => console.error(error.message));
  });
}
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.webp':'image/webp'};
const dist = path.join(root, 'dist');
const server = http.createServer(async (req,res) => {
  try {
    await pending;
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(dist, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(dist + path.sep) || !(await stat(file)).isFile()) { res.writeHead(404).end('No encontrado'); return; }
    res.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-cache'});
    res.end(await readFile(file));
  } catch { res.writeHead(404).end('No encontrado'); }
});
const port = Number(process.env.PORT || 8766);
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
server.on('error', error => { console.error(error.message); process.exit(1); });
