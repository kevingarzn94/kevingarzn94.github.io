import { readFile, writeFile, mkdir, readdir, rename } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
export const root = fileURLToPath(new URL('../', import.meta.url));
const read = file => readFile(path.join(root, file), 'utf8');
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function atomicWrite(file, data) {
  const temporary = `${file}.${randomUUID()}.tmp`;
  await writeFile(temporary, data);
  await rename(temporary, file);
}
async function copyAssets(source, destination) {
  await mkdir(destination, { recursive: true });
  for (const entry of await readdir(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name), to = path.join(destination, entry.name);
    if (entry.isDirectory()) await copyAssets(from, to);
    else await atomicWrite(to, await readFile(from));
  }
}
export async function build() {
  const content = JSON.parse(await read('apps/portfolio/content/site.json'));
  const sections = await readdir(path.join(root, 'apps/portfolio/src/sections'));
  const render = async (source) => {
    let html = source;
    for (const file of sections) {
      if (file.endsWith('.html')) html = html.replaceAll(`{{> ${file.slice(0,-5)}}}`, await read(`apps/portfolio/src/sections/${file}`));
    }
    html = html.replace(/{{(\w+)}}/g, (_, key) => {
      if (!(key in content)) throw new Error(`Contenido pendiente: ${key}`);
      return escape(content[key]);
    });
    if (html.includes('{{')) throw new Error('Plantilla sin resolver');
    return html;
  };
  await mkdir(path.join(root, 'dist'), { recursive: true });
  await copyAssets(path.join(root, 'apps/portfolio/public'), path.join(root, 'dist'));
  await atomicWrite(path.join(root, 'dist/index.html'), await render(await read('apps/portfolio/src/index.html')));
  for (const file of await readdir(path.join(root, 'apps/portfolio/src/pages'))) {
    if (file.endsWith('.html')) await atomicWrite(path.join(root, 'dist', file), await render(await read(`apps/portfolio/src/pages/${file}`)));
  }
  // CSS imports must precede all rules.
  const styles = await read('libs/ui/styles/site.css');
  const imports = styles.match(/@import\s+url\([^)]*\);/g) || [];
  await atomicWrite(path.join(root, 'dist/style.css'), imports.join('\n') + '\n' + await read('libs/ui/styles/tokens.css') + styles.replace(/@import\s+url\([^)]*\);/g, '') + '\n' + await read('libs/ui/styles/components.css') + '\n' + await read('libs/ui/styles/case-study.css') + '\n' + await read('libs/ui/styles/wedding.css') + '\n' + await read('libs/ui/styles/v2.css'));
  await atomicWrite(path.join(root, 'dist/app.js'), await read('libs/ui/motion/hero.js'));
  console.log('Build listo: dist/');
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();
