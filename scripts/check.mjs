import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import path from 'node:path';
import { build, root } from './build.mjs';
await build();
const dist = path.join(root,'dist');
const pages = (await readdir(dist)).filter(file => file.endsWith('.html') && file !== '404.html');
const { cases } = JSON.parse(await readFile(path.join(root, 'apps/portfolio/content/cases.json'), 'utf8'));
const idMap = new Map();
for (const file of pages) {
  const html = await readFile(path.join(dist,file),'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(x => x[1]);
  idMap.set(file,new Set(ids));
  assert.equal(new Set(ids).size,ids.length,`${file}: IDs duplicados`);
  assert.equal((html.match(/<h1(?:\s[^>]*)?>/g)||[]).length,1,`${file}: h1 único`);
  assert(html.includes('lang="es"'));
  assert(html.includes('name="robots" content="index, follow, max-image-preview:large"'));
  assert(!/noindex|nofollow/.test(html.match(/<head>[\s\S]*?<\/head>/)[0]), `${file}: indexación bloqueada`);
  const canonical = `https://kevingarzon.com/${file === 'index.html' ? '' : file}`;
  assert(html.includes(`<link rel="canonical" href="${canonical}">`), `${file}: canonical`);
  assert(html.includes(`<meta property="og:url" content="${canonical}">`));
  const ogImage = html.match(/<meta property="og:image" content="https:\/\/kevingarzon\.com\/([^"]+)">/)?.[1];
  assert(ogImage, `${file}: og:image`);
  await access(path.join(dist, ogImage));
  assert(html.includes('name="twitter:card" content="summary_large_image"'), `${file}: twitter:card`);
  if (file !== 'index.html') {
    assert(cases.some(item => item.file === file), `${file}: falta en content/cases.json`);
    assert(/class="av-next-card" href="proyecto-[^"]+"/.test(html) && /class="av-next-prev" href="proyecto-[^"]+"/.test(html), `${file}: navegación anterior/siguiente`);
  }
  for (const image of html.matchAll(/<img\b[^>]*>/g)) assert(/\bsrc="[^"]+"/.test(image[0]), `${file}: imagen sin src ${image[0].slice(0, 80)}`);
  assert((await readFile(path.join(dist, 'sitemap.xml'), 'utf8')).includes(`<loc>${canonical}</loc>`));
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
assert.equal(cases.length, 8, 'content/cases.json: ocho casos');
const notFound = await readFile(path.join(dist, '404.html'), 'utf8');
assert(notFound.includes('name="robots" content="noindex"'), '404: noindex');
for (const m of notFound.matchAll(/(?:src|href)="([^"]+)"/g)) if (!/^(?:https?:|#)/.test(m[1])) { assert(m[1].startsWith('/'), `404: ruta relativa ${m[1]}`); await access(path.join(dist, m[1].split(/[?#]/)[0] === '/' ? 'index.html' : m[1].split(/[?#]/)[0])); }
assert(!(await readFile(path.join(dist, 'sitemap.xml'), 'utf8')).includes('404'), '404 fuera del sitemap');
assert(!(await readdir(path.join(dist,'assets'))).some(file=>file.startsWith('prodesa-')));
const css=await readFile(path.join(dist,'style.css'),'utf8');
assert(!/@import/.test(css),'No cargar fuentes externas');
console.log(`OK: ${pages.length} páginas, enlaces entre proyectos, recursos, privacidad, iconos y contenido retirado.`);


const robots = await readFile(path.join(dist, 'robots.txt'), 'utf8');
assert(robots.includes('Allow: /') && !robots.includes('Disallow: /'));
assert(robots.includes('Sitemap: https://kevingarzon.com/sitemap.xml'));
const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
assert.equal((sitemap.match(/<loc>/g) || []).length, pages.length);
const home = await readFile(path.join(dist, 'index.html'), 'utf8');
const schema = JSON.parse(home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
assert.equal(schema['@graph'][0].name, 'Kevin Garzón');
assert.equal(schema['@graph'][0].url, 'https://kevingarzon.com/');
console.log('OK: indexación, canonical, sitemap y datos estructurados.');
