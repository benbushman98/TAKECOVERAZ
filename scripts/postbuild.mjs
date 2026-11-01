// Runs after `vite build`. GitHub Pages only has dist/index.html, so a visit to
// /calendar used to be served by 404.html (HTTP 404) and bounced through a redirect.
// Search engines treat that as "page not found", and link previews (Facebook, iMessage,
// text messages) don't run JavaScript, so every page shared looked like the home page.
//
// For each page this writes dist/<page>.html — GitHub Pages serves it at /<page> with a
// 200 — carrying that page's own title, description and canonical URL. It also writes
// sitemap.xml from the same list in src/data/seo.json.
import { readFileSync, writeFileSync } from 'node:fs';

const seo = JSON.parse(readFileSync(new URL('../src/data/seo.json', import.meta.url), 'utf8'));
const dist = new URL('../dist/', import.meta.url);
const template = readFileSync(new URL('index.html', dist), 'utf8');

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setAttr(html, selector, value) {
  // selector like 'name="description"' or 'property="og:url"' or 'rel="canonical"'
  const attr = selector.startsWith('rel=') ? 'href' : 'content';
  const re = new RegExp(`(<(?:meta|link)\\b[^>]*\\b${selector}[^>]*\\b${attr}=")[^"]*(")`, 's');
  if (!re.test(html)) throw new Error(`postbuild: no tag with ${selector} in index.html`);
  return html.replace(re, `$1${esc(value)}$2`);
}

const urlFor = (path) => (path === '/' ? `${seo.baseUrl}/` : `${seo.baseUrl}${path}`);

for (const [path, page] of Object.entries(seo.pages)) {
  const url = urlFor(path);
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`);
  for (const sel of ['name="description"', 'property="og:description"', 'name="twitter:description"'])
    html = setAttr(html, sel, page.description);
  for (const sel of ['property="og:title"', 'name="twitter:title"']) html = setAttr(html, sel, page.title);
  for (const sel of ['rel="canonical"', 'property="og:url"']) html = setAttr(html, sel, url);

  const file = path === '/' ? 'index.html' : `${path.slice(1)}.html`;
  writeFileSync(new URL(file, dist), html);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.entries(seo.pages)
  .map(
    ([path, p]) => `  <url>
    <loc>${urlFor(path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
writeFileSync(new URL('sitemap.xml', dist), sitemap);
console.log(`postbuild: wrote ${Object.keys(seo.pages).length} page files and sitemap.xml`);
