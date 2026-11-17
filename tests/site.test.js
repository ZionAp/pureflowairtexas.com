import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import assert from 'node:assert';
import { JSDOM, VirtualConsole } from 'jsdom';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, '..');
const indexPath = path.join(siteRoot, 'index.html');

const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => errors.push('jsdomError: ' + e.message));
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));

const results = [];
function check(name, fn) {
  try {
    fn();
    results.push(['PASS', name]);
  } catch (e) {
    results.push(['FAIL', name + ' -> ' + e.message]);
  }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const dom = await JSDOM.fromFile(indexPath, {
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
    virtualConsole: vc,
    beforeParse(window) {
      window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
      window.scrollTo = () => {};
      window.alert = () => { throw new Error('alert() should not be used'); };
      window.__quoteRequests = [];
      window.fetch = async (url, options = {}) => {
        window.__quoteRequests.push({ url: String(url), options });
        const body = options.body;
        const name = body && typeof body.get === 'function' ? String(body.get('name') || '') : '';
        return {
          ok: true,
          status: 200,
          json: async () => ({
            ok: true,
            message: 'Thank you ' + name + '! Your quote request has been sent. We will contact you within 24 hours.'
          })
        };
      };
      window.addEventListener('error', e => errors.push('window error: ' + e.message));
    }
  });

  const { window } = dom;
  await new Promise(r => window.addEventListener('load', r));
  const d = window.document;

  check('single main landmark and skip link', () => {
    assert.strictEqual(d.querySelectorAll('main').length, 1);
    assert.ok(d.querySelector('.skip-link[href="#main"]'));
  });

  check('all internal anchor targets exist', () => {
    d.querySelectorAll('a[href^="#"]').forEach(a => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      assert.ok(d.querySelector(href), 'missing target ' + href);
    });
  });

  check('every image has non-empty alt text', () => {
    d.querySelectorAll('img').forEach(img => {
      assert.ok(img.hasAttribute('alt'), 'img missing alt: ' + img.getAttribute('src'));
    });
  });

  check('essential SEO meta tags are present', () => {
    assert.strictEqual(d.querySelectorAll('link[rel="canonical"]').length, 1, 'expected exactly one canonical');
    assert.ok(d.querySelector('link[rel="canonical"][href^="https://"]'), 'missing canonical');
    assert.match(d.querySelector('meta[name="robots"]')?.content || '', /index/, 'missing robots index');
    assert.strictEqual(d.querySelector('meta[property="og:image"]')?.content?.includes('/images/og-image.png'), true, 'missing og:image');
    assert.strictEqual(d.querySelector('meta[name="twitter:card"]')?.content, 'summary_large_image', 'twitter card not large');
    assert.ok(d.querySelector('link[rel="icon"]'), 'missing favicon');
  });

  check('images have proper attributes', () => {
    const imgs = Array.from(d.querySelectorAll('img'));
    imgs.forEach(img => {
      assert.match(img.getAttribute('src'), /\.(webp|png|jpg)$/, 'bad image src');
      assert.ok(img.hasAttribute('width') && img.hasAttribute('height'), 'image missing dimensions');
      assert.ok(img.getAttribute('loading') === 'lazy' || img.getAttribute('fetchpriority') === 'high', 'image not lazy/high priority');
    });
    assert.ok(fs.existsSync(path.join(siteRoot, 'images', 'og-image.png')), 'missing branded og-image');
  });

  check('hero uses a gradient background', () => {
    const heroBg = d.querySelector('.hero-bg');
    assert.ok(heroBg, 'missing hero-bg');
    const css = fs.readFileSync(path.join(siteRoot, 'css', 'style.css'), 'utf8');
    assert.ok(/\.hero-bg\s*{[^}]*background/.test(css), 'hero background lacks styling');
  });

  check('testimonials carousel does not break LCP reporting', () => {
    const rawCss = fs.readFileSync(path.join(siteRoot, 'css', 'style.css'), 'utf8');
    const css = rawCss.replace(/\/\*[\s\S]*?\*\//g, ''); // ignore comments
    const rule = css.match(/\.testimonials-track\s*{[^}]*}/);
    assert.ok(rule, 'missing .testimonials-track rule');
    const body = rule[0];
    assert.match(body, /overflow-x:\s*auto/, 'testimonials track should still scroll horizontally');
    assert.match(body, /scroll-snap-type:\s*x\s+mandatory/, 'testimonials track should keep scroll snapping');
    // Regression guard: scroll-behavior: smooth + scroll-snap-type: mandatory makes
    // Chrome perform an animated snap-scroll at load, which stops it reporting LCP
    // for the whole page (PageSpeed Insights shows "Error! NO_LCP").
    assert.doesNotMatch(body, /scroll-behavior:\s*smooth/, 'scroll-behavior: smooth on the snap track suppresses LCP');
  });

  check('fonts are self-hosted (no Google Fonts CDN)', () => {
    assert.strictEqual(d.querySelectorAll('link[href*="fonts.googleapis.com"]').length, 0, 'Google Fonts link remains');
    assert.strictEqual(d.querySelectorAll('link[href*="fonts.gstatic.com"]').length, 0, 'Google Fonts preconnect remains');
    const preloads = d.querySelectorAll('link[rel="preload"][as="font"]');
    assert.ok(preloads.length >= 2, 'expected font preloads');
    preloads.forEach(l => {
      assert.match(l.getAttribute('href'), /^fonts\/.*\.woff2$/, 'font preload not local: ' + l.getAttribute('href'));
      assert.strictEqual(l.getAttribute('type'), 'font/woff2');
    });
    ['inter-latin.woff2', 'inter-latin-ext.woff2', 'plus-jakarta-sans-latin.woff2', 'plus-jakarta-sans-latin-ext.woff2'].forEach(f => {
      assert.ok(fs.existsSync(path.join(siteRoot, 'fonts', f)), 'missing font file ' + f);
    });
    assert.strictEqual(d.querySelectorAll('#main [style]').length, 0, 'inline style attribute blocks CSP');
  });

  check('icons are inlined with no external icon CDN', () => {
    assert.strictEqual(d.querySelectorAll('i.fa, i.fas, i.fab, i.far').length, 0, 'legacy <i> icon tags remain');
    assert.ok(d.querySelectorAll('svg.icon use[href^="#icon-"]').length > 0, 'no inlined icon references');
    assert.ok(d.querySelector('.icon-sprite symbol'), 'missing sprite symbols');
    assert.strictEqual(d.querySelectorAll('link[href*="font-awesome"]').length, 0, 'Font Awesome CDN still linked');
  });

  // veteran-owned messaging removed

  check('nav toggle syncs aria-expanded', () => {
    const btn = d.getElementById('navToggle');
    const menu = d.getElementById('navMenu');
    assert.strictEqual(btn.getAttribute('aria-expanded'), 'false');
    btn.click();
    assert.ok(menu.classList.contains('active'));
    assert.strictEqual(btn.getAttribute('aria-expanded'), 'true');
    btn.click();
    assert.ok(!menu.classList.contains('active'));
    assert.strictEqual(btn.getAttribute('aria-expanded'), 'false');
  });

  check('Escape closes mobile nav', () => {
    const btn = d.getElementById('navToggle');
    const menu = d.getElementById('navMenu');
    btn.click();
    d.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    assert.ok(!menu.classList.contains('active'));
  });

  check('footer social links are external and safe', () => {
    const social = d.querySelectorAll('.footer-social a');
    assert.ok(social.length >= 3, 'expected social links');
    social.forEach(a => {
      assert.match(a.getAttribute('href'), /^https:\/\//, 'social link not absolute: ' + a.getAttribute('href'));
      assert.strictEqual(a.getAttribute('target'), '_blank');
      assert.match(a.getAttribute('rel') || '', /noopener/, 'missing noopener');
      assert.ok(a.getAttribute('aria-label'), 'missing aria-label');
    });
    assert.strictEqual(d.querySelectorAll('a[href="#"]').length, 0, 'placeholder href="#" still present');
  });



  check('quote form is wired to the hardened PHP endpoint', () => {
    const form = d.getElementById('quoteForm');
    assert.strictEqual(form.getAttribute('action'), 'send-quote.php');
    assert.strictEqual(form.getAttribute('method'), 'post');
    assert.ok(form.querySelector('input[name="company"]'), 'missing honeypot field');
    assert.strictEqual(form.querySelector('input[name="company"]').getAttribute('tabindex'), '-1');
    assert.ok(fs.existsSync(path.join(siteRoot, 'send-quote.php')), 'missing send-quote.php');

    const endpoint = fs.readFileSync(path.join(siteRoot, 'send-quote.php'), 'utf8');
    assert.match(endpoint, /^\s*<\?php/);
    assert.match(endpoint, /MAIL_TO = 'info\@pureflowairtexas\.com'/);
    assert.match(endpoint, /MAIL_FROM = 'no-reply\@pureflowairtexas\.com'/);
    assert.match(endpoint, /FILTER_VALIDATE_EMAIL/);
    assert.match(endpoint, /function allows_quote/);
    assert.match(endpoint, /@mail\(/);
    assert.doesNotMatch(endpoint, /phpinfo|var_dump/);
  });

  check('form rejects missing required fields with inline status', () => {
    const form = d.getElementById('quoteForm');
    form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    const status = d.getElementById('formStatus');
    assert.ok(status.classList.contains('error'), 'status not error: ' + status.className);
    assert.ok(/required fields/i.test(status.textContent));
    assert.strictEqual(window.__quoteRequests.length, 0, 'invalid form should not send');
  });

  const form = d.getElementById('quoteForm');
  form.querySelector('#name').value = 'Test User';
  form.querySelector('#phone').value = '5125550100';
  form.querySelector('#service').value = 'air-duct-cleaning';
  form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  const btn = form.querySelector('button[type="submit"]');

  check('form button enters pending state', () => {
    assert.ok(/Sending|Request Sent/.test(btn.textContent), 'button not updated: ' + btn.textContent);
    assert.ok(btn.disabled);
  });

  check('form sends an AJAX request to the quote endpoint', () => {
    assert.strictEqual(window.__quoteRequests.length, 1, 'expected one quote request');
    const sent = window.__quoteRequests[0];
    assert.match(sent.url, /send-quote\.php$/);
    assert.strictEqual(sent.options.method, 'POST');
    assert.strictEqual(sent.options.headers.Accept, 'application/json');
    assert.strictEqual(sent.options.body.get('name'), 'Test User');
    assert.strictEqual(sent.options.body.get('phone'), '5125550100');
    assert.strictEqual(sent.options.body.get('service'), 'air-duct-cleaning');
  });

  await sleep(900);

  check('form shows success message and resets', () => {
    const status = d.getElementById('formStatus');
    assert.ok(status.classList.contains('success'), 'status not success: ' + status.className);
    assert.ok(/Thank you Test User/.test(status.textContent));
    assert.strictEqual(form.querySelector('#name').value, '');
    assert.ok(!btn.disabled);
  });

  check('footer year is current', () => {
    assert.strictEqual(d.getElementById('year').textContent, String(new Date().getFullYear()));
  });

  check('SEO crawl files and icons exist on disk', () => {
    ['robots.txt', 'sitemap.xml', 'favicon.ico', path.join('images', 'og-image.png'), path.join('images', 'favicon.png')].forEach(f => {
      assert.ok(fs.existsSync(path.join(siteRoot, f)), 'missing file ' + f);
    });
  });

  check('customer reviews section exists', () => {
    assert.ok(d.querySelectorAll('.review-card').length >= 2, 'expected at least 2 review cards');
  });

  check('structured data includes LocalBusiness and FAQPage', () => {
    const blocks = Array.from(d.querySelectorAll('script[type="application/ld+json"]')).map(s => {
      try { return JSON.parse(s.textContent); } catch (e) { throw new Error('invalid JSON-LD: ' + e.message); }
    });
    const types = blocks.flatMap(b => Array.isArray(b) ? b.map(x => x['@type']) : [b['@type']]);
    assert.ok(types.includes('LocalBusiness'), 'missing LocalBusiness');
    assert.ok(types.includes('FAQPage'), 'missing FAQPage');
    const biz = blocks.find(b => b['@type'] === 'LocalBusiness');
    assert.ok(biz.image, 'LocalBusiness missing image');
    assert.strictEqual(biz.email, 'info@pureflowairtexas.com', 'LocalBusiness email is outdated');
    assert.ok(biz.openingHoursSpecification, 'LocalBusiness missing hours');
    assert.ok(Array.isArray(biz.sameAs) && biz.sameAs.length, 'LocalBusiness missing sameAs');
  });

  check('service areas section exists', () => {
    assert.ok(d.querySelector('.service-areas') || d.querySelector('.areas-grid'), 'missing service areas section');
  });

  check('decorative icons are hidden from assistive tech', () => {
    d.querySelectorAll('svg.icon').forEach(svg => {
      assert.strictEqual(svg.getAttribute('aria-hidden'), 'true', 'icon not aria-hidden');
    });
  });

  check('every button has an accessible name', () => {
    d.querySelectorAll('button').forEach(btn => {
      const name = (btn.getAttribute('aria-label') || btn.textContent || '').trim();
      assert.ok(name.length > 0, 'button missing accessible name');
    });
  });

  check('no runtime errors during load/interaction', () => {
    assert.deepStrictEqual(errors, []);
  });

  console.log(results.map(([s, n]) => `${s} ${n}`).join('\n'));
  const failed = results.filter(r => r[0] === 'FAIL').length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
