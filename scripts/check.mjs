import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { build, root } from './build.mjs';
await build();
const html = await readFile(path.join(root,'dist/index.html'),'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
assert.equal(new Set(ids).size, ids.length, 'IDs duplicados');
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(match[1]), `Ancla rota: ${match[1]}`);
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
 const value=match[1];
 if (!/^https?:/.test(value)) await access(path.join(root,'dist',value));
}
assert.equal((html.match(/<h1>/g)||[]).length,1,'Debe existir un único h1');
assert(html.includes('lang="es"'),'Idioma no declarado');
for (const image of html.matchAll(/<img\b[^>]*>/g)) assert(/alt="[^"]*"/.test(image[0]), 'Imagen sin alt');
assert(!/{{/.test(html),'Contenido sin renderizar');
console.log('OK: recursos, anclas, IDs, idioma, h1 y textos alternativos.');

const css = await readFile(path.join(root,'dist/style.css'),'utf8');
assert(css.startsWith("@import url('https://fonts.googleapis.com/"), 'Import de fuente incompleto');
assert(css.indexOf("display=swap');") < css.indexOf(':root'), 'Tokens insertados dentro de la URL de fuentes');
