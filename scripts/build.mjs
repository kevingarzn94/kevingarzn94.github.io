import { readFile, writeFile, mkdir, cp, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
export const root = fileURLToPath(new URL('../', import.meta.url));
const read = file => readFile(path.join(root, file), 'utf8');
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export async function build() {
  const content = JSON.parse(await read('apps/portfolio/content/site.json'));
  let html = await read('apps/portfolio/src/index.html');
  for (const file of await readdir(path.join(root, 'apps/portfolio/src/sections'))) {
    if (file.endsWith('.html')) html = html.replace(`{{> ${file.slice(0,-5)}}}`, await read(`apps/portfolio/src/sections/${file}`));
  }
  html = html.replace(/{{(\w+)}}/g, (_, key) => {
    if (!(key in content)) throw new Error(`Contenido pendiente: ${key}`);
    return escape(content[key]);
  });
  if (html.includes('{{')) throw new Error('Plantilla sin resolver');
  await mkdir(path.join(root, 'dist'), { recursive: true });
  await cp(path.join(root, 'apps/portfolio/public'), path.join(root, 'dist'), { recursive: true });
  await writeFile(path.join(root, 'dist/index.html'), html);
  // CSS imports must precede all rules.
  const styles = await read('libs/ui/styles/site.css');
  const imports = styles.match(/@import[^;]+;/g) || [];
  await writeFile(path.join(root, 'dist/style.css'), imports.join('\n') + '\n' + await read('libs/ui/styles/tokens.css') + styles.replace(/@import[^;]+;/g, ''));
  await writeFile(path.join(root, 'dist/app.js'), await read('libs/ui/motion/hero.js'));
  console.log('Build listo: dist/');
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();
