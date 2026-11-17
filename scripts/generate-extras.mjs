import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const siteUrl = 'https://www.austinlocksmithpros.com';
const phone = '(737) 265-4627';
const phoneHref = 'tel:+17372654627';
const email = 'austinlocksmithpros@gmail.com';

const headTpl = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const headStart = headTpl.indexOf('<main id="main">');
const headBase = headTpl.slice(0, headStart);
const tailStart = headTpl.indexOf('</main>') + '</main>'.length;
const tailBase = headTpl.slice(tailStart);

function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function renderSections(sections){
  return sections.map(([h, body]) => `
                <div class="service-detail">
                    <div class="service-detail-content">
                        <h3>${esc(h)}</h3>
                        <p>${esc(body)}</p>
                    </div>
                </div>`).join('\n');
}

function renderFaqs(faqs){
  return faqs.map(([q,a]) => `
                <div class="faq-item">
                    <h3>${esc(q)}</h3>
                    <p>${esc(a)}</p>
                </div>`).join('\n');
}

function renderPage(p, depth){
  // depth: 0 = root, 1 = services/ or blog/
  const prefix = depth === 0 ? '' : '../';
  const cssPrefix = depth === 0 ? '' : '../';
  const url = `${siteUrl}${p.path}`;
  const isBlog = p.path.startsWith('/blog/');
  const isService = p.path.startsWith('/services/');

  let h = headBase.trimEnd() + '\n';
  // fix relative paths for subfolder
  if (depth > 0){
    h = h.replace(/href="images\//g, `href="${cssPrefix}images/`);
    h = h.replace(/href="fonts\//g, `href="${cssPrefix}fonts/`);
    h = h.replace(/href="css\//g, `href="${cssPrefix}css/`);
    h = h.replace(/src="js\//g, `src="${cssPrefix}js/`);
    h = h.replace(/href="areas\//g, `href="${cssPrefix}areas/`);
    h = h.replace(/href="services\//g, `href="${cssPrefix}services/`);
    h = h.replace(/href="blog\//g, `href="${cssPrefix}blog/`);
    h = h.replace(/href="contact\.html/g, `href="${cssPrefix}contact.html`);
    h = h.replace(/href="service-areas\.html/g, `href="${cssPrefix}service-areas.html`);
  }
  // canonical + og
  h = h.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${url}"`);
  h = h.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${url}"`);
  h = h.replace(/<title>[^<]*<\/title>/, `<title>${esc(p.title)}</title>`);
  h = h.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${esc(p.title)}"`);
  h = h.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${esc(p.title)}"`);
  h = h.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${esc(p.description)}"`);
  h = h.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${esc(p.description)}"`);
  h = h.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${esc(p.description)}"`);
  // nav links
  const homePrefix = depth === 0 ? '' : '../index.html';
  h = h.replace(/href="#home"/g, depth===0 ? 'href="#home"' : 'href="../index.html#home"');
  h = h.replace(/href="#services"/g, depth===0 ? 'href="#services"' : 'href="../index.html#services"');
  h = h.replace(/href="#areas"/g, depth===0 ? 'href="#areas"' : 'href="../index.html#areas"');
  h = h.replace(/href="#advantage"/g, depth===0 ? 'href="#advantage"' : 'href="../index.html#advantage"');
  h = h.replace(/href="#faqs"/g, depth===0 ? 'href="#faqs"' : 'href="../index.html#faqs"');
  h = h.replace(/href="#about"/g, depth===0 ? 'href="#about"' : 'href="../index.html#about"');
  h = h.replace(/href="#contact"/g, depth===0 ? 'href="#contact"' : 'href="../index.html#contact"');
  h = h.replace('class="nav-link active"', 'class="nav-link"');

  const photoHtml = p.photo ? `
    <section class="about">
        <div class="container">
            <div class="about-content">
                <figure class="photo-single photo-single--about">
                    <img src="${cssPrefix}${p.photo.src.replace(/^\.\.\//,'')}" width="${p.photo.w}" height="${p.photo.h}" loading="lazy" decoding="async" alt="${esc(p.photo.alt)}">
                </figure>
                <div class="about-text">
                    <h2 class="section-title">${esc(p.h1)}</h2>
                    <p>${esc(p.lead)}</p>
                </div>
            </div>
        </div>
    </section>` : '';

  // For blog posts use article prose
  let main;
  if (isBlog){
    main = `
<main id="main">
    <section class="hero hero--inner">
        <div class="hero-bg" aria-hidden="true">
            <img src="${cssPrefix}images/residential-locksmith-.webp" alt="" width="1280" height="720" fetchpriority="high" decoding="async">
        </div>
        <div class="container">
            <div class="hero-content">
                <div class="hero-text">
                    <p class="hero-eyebrow">Austin Locksmith Pros Blog</p>
                    <h1 class="hero-title">${esc(p.h1)}</h1>
                    <p class="hero-subtitle">${esc(p.lead)}</p>
                </div>
            </div>
        </div>
    </section>
    <section class="area-article">
        <div class="container article-wrap">
            <article class="prose">
${p.body}
            </article>
            <aside class="area-sidebar">
                <div class="sidebar-card">
                    <h3>Need a Locksmith?</h3>
                    <p>Call Austin Locksmith Pros - 24/7 across Austin and Central Texas.</p>
                    <a href="${phoneHref}" class="btn btn-primary btn-full">(737)&nbsp;265&#8209;4627</a>
                    <a href="${depth===0?'':'../'}index.html#contact" class="btn btn-secondary btn-full">Free Quote</a>
                </div>
            </aside>
        </div>
    </section>
    </main>`;
  } else if (p.path === '/contact.html'){
    main = `
<main id="main">
    <section class="hero hero--inner">
        <div class="hero-bg" aria-hidden="true">
            <img src="${cssPrefix}images/residential-locksmith-.webp" alt="" width="1280" height="720" fetchpriority="high" decoding="async">
        </div>
        <div class="container">
            <div class="hero-content">
                <div class="hero-text">
                    <p class="hero-eyebrow">Contact Austin Locksmith Pros</p>
                    <h1 class="hero-title">${esc(p.h1)}</h1>
                    <p class="hero-subtitle">${esc(p.lead)}</p>
                </div>
            </div>
        </div>
    </section>
    <section class="contact">
        <div class="container">
            <div class="contact-grid">
                <div class="contact-info">
                    <h2>Get In Touch</h2>
                    <ul class="footer-contact">
                        <li><svg class="icon" aria-hidden="true"><use href="#icon-phone"></use></svg> <a href="${phoneHref}">(737)&nbsp;265&#8209;4627</a></li>
                        <li><svg class="icon" aria-hidden="true"><use href="#icon-envelope"></use></svg> <a href="mailto:${email}">${email}</a></li>
                        <li><svg class="icon" aria-hidden="true"><use href="#icon-map-marker-alt"></use></svg> Austin, TX &amp; Surrounding Areas</li>
                        <li><svg class="icon" aria-hidden="true"><use href="#icon-clock"></use></svg> Open 24/7 | Emergency Response 10-45 Min</li>
                    </ul>
                    <div class="contact-areas">
                        <h3>Service Areas</h3>
                        <p>Austin, Round Rock, Cedar Park, Pflugerville, Georgetown, Leander, Lakeway, Bee Cave, Westlake Hills, Dripping Springs, Spicewood, Buda, Kyle, Hutto, Manor, Lago Vista, Wimberley, Driftwood, Del Valle, Jollyville, Liberty Hill, San Marcos.</p>
                        <a href="${depth===0?'':'../'}areas/index.html">View all service areas &rarr;</a>
                    </div>
                </div>
                <div class="contact-form-container">
                    <h2>Request a Free Quote</h2>
                    <form id="quoteForm" class="quote-form" action="${depth===0?'':'../'}send-quote.php" method="post" novalidate>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="name">Full Name *</label>
                                <input type="text" id="name" name="name" autocomplete="name" maxlength="100" required>
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone Number *</label>
                                <input type="tel" id="phone" name="phone" autocomplete="tel" inputmode="tel" maxlength="25" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="email">Email Address</label>
                                <input type="email" id="email" name="email" autocomplete="email" maxlength="200">
                            </div>
                            <div class="form-group">
                                <label for="service">Service Needed *</label>
                                <select id="service" name="service" required>
                                    <option value="">Select a service</option>
                                    <option value="emergency-lockout">Emergency Lockout</option>
                                    <option value="residential">Residential Locksmith</option>
                                    <option value="commercial">Commercial Locksmith</option>
                                    <option value="automotive">Automotive Locksmith</option>
                                    <option value="rekeying">Rekeying/Key Duplication</option>
                                    <option value="smart-locks">Smart Locks/Security</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="address">Property Address</label>
                            <input type="text" id="address" name="address" autocomplete="address-line1" maxlength="150" placeholder="City/Address for service location">
                        </div>
                        <div class="form-group">
                            <label for="message">Project Details</label>
                            <textarea id="message" name="message" rows="4" maxlength="1000" placeholder="Tell us about your lock, key, or security needs"></textarea>
                        </div>
                        <div class="form-group" aria-hidden="true">
                            <label for="company">Company</label>
                            <input type="text" id="company" name="company" tabindex="-1" autocomplete="off">
                        </div>
                        <button type="submit" class="btn btn-primary btn-large btn-full">
                            <svg class="icon" aria-hidden="true"><use href="#icon-paper-plane"></use></svg> Send Quote Request
                        </button>
                        <p class="form-note">* Required fields. We'll contact you within 24 hours.</p>
                        <div class="form-status" id="formStatus" role="status" aria-live="polite"></div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    </main>`;
  } else {
    main = `
<main id="main">
    <section class="hero hero--inner">
        <div class="hero-bg" aria-hidden="true">
            <img src="${cssPrefix}images/residential-locksmith-.webp" alt="" width="1280" height="720" fetchpriority="high" decoding="async">
        </div>
        <div class="container">
            <div class="hero-content">
                <div class="hero-text">
                    <p class="hero-eyebrow">${esc(p.eyebrow || 'Austin Locksmith Pros')}</p>
                    <h1 class="hero-title">${esc(p.h1)}</h1>
                    <p class="hero-subtitle">${esc(p.lead)}</p>
                    <div class="hero-cta">
                        <a href="${phoneHref}" class="btn btn-primary btn-large">
                            <svg class="icon" aria-hidden="true"><use href="#icon-phone"></use></svg> Call&nbsp;(737)&nbsp;265&#8209;4627
                        </a>
                        <a href="${depth===0?'':'../'}index.html#contact" class="btn btn-secondary btn-large">
                            <svg class="icon" aria-hidden="true"><use href="#icon-clipboard-list"></use></svg> Free Quote
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
${photoHtml}
    <section class="full-services">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Details</h2>
                <p class="section-subtitle">${esc(p.h1)}</p>
            </div>
            <div class="services-detailed">
${renderSections(p.sections)}
            </div>
        </div>
    </section>
${p.faqs ? `
    <section class="faq">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Frequently Asked Questions</h2>
            </div>
            <div class="faq-list">
${renderFaqs(p.faqs)}
            </div>
        </div>
    </section>` : ''}
    <section class="cta-section">
        <div class="container">
            <div class="cta-content">
                <h2>Need a locksmith right now?</h2>
                <p>Call Austin Locksmith Pros - we come to you, 24/7, across Austin and Central Texas.</p>
                <div class="cta-buttons">
                    <a href="${phoneHref}" class="btn btn-primary btn-large">
                        <svg class="icon" aria-hidden="true"><use href="#icon-phone"></use></svg> Call&nbsp;(737)&nbsp;265&#8209;4627
                    </a>
                    <a href="${depth===0?'':'../'}index.html#contact" class="btn btn-secondary btn-large">
                        <svg class="icon" aria-hidden="true"><use href="#icon-clipboard-list"></use></svg> Request a Quote
                    </a>
                </div>
            </div>
        </div>
    </section>
    </main>`;
  }

  const t = tailBase;
  const tailFixed = depth > 0
    ? t.replace(/src="js\//g, `src="${cssPrefix}js/`)
       .replace(/href="areas\//g, `href="${cssPrefix}areas/`)
       .replace(/href="services\//g, `href="${cssPrefix}services/`)
       .replace(/href="blog\//g, `href="${cssPrefix}blog/`)
       .replace(/href="contact\.html/g, `href="${cssPrefix}contact.html`)
       .replace(/href="service-areas\.html/g, `href="${cssPrefix}service-areas.html`)
       .replace(/href="#/g, `href="${cssPrefix}index.html#`)
    : t;
  // footer service links -> services pages
  const out = h + main + tailFixed;
  const outPath = path.join(root, p.path.replace(/^\//,''));
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, out);
  console.log('wrote', outPath);
}

// ---------- Page data ----------
const pages = [];

// Contact
pages.push({
  path: '/contact.html', title: 'Contact Austin Locksmith Pros | Austin Locksmith',
  description: 'Contact Austin Locksmith Pros - 24/7 Austin locksmith. Call (737) 265-4627 or request a free quote. Emergency lockouts, rekeying, car keys, commercial security.',
  h1: 'Contact Austin Locksmith Pros',
  lead: 'Locked out or need a locksmith in Austin? Call us any time - a real person answers, and we dispatch from within the city. Or request a free quote and we will contact you within 24 hours.',
  eyebrow: 'Get In Touch',
});

// Sub-services
const subs = [
  {slug:'lock-rekey', title:'Lock Rekeying Austin TX | Rekey Locks & One Key for All Doors', desc:'Lock rekeying in Austin, TX - change pins so old keys no longer work. Affordable alternative to replacement. Same-day. Call (737) 265-4627.', h1:'Lock Rekeying in Austin, TX', lead:'Rekeying changes the internal pins of your existing lock so old keys no longer work - often more affordable than full lock replacement.', photo:{src:'images/schlage-rekey-kit.webp',w:700,h:419,alt:'Rekeying a Schlage lock cylinder in Austin, TX'}, sections:[
    ['What is rekeying?','Rekeying a lock changes the internal pins so a new key operates it and the old key no longer works. The lock itself stays in place - only the cylinder is reconfigured.'],
    ['When should you rekey?','After moving into a new home, tenant turnover, lost or stolen keys, or when you want one key to open every door.'],
    ['Rekey vs. replace','If the hardware is in good condition, rekeying is usually enough and costs less. If locks are outdated, damaged, or you want an upgrade, replacement is recommended.'],
    ['Same-day service','Most rekey jobs take 10 to 45 minutes and are completed in a single visit.'],
  ], faqs:[
    ['How much does rekeying cost in Austin?','Pricing depends on the number of locks and whether you have the original key. We provide upfront pricing before starting.'],
    ['Can you rekey different brands together?','Locks must be the same brand or keyway to share one key. We can advise on the best approach for mixed hardware.'],
    ['Can you rekey without the original key?','Yes, but it takes longer and costs more, as the cylinder must be disassembled.'],
    ['How long does rekeying take?','Most jobs take 10 to 45 minutes depending on the number of locks.'],
  ]},
  {slug:'lock-replacement', title:'Lock Replacement Austin TX | New Locks & Deadbolts Installed', desc:'Lock replacement in Austin, TX - replace damaged, outdated or compromised locks, high-security deadbolts, smart locks. Mobile service. Call (737) 265-4627.', h1:'Lock Replacement in Austin, TX', lead:'Just moved into a new home or want stronger security? We replace damaged, outdated, or compromised locks and install high-security deadbolts and smart lock systems.', photo:{src:'images/do-locksmiths-replace-door-knobs.webp',w:1000,h:500,alt:'Replacing a door knob lock in Austin, TX'}, sections:[
    ['Lock replacement service','We remove old or failing hardware and install new locks with proper alignment and hardware inspection.'],
    ['High-security deadbolts','Upgrade to Grade 1 or Grade 2 deadbolts, reinforced strike plates, and security hardware for stronger protection against forced entry.'],
    ['Smart locks','Keypad entry locks, Wi-Fi smart locks, high-security cylinders, and reinforced strike plates - we help you choose based on door type.'],
    ['Same-day installation','Most replacements are completed in a single visit with clear upfront pricing.'],
  ], faqs:[
    ['Should I rekey or replace?','If hardware is in good condition, rekeying is usually enough. If locks are outdated or damaged, replacement is recommended.'],
    ['Do you install smart locks?','Yes. We install keypad and Wi-Fi smart locks and help you choose based on your door type and security needs.'],
    ['How long does replacement take?','Most jobs take 10 to 45 minutes.'],
    ['What brands do you carry?','Schlage, Kwikset, Medeco, Mul-T-Lock, Baldwin, Yale, and most smart lock brands.'],
  ]},
  {slug:'car-key-replacement', title:'Car Key Replacement Austin TX | Cut & Program New Keys', desc:'Car key replacement in Austin, TX - cut and program new car keys on the spot for most makes. No dealership, no towing. Call (737) 265-4627.', h1:'Car Key Replacement in Austin, TX', lead:'Losing your car key does not always mean a trip to the dealership. We cut and program new car keys on the spot for most vehicle brands, saving you time and towing costs.', photo:{src:'images/pexels-negative-space-97075-1024x683.webp',w:1024,h:683,alt:'Car key on a desk in Austin, TX'}, sections:[
    ['All key types','Regular car keys, key fobs, transponder keys, and smart push-to-start systems.'],
    ['On-site programming','Every replacement is programmed to match your car immobilizer, so you get a fully functional key before we leave.'],
    ['No towing needed','We come to you - home, parking lot, or roadside - fully equipped.'],
    ['Delete lost keys','We can erase old keys from your vehicle memory for added security.'],
  ], faqs:[
    ['Can a locksmith make a car key without the original?','Yes, in most cases from your vehicle information. Some newer models need dealer-level tools; we tell you upfront.'],
    ['How much does car key replacement cost?','Depends on make, model, and key type. We provide upfront pricing, typically far less than dealership pricing.'],
    ['Can you program push-to-start keys?','Yes, for most makes and models.'],
    ['Do you come to my car?','Yes. Our mobile technicians come to you.'],
  ]},
  {slug:'car-key-programming', title:'Car Key Programming Austin TX | Transponder & Fob Programming', desc:'Car key programming in Austin, TX for domestic and imported vehicles. Sync new keys, reset immobilizers, delete lost keys. Call (737) 265-4627.', h1:'Car Key Programming in Austin, TX', lead:'Modern cars require electronic key programming. We handle it with advanced diagnostic tools for domestic and imported vehicles.', photo:{src:'images/Ignition-Switch-1024x576.webp',w:1024,h:576,alt:'Ignition switch and key programming in Austin, TX'}, sections:[
    ['Makes and models','Ford, Toyota, Honda, Mazda, Hyundai, and most other makes.'],
    ['What programming includes','Syncing new car keys, resetting immobilizer systems, and deleting lost keys from memory.'],
    ['On-site service','We come to you with diagnostic tools and programmers.'],
    ['Security benefit','Deleting lost keys protects against theft.'],
  ], faqs:[
    ['How long does programming take?','Most jobs take 10 to 45 minutes.'],
    ['Can you program a key I bought online?','Often yes, if it is compatible. We will verify before starting.'],
    ['Do you need the original key?','Not always. We can program from vehicle data in many cases.'],
    ['Is programming cheaper than the dealership?','Usually yes. We provide upfront pricing before work begins.'],
  ]},
  {slug:'duplicate-car-keys', title:'Duplicate Car Keys Austin TX | Spare Keys & Fobs', desc:'Car key duplication in Austin, TX - accurate copies for most makes and models, including worn or damaged originals. Call (737) 265-4627.', h1:'Duplicate Car Keys in Austin, TX', lead:'Having a spare key can save you from a lot of stress later. We provide accurate copies for most vehicle makes and models.', photo:{src:'images/car-key-duplication-copy.webp',w:612,h:407,alt:'Car key duplication in Austin, TX'}, sections:[
    ['Key types','Standard metal keys, remote keys, and smart fobs.'],
    ['Worn originals','We can duplicate even if the original is worn or partially damaged.'],
    ['Precision cutting','Each duplicate is cut and programmed using precision tools.'],
    ['On-site service','We come to you - no need to visit a shop.'],
  ], faqs:[
    ['How long does duplication take?','Most jobs take 15 to 30 minutes.'],
    ['Can you duplicate a key fob?','Yes, for most makes and models.'],
    ['Do you need the original key?','Yes, for duplication we need a working original.'],
    ['Is a spare key worth it?','Yes - it prevents lockouts and saves on emergency calls.'],
  ]},
  {slug:'erase-keys-from-memory', title:'Erase Car Keys From Memory Austin TX | Delete Lost Keys', desc:'Erase lost or stolen car keys from your vehicle memory in Austin, TX. Only your new keys will work. Call (737) 265-4627.', h1:'Erase Car Keys From Car Memory in Austin, TX', lead:'If you have lost your keys or had them stolen, it is important to erase them from your car system so only your new keys work.', photo:{src:'images/Erase-Key-From-Car-Memory.webp',w:1023,h:681,alt:'Erasing car keys from vehicle memory in Austin, TX'}, sections:[
    ['Why erase keys','Prevents stolen keys from starting your vehicle.'],
    ['Ideal for','Key loss, vehicle theft, or staff turnover for business fleet vehicles.'],
    ['What we do','Delete old keys from your vehicle computer memory so only new keys work.'],
    ['Combined service','Often done together with car key replacement.'],
  ], faqs:[
    ['How long does it take?','Most jobs take 10 to 45 minutes.'],
    ['Do you need to be at the car?','Yes, we connect to the vehicle OBD port on site.'],
    ['Can you erase keys for fleet vehicles?','Yes, ideal for business fleet turnover.'],
    ['Is it necessary after losing one key?','Recommended for security, especially if the key was stolen.'],
  ]},
  {slug:'master-key-system', title:'Master Key System Austin TX | Design & Installation', desc:'Master key systems in Austin, TX for offices, apartments, warehouses. Design, install, expand, rekey. 24/7 mobile service. Call (737) 265-4627.', h1:'Master Key System in Austin, TX', lead:'A master key system lets business owners or managers open every door while employees access only the areas they need.', photo:{src:'images/commercial-lock-cylinder.webp',w:584,h:394,alt:'Master key system cylinders in Austin, TX'}, sections:[
    ['What we do','We design, install, and maintain customized master key systems for offices, apartment buildings, and warehouses using high-security locks.'],
    ['Expand or reorganize','Existing systems can be expanded, rekeyed, or reorganized to match new staff or layout changes.'],
    ['Benefits','Simplified access management, improved security, and reduced key clutter.'],
    ['High-security hardware','Restricted keyways that resist unauthorized duplication.'],
  ], faqs:[
    ['How much does a master key system cost?','Depends on the number of doors and complexity. We provide a quote after a consultation.'],
    ['Can you rekey an existing system?','Yes. We can reorganize or expand existing systems.'],
    ['Do you service apartment buildings?','Yes, master key systems for multi-tenant properties.'],
    ['How long does installation take?','Depends on size; most small offices are done in a day.'],
  ]},
  {slug:'access-control', title:'Access Control System Austin TX | Keypads & Electronic Locks', desc:'Access control systems in Austin, TX - keypads, electronic locks, smart entry. Install and service for homes and businesses. Call (737) 265-4627.', h1:'Access Control System in Austin, TX', lead:'Control who enters your property with keypads, electronic locks, and smart entry systems for homes and businesses.', photo:{src:'images/What-do-locksmiths-use-ottawa.webp',w:745,h:400,alt:'Locksmith tools for access control in Austin, TX'}, sections:[
    ['What we install','Keypads, electronic access control, smart lock systems, and video entry.'],
    ['For businesses','Manage staff access, track entry, and revoke credentials instantly.'],
    ['For homes','Keyless entry, guest codes, and remote access via app.'],
    ['Service & repair','We service and repair existing access control systems.'],
  ], faqs:[
    ['Do you install keypads?','Yes, keypad entry systems for doors.'],
    ['Can access control work with my existing doors?','Usually yes. We assess and recommend compatible hardware.'],
    ['Is it secure?','Yes. Electronic access control adds layers of security over mechanical locks.'],
    ['Do you offer maintenance?','Yes, we service and repair access control systems.'],
  ]},
  {slug:'panic-bars', title:'Panic Bars & Exit Devices Austin TX | Code-Compliant Installation', desc:'Panic bars and exit devices in Austin, TX - install and repair code-compliant exit systems for offices, schools, retail. Call (737) 265-4627.', h1:'Panic Bars & Exit Devices in Austin, TX', lead:'We install and repair panic bars and exit devices that comply with commercial safety codes.', photo:{src:'images/commerciallocksmith-1024x576.webp',w:1024,h:576,alt:'Commercial exit device installation in Austin, TX'}, sections:[
    ['What we do','Install and repair panic bars and exit devices for offices, schools, and retail stores.'],
    ['Alarmed & non-alarmed','Both alarmed and non-alarmed exit systems available.'],
    ['Code compliance','Installed to meet commercial safety codes.'],
    ['Repair service','If a panic bar fails or does not latch properly, we service or replace it.'],
  ], faqs:[
    ['Do you repair existing panic bars?','Yes, we service and replace failing exit devices.'],
    ['Are your installations code-compliant?','Yes, we install to meet commercial safety codes.'],
    ['How long does installation take?','Most jobs take 1 to 2 hours.'],
    ['Do you install on fire-rated doors?','Yes, we service metal, glass, and fire-rated doors.'],
  ]},
  {slug:'home-lockout', title:'House Lockout Austin TX | 24/7 Home Lockout Service', desc:'House lockout service in Austin, TX - 24/7, damage-free entry, 10-45 min response. Call (737) 265-4627.', h1:'House Lockout Service in Austin, TX', lead:'Locked out of your home? Our residential locksmiths provide 24-hour house lockout service across Austin.', photo:{src:'images/house-lockout.webp',w:768,h:480,alt:'House lockout service in Austin, TX'}, sections:[
    ['Damage-free entry','We use professional unlocking tools designed to avoid damage whenever possible.'],
    ['All property types','Houses, condos, and apartments.'],
    ['Fast response','Average response time 20 to 30 minutes.'],
    ['Rekey after entry','If keys are lost or stolen, we can rekey or replace the lock on the spot.'],
  ], faqs:[
    ['Can you unlock my house without damage?','In most cases yes.'],
    ['Do I need ID?','Yes, photo ID showing your address.'],
    ['Are you available 24/7?','Yes, every day of the year.'],
    ['What if my lock is damaged?','We can repair or replace it on the spot.'],
  ]},
  {slug:'car-lockout', title:'Car Lockout Austin TX | 24/7 Vehicle Unlock Service', desc:'Car lockout service in Austin, TX - unlock all makes and models without damage, 24/7. Call (737) 265-4627.', h1:'Car Lockout Service in Austin, TX', lead:'Locked out of your car? We help you get back in quickly and safely using professional tools.', photo:{src:'images/automotive-locksmith-.webp',w:1280,h:720,alt:'Car lockout service in Austin, TX'}, sections:[
    ['All vehicles','Cars, SUVs, and trucks of all makes and models.'],
    ['No damage','We unlock without scratching paint or damaging weather seals.'],
    ['24/7 availability','Service available throughout Austin and nearby communities.'],
    ['Trunk unlocking','We also open jammed or electronically locked trunks.'],
  ], faqs:[
    ['How fast can you arrive?','Most calls reached within 20 to 30 minutes.'],
    ['Can you unlock my car without the key?','Yes, using professional tools.'],
    ['Do you damage the car?','No, we use non-destructive techniques.'],
    ['Can you make a key too?','Yes, we can cut and program a new key on the spot.'],
  ]},
  {slug:'business-lockout', title:'Business Lockout Austin TX | Commercial Entry Service', desc:'Business lockout service in Austin, TX - fast entry for offices, retail, industrial properties. 24/7. Call (737) 265-4627.', h1:'Business Lockout Service in Austin, TX', lead:'Locked out of your office, retail store, or commercial property? We provide emergency access for businesses, including after-hours response.', photo:{src:'images/commerciallocksmith-1024x576.webp',w:1024,h:576,alt:'Business lockout service in Austin, TX'}, sections:[
    ['All commercial locks','We service all commercial-grade locks, keypads, and access control systems.'],
    ['After-hours response','Available 24/7 for property managers and building supervisors.'],
    ['On-site repair','We can unlock, rekey, or replace locks during the same visit.'],
    ['Minimal downtime','Fast entry to get your business running again.'],
  ], faqs:[
    ['Are you available 24/7?','Yes, every day of the year.'],
    ['Can you service access control systems?','Yes.'],
    ['Do you provide upfront pricing?','Yes, clear pricing before work begins.'],
    ['Can you rekey after entry?','Yes, on the same visit.'],
  ]},
  {slug:'broken-key-extraction', title:'Broken Key Extraction Austin TX | Remove Jammed Keys', desc:'Broken key extraction in Austin, TX - remove jammed or broken keys from locks and ignitions. 24/7. Call (737) 265-4627.', h1:'Broken Key Extraction in Austin, TX', lead:'If your key snaps inside the lock or ignition, we safely extract the broken piece and restore functionality.', photo:{src:'images/locksmith-door.webp',w:643,h:428,alt:'Broken key extraction in Austin, TX'}, sections:[
    ['Locks and ignitions','We extract broken keys from door locks and car ignitions.'],
    ['No damage','Specialized tools extract the key without damaging the cylinder.'],
    ['New key on the spot','In many cases we cut and program a new key immediately.'],
    ['Repair if needed','If the lock is worn or bent, we rekey or replace it on the spot.'],
  ], faqs:[
    ['Can you extract a key broken in the ignition?','Yes.'],
    ['Will you damage my lock?','No, we use specialized extraction tools.'],
    ['Can you make a new key?','Yes, often on the spot.'],
    ['How long does it take?','Most jobs take 10 to 45 minutes.'],
  ]},
  {slug:'car-trunk-opening', title:'Car Trunk Opening Austin TX | Unlock Jammed Trunks', desc:'Car trunk opening service in Austin, TX - open jammed, broken, or electronically locked trunks. 24/7. Call (737) 265-4627.', h1:'Car Trunk Opening in Austin, TX', lead:'If your car trunk will not open, we can help - broken latch, jammed key, or electronic malfunction.', photo:{src:'images/pexels-negative-space-97075-1024x683.webp',w:1024,h:683,alt:'Car trunk opening service in Austin, TX'}, sections:[
    ['All makes and models','We service all vehicle makes and models.'],
    ['Electronic trunks','We handle remote and keyless entry systems.'],
    ['No damage','We open the trunk safely without damage.'],
    ['On-site service','We come to you.'],
  ], faqs:[
    ['Can you open an electronically locked trunk?','Yes.'],
    ['Will you damage my car?','No.'],
    ['How fast can you arrive?','Most calls reached within 20 to 30 minutes.'],
    ['Can you repair the latch?','We can assess and advise on repair or replacement.'],
  ]},
];
for (const sub of subs){
  pages.push({
    path: `/services/${sub.slug}.html`,
    title: sub.title,
    description: sub.desc,
    h1: sub.h1,
    lead: sub.lead,
    eyebrow: 'Austin Locksmith Pros',
    photo: sub.photo,
    sections: sub.sections,
    faqs: sub.faqs,
  });
}

// Blog index
pages.push({
  path: '/blog/index.html',
  title: 'Locksmith Blog | Security Tips & Guides | Austin Locksmith Pros',
  description: 'Locksmith tips, security guides, and local Austin locksmith advice from Austin Locksmith Pros. Rekeying, car keys, smart locks, and more.',
  h1: 'Austin Locksmith Pros Blog',
  lead: 'Security tips, lock guides, and local Austin locksmith advice to help you protect your home, car, and business.',
  eyebrow: 'Blog',
  sections: [
    ['Security tips for Austin homeowners','Learn how to secure your home with the right locks, rekeying, and smart lock upgrades.'],
    ['Automotive locksmith guides','Car key replacement, programming, and lockout help for Austin drivers.'],
    ['Commercial security','Master key systems, access control, and high-security locks for businesses.'],
  ],
  faqs: null,
});

// Blog posts
const posts = [
  {slug:'what-is-rekeying-a-lock', title:'What Is Rekeying a Lock? | Austin Locksmith Pros', desc:'Learn what rekeying a lock means, how it works, when to rekey, and why it is a cost-effective alternative to replacing locks.', h1:'What Is Rekeying a Lock?', lead:'Rekeying a lock is the process of changing the internal mechanism so it can be operated by a different key. The old key no longer works.', photo:{src:'images/schlage-rekey-kit.webp',w:700,h:419,alt:'Rekeying a lock cylinder in Austin, TX'}, body:`
<p>Rekeying a lock changes the internal pins of the cylinder so a new key operates it and the old key no longer works. The lock itself stays in place - only the cylinder is reconfigured. It is a cost-effective alternative to replacing the entire lock.</p>
<h2>How rekeying works</h2>
<p>A locksmith removes the cylinder, replaces the key pins and tumblers to match a new key, and reassembles the lock. If you want one key to open several doors, the locks must be the same brand or keyway.</p>
<h2>When should you rekey?</h2>
<ul>
<li>You moved into a new home</li>
<li>A tenant moved out</li>
<li>Keys were lost or stolen</li>
<li>You want one key for all doors</li>
</ul>
<h2>Can you rekey without the original key?</h2>
<p>Yes, but it is more difficult and time-consuming, and costs more, because the cylinder must be disassembled. A professional locksmith can do it.</p>
<h2>Rekey vs. replace</h2>
<p>Rekeying keeps the existing lock and changes the key. Replacing installs new hardware. Rekey if the hardware is in good condition; replace if locks are outdated or damaged.</p>
<p>Need help? <a href="../index.html#contact">Contact Austin Locksmith Pros</a> or call (737)&nbsp;265&#8209;4627.</p>
`},
  {slug:'can-a-locksmith-make-a-car-key-from-vin', title:'Can a Locksmith Make a Car Key From a VIN? | Austin Locksmith Pros', desc:'Can a locksmith make a car key from a VIN number? Learn the feasibility, limitations, and steps involved in VIN-based car key replacement.', h1:'Can a Locksmith Make a Car Key From a VIN Number?', lead:'Modern locksmiths are equipped with advanced tools. Whether a locksmith can make a car key from a VIN depends on the make and model.', photo:{src:'images/pexels-negative-space-97075-1024x683.webp',w:1024,h:683,alt:'Car key replacement in Austin, TX'}, body:`
<p>The Vehicle Identification Number (VIN) is a unique code assigned to every vehicle. It provides crucial information about the car but does not typically include the specific key code required for key cutting.</p>
<h2>Feasibility</h2>
<p>The ability to create a new car key from a VIN primarily depends on the specific make and model. Locksmiths may use specialized databases to retrieve the key code necessary for cutting.</p>
<h2>Limitations</h2>
<p>Modern car key systems incorporate transponder chips and immobilizers, adding security layers that require specialized programming. In such cases, a VIN alone may not be sufficient.</p>
<h2>Steps involved</h2>
<ol>
<li>Access the VIN database to retrieve key code information</li>
<li>Verify vehicle ownership</li>
<li>Cut and program the new key</li>
<li>Test and verify functionality</li>
</ol>
<p>Consult a qualified locksmith to ensure accuracy. <a href="../index.html#contact">Contact Austin Locksmith Pros</a> or call (737)&nbsp;265&#8209;4627.</p>
`},
  {slug:'can-a-locksmith-pick-a-schlage-deadbolt', title:'Can a Locksmith Pick a Schlage Deadbolt? | Austin Locksmith Pros', desc:'Can a locksmith pick a Schlage deadbolt? Learn about Schlage security features, picking difficulty, and why professional locksmiths matter.', h1:'Can a Locksmith Pick a Schlage Deadbolt?', lead:'Schlage deadbolts are well-regarded for durability and security. A skilled locksmith can pick one, but it is significantly more challenging than a standard lock.', photo:{src:'images/locksmith-door.webp',w:643,h:428,alt:'Locksmith servicing a Schlage deadbolt in Austin, TX'}, body:`
<p>Schlage deadbolts often include anti-pick pins (spool, serrated, or mushroom), high-quality materials, and complex keyways that resist picking. However, a trained locksmith with the right tools can overcome these obstacles.</p>
<h2>Locksmith skills and tools</h2>
<p>Experienced locksmiths use advanced pick sets, electric pick guns, and specialized tools. They also adhere to a strict code of ethics and verify ownership before servicing a lock.</p>
<h2>Ethical considerations</h2>
<p>Always hire a licensed, reputable locksmith. Unauthorized lock picking is illegal. A professional will ask for proof of ownership before attempting to pick a lock.</p>
<p>Need lock service? <a href="../index.html#contact">Contact Austin Locksmith Pros</a> or call (737)&nbsp;265&#8209;4627.</p>
`},
  {slug:'top-10-door-lock-brands', title:'Top 10 Most Trusted Door Lock Brands | Austin Locksmith Pros', desc:'The most trusted door lock brands - Schlage, Kwikset, Medeco, Mul-T-Lock, Baldwin, Yale and more. A guide from Austin Locksmith Pros.', h1:'Top 10 Most Trusted Door Lock Brands', lead:'Door lock brands are an important part of home security. Here are the most trusted brands for residential and commercial use.', photo:{src:'images/do-locksmiths-replace-door-knobs.webp',w:1000,h:500,alt:'Door lock brands and hardware in Austin, TX'}, body:`
<p>Choosing the right lock brand matters for security and durability. Here are trusted brands we service and install:</p>
<ul>
<li><strong>Schlage</strong> - high-security residential and commercial locks</li>
<li><strong>Kwikset</strong> - popular residential locks with SmartKey technology</li>
<li><strong>Medeco</strong> - high-security restricted keyway locks</li>
<li><strong>Mul-T-Lock</strong> - advanced high-security locking systems</li>
<li><strong>Baldwin</strong> - premium decorative hardware</li>
<li><strong>Yale</strong> - smart locks and electronic access</li>
</ul>
<h2>Lock grades</h2>
<p>ANSI/BHMA grades: Grade 1 (highest), Grade 2 (high quality), Grade 3 (basic). For most homes, Grade 2 is sufficient; upgrade to Grade 1 for high-security needs.</p>
<p>Need help choosing? <a href="../index.html#contact">Contact Austin Locksmith Pros</a> or call (737)&nbsp;265&#8209;4627.</p>
`},
  {slug:'electronic-access-control', title:'Electronic Access Control: Future of Security | Austin Locksmith Pros', desc:'Electronic access control systems for homes and businesses in Austin. Keycards, biometrics, mobile access, cloud-based systems.', h1:'Electronic Access Control: The Future of Security', lead:'Electronic access control systems have revolutionized security for businesses, residential areas, and organizations.', photo:{src:'images/What-do-locksmiths-use-ottawa.webp',w:745,h:400,alt:'Access control systems in Austin, TX'}, body:`
<p>Electronic access control uses electronic devices to control access to a specific area instead of traditional keys and locks.</p>
<h2>Types of systems</h2>
<ul>
<li><strong>Keycard / key fob</strong> - programmed access at specific times</li>
<li><strong>Biometric</strong> - fingerprint, facial recognition, retina scan</li>
<li><strong>Mobile access</strong> - unlock doors with your smartphone</li>
<li><strong>Cloud-based</strong> - remote management from anywhere</li>
</ul>
<h2>Benefits</h2>
<p>Enhanced security, real-time monitoring, flexibility, cost savings, and integration with alarms and surveillance.</p>
<p>Interested in access control? <a href="../index.html#contact">Contact Austin Locksmith Pros</a> or call (737)&nbsp;265&#8209;4627.</p>
`},
  {slug:'best-smart-locks', title:'Best Smart Locks for Your Home | Austin Locksmith Pros', desc:'A guide to the best smart locks for Austin homeowners - Schlage Encode, August, Kwikset, Yale and more. Installation by Austin Locksmith Pros.', h1:'The Best Smart Locks for Your Home', lead:'Smart locks offer keyless entry, remote access, and integration with smart home systems. Here is what to consider.', photo:{src:'images/residential-locksmith-.webp',w:1280,h:720,alt:'Smart lock installation in Austin, TX'}, body:`
<p>When choosing a smart lock, consider ANSI/BHMA grade (Grade 1 highest), compatibility with your smart home ecosystem, security features, and ease of use.</p>
<h2>Popular options</h2>
<ul>
<li><strong>Schlage Encode</strong> - Grade 1, built-in Wi-Fi, top pick</li>
<li><strong>August Wi-Fi Smart Lock</strong> - retrofit adapter, DoorSense</li>
<li><strong>Kwikset SmartCode 916</strong> - touchscreen, Z-Wave</li>
<li><strong>Yale Assure</strong> - touchscreen keypad, smart home compatible</li>
</ul>
<p>We install and program smart locks across Austin. <a href="../index.html#contact">Contact Austin Locksmith Pros</a> or call (737)&nbsp;265&#8209;4627.</p>
`},
  {slug:'which-locks-are-hard-to-open', title:'Which Locks Are Hard to Open? | Austin Locksmith Pros', desc:'High-security, electronic, smart, bank vault, and automotive locks that are hardest to open - explained by Austin Locksmith Pros.', h1:'Which Locks Are Hard to Open?', lead:'Certain locks pose significant challenges even for experienced locksmiths. Here are the types that are hardest to open.', photo:{src:'images/commercial-lock-cylinder.webp',w:584,h:394,alt:'High-security lock in Austin, TX'}, body:`
<ul>
<li><strong>High-security locks</strong> - precision keyways, drill-resistant components, complex pin configurations</li>
<li><strong>Electronic and smart locks</strong> - proprietary software, encryption, biometric scanners</li>
<li><strong>Bank vaults and safes</strong> - multi-layered security, time locks, relocking mechanisms</li>
<li><strong>Automobile locks</strong> - transponder keys, sidebar pins, electronic ignition</li>
<li><strong>Specialty and custom locks</strong> - unusual mechanisms, limited documentation</li>
</ul>
<p>Need high-security lock service? <a href="../index.html#contact">Contact Austin Locksmith Pros</a> or call (737)&nbsp;265&#8209;4627.</p>
`},
  {slug:'does-landlord-pay-for-locksmith', title:'Does Your Landlord Pay for a Locksmith? | Austin Locksmith Pros', desc:'Who pays for locksmith services in a rental - landlord vs tenant responsibilities, lockouts, and lock changes in Austin, TX.', h1:'Does Your Landlord Have to Pay for a Locksmith?', lead:'When facing a lockout, tenants often wonder who bears the responsibility. Here is how landlord-tenant responsibilities typically work.', photo:{src:'images/house-lockout.webp',w:768,h:480,alt:'House lockout in Austin, TX'}, body:`
<p>Landlords are generally responsible for maintaining functional locks and covering repairs due to normal wear and tear. Tenants may be liable for costs from lost keys or negligent damage.</p>
<h2>Landlord obligations</h2>
<p>Provide a safe, secure living environment, including functional locks on doors and windows.</p>
<h2>Tenant responsibilities</h2>
<p>Lost keys, damage from negligence, or unauthorized lock changes may be the tenant's cost.</p>
<h2>Communication</h2>
<p>Prompt communication between landlord and tenant resolves lock issues fastest. When in doubt, consult your lease and local laws.</p>
<p>Need a locksmith in Austin? <a href="../index.html#contact">Contact Austin Locksmith Pros</a> or call (737)&nbsp;265&#8209;4627.</p>
`},
  {slug:'home-security-checklist-austin', title:'Home Security Checklist for Austin Homeowners | Austin Locksmith Pros', desc:'A practical home security checklist for Austin homeowners - locks, lighting, alarms, and habits that prevent break-ins. From Austin Locksmith Pros.', h1:'Home Security Checklist for Austin Homeowners', lead:'A few simple steps can dramatically reduce your risk of a break-in. Use this checklist to audit your home security.', photo:{src:'images/residential-locksmith-.webp',w:1280,h:720,alt:'Home security in Austin, TX'}, body:`
<h2>Doors and locks</h2>
<ul>
<li>Rekey or replace locks when you move in - you don't know who has old keys.</li>
<li>Use Grade 1 or Grade 2 deadbolts on all exterior doors.</li>
<li>Ensure strike plates are secured with 3-inch screws into the stud.</li>
<li>Check that all doors close and latch properly - a misaligned door is an easy target.</li>
<li>Consider a smart lock for keyless entry and guest codes.</li>
</ul>
<h2>Windows</h2>
<ul>
<li>Lock all windows, including second-floor and basement.</li>
<li>Add window locks or pins to sliding windows.</li>
<li>Use window film or security glass for ground-floor windows.</li>
<li>Trim bushes and trees that block sightlines to windows.</li>
</ul>
<h2>Lighting and visibility</h2>
<ul>
<li>Install motion-sensor lights at all entry points.</li>
<li>Keep porch lights on at night or use smart lighting on a schedule.</li>
<li>Ensure house numbers are visible from the street for emergency responders.</li>
</ul>
<h2>Garage and exterior</h2>
<ul>
<li>Never leave the garage door opener in a car parked outside.</li>
<li>Lock the door between the garage and the house.</li>
<li>Secure sheds and detached garages - they often hold tools that can be used to break in.</li>
</ul>
<h2>Habits</h2>
<ul>
<li>Don't hide spare keys under mats or in fake rocks - use a real lockbox.</li>
<li>Don't post vacation plans on social media in real time.</li>
<li>Have a neighbor collect mail and packages when you're away.</li>
<li>Test your locks twice a year and lubricate with graphite or dry PTFE.</li>
</ul>
<p>Need help upgrading your home security? <a href="../index.html#contact">Contact Austin Locksmith Pros</a> or call (737)&nbsp;265&#8209;4627 for a free assessment.</p>
`},
  {slug:'what-to-do-locked-out-of-car', title:'Locked Out of Your Car in Austin? Step-by-Step Guide', desc:'Locked out of your car in Austin, TX? Step-by-step what to do, what to avoid, and how a mobile auto locksmith gets you back in fast.', h1:'Locked Out of Your Car in Austin: Step-by-Step Guide', lead:'A car lockout is stressful but manageable. Follow these steps to get back in safely and quickly.', photo:{src:'images/automotive-locksmith-.webp',w:1280,h:720,alt:'Car lockout service in Austin, TX'}, body:`
<h2>Step 1: Check every door and the trunk</h2>
<p>Sometimes one door is unlocked, or the trunk release works. Check all doors, including the rear and passenger side, before assuming you're fully locked out.</p>
<h2>Step 2: Look for a spare key</h2>
<p>Check your wallet, bag, at home, with a spouse or family member, or in a magnetic hide-a-key box. A spare key saves time and money.</p>
<h2>Step 3: Check roadside assistance</h2>
<p>If you have AAA, insurance roadside coverage, or a manufacturer program, call them. Response times vary (30-90 minutes) and there may be a fee.</p>
<h2>Step 4: Call a mobile auto locksmith</h2>
<p>A mobile auto locksmith is usually the fastest option - 15-30 minutes from call to open. We come to you and open the car without damage. Cost: $65-$125 daytime, $95-$175 after hours.</p>
<h2>What NOT to do</h2>
<ul>
<li>Don't break a window - glass replacement costs far more than a service call.</li>
<li>Don't use a coat hanger or slim jim on modern cars - you can damage weather stripping, airbags, or wiring.</li>
<li>Don't call a tow truck unless needed - towing adds cost and a trip to a shop.</li>
<li>If a child or pet is locked inside, call 911 first - time matters.</li>
</ul>
<h2>If you also lost your keys</h2>
<p>We can cut and program a replacement key on the spot for most makes and models - often faster and cheaper than the dealership. See our <a href="../services/car-key-replacement.html">car key replacement</a> and <a href="../services/car-key-programming.html">key programming</a> services.</p>
<h2>Prevent the next lockout</h2>
<ul>
<li>Keep a spare key in a magnetic box under the car (hidden well).</li>
<li>Give a spare to a trusted family member.</li>
<li>Consider a smart key or keyless entry fob.</li>
<li>Save our number: (737)&nbsp;265&#8209;4627.</li>
</ul>
<p>Need help now? <a href="../index.html#contact">Contact Austin Locksmith Pros</a> or call (737)&nbsp;265&#8209;4627.</p>
`},
  {slug:'summer-vacation-home-security', title:'Summer Vacation Home Security Tips | Austin Locksmith Pros', desc:'Heading out for summer vacation? Secure your Austin home with these lock, lighting, and habit tips from Austin Locksmith Pros.', h1:'Summer Vacation Home Security Tips for Austin Homeowners', lead:'A few simple steps before you leave can dramatically reduce your risk of a break-in while you are away.', photo:{src:'images/residential-locksmith-.webp',w:1280,h:720,alt:'Home security for summer vacation in Austin, TX'}, body:`
<h2>Before you leave</h2>
<ul>
<li><strong>Rekey if you recently moved in or lost a key.</strong> You don't know who has old keys.</li>
<li><strong>Check all locks.</strong> Make sure every exterior door locks smoothly and the strike plates are secure.</li>
<li><strong>Don't hide a spare key outside.</strong> Use a real lockbox or leave a key with a trusted neighbor.</li>
<li><strong>Lock all windows</strong>, including second-floor and basement.</li>
<li><strong>Close blinds and curtains</strong> so valuables aren't visible.</li>
</ul>
<h2>Make it look occupied</h2>
<ul>
<li><strong>Use smart lighting on a schedule.</strong> Random on/off patterns beat a single lamp left on.</li>
<li><strong>Have a neighbor collect mail and packages.</strong> Piled-up mail signals an empty home.</li>
<li><strong>Park a car in the driveway</strong> if possible.</li>
<li><strong>Don't post vacation plans on social media in real time.</strong> Share photos after you return.</li>
<li><strong>Stop newspaper and package deliveries.</strong></li>
</ul>
<h2>Technology that helps</h2>
<ul>
<li><strong>Smart locks</strong> let you check and lock doors remotely and give temporary codes to pet sitters or house cleaners.</li>
<li><strong>Doorbell cameras</strong> let you see and speak to visitors from anywhere.</li>
<li><strong>Alarm systems</strong> with monitoring provide the fastest response to a break-in.</li>
<li><strong>Smart plugs</strong> can turn lamps and TVs on and off on a schedule.</li>
</ul>
<h2>When you return</h2>
<ul>
<li>Check locks and doors for signs of tampering.</li>
<li>If anything looks off, call us before entering.</li>
<li>Reset any temporary access codes you gave out.</li>
</ul>
<p>Need help securing your home before your trip? <a href="../index.html#contact">Contact Austin Locksmith Pros</a> or call (737)&nbsp;265&#8209;4627 for a free security assessment.</p>
`},
  {slug:'winter-home-security-tips-austin', title:'Winter Home Security Tips for Austin | Austin Locksmith Pros', desc:'Winter home security tips for Austin homeowners - prevent break-ins during the holidays and cold months. From Austin Locksmith Pros.', h1:'Winter Home Security Tips for Austin Homeowners', lead:'Winter brings shorter days, holiday travel, and more time away from home. Here is how to keep your Austin home secure through the cold months.', photo:{src:'images/residential-locksmith-.webp',w:1280,h:720,alt:'Winter home security in Austin, TX'}, body:`
<h2>Holiday travel security</h2>
<ul>
<li><strong>Don't announce your travel on social media</strong> until you're back. Share photos after, not during.</li>
<li><strong>Have a neighbor collect mail and packages.</strong> Piled-up mail signals an empty home.</li>
<li><strong>Use smart lighting on a schedule.</strong> Random on/off patterns beat a single lamp left on.</li>
<li><strong>Don't hide a spare key outside.</strong> Use a real lockbox or leave a key with a trusted neighbor.</li>
<li><strong>Arm your alarm system</strong> and notify your monitoring company of travel dates.</li>
</ul>
<h2>Lock and door checks before winter</h2>
<ul>
<li><strong>Rekey if you recently moved in or lost a key.</strong> You don't know who has old keys.</li>
<li><strong>Check all locks.</strong> Make sure every exterior door locks smoothly and the strike plates are secure with 3-inch screws.</li>
<li><strong>Lubricate locks</strong> with graphite or dry PTFE - cold weather can make mechanisms stiff.</li>
<li><strong>Inspect weather stripping.</strong> Gaps around doors let in cold air and make locks harder to operate.</li>
<li><strong>Consider a smart lock</strong> for keyless entry and guest codes while you're away.</li>
</ul>
<h2>Garage and exterior</h2>
<ul>
<li><strong>Never leave the garage door opener in a car parked outside.</strong></li>
<li><strong>Lock the door between the garage and the house.</strong></li>
<li><strong>Secure sheds and detached garages.</strong> They often hold tools that can be used to break in.</li>
<li><strong>Trim bushes and trees</strong> that block sightlines to windows and doors.</li>
<li><strong>Install motion-sensor lights</strong> at all entry points.</li>
</ul>
<h2>After a storm or freeze</h2>
<ul>
<li><strong>Check locks and doors</strong> for damage or misalignment after severe weather.</li>
<li><strong>If a lock is frozen,</strong> use a lock de-icer or warm key - never force it.</li>
<li><strong>If you suspect tampering,</strong> call us before entering.</li>
</ul>
<p>Need help securing your home before winter? <a href="../index.html#contact">Contact Austin Locksmith Pros</a> or call (737)&nbsp;265&#8209;4627 for a free assessment.</p>
`},
];
for (const post of posts){
  pages.push({
    path: `/blog/${post.slug}.html`,
    title: post.title,
    description: post.desc,
    h1: post.h1,
    lead: post.lead,
    eyebrow: 'Austin Locksmith Pros Blog',
    photo: post.photo,
    body: post.body,
  });
}

// Service areas page
pages.push({
  path: '/service-areas.html',
  title: 'Service Areas | Austin Locksmith Pros & Central Texas',
  description: 'Austin Locksmith Pros serves Austin and 22 surrounding Central Texas cities. 24/7 mobile locksmith. Call (737) 265-4627.',
  h1: 'Service Areas',
  lead: 'We provide 24/7 mobile locksmith service across Austin and 22 surrounding Central Texas cities. A real locksmith, dispatched from within the region.',
  eyebrow: 'Where We Serve',
  photo: {src:'images/handy-man.webp',w:640,h:424,alt:'Locksmith serving Central Texas'},
  sections: [
    ['Austin metro','Austin, Round Rock, Cedar Park, Pflugerville, Georgetown, Leander, Lakeway, Bee Cave, Westlake Hills.'],
    ['Hill Country','Dripping Springs, Spicewood, Wimberley, Driftwood, Lago Vista.'],
    ['South & east','Buda, Kyle, Hutto, Manor, Del Valle, San Marcos, Jollyville, Liberty Hill.'],
  ],
  faqs: [
    ['Do you charge travel fees?','We provide upfront pricing before any work begins, including any travel considerations.'],
    ['How fast can you reach me?','Most calls in the Austin metro are reached within 10 to 45 minutes.'],
    ['Do you serve areas outside this list?','Call us - we may be able to help or refer you.'],
  ],
});

// Generate
for (const p of pages){
  const depth = p.path.split('/').length - 2; // /foo.html -> 0, /services/x.html ->1, /blog/x.html ->1
  renderPage(p, depth);
}

// Blog index listing
const blogIndexPath = path.join(root, 'blog', 'index.html');
// already generated via pages above
console.log('done');
