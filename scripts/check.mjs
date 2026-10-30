import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import path from 'node:path';
import { build, root } from './build.mjs';
await build();
const dist = path.join(root,'dist');
const pages = (await readdir(dist)).filter(file => file.endsWith('.html'));
const idMap = new Map();
for (const file of pages) {
  const html = await readFile(path.join(dist,file),'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(x => x[1]);
  idMap.set(file,new Set(ids));
  assert.equal(new Set(ids).size,ids.length,`${file}: IDs duplicados`);
  assert.equal((html.match(/<h1(?:\s[^>]*)?>/g)||[]).length,1,`${file}: h1 único`);
  assert(html.includes('lang="es"'));
  assert(html.includes('name="robots" content="noindex, nofollow"'));
  assert(!/{{/.test(html),`${file}: plantilla pendiente`);
  assert(!/Prodesa|prodesa-|\bdownload(?:=|\s|>)/i.test(html),`${file}: contenido retirado`);
  assert(!/Grecia|30\s*millones|4[.,]29/.test(html),`${file}: plan privado`);
  for (const image of html.matchAll(/<img\b[^>]*>/g)) assert(/alt="[^"]*"/.test(image[0]));
  const social = html.match(/<div class="social-links">([\s\S]*?)<\/div>/)?.[1] || '';
  assert.equal((social.match(/class="social-icon"/g)||[]).length,5,`${file}: iconos de contacto`);
}
for (const file of pages) {
  const html=await readFile(path.join(dist,file),'utf8');
  for(const m of html.matchAll(/(?:src|href|poster)="([^"]+)"/g)) {
    if (/^(?:https?:|data:|mailto:)/.test(m[1])) continue;
    const [resourceQ,hash]=m[1].split('#');
    const resource=resourceQ.split('?')[0];
    const target=resource || file;
    await access(path.join(dist,target));
    if(hash && idMap.has(target)) assert(idMap.get(target).has(hash),`${file}: enlace roto ${m[1]}`);
  }
}
assert.equal(pages.length,9,'Inicio y ocho proyectos');
assert(!(await readdir(path.join(dist,'assets'))).some(file=>file.startsWith('prodesa-')));
const css=await readFile(path.join(dist,'style.css'),'utf8');
assert(!/@import/.test(css),'No cargar fuentes externas');
console.log(`OK: ${pages.length} páginas, enlaces entre proyectos, recursos, privacidad, iconos y contenido retirado.`);

for (const asset of ['hero-3d.js','vendor/three/three.module.js','vendor/three/three.core.js','vendor/three/LICENSE']) await access(path.join(dist,asset));
