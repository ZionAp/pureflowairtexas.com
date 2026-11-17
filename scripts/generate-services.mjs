import fs from 'node:fs';
import path from 'node:path';

import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const siteUrl = 'https://www.austinlocksmithpros.com';
const phone = '(737) 265-4627';
const phoneHref = 'tel:+17372654627';
const email = 'austinlocksmithpros@gmail.com';

const pages = [
  {
    slug: 'emergency',
    title: 'Emergency Locksmith Austin TX | 24/7 Lockout Service',
    description: '24/7 emergency locksmith in Austin, TX - home, car & business lockouts, broken key extraction, fast 10-45 min response. We come to you. Call (737) 265-4627.',
    h1: 'Emergency Locksmith in Austin, TX',
    lead: 'Locked out of your home, car, or business? Our 24/7 emergency locksmiths respond across Austin and Central Texas in 10 to 45 minutes. We come to you - no towing, no trip to a shop.',
    photo: { src: '../images/emergency-locksmith.webp', w: 724, h: 483, alt: 'Emergency locksmith arriving at a home lockout in Austin, TX' },
    services: [
      ['Home Lockouts', 'Locked out of your house, condo, or apartment? We open doors quickly without damaging the lock whenever possible, day or night, every day of the year.'],
      ['Car Lockouts', 'Locked out of your vehicle? Our mobile technicians unlock all makes and models without scratching paint or damaging weather seals.'],
      ['Business Lockouts', 'Locked out of your office, retail store, or commercial property? We provide emergency access for businesses, including after-hours response for property managers.'],
      ['Broken Key Extraction', 'If your key snaps inside the lock or ignition, we safely extract the broken piece and restore functionality - often cutting a new key on the spot.'],
      ['Car Trunk Unlocking', 'Trunk won\'t open? We open jammed, broken, or electronically locked trunks safely without damage.'],
      ['24/7 Availability', 'We operate 24 hours a day, 7 days a week, every day of the year including holidays, with clear upfront pricing before any work begins.'],
    ],
    bullets: ['Home, car & business lockouts', 'Broken key extraction', 'Car trunk unlocking', 'Damage-free entry', '10-45 min response', 'After-hours service'],
    faqs: [
      ['How fast can you get to me in Austin?', 'Most of Austin and the surrounding metro we reach in 10 to 45 minutes. We dispatch from within the city. If you are in a more remote area we will give you an honest time estimate when you call.'],
      ['Do I need to show ID?', 'Yes. For a home lockout we ask for photo ID showing your address. For a car lockout, your registration or insurance slip works. This is standard practice and protects everyone involved.'],
      ['Are you available on weekends and holidays?', 'Yes. We operate 24 hours a day, 7 days a week, every day of the year including holidays.'],
      ['Can you unlock my door without damage?', 'In most cases yes. We use professional unlocking tools designed to avoid damage whenever possible.'],
      ['Is there an after-hours fee?', 'Emergency and late-night calls may include an after-hours service fee depending on time and distance, but there are no hidden charges - we provide clear upfront pricing before any work begins.'],
    ],
  },
  {
    slug: 'residential',
    title: 'Residential Locksmith Austin TX | Lock Change & Rekeying',
    description: 'Residential locksmith in Austin, TX - lock changes, rekeying, house lockouts, smart lock installation, deadbolts. Mobile service, most jobs done in one visit. Call (737) 265-4627.',
    h1: 'Residential Locksmith in Austin, TX',
    lead: 'Need a residential locksmith in Austin? We provide fast, professional service for lock changes, lock replacements, door rekeying, and house lockouts anywhere in the city. Our mobile locksmiths arrive fully equipped and complete most residential jobs in one visit.',
    photo: { src: '../images/residential-locksmith-.webp', w: 1280, h: 720, alt: 'Residential locksmith changing a front door lock in Austin, TX' },
    services: [
      ['Lock Change & Replacement', 'Just moved into a new home or want stronger security? We replace damaged, outdated, or compromised locks and install high-security deadbolts and smart lock systems. Every installation includes proper alignment and hardware inspection.'],
      ['Door Rekeying', 'Rekeying changes the internal pins of your existing lock so old keys no longer work - often more affordable than full lock replacement. Recommended after moving in, tenant turnover, lost keys, or to use one key for all doors.'],
      ['House Lockout Service', 'Locked out of your home? Our residential locksmiths provide 24-hour house lockout service across Austin. We use professional unlocking tools designed to prevent damage whenever possible. Average response 20 to 30 minutes.'],
      ['Smart Lock Installation', 'We install and upgrade your home with modern security solutions including keypad entry locks, Wi-Fi smart locks, high-security cylinders, and reinforced strike plates. We help you choose the right option based on your door type.'],
      ['Deadbolt & Hardware Upgrade', 'Upgrade to Grade 1 or Grade 2 deadbolts, reinforced strike plates, and security hardware for stronger protection against forced entry.'],
      ['Broken Key Extraction', 'If your key snaps inside the lock, we safely extract the broken piece and restore functionality - often cutting a new key on the spot.'],
    ],
    bullets: ['Lock change & replacement', 'Door rekeying', 'House lockout service', 'Smart lock installation', 'Deadbolt upgrades', 'Broken key extraction'],
    faqs: [
      ['How much does it cost to change locks in Austin?', 'Pricing depends on the type of lock and number of doors. We provide upfront pricing before starting any work.'],
      ['Should I rekey or replace my locks?', 'If the hardware is in good condition, rekeying is usually enough. If locks are outdated or damaged, replacement is recommended.'],
      ['How long does residential lock service take?', 'Most residential jobs take between 20 and 45 minutes.'],
      ['Can you unlock my house without damage?', 'In most cases yes. We use professional techniques designed to avoid damage.'],
      ['Do you install smart locks?', 'Yes. We install keypad entry locks, Wi-Fi smart locks, high-security cylinders, and reinforced strike plates, and help you choose based on your door type and security needs.'],
    ],
  },
  {
    slug: 'automotive',
    title: 'Automotive Locksmith Austin TX | Car Key Replacement & Programming',
    description: 'Automotive locksmith in Austin, TX - car key replacement, duplication, transponder programming, ignition repair, car lockouts, trunk unlocking. Mobile service, most jobs one visit. Call (737) 265-4627.',
    h1: 'Automotive Locksmith in Austin, TX',
    lead: 'Getting locked out of your car or losing your keys can happen at the worst times - that\'s when Austin Locksmith Pros is ready to help. Our automotive locksmith services in Austin cover everything from car key programming to ignition repair, available 24 hours a day across the city and surrounding areas.',
    photo: { src: '../images/automotive-locksmith-.webp', w: 1280, h: 720, alt: 'Automotive locksmith service in Austin, TX' },
    services: [
      ['Car Key Replacement', 'Losing your car key doesn\'t always mean a trip to the dealership. We cut and program new car keys on the spot for most vehicle brands, saving you time and towing costs. Regular, fob, transponder, and push-to-start systems.'],
      ['Car Key Duplication', 'Having a spare key can save you from a lot of stress later. We provide accurate copies for most vehicle makes and models, including standard metal keys, remote keys, and smart fobs - even if the original is worn or damaged.'],
      ['Car Key Programming', 'Modern cars require electronic key programming. We handle it with advanced diagnostic tools for domestic and imported vehicles, including Ford, Toyota, Honda, Mazda, and Hyundai - syncing new keys, resetting immobilizers, and deleting lost keys from memory.'],
      ['Ignition Repair & Replacement', 'If your key won\'t turn or the ignition feels stuck, it could be a worn cylinder or damaged key. We rebuild ignitions, replace faulty switches, or install new OEM-grade parts on site - often rekeying to match your existing keys.'],
      ['Car Trunk Unlocking', 'If your car trunk won\'t open, we can help - broken latch, jammed key, or electronic malfunction. We open it safely without damage for all makes and models.'],
      ['Car Lockout Service', 'Locked out of your car? We help you get back in quickly and safely using professional tools, without scratching paint or damaging weather seals. Available 24/7 throughout Austin and nearby communities.'],
      ['Erase Keys from Car Memory', 'If you\'ve lost your keys or had them stolen, we delete old keys from your vehicle\'s computer memory so only your new keys work - ideal after key loss, theft, or fleet turnover.'],
    ],
    bullets: ['Car key replacement', 'Key duplication', 'Transponder programming', 'Ignition repair', 'Car lockouts', 'Trunk unlocking'],
    faqs: [
      ['Can a locksmith make a car key without the original?', 'Yes. In most cases we can cut and program a new key from your vehicle\'s information. Some newer models require dealer-level tools; we\'ll tell you upfront.'],
      ['How much does car key replacement cost?', 'It depends on the vehicle make, model, and key type. We provide upfront pricing before any work begins - typically far less than dealership pricing.'],
      ['Can you program keys for push-to-start cars?', 'Yes, for most makes and models. We use advanced diagnostic tools and come to you.'],
      ['Will you come to where my car is parked?', 'Yes. Our mobile technicians come to you - home, parking lot, roadside - fully equipped with key-cutting machines and programmers.'],
      ['Can you delete lost keys from my car?', 'Yes. We can erase old keys from your vehicle\'s computer memory so only your new keys work.'],
    ],
  },
  {
    slug: 'commercial',
    title: 'Commercial Locksmith Austin TX | Business Security & Master Keys',
    description: 'Commercial locksmith in Austin, TX - business lockouts, master key systems, high-security locks, panic bars, rekeying, door hardware. 24/7 mobile service. Call (737) 265-4627.',
    h1: 'Commercial Locksmith in Austin, TX',
    lead: 'Austin Locksmith Pros provides full-service commercial locksmith solutions for offices, retail stores, industrial facilities, and property managers across Austin and Central Texas. Our technicians handle everything from business lockouts to master key systems and high-security upgrades, available 24 hours a day.',
    photo: { src: '../images/commerciallocksmith-1024x576.webp', w: 1024, h: 576, alt: 'Commercial locksmith installing a lock in Austin, TX' },
    services: [
      ['Business Lockout Service', 'Fast entry for offices, retail stores, and industrial properties. Whether you lost your keys, the lock jammed, or an electronic system stopped working, we open the door and restore access quickly. We service all commercial-grade locks, keypads, and access control systems.'],
      ['Master Key System', 'We design, install, and maintain customized master key systems for offices, apartment buildings, and warehouses using high-security locks. Existing systems can be expanded, rekeyed, or reorganized to match new staff or layout changes.'],
      ['High-Security Lock Installation', 'We install commercial-grade deadbolts, restricted keyway locks, and anti-bump systems meeting ANSI Grade 1 standards, sourced from trusted brands like Medeco, Mul-T-Lock, and Abloy - ideal for offices, warehouses, and retail.'],
      ['Panic Bars & Exit Devices', 'We install and repair panic bars and exit devices that comply with commercial safety codes. Alarmed and non-alarmed exit systems for offices, schools, and retail stores.'],
      ['Rekeying for Offices', 'One of the most cost-effective ways to maintain control over who can access your business - for new tenants, employee turnover, or security upgrades. Available same-day across Austin.'],
      ['Door Closer & Hinge Repair', 'We adjust, repair, or replace hydraulic closers, automatic door systems, and heavy-duty hinges to maintain proper alignment and controlled closing speed.'],
      ['Broken Key Extraction', 'We remove jammed or broken keys from commercial locks quickly and safely, rekeying or replacing on the spot if the lock is worn.'],
      ['Lock Maintenance & Hardware Replacement', 'We inspect, lubricate, and adjust commercial lock systems to keep them functioning smoothly, replacing cylinders, levers, or strike plates with high-quality hardware.'],
      ['Security Audits & Consultations', 'We review doors, locks, keys, and access systems and provide a simple report with recommendations for upgrades or improvements.'],
    ],
    bullets: ['Business lockouts', 'Master key systems', 'High-security locks', 'Panic bars & exits', 'Office rekeying', 'Door hardware repair'],
    faqs: [
      ['Do you service businesses after hours?', 'Yes. Our mobile locksmiths are available 24/7 throughout Austin and surrounding areas for scheduled or emergency service.'],
      ['Can you rekey an entire office building?', 'Yes. We rekey individual doors or entire buildings, including master key hierarchy changes for new tenants or staff turnover.'],
      ['Do you install access control systems?', 'Yes. We install and service keypads, electronic access control, and smart lock systems for commercial properties.'],
      ['Are your commercial locks code-compliant?', 'Yes. Panic bars and exit devices are installed to meet commercial safety codes, and high-security hardware meets ANSI Grade 1 standards.'],
      ['Do you offer maintenance plans?', 'We provide lock maintenance and hardware replacement to keep commercial systems functioning smoothly year-round.'],
    ],
  },
];

function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function serviceCards(items){
  return items.map(([title, desc]) => `
                <div class="service-detail">
                    <div class="service-detail-content">
                        <h3>${esc(title)}</h3>
                        <p>${esc(desc)}</p>
                    </div>
                </div>`).join('\n');
}

function faqItems(items){
  return items.map(([q, a]) => `
                <div class="faq-item">
                    <h3>${esc(q)}</h3>
                    <p>${esc(a)}</p>
                </div>`).join('\n');
}

const headTpl = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const headStart = headTpl.indexOf('<main id="main">');
const head = headTpl.slice(0, headStart);
const tailStart = headTpl.indexOf('</main>') + '</main>'.length;
const tail = headTpl.slice(tailStart);

for (const p of pages){
  const url = `${siteUrl}/services/${p.slug}.html`;
  let h = head;
  // adjust relative paths for services/ subfolder
  h = h.replace(/href="images\//g, 'href="../images/');
  h = h.replace(/href="fonts\//g, 'href="../fonts/');
  h = h.replace(/href="css\//g, 'href="../css/');
  h = h.replace(/src="js\//g, 'src="../js/');
  h = h.replace(/href="areas\//g, 'href="../areas/');
  h = h.replace(/href="services\//g, 'href="../services/');
  // canonical + og url
  h = h.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${url}"`);
  h = h.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${url}"`);
  // title + og/twitter title
  h = h.replace(/<title>[^<]*<\/title>/, `<title>${esc(p.title)}</title>`);
  h = h.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${esc(p.title)}"`);
  h = h.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${esc(p.title)}"`);
  // description
  h = h.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${esc(p.description)}"`);
  h = h.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${esc(p.description)}"`);
  h = h.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${esc(p.description)}"`);
  // nav links -> index.html anchors
  h = h.replace(/href="#home"/g, 'href="../index.html#home"');
  h = h.replace(/href="#services"/g, 'href="../index.html#services"');
  h = h.replace(/href="#areas"/g, 'href="../index.html#areas"');
  h = h.replace(/href="#advantage"/g, 'href="../index.html#advantage"');
  h = h.replace(/href="#faqs"/g, 'href="../index.html#faqs"');
  h = h.replace(/href="#about"/g, 'href="../index.html#about"');
  h = h.replace(/href="#contact"/g, 'href="../index.html#contact"');
  // active home -> not active
  h = h.replace('class="nav-link active"', 'class="nav-link"');

  const main = `<main id="main">
    <section class="hero hero--inner">
        <div class="hero-bg" aria-hidden="true">
            <img src="../images/residential-locksmith-.webp" alt="" width="1280" height="720" fetchpriority="high" decoding="async">
        </div>
        <div class="container">
            <div class="hero-content">
                <div class="hero-text">
                    <p class="hero-eyebrow">Austin Locksmith Pros</p>
                    <h1 class="hero-title">${esc(p.h1)}</h1>
                    <p class="hero-subtitle">${esc(p.lead)}</p>
                    <div class="hero-cta">
                        <a href="${phoneHref}" class="btn btn-primary btn-large">
                            <svg class="icon" aria-hidden="true"><use href="#icon-phone"></use></svg> Call&nbsp;(737)&nbsp;265&#8209;4627
                        </a>
                        <a href="../index.html#contact" class="btn btn-secondary btn-large">
                            <svg class="icon" aria-hidden="true"><use href="#icon-clipboard-list"></use></svg> Free Quote
                        </a>
                    </div>
                    <div class="hero-trust">
                        ${p.bullets.map(b => `<div class="trust-item"><svg class="icon" aria-hidden="true"><use href="#icon-check"></use></svg><span>${esc(b)}</span></div>`).join('\n                        ')}
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="about">
        <div class="container">
            <div class="about-content">
                <figure class="photo-single photo-single--about">
                    <img src="${p.photo.src}" width="${p.photo.w}" height="${p.photo.h}" loading="lazy" decoding="async" alt="${p.photo.alt}">
                </figure>
                <div class="about-text">
                    <h2 class="section-title">Why Choose Austin Locksmith Pros</h2>
                    <p>${p.lead}</p>
                    <p>Our mobile locksmiths arrive fully equipped, so most jobs are completed in a single visit - no towing, no trip to a shop. Clear, upfront pricing before any work begins.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="full-services">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">What We Do</h2>
                <p class="section-subtitle">${esc(p.h1)} - services and details</p>
            </div>
            <div class="services-detailed">
${serviceCards(p.services)}
            </div>
        </div>
    </section>

    <section class="faq">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Frequently Asked Questions</h2>
                <p class="section-subtitle">Common questions about ${esc(p.h1.toLowerCase())}</p>
            </div>
            <div class="faq-list">
${faqItems(p.faqs)}
            </div>
        </div>
    </section>

    <section class="about">
        <div class="container">
            <div class="about-content">
                <div class="about-text">
                    <h2 class="section-title">Related Services</h2>
                    <ul style="margin:1rem 0 1.5rem 1.25rem;line-height:1.8;">
                        ${pages.filter(x => x.slug !== p.slug).slice(0,5).map(x => `<li><a href="${x.slug}.html">${esc(x.h1)}</a></li>`).join('\\n                        ')}
                    </ul>
                    <h2 class="section-title">Service Areas We Cover</h2>
                    <p>We serve Austin and Central Texas. See our <a href="../service-areas.html">full service area list</a>, including <a href="../areas/austin.html">Austin</a>, <a href="../areas/cedar-park.html">Cedar Park</a>, <a href="../areas/round-rock.html">Round Rock</a>, <a href="../areas/pflugerville.html">Pflugerville</a>, and <a href="../areas/georgetown.html">Georgetown</a>. You may also find our <a href="../cost/locksmith-cost-austin.html">locksmith cost guide</a> and <a href="../problems/locked-out-of-house.html">lockout help</a> useful.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="cta-section">
        <div class="container">
            <div class="cta-content">
                <h2>Need a locksmith right now?</h2>
                <p>Call Austin Locksmith Pros - we come to you, 24/7, across Austin and Central Texas.</p>
                <div class="cta-buttons">
                    <a href="${phoneHref}" class="btn btn-primary btn-large">
                        <svg class="icon" aria-hidden="true"><use href="#icon-phone"></use></svg> Call&nbsp;(737)&nbsp;265&#8209;4627
                    </a>
                    <a href="../index.html#contact" class="btn btn-secondary btn-large">
                        <svg class="icon" aria-hidden="true"><use href="#icon-clipboard-list"></use></svg> Request a Quote
                    </a>
                </div>
            </div>
        </div>
    </section>
    </main>
`;

  const t = tail.replace(/src="js\//g, 'src="../js/');
  // tail footer links: make areas links relative to services/ (already ../areas? footer uses areas/...); fix
  const tailFixed = t.replace(/href="areas\//g, 'href="../areas/').replace(/href="blog\//g, 'href="../blog/').replace(/href="contact\.html/g, 'href="../contact.html').replace(/href="service-areas\.html/g, 'href="../service-areas.html').replace(/href="#/g, 'href="../index.html#');
  const out = h + main + tailFixed;
  const outPath = path.join(root, 'services', p.slug + '.html');
  fs.writeFileSync(outPath, out);
  console.log('wrote', outPath);
}
