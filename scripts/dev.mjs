import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { watch, createReadStream } from 'node:fs';
import path from 'node:path';
import { build, root } from './build.mjs';
await build();
let pending = Promise.resolve();
for (const folder of ['apps/portfolio', 'libs/ui']) {
  watch(path.join(root, folder), { recursive: true }, () => {
    pending = pending.then(build).catch(error => console.error(error.message));
  });
}
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.webp':'image/webp','.png':'image/png','.pdf':'application/pdf','.mp4':'video/mp4'};
const dist = path.join(root, 'dist');
const server = http.createServer(async (req,res) => {
  try {
    await pending;
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(dist, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(dist + path.sep)) { res.writeHead(404).end('No encontrado'); return; }
    const info = await stat(file);
    if (!info.isFile()) { res.writeHead(404).end('No encontrado'); return; }
    const headers = {'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-cache','Accept-Ranges':'bytes'};
    let start=0, end=info.size-1, status=200;
    if(req.headers.range){
      const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if(!match || (!match[1] && !match[2])) {res.writeHead(416,{'Content-Range':`bytes */${info.size}`}).end();return;}
      start=match[1]?Number(match[1]):Math.max(0,info.size-Number(match[2]));
      end=match[1]&&match[2]?Math.min(Number(match[2]),info.size-1):info.size-1;
      if(start>end || start>=info.size){res.writeHead(416,{'Content-Range':`bytes */${info.size}`}).end();return;}
      status=206;headers['Content-Range']=`bytes ${start}-${end}/${info.size}`;
    }
    headers['Content-Length']=Math.max(0,end-start+1);
    res.writeHead(status,headers);
    if(req.method==='HEAD'){res.end();return;}
    const stream=createReadStream(file,{start,end});
    stream.on('error',()=>res.destroy());res.on('close',()=>stream.destroy());stream.pipe(res);
  } catch { res.writeHead(404).end('No encontrado'); }
});
const port = Number(process.env.PORT || 8766);
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
server.on('error', error => { console.error(error.message); process.exit(1); });
