import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteUrl = 'https://www.austinlocksmithpros.com';

// contact.html
{
  const html = fs.readFileSync(path.join(root, 'contact.html'), 'utf8');
  const { document } = new JSDOM(html, { url: `${siteUrl}/contact.html` }).window;
  assert.equal(document.querySelectorAll('h1').length, 1);
  assert.ok(document.querySelector('#quoteForm'), 'contact should have quote form');
  assert.equal(document.querySelector('link[rel="canonical"]')?.getAttribute('href'), `${siteUrl}/contact.html`);
}

// service-areas.html
{
  const html = fs.readFileSync(path.join(root, 'service-areas.html'), 'utf8');
  const { document } = new JSDOM(html, { url: `${siteUrl}/service-areas.html` }).window;
  assert.equal(document.querySelectorAll('h1').length, 1);
  assert.equal(document.querySelector('link[rel="canonical"]')?.getAttribute('href'), `${siteUrl}/service-areas.html`);
}

// blog
const blogDir = path.join(root, 'blog');
const posts = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));
assert.ok(posts.length >= 9, 'expected blog pages, got ' + posts.length);
for (const f of posts) {
  const slug = f.replace('.html','');
  const html = fs.readFileSync(path.join(blogDir, f), 'utf8');
  const { document } = new JSDOM(html, { url: `${siteUrl}/blog/${slug}.html` }).window;
  assert.equal(document.querySelectorAll('h1').length, 1, `${slug} should have one h1`);
  assert.equal(document.querySelector('link[rel="canonical"]')?.getAttribute('href'), `${siteUrl}/blog/${slug}.html`, `${slug} canonical`);
  assert.ok(!/IMG-20261021|images\/gallery/.test(html), `${slug} should not reference gate photos`);
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
assert.ok(sitemap.includes(`${siteUrl}/contact.html`));
assert.ok(sitemap.includes(`${siteUrl}/service-areas.html`));
assert.ok(sitemap.includes(`${siteUrl}/blog/index.html`));

console.log(`Extras: contact, service-areas, ${posts.length} blog pages passed`);
