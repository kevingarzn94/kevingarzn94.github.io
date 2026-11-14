import { readFile, writeFile, mkdir, readdir, rename, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { randomUUID, createHash } from 'node:crypto';
export const root = fileURLToPath(new URL('../', import.meta.url));
const read = file => readFile(path.join(root, file), 'utf8');
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const hash = data => createHash('sha256').update(data).digest('hex').slice(0, 10);
const icon = (name, d) => `<svg class="ic ic-${name}" viewBox="0 0 24 24" width=".8em" height=".8em" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${d}"/></svg>`;
const arrowRight = icon('right', 'M4 12h16M13.5 5.5 20 12l-6.5 6.5');
const arrowLeft = icon('left', 'M20 12H4M10.5 5.5 4 12l6.5 6.5');
const grid = icon('grid', 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z');

let written = new Set();
async function atomicWrite(file, data) {
  written.add(path.resolve(file));
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
// Remove files left in dist/ by earlier builds (deleted assets, retired scripts).
async function prune(folder) {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const target = path.join(folder, entry.name);
    // Temporary files belong to a concurrent build (npm start); leave them alone.
    if (entry.name.endsWith('.tmp')) continue;
    if (entry.isDirectory()) {
      await prune(target);
      if (!(await readdir(target)).length) await rm(target, { recursive: true, force: true });
    } else if (!written.has(path.resolve(target))) await rm(target, { force: true });
  }
}

// Previous / next navigation follows the order of the home gallery (content/cases.json).
function projectNav(cases, file) {
  const i = cases.findIndex(item => item.file === file);
  if (i < 0) throw new Error(`${file} no está en content/cases.json`);
  const next = cases[(i + 1) % cases.length], previous = cases[(i - 1 + cases.length) % cases.length];
  return `<nav class="av-next" aria-label="Más proyectos">
 <a class="av-next-card" href="${next.file}">
  <span class="av-label">Siguiente proyecto</span>
  <strong>${escape(next.title)} <span aria-hidden="true">${arrowRight}</span></strong>
  <span class="av-next-meta">${escape(next.category)}</span>
  <img src="${next.image}" alt="" loading="lazy" decoding="async">
 </a>
 <div class="av-next-row">
  <a class="av-next-prev" href="${previous.file}">${arrowLeft}<span class="av-label">Anterior</span> ${escape(previous.title)}</a>
  <a class="av-next-all" href="index.html#trabajo">${grid} Todos los proyectos</a>
 </div>
</nav>`;
}

export async function build() {
  written = new Set();
  const content = JSON.parse(await read('apps/portfolio/content/site.json'));
  const { cases } = JSON.parse(await read('apps/portfolio/content/cases.json'));
  const sections = await readdir(path.join(root, 'apps/portfolio/src/sections'));
  const urls = [];

  await mkdir(path.join(root, 'dist'), { recursive: true });
  await copyAssets(path.join(root, 'apps/portfolio/public'), path.join(root, 'dist'));

  // CSS imports must precede all rules.
  const styles = await read('libs/ui/styles/site.css');
  const imports = styles.match(/@import\s+url\([^)]*\);/g) || [];
  const css = imports.join('\n') + '\n' + await read('libs/ui/styles/tokens.css') + styles.replace(/@import\s+url\([^)]*\);/g, '') + '\n' + await read('libs/ui/styles/components.css') + '\n' + await read('libs/ui/styles/wedding.css') + '\n' + await read('libs/ui/styles/v2.css');
  await atomicWrite(path.join(root, 'dist/style.css'), css);

  // Cache busting from file contents: no manual ?v= bumps.
  const versions = { 'style.css': hash(css) };
  for (const script of ['v2.js', 'backgrounds.js', 'wedding-gallery.js']) versions[script] = hash(await read(`apps/portfolio/public/${script}`));
  const versioned = html => html.replace(/(href|src)="(\/?)(style\.css|v2\.js|backgrounds\.js|wedding-gallery\.js)(?:\?v=[^"]*)?"/g, (_, attr, slash, name) => `${attr}="${slash}${name}?v=${versions[name]}"`);

  const render = async (source, file, { indexable = true } = {}) => {
    let html = source;
    for (const section of sections) {
      if (section.endsWith('.html')) html = html.replaceAll(`{{> ${section.slice(0, -5)}}}`, await read(`apps/portfolio/src/sections/${section}`));
    }
    if (html.includes('{{> project-nav}}')) html = html.replace('{{> project-nav}}', projectNav(cases, file));
    html = html.replace(/{{(\w+)}}/g, (_, key) => {
      if (!(key in content)) throw new Error(`Contenido pendiente: ${key}`);
      return escape(content[key]);
    });
    if (html.includes('{{')) throw new Error('Plantilla sin resolver');
    html = versioned(html);
    if (!indexable) return html;

    const canonical = new URL(file === 'index.html' ? '' : file, content.url).href;
    urls.push(canonical);
    const title = html.match(/<title>([^<]+)<\/title>/)[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)[1];
    const item = cases.find(entry => entry.file === file);
    const image = new URL(item ? item.og : 'assets/og/inicio.jpg', content.url).href;
    const imageAlt = item ? `${item.title} · ${item.category} · Kevin Garzón` : `${content.name}, diseñador y director de arte`;
    const metadata = [
      `<link rel="canonical" href="${escape(canonical)}">`,
      `<meta property="og:type" content="${item ? 'article' : 'website'}">`,
      `<meta property="og:site_name" content="${escape(content.name)}">`,
      `<meta property="og:locale" content="es_CO">`,
      `<meta property="og:title" content="${title}">`,
      `<meta property="og:description" content="${description}">`,
      `<meta property="og:url" content="${escape(canonical)}">`,
      `<meta property="og:image" content="${escape(image)}">`,
      `<meta property="og:image:width" content="1200">`,
      `<meta property="og:image:height" content="630">`,
      `<meta property="og:image:alt" content="${escape(imageAlt)}">`,
      `<meta name="twitter:card" content="summary_large_image">`
    ];
    if (file === 'index.html') {
      const schema = {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'Person', '@id': `${content.url}#persona`, name: content.name,
            alternateName: 'Kevin Garzon', url: content.url,
            image: new URL('assets/kevin-retrato.jpg', content.url).href,
            jobTitle: 'Diseñador y director de arte',
            address: { '@type': 'PostalAddress', addressLocality: 'Bogotá', addressCountry: 'CO' },
            knowsAbout: ['Dirección de arte', 'Identidad visual', 'Diseño UX/UI', 'Diseño web', 'Fotografía', 'Video'],
            sameAs: [content.behance, content.linkedin, content.instagram, content.photoInstagram, content.flickr] },
          { '@type': 'WebSite', '@id': `${content.url}#website`, url: content.url,
            name: content.name, inLanguage: 'es', publisher: { '@id': `${content.url}#persona` } }
        ]
      };
      metadata.push(`<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`);
    }
    return html.replace('</head>', metadata.join('\n') + '\n</head>');
  };

  await atomicWrite(path.join(root, 'dist/index.html'), await render(await read('apps/portfolio/src/index.html'), 'index.html'));
  for (const file of await readdir(path.join(root, 'apps/portfolio/src/pages'))) {
    if (file.endsWith('.html')) await atomicWrite(path.join(root, 'dist', file), await render(await read(`apps/portfolio/src/pages/${file}`), file));
  }
  // GitHub Pages serves 404.html for unknown paths; it stays out of the sitemap and the index.
  await atomicWrite(path.join(root, 'dist/404.html'), await render(await read('apps/portfolio/src/404.html'), '404.html', { indexable: false }));
  await atomicWrite(path.join(root, 'dist/robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', content.url).href}\n`);
  await atomicWrite(path.join(root, 'dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${escape(url)}</loc></url>`).join('\n')}\n</urlset>\n`);
  await prune(path.join(root, 'dist'));
  console.log('Build listo: dist/');
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();
