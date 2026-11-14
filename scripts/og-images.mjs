// Genera las imágenes para compartir (og:image, 1200 × 630) en apps/portfolio/public/assets/og/.
// Herramienta local opcional: requiere macOS con Google Chrome y `sips`. No corre en el build ni en CI.
// Uso: node scripts/og-images.mjs
import { spawn, execFileSync } from 'node:child_process';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { root } from './build.mjs';

const chromePath = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const assets = path.join(root, 'apps/portfolio/public/assets');
const out = path.join(assets, 'og');
const work = path.join(tmpdir(), `og-${process.pid}`);
const { cases } = JSON.parse(await readFile(path.join(root, 'apps/portfolio/content/cases.json'), 'utf8'));
const asset = file => pathToFileURL(path.join(root, 'apps/portfolio/public', file)).href;
const esc = value => String(value).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const star = '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M12 2v20M3.34 7l17.32 10M3.34 17 20.66 7"/></svg>';

const page = ({ image, title, label, foot }) => `<!doctype html><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}html,body{width:1200px;height:630px;overflow:hidden}
body{background:#0d0d0d;color:#fff;font-family:Arial,Helvetica,sans-serif;display:grid;grid-template-columns:560px 1fr;gap:0}
.copy{padding:56px 48px 52px 64px;display:flex;flex-direction:column;justify-content:space-between}
.mark{font-weight:700;font-size:30px;letter-spacing:-1.8px}.mark svg{font-size:14px;vertical-align:top;margin-left:4px;color:#f3a48f}
.label{font-size:15px;font-weight:700;letter-spacing:2.4px;text-transform:uppercase;color:#f3a48f;margin-bottom:22px;line-height:1.5}
h1{font-size:${title.length > 22 ? 62 : 76}px;line-height:.95;letter-spacing:-.05em;font-weight:700;text-wrap:balance}
h1 em{font-family:Georgia,serif;font-weight:400;color:#f3a48f;letter-spacing:-.04em}
.foot{font-size:17px;color:#ffffffb3;margin-top:26px}
.media{position:relative;margin:28px 28px 28px 0;border-radius:22px;overflow:hidden;background:#222}
.media img{width:100%;height:100%;object-fit:cover;display:block}
</style><div class="copy"><div class="mark">kevin garzón${star}</div><div><p class="label">${label}</p><h1>${title}</h1><p class="foot">${foot}</p></div></div><div class="media"><img src="${image}"></div>`;

const jobs = [
  { name: 'inicio', image: asset('assets/kevin-retrato.jpg'), label: 'Diseñador y director de arte', title: 'Tu siguiente idea merece <em>verse bien.</em>', foot: 'Kevin Garzón · Bogotá, Colombia · kevingarzon.com' },
  ...cases.map(item => ({ name: path.basename(item.og, '.jpg'), image: asset(item.image), label: esc(item.category), title: esc(item.title), foot: 'Caso de estudio · kevingarzon.com' }))
];

await mkdir(out, { recursive: true });
await mkdir(work, { recursive: true });
const port = 9500 + Math.floor(Math.random() * 400);
const chrome = spawn(chromePath, ['--headless=new', `--remote-debugging-port=${port}`, '--allow-file-access-from-files', `--user-data-dir=${path.join(work, 'profile')}`, 'about:blank'], { stdio: 'ignore' });
try {
  let socketUrl;
  for (let i = 0; i < 50 && !socketUrl; i++) {
    try { socketUrl = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(t => t.type === 'page').webSocketDebuggerUrl; }
    catch { await new Promise(r => setTimeout(r, 200)); }
  }
  const socket = new WebSocket(socketUrl);
  await new Promise(r => { socket.onopen = r; });
  let id = 0; const pending = new Map();
  socket.onmessage = event => { const message = JSON.parse(event.data); pending.get(message.id)?.(message); pending.delete(message.id); };
  const send = (method, params = {}) => new Promise(r => { const n = ++id; pending.set(n, r); socket.send(JSON.stringify({ id: n, method, params })); });
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
  for (const job of jobs) {
    const html = path.join(work, `${job.name}.html`);
    await writeFile(html, page(job));
    await send('Page.navigate', { url: pathToFileURL(html).href });
    await new Promise(r => setTimeout(r, 900));
    const shot = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } });
    const png = path.join(work, `${job.name}.png`);
    await writeFile(png, Buffer.from(shot.result.data, 'base64'));
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '82', png, '--out', path.join(out, `${job.name}.jpg`)], { stdio: 'ignore' });
    console.log(`og/${job.name}.jpg`);
  }
} finally {
  const closed = new Promise(r => chrome.once('exit', r));
  chrome.kill();
  await closed;
  await rm(work, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
process.exit(0);
