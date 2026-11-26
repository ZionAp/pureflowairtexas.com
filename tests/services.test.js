import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const servicesDir = path.join(root, 'services');
const siteUrl = 'https://pureflowairtexas.com';

const slugs = fs.readdirSync(servicesDir).filter(f => f.endsWith('.html')).map(f => f.replace('.html',''));

assert.ok(slugs.length >= 15, 'expected at least 15 service pages, got ' + slugs.length);

for (const slug of slugs) {
  const html = fs.readFileSync(path.join(servicesDir, slug + '.html'), 'utf8');
  const { document } = new JSDOM(html, { url: `${siteUrl}/services/${slug}.html` }).window;

  assert.equal(document.querySelectorAll('h1').length, 1, `${slug} should have one h1`);
  assert.equal(document.querySelector('link[rel="canonical"]')?.getAttribute('href'), `${siteUrl}/services/${slug}.html`, `${slug} canonical`);
  assert.ok(document.querySelectorAll('.service-detail').length >= 3, `${slug} should have service details`);
  assert.ok(document.querySelector('a[href="../index.html#contact"]'), `${slug} should link to contact`);
  assert.ok(!/IMG-20261021|images\/gallery/.test(html), `${slug} should not reference gate photos`);
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const slug of slugs) {
  assert.ok(sitemap.includes(`${siteUrl}/services/${slug}.html`), `sitemap should include ${slug}`);
}

console.log(`Services: ${slugs.length} pages passed`);
