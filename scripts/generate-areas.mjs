import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const areasDir = path.join(root, 'areas');
const siteUrl = 'https://www.austinlocksmithpros.com';
const lastmod = '2026-11-10';

const areas = [
  {
    city: 'Austin',
    slug: 'austin',
    nearby: ['westlake-hills', 'bee-cave', 'manor'],
    intro: `Austin's mix of historic neighborhoods, apartment towers, and fast-growing commercial corridors means every lock sees different demands. From a 1930s bungalow in Hyde Park to a new build west of MoPac, we handle lockouts, rekeys, repairs, and security upgrades for homes, businesses, and vehicles.`,
    local: [
      `In older Austin neighborhoods, original hardware often needs careful rekeying, latch repair, or a like-for-like replacement that fits the door rather than fighting it. In newer builds and apartments, the work is usually turnover rekeys, smart lock installs, and broken keys pulled from locks. We match the solution to the door, the lease, and the budget.`,
      `Austin renters and homeowners move often, so rekey requests make up a large share of our calls. Business owners along Lamar, Burnet, and South Congress call us for master key systems, panic hardware, and access control that stands up to daily staff traffic. Whatever the property, we quote the work before we start.`
    ],
    issues: `Austin lock calls range from a key snapped off in a front-door deadbolt to a smart lock that died after a power blink. Common causes include worn pins, misaligned strike plates, swollen doors after humid weeks, and batteries or motors that quietly fail. We diagnose the actual problem first, then explain repair and replacement options.`,
    faqs: [
      ['How fast can a locksmith get to me in Austin?', `For most Austin addresses our average arrival time is 10 to 45 minutes, 24 hours a day. Traffic and distance affect the ETA, so call (737) 265-4627 for an honest time estimate for your location.`],
      ['Can you rekey my home the same day in Austin?', `Yes. Whole-house rekeys are typically completed in a single visit, and our vans carry the common residential cylinders and key blanks to finish on the spot.`]
    ],
    areaLine: `We also serve nearby Westlake Hills, Bee Cave, Manor, and communities throughout the Austin metro.`
  },
  {
    city: 'Round Rock',
    slug: 'round-rock',
    nearby: ['cedar-park', 'pflugerville', 'hutto'],
    intro: `Round Rock combines established family neighborhoods, growing subdivisions, and busy commercial properties along I-35. That range calls for locksmith work that can handle rental turnover rekeys, family lockouts, and business access control without a second trip.`,
    local: [
      `In Round Rock's newer communities, we often rekey entire homes at move-in, install smart locks for families who want keyless entry, and cut spare keys for parents juggling school and practice schedules. In older parts of town, repairs tend to involve worn deadbolts, sagging hinges that misalign strikes, and hardware past its service life.`,
      `Round Rock's heat is hard on exterior locks and on cars parked in driveways all summer. We service vehicle lockouts, trunks, and ignitions, and we check lubrication and alignment on exterior doors so a quick fix does not turn into a repeat call. For businesses, we service master key systems, keypads, and panic bars.`
    ],
    issues: `A Round Rock lockout usually comes at the worst time - a work morning or a grocery run with the engine running. Beyond lockouts, common calls include keys broken in locks, remotes and fobs that stop working, and back doors that no longer latch because the frame has shifted. We open, repair, or replace as needed and retest everything.`,
    faqs: [
      ['Do you handle car lockouts in Round Rock?', `Yes. We unlock cars, trucks, and SUVs damage-free, open trunks, extract broken keys, and program replacement fobs for most makes and models.`],
      ['Can you rekey my Round Rock home after a tenant moves out?', `Yes. Landlord rekeys are routine for us - we can rekey every exterior door to one new key in a single visit and provide extra copies on request.`]
    ],
    areaLine: `We also serve Cedar Park, Pflugerville, Georgetown, Hutto, and nearby Williamson County communities.`
  },
  {
    city: 'Cedar Park',
    slug: 'cedar-park',
    nearby: ['leander', 'round-rock', 'austin'],
    intro: `Cedar Park's mix of master-planned neighborhoods, commercial centers, and Hill Country edges means lock work has to be both precise and durable. We help homeowners, renters, and property managers with lockouts, rekeys, repairs, and smart lock installation.`,
    local: [
      `Many Cedar Park homes are newer, so lock work often focuses on move-in rekeys, upgrading builder-grade hardware, and adding smart locks that fit the family routine - codes for kids, guests, and dog walkers. For older homes near downtown, we repair or replace worn deadbolts and match existing finishes where possible.`,
      `Cedar Park's HOA and apartment communities generate steady demand for rekeys at turnover and for lockouts at shared amenities and garages. We also service commercial storefronts and offices with master key systems, exit devices, and keypad entry. Most residential jobs are finished in one visit.`
    ],
    issues: `Cedar Park lock problems often show up as a deadbolt that sticks in summer humidity, a garage-to-house door that no longer latches, or a smart lock that locks out its owner after a battery swap. We adjust strikes, replace worn cylinders, and set up smart locks so codes and apps work reliably.`,
    faqs: [
      ['Do you install smart locks in Cedar Park homes?', `Yes. We install and configure major smart lock brands, set codes and app access, and make sure the door and strike are aligned so the motor is not overworked.`],
      ['Can you make me extra car keys in Cedar Park?', `Yes. We cut and program replacement car keys and fobs for most makes, usually for less than a dealership charges and without towing your vehicle.`]
    ],
    areaLine: `We also serve Leander, Round Rock, Austin, and surrounding communities.`
  },
  {
    city: 'Pflugerville',
    slug: 'pflugerville',
    nearby: ['hutto', 'manor', 'round-rock'],
    intro: `Pflugerville is growing quickly, with new subdivisions, commercial centers, and apartment communities on the edge of town. We install and service locks that keep pace with that growth, from single-family rekeys to business access control and emergency lockouts.`,
    local: [
      `In newer Pflugerville neighborhoods, we rekey homes at move-in, replace builder hardware with better deadbolts, and install keyless entry for busy households. Renters call for apartment lockouts and spare keys, and landlords call for turnover rekeys between leases - often several units at once.`,
      `Pflugerville businesses along the toll road and in retail centers rely on us for master key systems, panic hardware, and keypad access that survives daily use. The area's summer heat stresses exterior locks and vehicle electronics, so we also field many car lockouts and broken-key calls during the hottest months.`
    ],
    issues: `When a Pflugerville lock stops working, the cause is often a worn key copy, a loose strike plate, or a latch that no longer reaches the box - not a lock that needs full replacement. We test the hardware, fix what failed, and only recommend replacement when the lock no longer secures the door.`,
    faqs: [
      ['Do you rekey apartments and rentals in Pflugerville?', `Yes. We rekey units at tenant turnover, provide landlord master systems, and handle emergency lockouts for renters with proof of tenancy.`],
      ['Do you offer emergency lockout service in Pflugerville?', `Yes. We are available 24/7 every day of the year, and most Pflugerville lockouts are resolved in one visit with no damage to the lock or door.`]
    ],
    areaLine: `We also serve Hutto, Manor, Round Rock, and nearby communities.`
  },
  {
    city: 'Georgetown',
    slug: 'georgetown',
    nearby: ['round-rock', 'leander', 'cedar-park'],
    intro: `Georgetown blends a historic downtown, active-adult communities like Sun City, and newer neighborhoods spreading west of I-35. Each type of property has different lock needs, from careful work on original hardware to reliable service for residents who value a quick, courteous visit.`,
    local: [
      `Around the Square and in older Georgetown neighborhoods, we repair and rekey original and vintage-style hardware carefully, preserving the look while making it work securely again. We replace worn cylinders, copy old key styles where blanks exist, and match new hardware to existing finishes when replacement is the better option.`,
      `In Sun City and other planned communities, our priorities are patience and speed: lockouts, easy-to-turn lever hardware, rekeys after a move, and smart locks with simple codes for family and caregivers. West of I-35, newer homes bring requests for deadbolt upgrades, garage-entry locks, and whole-house rekeys.`
    ],
    issues: `Common Georgetown calls include keys broken off in older locks, deadbolts that require two hands to throw, house keys that no longer turn after decades of copies-of-copies, and lockouts after a morning walk. We extract broken keys, rebuild or replace the cylinder, and cut fresh keys from the original cuts.`,
    faqs: [
      ['Do you work on locks in Sun City and Georgetown?', `Yes. We service homes throughout Georgetown, including Sun City, with patient, respectful service and hardware options that are easy on hands and eyes.`],
      ['Can you fix an old lock instead of replacing it?', `Often, yes. Many vintage locks can be cleaned, repinned, and rekeyed to work like new. We replace only when the lock can no longer be secured.`]
    ],
    areaLine: `We also serve Round Rock, Leander, Cedar Park, and nearby Williamson County areas.`
  },
  {
    city: 'Leander',
    slug: 'leander',
    nearby: ['cedar-park', 'georgetown', 'round-rock'],
    intro: `Leander sits where Austin's growth meets the Hill Country, with new neighborhoods, large lots, and long views. Lock and security work here needs to handle everything from subdivision rekeys to workshop and outbuilding security on acreage properties.`,
    local: [
      `In newer Leander subdivisions, we rekey homes at move-in, install smart locks, and cut spare keys for growing families. On acreage and custom properties, the calls range from securing detached workshops and barns to upgrading the main house with high-security cylinders after a change in household needs.`,
      `Leander commuters lock keys in vehicles early in the morning more often than they would like to admit, so fast car lockout response matters here. We also service businesses along the 183 corridor with master key systems, exit device repair, and access control that keeps doors compliant and staff moving.`
    ],
    issues: `Leander lock issues often involve exterior doors exposed to sun and wind, garage entry doors that shift with the slab, and older workshop locks that have seized after years without maintenance. We realign strikes, lubricate and repin cylinders, and replace hardware that has corroded past saving.`,
    faqs: [
      ['Do you secure workshops and outbuildings in Leander?', `Yes. We rekey and upgrade locks on workshops, barns, guest houses, and pool houses so one key or code system covers the whole property.`],
      ['Can you add a keypad or smart lock to my Leander home?', `Yes. We install keyless entry, smart locks, and code-based access that fits your household, and we make sure the door prep and alignment are right so the lock lasts.`]
    ],
    areaLine: `We also serve Cedar Park, Georgetown, Round Rock, and nearby communities.`
  },
  {
    city: 'Lakeway',
    slug: 'lakeway',
    nearby: ['bee-cave', 'spicewood', 'lago-vista'],
    intro: `Lakeway's lakefront homes, hillside properties, and gated communities put a premium on privacy, security, and curb appeal. We install and service locks that fit the architecture and handle the area's humidity, steep driveways, and part-time residents.`,
    local: [
      `Many Lakeway homes are second homes or short-term rentals, which changes the lock math: owners need codes that can be rotated between guests, smart locks with audit trails, and hardware that survives humid lake air without seizing. We set up systems the whole family - and the property manager - can actually use.`,
      `Lakeway humidity and sun wear on exterior hardware, batteries, and moving parts. We service sticking deadbolts, corroded latches, and pool-house and boathouse locks, and we recommend finishes and hardware rated for exposure. For gated communities, we also service entry access for residents who need it.`
    ],
    issues: `A Lakeway lock that will not open may have corroded pins, a swollen door, or a smart lock battery that died between visits. We carry the common parts to fix these in one visit, and we open homes, outbuildings, and vehicles without damage whenever possible.`,
    faqs: [
      ['Do you work on rental and vacation homes in Lakeway?', `Yes. We install smart locks with rotating codes, rekey between long-term tenants, and set up access that works for owners, guests, and cleaners.`],
      ['Can you fix locks damaged by humidity near Lake Travis?', `Yes. We clean and rebuild corroded hardware where possible and replace it with hardware rated for lake-area exposure when it is not.`]
    ],
    areaLine: `We also serve Bee Cave, Spicewood, Lago Vista, and nearby Lake Travis communities.`
  },
  {
    city: 'Bee Cave',
    slug: 'bee-cave',
    nearby: ['westlake-hills', 'lakeway', 'austin'],
    intro: `Bee Cave combines Hill Country scenery with upscale neighborhoods, gated communities, and busy commercial areas around the Galleria. Lock systems here need to look refined, work flawlessly, and stand up to daily use by families and staff.`,
    local: [
      `On larger Bee Cave lots, homes often pair high-end finishes with advanced entry - smart locks, codes, and cameras working together. We plan that integration so every door, garage, and gate keypad works from one app or one key. For families, that means codes for kids and sitters that can be changed anytime.`,
      `Bee Cave businesses near the Galleria call us for storefront and office work: master key systems, panic bars, keypad entry, and rekeys after staff changes. Lake-effect humidity and steady traffic wear on hardware, so we also perform maintenance that keeps everything turning smoothly and closing securely.`
    ],
    issues: `Bee Cave lock calls often involve a smart lock that stopped responding, a decorative handle set that no longer springs back, or a commercial door out of compliance because the exit device sticks. We repair or replace the failed part, retest the door, and leave the entry looking as good as it works.`,
    faqs: [
      ['Do you install smart lock systems in Bee Cave homes?', `Yes. We install and connect smart locks, keypads, and related entry hardware, and set codes and app access for the whole household.`],
      ['Do you service commercial doors near the Hill Country Galleria?', `Yes. We repair and install commercial locks, exit devices, and access control for stores, offices, and medical suites throughout the Bee Cave area.`]
    ],
    areaLine: `We also serve Austin, Westlake Hills, Lakeway, and nearby Hill Country communities.`
  },
  {
    city: 'Westlake Hills',
    slug: 'westlake-hills',
    nearby: ['austin', 'bee-cave', 'dripping-springs'],
    intro: `Westlake Hills properties are known for privacy, mature trees, and custom architecture. Locks here often need to balance security and discretion while fitting high-end hardware, strict neighborhood expectations, and doors that see real wear.`,
    local: [
      `Many Westlake Hills homes carry substantial hardware budgets - solid doors, premium handle sets, and high-security cylinders. We rekey those systems when households change, service the mechanisms so heavy doors keep closing firmly, and add discreet smart access where a visible keypad would clash with the entry.`,
      `Privacy matters in Westlake Hills, so our work is quiet and thorough: verified ID before entry, no logos shouting from the driveway, and hardware that keeps working for years. We also service pool houses, guest quarters, and home offices, and we coordinate with alarm companies when sensors and locks share a door.`
    ],
    issues: `Westlake Hills lock problems often involve heavy doors that have settled and no longer align with the strike, multicode smart locks that confuse the household, and antique or imported hardware with no local support. We realign, reprogram, and source compatible parts so the original look survives the fix.`,
    faqs: [
      ['Do you work with high-security lock brands in Westlake Hills?', `Yes. We service and rekey Medeco, Mul-T-Lock, and other restricted-key systems, and we can upgrade entry doors to controlled-access cylinders.`],
      ['Can you repair imported or antique hardware in Westlake Hills?', `Where parts exist, yes. We rebuild mechanisms, rekey where the design allows, and match replacement hardware to the existing finish when repair is not possible.`]
    ],
    areaLine: `We also serve Austin, Bee Cave, Rollingwood, and nearby communities.`
  },
  {
    city: 'Dripping Springs',
    slug: 'dripping-springs',
    nearby: ['bee-cave', 'spicewood', 'wimberley'],
    intro: `Dripping Springs is the gateway to the Hill Country, with acreage, ranches, wineries, and long private driveways. Locks here often need to handle distance, weather, and a more rural approach to security across multiple buildings.`,
    local: [
      `On larger Dripping Springs properties, security spans more than the front door: homes, workshops, barns, well houses, and guest casitas all need keyed or coded access that one owner can manage. We set up systems that let one key or app run the whole property, and we service the remote buildings other companies skip.`,
      `Limestone soil shifts with the seasons, so Dripping Springs doors and strikes drift out of alignment and start wearing latches unevenly. We catch that during rekeys and repairs, adjust the hardware, and recommend maintenance before a lockout forces the issue. Ranch families also call us for gate keypad and access work.`
    ],
    issues: `Dripping Springs calls often involve keys locked in a house at the end of a long driveway, workshop locks seized after a dry summer, and deadbolts that no longer extend after the door settled. We arrive with the parts to handle all three, and most jobs finish in one visit.`,
    faqs: [
      ['Do you service ranch and acreage properties in Dripping Springs?', `Yes. We secure and service locks for homes, workshops, barns, and outbuildings across multi-building Hill Country properties.`],
      ['Can you set up one key for my whole Dripping Springs property?', `In most cases, yes. We can rekey house, shop, and outbuildings onto a single keyway, or set up code access where keyed locks are impractical.`]
    ],
    areaLine: `We also serve Austin, Bee Cave, Spicewood, Wimberley, and nearby Hill Country communities.`
  },
  {
    city: 'Spicewood',
    slug: 'spicewood',
    nearby: ['lakeway', 'bee-cave', 'dripping-springs'],
    intro: `Spicewood's lakefront homes, ranches, and wooded acreage offer privacy and space, and the locks that protect them have to work in demanding conditions. We install, repair, and rekey locks for properties across the Spicewood area.`,
    local: [
      `Long driveways and part-time residency mean Spicewood owners want remote-friendly access: smart locks they can check from town, codes for cleaners and caretakers, and hardware that does not seize between visits. We install and maintain those systems and rotate access whenever the roster changes.`,
      `Lake Travis humidity, sun, and shifting soil affect doors, hardware, and vehicles. We service corroded exterior locks, realign settled doors, and handle car and truck lockouts that would otherwise strand someone miles from a shop. Ranch properties also call for outbuilding and equipment security.`
    ],
    issues: `Spicewood lock problems often show up as a lock that works only with coaxing, a key that snapped on a cold morning, or a smart lock that locked out its owner after months unattended. We rebuild or replace the hardware, cut fresh keys, and reset codes so the property is secure and usable again.`,
    faqs: [
      ['Do you service remote and lake properties in Spicewood?', `Yes. We regularly work on lakefront and ranch properties, including smart locks, caretaker access, and outbuilding security.`],
      ['Can you fix locks that seized up while we were away?', `Yes. Corroded and stuck locks are common at seasonal properties, and we can usually clean and rebuild them on the spot.`]
    ],
    areaLine: `We also serve Lakeway, Bee Cave, Dripping Springs, and nearby communities.`
  },
  {
    city: 'Buda',
    slug: 'buda',
    nearby: ['kyle', 'austin', 'del-valle'],
    intro: `Buda has grown from a small town into a busy south-Austin suburb, with new neighborhoods, commercial development, and easy access to outdoor spaces. We help Buda property owners with lockouts, rekeys, repairs, and security upgrades.`,
    local: [
      `In Buda's newer subdivisions, we rekey homes at move-in, upgrade deadbolts and smart locks, and cut keys for households that always seem to need one more copy. Families with kids in sports and activities lean on keyless entry so nobody is stranded at the back door, and we set that up to just work.`,
      `Buda's clay soil moves doors over time, so strike alignment and latch wear are recurring themes in our repair calls. Local businesses and home offices call for rekeys after staff changes, safe-adjacent cabinet locks, and keypad entry. We handle the work in one visit with upfront pricing.`
    ],
    issues: `Common Buda lock issues include back doors that no longer latch, keys that stick worse each month, garage-entry locks that froze up, and the classic lockout with groceries in hand. We diagnose the wear, repair or replace as needed, and leave every door locking smoothly.`,
    faqs: [
      ['Do you rekey homes in Buda?', `Yes. Whole-home rekeys are one of our most common Buda jobs - finished in one visit with new keys cut on the spot.`],
      ['Do you handle lockouts in Buda at night?', `Yes. We are open 24/7 every day of the year, and most Buda lockouts are resolved in a single visit without damage to the door.`]
    ],
    areaLine: `We also serve Kyle, Austin, Del Valle, and nearby communities.`
  },
  {
    city: 'Kyle',
    slug: 'kyle',
    nearby: ['buda', 'austin', 'del-valle'],
    intro: `Kyle combines a historic downtown with fast-growing neighborhoods along I-35. Locksmith service here ranges from emergency lockouts to new locks for homes, rentals, and businesses in one of Central Texas's fastest-growing cities.`,
    local: [
      `In newer Kyle neighborhoods, we rekey at move-in, install smart locks and keypads, and set up access for extended families sharing a home. Kyle's apartment communities keep us busy with tenant lockouts and turnover rekeys, and property managers appreciate a single vendor who documents every unit.`,
      `Kyle commuters lock keys in vehicles while rushing to I-35, so fast, damage-free car opening is a daily job for us. Local businesses call for master key systems, rekeys after staffing changes, and exit-device repairs that keep doors code-compliant. Heat and clay soil do the rest, wearing doors out of alignment a little each year.`
    ],
    issues: `A Kyle lockout may involve a house, a car, or a storage unit, and the fix is usually faster than expected. Common repairs include worn deadbolts, keys broken in locks, smart locks that lost their settings after a battery change, and strikes that no longer line up with the latch.`,
    faqs: [
      ['Do you handle apartment lockouts in Kyle?', `Yes. With proof of tenancy we open units damage-free, and we can rekey or replace the lock on the spot if needed.`],
      ['Can you help with a business rekey in Kyle?', `Yes. We rekey commercial locks, rebuild master key systems, and cut new keys for staff with quick turnaround.`]
    ],
    areaLine: `We also serve Buda, Austin, Del Valle, and nearby communities.`
  },
  {
    city: 'Hutto',
    slug: 'hutto',
    nearby: ['round-rock', 'pflugerville', 'manor'],
    intro: `Hutto has a small-town feel and a growing base of new neighborhoods and businesses. We provide lockouts, rekeys, repairs, and smart lock installation for homeowners, renters, and commercial properties across the area.`,
    local: [
      `Many Hutto homes are newer, so lock work often focuses on move-in rekeys, upgrading builder-grade hardware, and adding keyless entry for families. Older properties near the original town get repairs instead - worn cylinders, sticky deadbolts, and hardware that deserves rebuilding rather than replacing.`,
      `Hutto's growth brings commercial work too: retail and office spaces that need rekeys after staff turnover, exit devices that must work for inspections, and keypad access for early-morning crews. We also handle car lockouts and broken keys for commuters heading down 79 or toward the toll road.`
    ],
    issues: `Hutto lock calls often involve a garage entry door that stopped latching, a key snapped in a deadbolt, or a lockout after soccer practice. We test the whole door - hinge, strike, cylinder - so the repair addresses the cause and not just the symptom.`,
    faqs: [
      ['Do you install keyless entry in Hutto homes?', `Yes. We install smart locks and keypad deadbolts, set up codes and apps, and make sure the door alignment will not wear out the motor.`],
      ['Do you rekey Hutto homes after closing?', `Yes. New-home rekeys are routine - we rekey every exterior door to one new key, usually within a single visit.`]
    ],
    areaLine: `We also serve Round Rock, Pflugerville, Manor, and nearby communities.`
  },
  {
    city: 'Manor',
    slug: 'manor',
    nearby: ['austin', 'pflugerville', 'hutto'],
    intro: `Manor sits east of Austin where prairie land meets new development. The area's larger lots, new subdivisions, and commercial corridors call for locks that can handle wind, dust, and daily use - and a locksmith who shows up fast.`,
    local: [
      `On Manor's newer properties, we rekey at move-in, install deadbolts and smart locks, and set up access for rentals and multi-generational households. On acreage and older properties, the work ranges from rebuilding worn hardware to securing workshops, sheds, and mobile homes that came with a bucket of mismatched keys.`,
      `Prairie wind and dust work into lock mechanisms, and shifting soil pulls doors out of alignment over time. We service both during repairs so the lock does not fail again next season. Manor businesses and home offices call for master key systems, rekeys, and panic hardware.`
    ],
    issues: `A Manor lock that drags, sticks, or fails to latch often has an alignment or wear problem rather than a broken lock. We also handle house and vehicle lockouts, keys broken in locks, and garage-entry doors that no longer close securely. Most jobs finish in one visit.`,
    faqs: [
      ['Do you work on acreage properties in Manor?', `Yes. We secure homes, workshops, sheds, and outbuildings and can bring them all onto one key system where hardware allows.`],
      ['Can you fix a door lock damaged by shifting ground in Manor?', `Yes. We realign strikes and hardware, repair the lock, and adjust the door so it latches securely through the seasons.`]
    ],
    areaLine: `We also serve Austin, Pflugerville, Hutto, and nearby communities.`
  },
  {
    city: 'Lago Vista',
    slug: 'lago-vista',
    nearby: ['lakeway', 'spicewood', 'bee-cave'],
    intro: `Lago Vista's lake homes, hillside streets, and golf communities demand lock systems that handle slopes, weather, and part-time residents. We help property owners with lockouts, rekeys, repairs, and smart access.`,
    local: [
      `Many Lago Vista homes serve as weekend or seasonal retreats, so owners want smart locks they can manage remotely, codes for guests and renters, and hardware that does not seize between visits. We install those systems and service the ones already in place - batteries, motors, and settings included.`,
      `Lake humidity, sun, and shifting limestone soil affect posts, doors, and hardware. We realign settled doors, rebuild corroded locks, and recommend finishes rated for exposure. Golf-course and community residents also call for straightforward house lockouts and rekeys when households change.`
    ],
    issues: `Lago Vista lock problems often involve a lock that sticks in humid months, a smart lock that died between visits, or a key that snapped on a cold morning at the lake. We carry the parts to fix these in one visit and can rotate codes or rekey the whole property while we are there.`,
    faqs: [
      ['Do you service seasonal and rental homes in Lago Vista?', `Yes. We install and maintain remote-managed smart locks, rotate codes for guests, and rekey between long-term tenants.`],
      ['Can you fix locks corroded by lake humidity in Lago Vista?', `Yes. We clean and rebuild weathered hardware where possible and replace it with exposure-rated hardware when it is not.`]
    ],
    areaLine: `We also serve Lakeway, Spicewood, Jonestown, and nearby Lake Travis communities.`
  },
  {
    city: 'Wimberley',
    slug: 'wimberley',
    nearby: ['dripping-springs', 'driftwood', 'spicewood'],
    intro: `Wimberley's Hill Country charm, creek-side properties, and rural acreage make it a unique place to live - and to secure. We install and service locks that fit the landscape and stand up to the elements.`,
    local: [
      `In Wimberley, driveways can be long and unpaved, and properties often include guest houses, studios, and shops that need their own access. We bring everything onto one key or code system so owners are not juggling a drawer of old keys. Vacation rentals call for rotating guest codes and smart locks with audit trails.`,
      `Creek humidity, limestone, and seasonal rain affect doors, hinges, and hardware. We realign and rebuild what the weather has shifted, and we service the square's shops and studios with rekeys, display-case locks, and entry hardware that survives tourist-season traffic.`
    ],
    issues: `Wimberley lock calls often involve a lockout at a property that is rarely staffed, a workshop lock seized after a wet spring, or a rental whose codes need rotating before the next booking. We handle all three routinely, usually in a single visit.`,
    faqs: [
      ['Do you service vacation rentals in Wimberley?', `Yes. We install smart locks with rotating codes, set up owner and cleaner access, and rekey between long-term bookings.`],
      ['Can you repair locks on outbuildings in Wimberley?', `Yes. We rebuild and rekey workshop, studio, and barn locks and can consolidate them onto the property's main key system.`]
    ],
    areaLine: `We also serve Dripping Springs, Driftwood, Spicewood, and nearby Hill Country communities.`
  },
  {
    city: 'Driftwood',
    slug: 'driftwood',
    nearby: ['dripping-springs', 'wimberley', 'austin'],
    intro: `Driftwood is wide-open ranch country with long driveways, large properties, and a strong sense of privacy. Locks here need to be sturdy, secure, and suited to a rural setting - and serviced by someone willing to drive out.`,
    local: [
      `On Driftwood acreage, security spans the main house, guest casitas, workshops, barns, and equipment sheds. We consolidate that chaos into one sensible system - one key or one code platform - and service the outbuildings other companies treat as somebody else's problem. Estate owners also use us for discreet high-security upgrades.`,
      `Limestone soil, wind, and seasonal rain shift doors and stress hardware, and winery and event properties need access that works for staff, vendors, and guests without handing everyone a copy of the master. We set up tiered access for exactly that, from tasting rooms to service gates.`
    ],
    issues: `Driftwood lock issues often include a gate or outbuilding lock that no longer turns, a key broken off in a rarely used door, and a main house lockout with the nearest spare key forty minutes away. We arrive with the parts and the patience to fix all of it in one trip.`,
    faqs: [
      ['Do you service ranch properties in Driftwood?', `Yes. We secure and service locks for homes, casitas, workshops, barns, and equipment buildings across larger properties.`],
      ['Can you set up tiered access for staff at our Driftwood venue?', `Yes. We design master key and code systems that give staff, vendors, and owners different levels of access.`]
    ],
    areaLine: `We also serve Dripping Springs, Wimberley, Austin, and nearby communities.`
  },
  {
    city: 'Del Valle',
    slug: 'del-valle',
    nearby: ['austin', 'manor', 'buda'],
    intro: `Del Valle stretches southeast of Austin along the Colorado River, with a mix of farmland, new development, and industrial property near the airport. Lock needs here range from residential rekeys to commercial access control.`,
    local: [
      `In Del Valle's newer neighborhoods, we rekey at move-in, install deadbolts and smart locks, and handle the everyday lockouts that come with family life. On larger and rural properties, we secure workshops, sheds, and mobile homes, and consolidate mismatched hardware onto one key system that finally makes sense.`,
      `Del Valle businesses - logistics, light industrial, and retail near the airport corridor - call us for master key systems, keypad and fob access, exit-device repair, and rekeys after personnel changes. Heat, dust, and seasonal flooding are hard on exterior hardware, and we service accordingly.`
    ],
    issues: `Del Valle lock calls often involve a house or vehicle lockout, a warehouse or shop door that no longer secures, or keys worn down by daily use. We diagnose the failure, repair or replace the hardware, and test the door before we leave.`,
    faqs: [
      ['Do you service commercial locks in Del Valle?', `Yes. We handle commercial lock repair, master key systems, keypad and fob access, and exit devices for warehouses, shops, and offices.`],
      ['Do you rekey homes in Del Valle?', `Yes. Home rekeys are routine and usually finished in one visit with new keys cut on the spot.`]
    ],
    areaLine: `We also serve Austin, Manor, Buda, and nearby communities.`
  },
  {
    city: 'Jollyville',
    slug: 'jollyville',
    nearby: ['austin', 'round-rock', 'cedar-park'],
    intro: `Jollyville is an established area in northwest Austin with mature neighborhoods, busy roads, and a mix of older and updated homes. We provide lockouts, rekeys, repairs, and access upgrades for properties that need dependable daily security.`,
    local: [
      `Many Jollyville homes have mature trees, shorter driveways, and original hardware that has simply reached retirement age. We rebuild or replace worn deadbolts, rekey when keys have circulated too widely, and upgrade to smart locks that give families codes instead of hide-a-keys under the patio stone.`,
      `Tree cover, shifting soil, and summer heat affect alignment and electronics. We test the full door during every job, check sensors and strikes, and adjust the hardware so the lock does not drag or fail. Renters and landlords in the area use us for turnover rekeys and apartment lockouts, often several doors in one visit.`
    ],
    issues: `Jollyville lock problems often involve a deadbolt that takes two hands to throw, a key copy that never quite worked, or a lockout after a dog walk. We fix the wear, cut clean keys from fresh cuts, and open homes and cars without damage.`,
    faqs: [
      ['Do you repair older locks in Jollyville?', `Yes. We rebuild and rekey older hardware where the mechanism is sound and recommend replacement only when security is compromised.`],
      ['Can you add smart locks to an older Jollyville home?', `Yes. We retrofit smart locks to existing doors, adjust alignment so the motor is not overworked, and set up codes and app access.`]
    ],
    areaLine: `We also serve Austin, Round Rock, Cedar Park, and nearby communities.`
  },
  {
    city: 'Liberty Hill',
    slug: 'liberty-hill',
    nearby: ['leander', 'cedar-park', 'georgetown'],
    intro: `Liberty Hill sits northwest of Austin where the Hill Country begins, with growing neighborhoods, acreage, ranches, and long private driveways. Lock systems here need to handle limestone, slopes, wind, and distance while staying easy for residents and guests to use.`,
    local: [
      `Many Liberty Hill properties are on larger lots with long driveways, so security planning covers the main house, workshops, barns, and gates. We consolidate scattered hardware onto one key or code platform, install smart locks owners can manage from anywhere, and service the outbuildings that hold the real value.`,
      `Limestone soil, slopes, and seasonal storms shift doors and stress hardware. We realign strikes and latches during every job so locks keep working through the seasons, and we handle vehicle lockouts and broken keys for families who are a long drive from any shop.`
    ],
    issues: `Liberty Hill lock calls often involve a workshop or outbuilding lock that no longer turns, a house lockout with the spare key across the property, or hardware worn by wind and dust. We test the whole door, repair or replace what failed, and leave every entry working smoothly.`,
    faqs: [
      ['Do you install ranch and driveway security in Liberty Hill?', `Yes. We secure homes, workshops, and barns and can integrate gate keypads and access with your property's overall security.`],
      ['Can you set up remote access for our Liberty Hill property?', `Yes. We install smart locks and code access you can manage from your phone, including codes for caretakers and guests.`]
    ],
    areaLine: `We also serve Leander, Cedar Park, Georgetown, and nearby Hill Country communities.`
  },
  {
    city: 'San Marcos',
    slug: 'san-marcos',
    nearby: ['kyle', 'buda', 'austin'],
    intro: `San Marcos sits along I-35 between Austin and San Antonio, with a mix of university-area housing, established neighborhoods, new development, and commercial property. Lock needs here range from compact apartment rekeys to busy business and apartment entrances.`,
    local: [
      `In San Marcos, we see everything from semester-turnover apartment rekeys to house lockouts after a day on the river. Texas State students and their parents call for spare keys, lockouts, and deadbolt repairs, and landlords rely on us to rekey units quickly between leases. We verify tenancy carefully and document every unit.`,
      `Central Texas heat, humidity near the river, and seasonal storms affect doors, hardware, and vehicles. For commercial and multi-tenant properties, we service master key systems, keypad and fob access, exit devices, and mail-room and amenity locks. Most residential jobs finish in one visit.`
    ],
    issues: `San Marcos lock problems often involve a worn key copy, a deadbolt that sticks in humid months, a smart lock that lost its settings, or a car lockout before class or work. We diagnose the actual failure, fix it, and cut fresh keys from clean cuts.`,
    faqs: [
      ['Do you handle student apartment lockouts in San Marcos?', `Yes. With proof of tenancy we open units damage-free, and we can replace or rekey the lock on the spot if needed.`],
      ['Do you service commercial and apartment locks in San Marcos?', `Yes. We handle master key systems, keypad and fob access, exit devices, and amenity locks for businesses and multi-tenant properties.`]
    ],
    areaLine: `We also serve Kyle, Buda, Austin, and nearby Hays County communities.`
  }
];

const bySlug = new Map(areas.map(area => [area.slug, area]));

const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const icon = (name, className = 'icon') =>
  `<svg class="${className}" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;

const phoneHtml = '(737)&nbsp;265&#8209;4627';
const phoneHref = 'tel:+17372654627';
const email = 'austinlocksmithpros@gmail.com';

const indexHtml = await fs.readFile(path.join(root, 'index.html'), 'utf8');
const spriteMatch = indexHtml.match(/<svg class="icon-sprite"[\s\S]*?<\/svg>/);
if (!spriteMatch) throw new Error('Could not find the shared icon sprite in index.html');
const sprite = spriteMatch[0];

function header() {
  return `${sprite}

    <a class="skip-link" href="#main">Skip to main content</a>

    <!-- Header -->
    <header class="header">
        <div class="texas-ribbon" aria-hidden="true">
            <span class="texas-ribbon-blue"></span>
            <span class="texas-ribbon-star">${icon('star')}</span>
            <span class="texas-ribbon-red"></span>
        </div>
        <div class="top-bar">
            <div class="container">
                <div class="top-bar-content">
                <div class="top-bar-left">
                    <span>${icon('star')} Deep in the Heart of Texas</span>
                    <span>${icon('map-marker-alt')} Serving Austin, TX &amp; Surrounding Areas</span>
                    <span>${icon('clock')} Open 24/7 | Emergency Response in 10-45 Minutes</span>
                </div>
                <div class="top-bar-right">
                    <span class="top-bar-mobile-location">${icon('map-marker-alt')} Austin, TX</span>
                    <a class="top-bar-phone" href="${phoneHref}">${icon('phone')} ${phoneHtml}</a>
                </div>
                </div>
            </div>
        </div>

        <nav class="nav" aria-label="Main navigation">
            <div class="container">
                <div class="nav-content">
                <a class="nav-logo" href="../index.html" aria-label="Austin Locksmith Pros home">
                    <span class="logo-mark" aria-hidden="true">
                        <svg viewBox="0 0 48 48" role="presentation" focusable="false">
                            <defs>
                                <linearGradient id="logoStar" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0" stop-color="#E8744F"/>
                                    <stop offset="1" stop-color="#B8860B"/>
                                </linearGradient>
                            </defs>
                            <rect class="logo-mark-frame" x="3" y="3" width="42" height="42" rx="10"/>
                            <path class="logo-mark-gate" d="M14 34V19l5-4 5 4v15M24 34V19l5-4 5 4v15"/>
                            <path class="logo-mark-star" d="M24 11l1.6 3.6 3.9.4-2.9 2.6.8 3.8-3.4-1.9-3.4 1.9.8-3.8-2.9-2.6 3.9-.4z" fill="url(#logoStar)"/>
                        </svg>
                    </span>
                    <span class="logo-text">
                        <span class="logo-name">Austin <span class="accent">Locksmith Pros</span></span>
                        <span class="logo-tagline">24/7 Emergency Service</span>
                    </span>
                </a>
                    <button class="nav-toggle" id="navToggle" type="button" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="navMenu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <ul class="nav-menu" id="navMenu">
                        <li><a href="../index.html#home" class="nav-link">Home</a></li>
                        <li><a href="../index.html#services" class="nav-link">Services</a></li>
                        <li><a href="index.html" class="nav-link active" aria-current="page">Service Areas</a></li>
                        <li><a href="../index.html#advantage" class="nav-link">Why Us</a></li>
                        <li><a href="../index.html#faqs" class="nav-link">FAQ</a></li>
                        <li><a href="../index.html#about" class="nav-link">About</a></li>
                        <li><a href="../index.html#contact" class="nav-link">Contact</a></li>
                        <li class="nav-cta"><a href="${phoneHref}" class="btn btn-primary">${icon('phone')} Call&nbsp;Now</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>`;
}

const areaFooterLinks = [
  ['austin', 'Austin, TX'],
  ['round-rock', 'Round Rock'],
  ['cedar-park', 'Cedar Park'],
  ['lakeway', 'Lakeway'],
  ['dripping-springs', 'Dripping Springs']
].map(([slug, label]) => `<li><a href="${slug}.html">${label}</a></li>`).join('\n                        ');

function footer() {
  return `<footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="footer-logo">
                        <span class="logo-mark logo-mark--sm" aria-hidden="true">
                            <svg viewBox="0 0 48 48" role="presentation" focusable="false">
                                <defs>
                                    <linearGradient id="logoStarFooter" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0" stop-color="#E8744F"/>
                                        <stop offset="1" stop-color="#B8860B"/>
                                    </linearGradient>
                                </defs>
                                <rect class="logo-mark-frame" x="3" y="3" width="42" height="42" rx="10"/>
                                <path class="logo-mark-gate" d="M18 16v18M22 16v18M16 16h8M16 34h8M16 20h8"/>
                                <path class="logo-mark-star" d="M24 11l1.6 3.6 3.9.4-2.9 2.6.8 3.8-3.4-1.9-3.4 1.9.8-3.8-2.9-2.6 3.9-.4z" fill="url(#logoStarFooter)"/>
                            </svg>
                        </span>
                        <span class="logo-text">
                            <span class="logo-name">Austin <span class="accent">Locksmith Pros</span></span>
                            <span class="logo-tagline">24/7 Emergency Service</span>
                        </span>
                    </div>
                    <p>Austin locksmith company - 24/7 emergency lockouts, rekeying, key duplication, smart locks &amp; security. Quality craftsmanship, reliable service.</p>
                    <div class="footer-social">
                        <a href="https://www.facebook.com/austinlocksmithpros" target="_blank" rel="noopener noreferrer" aria-label="Austin Locksmith Pros on Facebook">${icon('facebook')}</a>
                        <a href="https://www.instagram.com/austinlocksmithpros" target="_blank" rel="noopener noreferrer" aria-label="Austin Locksmith Pros on Instagram">${icon('instagram')}</a>
                        <a href="https://www.google.com/maps/place/Austin+Locksmith+Pros" target="_blank" rel="noopener noreferrer" aria-label="Austin Locksmith Pros on Google">${icon('google')}</a>
                    </div>
                </div>

                <div class="footer-section">
                    <h3>Services</h3>
                    <ul>
                        <li><a href="../index.html#services">Emergency Lockouts</a></li>
                        <li><a href="../index.html#services">Lock Repair &amp; Rekeying</a></li>
                        <li><a href="../index.html#services">Key Duplication &amp; Car Keys</a></li>
                        <li><a href="../index.html#services">Smart Locks &amp; Security</a></li>
                        <li><a href="../index.html#services">Commercial &amp; Access Control</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Service Areas</h3>
                    <ul>
                        ${areaFooterLinks}
                        <li><a href="index.html">All Service Areas</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Contact Info</h3>
                    <ul class="footer-contact">
                        <li>${icon('phone')} <a href="${phoneHref}">${phoneHtml}</a></li>
                        <li>${icon('envelope')} <a href="mailto:${email}">${email}</a></li>
                        <li>${icon('map-marker-alt')} Austin, TX &amp; Surrounding Areas</li>
                        <li>${icon('clock')} Open 24/7 | Emergency Response 10-45 Min</li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <p class="footer-texas">${icon('star')} Proudly Serving Texas ${icon('star')}</p>
                <p class="footer-bless">${icon('flag-usa')} God Bless America &middot; God Bless Texas ${icon('star')}</p>
                <p>&copy; <span id="year">2026</span> Austin Locksmith Pros. All rights reserved. | Licensed &amp; Insured</p>
            </div>
        </div>
    </footer>

    <!-- Mobile Call Bar -->
    <div class="mobile-call-bar">
        <a href="${phoneHref}" class="mobile-call-link">
            ${icon('phone')} Call&nbsp;Now
        </a>
        <a href="../index.html#contact" class="mobile-call-link mobile-call-link--alt">
            ${icon('clipboard-list')} Free Quote
        </a>
    </div>

    <script src="../js/main.js?v=20261117"></script>`;
}

function documentHead({ title, description, canonical, jsonLd }) {
  const schema = jsonLd.map(item => `<script type="application/ld+json">\n${JSON.stringify(item, null, 2)}\n    </script>`).join('\n    ');
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="canonical" href="${canonical}">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#101820">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Austin Locksmith Pros">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${siteUrl}/images/og-image.png">
    <meta property="og:image:alt" content="Austin Locksmith Pros professional locksmith services in Austin, Texas">
    <meta property="og:locale" content="en_US">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${siteUrl}/images/og-image.png">
    <link rel="icon" type="image/png" href="../images/favicon.png">
    <link rel="apple-touch-icon" href="../images/apple-touch-icon.png">
    <link rel="preload" as="font" type="font/woff2" href="../fonts/inter-latin.woff2" crossorigin>
    <link rel="preload" as="font" type="font/woff2" href="../fonts/plus-jakarta-sans-latin.woff2" crossorigin>
    <link rel="stylesheet" href="../css/style.css?v=20261117">
    ${schema}
</head>`;
}

function breadcrumbs(items) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb">
                <ol>
                    ${items.map(item => item.url
    ? `<li><a href="${item.url}">${item.label}</a></li>`
    : `<li aria-current="page">${item.label}</li>`).join('\n                    ')}
                </ol>
            </nav>`;
}

function quoteButtons() {
  return `<div class="hero-cta">
                        <a href="${phoneHref}" class="btn btn-primary btn-large">${icon('phone')} Call&nbsp;${phoneHtml}</a>
                        <a href="../index.html#contact" class="btn btn-secondary btn-large">${icon('clipboard-list')} Request a Free Quote</a>
                    </div>`;
}

function trustRow() {
  return `<div class="hero-trust">
                        <span class="trust-item">${icon('shield-alt')} Licensed &amp; Insured</span>
                        <span class="trust-item">${icon('check')} 1-Year Labor Warranty</span>
                        <span class="trust-item">${icon('clock')} 24/7 Emergency Service</span>
                    </div>`;
}

function sidebar(area) {
  const nearbyLinks = area.nearby.map(slug => {
    const nearby = bySlug.get(slug);
    return `<li><a href="${nearby.slug}.html">${nearby.city} locksmith service</a></li>`;
  }).join('\n                        ');

  return `<aside class="area-sidebar" aria-label="Locksmith service information for ${area.city}">
                <div class="sidebar-card sidebar-card--accent">
                    <h2>Get a locksmith quote in ${area.city}</h2>
                    <p>Tell us about the lock, key, or security issue. We will confirm availability and the next step.</p>
                    <a href="${phoneHref}" class="btn btn-primary btn-full">${icon('phone')} Call&nbsp;${phoneHtml}</a>
                    <a href="../index.html#contact" class="btn btn-secondary btn-full">Request a Quote</a>
                </div>
                <div class="sidebar-card">
                    <h2>Locksmith services</h2>
                    <ul>
                        <li><a href="../index.html#services">Emergency lockout service</a></li>
                        <li><a href="../index.html#services">Lock repair and rekeying</a></li>
                        <li><a href="../index.html#services">Key duplication and car keys</a></li>
                        <li><a href="../index.html#services">Smart locks and security</a></li>
                        <li><a href="../index.html#services">Commercial access control</a></li>
                    </ul>
                </div>
                <div class="sidebar-card">
                    <h2>Nearby service areas</h2>
                    <ul>
                        ${nearbyLinks}
                        <li><a href="index.html">All Central Texas areas</a></li>
                    </ul>
                </div>
                <div class="sidebar-card">
                    <h2>Service hours</h2>
                    <p>Open 24/7 - Every Day of the Year<br>Emergency Response in 10-45 Minutes</p>
                </div>
            </aside>`;
}

function cta(area) {
  return `<section class="cta-section">
        <div class="container cta-content">
            <p class="cta-star">${icon('star')}</p>
            <h2>Need a locksmith in ${area.city}?</h2>
            <p>Call&nbsp;${phoneHtml} for a free quote, or send a request through our contact form. We will follow up with availability and next steps.</p>
            <div class="cta-buttons">
                <a href="${phoneHref}" class="btn btn-primary btn-large">${icon('phone')} Call&nbsp;${phoneHtml}</a>
                <a href="../index.html#contact" class="btn btn-secondary btn-large">${icon('paper-plane')} Request a Free Quote</a>
            </div>
        </div>
    </section>`;
}

function serviceSchema(area, canonical) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Locksmith services in ${area.city}, TX`,
    serviceType: [
      'Emergency lockout service',
      'Lock repair and replacement',
      'Lock rekeying',
      'Key duplication and car key replacement',
      'Smart lock installation',
      'Commercial access control'
    ],
    provider: {
      '@type': 'LocalBusiness',
      name: 'Austin Locksmith Pros',
      url: siteUrl,
      telephone: '+17372654627',
      email,
      image: `${siteUrl}/images/og-image.png`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Austin',
        addressRegion: 'TX',
        addressCountry: 'US'
      }
    },
    areaServed: {
      '@type': 'City',
      name: `${area.city}, TX`
    },
    url: canonical
  };
}

function breadcrumbSchema(area, canonical) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteUrl}/`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Service Areas',
        item: `${siteUrl}/areas/`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: area.city,
        item: canonical
      }
    ]
  };
}

function faqSchema(area) {
  const questions = [
    ...area.faqs,
    [`Do you offer 24/7 emergency lockout service in ${area.city}?`, `Yes. We are open around the clock, every day of the year, with typical response times of 10 to 45 minutes in the Austin metro. Call (737) 265-4627 for service in ${area.city}.`]
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer
      }
    }))
  };
}

function renderCity(area) {
  const canonical = `${siteUrl}/areas/${area.slug}.html`;
  const title = `Locksmith in ${area.city}, TX | Austin Locksmith Pros`;
  const description = `24/7 emergency locksmith in ${area.city}, TX - lockouts, rekeying, car keys, smart locks, commercial security. 10-45 min response. Call (737) 265-4627.`;

  const article = `<article class="prose">
                    <h2>Local locksmith service built for ${area.city}</h2>
                    ${area.local.map(paragraph => `<p>${paragraph}</p>`).join('\n                    ')}

                    <h2>Locksmith services we provide in ${area.city}</h2>
                    <p>From a single front-door rekey to a full commercial access system, we handle locks, keys, and security as one job - finished in one visit whenever parts allow.</p>
                    <ul class="area-service-list">
                        <li><strong>Emergency lockout service:</strong> homes, businesses, and vehicles opened damage-free, 24/7.</li>
                        <li><strong>Residential locks:</strong> rekeys, lock repair, deadbolt replacement, and smart lock installation.</li>
                        <li><strong>Automotive:</strong> car keys cut and programmed, fob replacement, trunk opening, and broken key extraction.</li>
                        <li><strong>Commercial:</strong> master key systems, panic bars and exit devices, keypad and fob access control.</li>
                        <li><strong>Security upgrades:</strong> high-security cylinders, keyless entry, and hardware rated for Central Texas weather.</li>
                    </ul>

                    <h2>Common lock and key problems in ${area.city}</h2>
                    <p>${area.issues}</p>
                    <ul class="area-check-list">
                        <li>Worn keys, broken keys, and keys stuck in locks</li>
                        <li>Deadbolts that stick, drag, or no longer latch</li>
                        <li>Misaligned strikes from settling doors</li>
                        <li>Smart locks, fobs, and remotes that stopped working</li>
                    </ul>

                    <h2>What to expect on a ${area.city} service call</h2>
                    <p>We start by verifying you own or are authorized to enter the property - ID and proof of residence for lockouts, always. Then we diagnose the lock or key issue, quote the price before any work begins, and finish most jobs in a single visit because our vans carry the common cylinders, hardware, and key blanks. Before we leave, every lock is tested, every door is checked for alignment, and you get straight answers about anything that should be scheduled for later rather than done today.</p>

                    <h2>Why ${area.city} residents call Austin Locksmith Pros</h2>
                    <p>We are licensed, bonded, and insured, and our work includes a 1-year labor warranty plus the manufacturer warranty on hardware we supply. We answer our own phone, quote before we work, and send a locksmith who knows ${area.city} - not a call center reading a script. That is why most of our work comes from repeat customers and referrals.</p>

                    <h2>Locksmith service near ${area.city}</h2>
                    <p>${area.areaLine} If your community is not listed, call us - we may still be able to help.</p>

                    <h2>${area.city} locksmith FAQs</h2>
                    <details class="faq-item">
                        <summary>${area.faqs[0][0]}</summary>
                        <p>${area.faqs[0][1]}</p>
                    </details>
                    <details class="faq-item">
                        <summary>${area.faqs[1][0]}</summary>
                        <p>${area.faqs[1][1]}</p>
                    </details>
                    <details class="faq-item">
                        <summary>Do you offer 24/7 emergency lockout service in ${area.city}?</summary>
                        <p>Yes. We are open around the clock, every day of the year, with typical response times of 10 to 45 minutes in the Austin metro. Call&nbsp;${phoneHtml} for service in ${area.city}.</p>
                    </details>
                </article>`;

  const jsonLd = [serviceSchema(area, canonical), breadcrumbSchema(area, canonical), faqSchema(area)];

  return `${documentHead({ title, description, canonical, jsonLd })}
<body>
    ${header()}

    <main id="main">
        <section class="page-hero">
            <div class="container">
                ${breadcrumbs([
    { url: '../index.html', label: 'Home' },
    { url: 'index.html', label: 'Service Areas' },
    { label: area.city }
  ])}
                <p class="page-kicker">${icon('map-marker-alt')} ${area.city} Service Area</p>
                <h1 class="hero-title">Locksmith Services in ${area.city}, TX</h1>
                <p class="hero-subtitle">${area.intro}</p>
                ${quoteButtons()}
                ${trustRow()}
            </div>
        </section>

        <section class="area-article">
            <div class="container article-wrap">
                ${article}
                ${sidebar(area)}
            </div>
        </section>

        ${cta(area)}
    </main>

    ${footer()}
</body>
</html>
`;
}

function renderHub() {
  const canonical = `${siteUrl}/areas/`;
  const title = 'Locksmith Service Areas | Austin Locksmith Pros';
  const description = '24/7 locksmith service across Austin and Central Texas - lockouts, rekeying, car keys, smart locks & commercial security. Find your city and call (737) 265-4627.';
  const cards = areas.map(area => {
    const excerpt = area.intro.split(/\s+/).slice(0, 22).join(' ');
    return `<article class="area-card">
                    <p class="area-card-kicker">${icon('map-marker-alt')} ${area.city}, TX</p>
                    <h2><a href="${area.slug}.html">${area.city} locksmith service</a></h2>
                    <p>${excerpt}...</p>
                    <a class="area-card-link" href="${area.slug}.html">Read the ${area.city} guide ${icon('arrow-right')}</a>
                </article>`;
  }).join('\n                ');

  const jsonLd = [{
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Locksmith Service Areas in Central Texas',
    url: canonical,
    description,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Austin Locksmith Pros',
      url: siteUrl
    },
    about: {
      '@type': 'LocalBusiness',
      name: 'Austin Locksmith Pros',
      telephone: '+17372654627',
      url: siteUrl
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: areas.map((area, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `${area.city} locksmith service`,
        url: `${siteUrl}/areas/${area.slug}.html`
      }))
    }
  }, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteUrl}/`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Service Areas',
        item: canonical
      }
    ]
  }];

  return `${documentHead({ title, description, canonical, jsonLd })}
<body>
    ${header()}

    <main id="main">
        <section class="page-hero">
            <div class="container">
                ${breadcrumbs([
    { url: '../index.html', label: 'Home' },
    { label: 'Service Areas' }
  ])}
                <p class="page-kicker">${icon('map-marker-alt')} Austin and Central Texas</p>
                <h1 class="hero-title">Locksmith Services Across Central Texas</h1>
                <p class="hero-subtitle">Austin Locksmith Pros serves Austin and 21 surrounding communities with 24/7 emergency lockouts, rekeying, car keys, smart locks, and commercial access control. Choose your city for local lock, housing, and security guidance.</p>
                ${quoteButtons()}
                ${trustRow()}
            </div>
        </section>

        <section class="area-article">
            <div class="container">
                <div class="section-header section-header--left">
                    <h2 class="section-title">Find your city</h2>
                    <p class="section-subtitle">Each guide covers the locksmith services, common lock problems, and local conditions we see in that community.</p>
                </div>
                <div class="area-grid">
                ${cards}
                </div>
            </div>
        </section>

        <section class="area-article area-article--alt">
            <div class="container">
                <div class="section-header section-header--left">
                    <h2 class="section-title">What every city guide covers</h2>
                </div>
                <div class="area-info-grid">
                    <div class="area-info-card">
                        <p class="area-info-icon">${icon('bolt')}</p>
                        <h3>Emergency lockouts</h3>
                        <p>Damage-free entry for homes, businesses, and vehicles, 24 hours a day, with ID verification before any door is opened.</p>
                    </div>
                    <div class="area-info-card">
                        <p class="area-info-icon">${icon('wrench')}</p>
                        <h3>Repair and rekeying</h3>
                        <p>Deadbolt repair, whole-home rekeys, strike alignment, and hardware replacement finished in one visit whenever parts allow.</p>
                    </div>
                    <div class="area-info-card">
                        <p class="area-info-icon">${icon('key')}</p>
                        <h3>Keys, cars, and upgrades</h3>
                        <p>Key duplication, car keys and fobs, smart locks, high-security cylinders, and commercial master key and access control systems.</p>
                    </div>
                </div>
                <div class="area-hub-note">
                    <p>Not sure which guide fits your property? Call&nbsp;${phoneHtml} or use the contact form. We serve homeowners, renters, landlords, businesses, and property managers throughout the Austin metro and Hill Country.</p>
                    <a class="btn btn-primary" href="${phoneHref}">${icon('phone')} Call&nbsp;${phoneHtml}</a>
                </div>
            </div>
        </section>

        <section class="cta-section">
            <div class="container cta-content">
                <p class="cta-star">${icon('star')}</p>
                <h2>One team for every lock, key, and security need</h2>
                <p>From a midnight lockout to a full commercial rekey, we diagnose the problem, quote upfront, and finish most jobs in one visit. Call&nbsp;${phoneHtml} to get started.</p>
                <div class="cta-buttons">
                    <a href="${phoneHref}" class="btn btn-primary btn-large">${icon('phone')} Call&nbsp;${phoneHtml}</a>
                    <a href="../index.html#contact" class="btn btn-secondary btn-large">${icon('paper-plane')} Request a Free Quote</a>
                </div>
            </div>
        </section>
    </main>

    ${footer()}
</body>
</html>
`;
}

function countWords(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-zA-Z#0-9]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text ? text.split(' ').length : 0;
}

await fs.mkdir(areasDir, { recursive: true });

let failures = 0;
for (const area of areas) {
  const html = renderCity(area);
  const articleMatch = html.match(/<article class="prose">([\s\S]*?)<\/article>/);
  const words = countWords(articleMatch ? articleMatch[1] : '');
  console.log(`${area.city}: ${words} words`);
  if (words < 500 || words > 700) {
    console.error(`  ERROR: ${area.city} article is outside the 500-700 word range`);
    failures += 1;
  }
  await fs.writeFile(path.join(areasDir, `${area.slug}.html`), html, 'utf8');
}

await fs.writeFile(path.join(areasDir, 'index.html'), renderHub(), 'utf8');
console.log(`Generated areas/index.html and ${areas.length} city pages.`);
if (failures) process.exitCode = 1;
