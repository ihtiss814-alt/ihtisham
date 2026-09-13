/**
 * Build-time SEO artifact generator.
 *
 * Vite still owns the application bundle. After the bundle is built, this
 * script fetches the real inventory, writes paginated XML sitemaps, and
 * creates a static HTML entry point for each eligible vehicle. That keeps the
 * existing React/Vite application intact while giving crawlers meaningful
 * HTML before JavaScript runs.
 */

import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  isAvailableVehicle,
  isSoldVehicle,
  isIndexableVehicle,
  vehicleName,
  vehicleTitle,
  vehicleDescription,
  vehicleSummary,
  vehicleImageAlt,
  validImageUrls,
  rankRelatedVehicles,
} from './src/lib/vehicle-seo-core.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, 'dist');
const BASE_URL = 'https://www.wazirtradingllc.com';
const INVENTORY_PAGE_SIZE = 1000;
const SITEMAP_URL_LIMIT = 45000;

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/cars', priority: '0.9', changefreq: 'daily' },
  { path: '/how-it-works', priority: '0.7', changefreq: 'monthly' },
  { path: '/shipping-information', priority: '0.7', changefreq: 'monthly' },
  { path: '/payment-information', priority: '0.6', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  { path: '/faqs', priority: '0.6', changefreq: 'monthly' },
];

const STATIC_SEO_PAGES = [
  {
    path: '/',
    title: 'Japanese Used Cars for Export | Wazir Trading LLC',
    description: 'Browse current Japanese used vehicle listings, review specifications and photos, and request export and shipping information from Wazir Trading LLC.',
    heading: 'Japanese Used Cars for Export from Japan',
    intro: 'Browse current Japanese used vehicles from Wazir Trading LLC. Review vehicle records, specifications, photos, and FOB pricing before requesting export and shipping information.',
    links: [
      ['/cars', 'Browse Japanese used cars'],
      ['/how-it-works', 'How buying and exporting works'],
      ['/shipping-information', 'Shipping information'],
      ['/contact', 'Contact Wazir Trading LLC'],
    ],
  },
  {
    path: '/cars',
    title: 'Browse Japanese Used Cars for Export | Wazir Trading LLC',
    description: 'Browse current Japanese used cars available for export. Filter by make, model, price, and body type, then review FOB prices and vehicle records from Japan.',
    heading: 'Browse Japanese Used Cars for Export',
    intro: 'Explore current Japanese used vehicles available for export. Compare make, model, year, mileage, specifications, photos, and FOB price information.',
    links: [
      ['/how-it-works', 'Learn how to buy a vehicle from Japan'],
      ['/shipping-information', 'Review shipping information'],
      ['/contact', 'Ask about a vehicle'],
    ],
  },
  {
    path: '/about',
    title: 'About Us | Wazir Trading LLC — Japanese Car Exporters',
    description: 'Learn how Wazir Trading LLC helps buyers review Japanese used vehicle listings, understand export steps, and request shipping information.',
    heading: 'About Wazir Trading LLC',
    intro: 'Wazir Trading LLC helps buyers review Japanese used vehicle listings and request export information from its Japan-based operation.',
    links: [
      ['/cars', 'Browse our Japanese vehicle inventory'],
      ['/how-it-works', 'Learn how buying works'],
      ['/contact', 'Contact our team'],
    ],
  },
  {
    path: '/how-it-works',
    title: 'How It Works — Buy a Car from Japan | Wazir Trading LLC',
    description: 'Learn how to select, purchase, pay for, and ship a Japanese used car through Wazir Trading LLC.',
    heading: 'How to Buy a Japanese Used Car',
    intro: 'Follow the steps to choose a vehicle, confirm its record, arrange payment, and organize export shipping from Japan.',
    links: [
      ['/cars', 'Choose a vehicle from current stock'],
      ['/shipping-information', 'Review export routes and shipping'],
      ['/payment-information', 'Review payment information'],
    ],
  },
  {
    path: '/shipping-information',
    title: 'Shipping Information — Japan Car Export | Wazir Trading',
    description: 'Review shipping routes, export documentation, and delivery information for Japanese used cars purchased through Wazir Trading LLC.',
    heading: 'Shipping Information for Japanese Car Exports',
    intro: 'Review shipping routes, export documentation, and destination information before arranging delivery for a Japanese used vehicle.',
    links: [
      ['/cars', 'Browse vehicles for export'],
      ['/payment-information', 'Review payment information'],
      ['/contact', 'Ask about shipping to your destination'],
    ],
  },
  {
    path: '/payment-information',
    title: 'Payment Information — Bank Transfer Details | Wazir Trading',
    description: 'Review payment steps and bank transfer information for Japanese used vehicle purchases through Wazir Trading LLC.',
    heading: 'Payment Information',
    intro: 'Review the payment process and bank transfer information for purchasing a Japanese used vehicle through Wazir Trading LLC.',
    links: [
      ['/how-it-works', 'See the complete buying process'],
      ['/shipping-information', 'Review shipping information'],
      ['/contact', 'Contact us about payment questions'],
    ],
  },
  {
    path: '/contact',
    title: 'Contact Wazir Trading LLC | Japanese Car Export',
    description: 'Contact Wazir Trading LLC by WhatsApp, email, or inquiry form about Japanese used car exports, vehicle pricing, and shipping.',
    heading: 'Contact Wazir Trading LLC',
    intro: 'Contact our team about Japanese used car availability, vehicle pricing, export documentation, shipping routes, and destination requirements.',
    links: [
      ['/cars', 'Browse current vehicle listings'],
      ['/faqs', 'Read frequently asked questions'],
      ['/shipping-information', 'Review shipping information'],
    ],
  },
  {
    path: '/faqs',
    title: 'FAQs — Japanese Car Import Questions Answered | Wazir Trading LLC',
    description: 'Answers to common questions about buying, shipping, and paying for Japanese used cars through Wazir Trading LLC.',
    heading: 'Frequently Asked Questions About Japanese Used Cars',
    intro: 'Find answers about vehicle selection, payment, export documentation, shipping, and importing Japanese used cars through Wazir Trading LLC.',
    links: [
      ['/cars', 'Browse Japanese used cars'],
      ['/how-it-works', 'Learn how the buying process works'],
      ['/contact', 'Contact us with another question'],
    ],
  },
];

function requireSupabaseConfig() {
  const url = process.env.VITE_SUPABASE_URL?.trim();
  const apiKey = process.env.VITE_SUPABASE_ANON_KEY?.trim();
  if (!url || !apiKey) {
    throw new Error(
      'VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required to build the SEO sitemap and vehicle pages.',
    );
  }
  try {
    new URL(url);
  } catch {
    throw new Error('VITE_SUPABASE_URL must be a valid URL.');
  }
  return { url: url.replace(/\/+$/, ''), apiKey };
}

async function fetchInventory() {
  const { url, apiKey } = requireSupabaseConfig();
  const cars = [];

  for (let offset = 0; ; offset += INVENTORY_PAGE_SIZE) {
    const endpoint = new URL(`${url}/rest/v1/cars`);
    endpoint.searchParams.set(
      'select',
      '*,car_images(image_url,is_primary,display_order)',
    );
    endpoint.searchParams.set('order', 'updated_at.desc,ref_number.asc');
    endpoint.searchParams.set('limit', String(INVENTORY_PAGE_SIZE));
    endpoint.searchParams.set('offset', String(offset));

    const response = await fetch(endpoint, {
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Supabase inventory request failed with HTTP ${response.status}.`);
    }

    const page = await response.json();
    if (!Array.isArray(page)) {
      throw new Error('Supabase inventory response was not an array.');
    }
    cars.push(...page);
    if (page.length < INVENTORY_PAGE_SIZE) break;
  }

  return cars;
}

const isAvailable = isAvailableVehicle;
const isSold = isSoldVehicle;

function isValidVehicle(car) {
  return (
    Boolean(car && car.ref_number?.trim() && car.make?.trim() && car.model?.trim()) &&
    Number.isFinite(car.year) &&
    !/[\\/]/.test(car.ref_number) &&
    (isAvailable(car) || isSold(car))
  );
}

function hasValue(value) {
  if (typeof value === 'string') return value.trim().length > 0;
  return typeof value === 'number' ? Number.isFinite(value) : value != null;
}

function canonicalUrl(refNumber) {
  return `${BASE_URL}/cars/${encodeURIComponent(refNumber.trim())}`;
}

const imageUrls = validImageUrls;

function xmlEscape(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function htmlEscape(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function isoDate(value) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString().slice(0, 10);
}

function sitemapUrlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    '  <url>',
    `    <loc>${xmlEscape(loc)}</loc>`,
    lastmod ? `    <lastmod>${xmlEscape(lastmod)}</lastmod>` : '',
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : '',
    priority ? `    <priority>${priority}</priority>` : '',
    '  </url>',
  ].filter(Boolean).join('\n');
}

function sitemapDocument(entries) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;
}

function sitemapIndexDocument(files) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${files
    .map(file => `  <sitemap>\n    <loc>${BASE_URL}/${file}</loc>\n  </sitemap>`)
    .join('\n')}\n</sitemapindex>\n`;
}

function replaceMeta(html, attribute, key, content) {
  const pattern = new RegExp(
    `<meta\\s+${attribute}=["']${key}["'][^>]*>`,
    'i',
  );
  if (content == null) return html.replace(pattern, '');
  const tag = `<meta ${attribute}="${key}" content="${htmlEscape(content)}" />`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

function replaceCanonical(html, href) {
  const pattern = /<link\s+rel=["']canonical["'][^>]*>/i;
  const tag = `<link rel="canonical" href="${htmlEscape(href)}" />`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

function replaceTitle(html, title) {
  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${htmlEscape(title)}</title>`);
}

function socialImageUrl() {
  return `${BASE_URL}/og-image.jpg`;
}

function staticPageContent(page, cars = []) {
  const linkMarkup = page.links
    .map(([href, label]) => `<li><a href="${htmlEscape(href)}">${htmlEscape(label)}</a></li>`)
    .join('');
  const inventoryMarkup = page.path === '/cars'
    ? `<section aria-labelledby="seo-inventory-links"><h2 id="seo-inventory-links">Current vehicle inventory</h2><ul>${cars
      .filter(isIndexableVehicle)
      .map(car => `<li><a href="/cars/${encodeURIComponent(car.ref_number.trim())}">${htmlEscape(vehicleName(car))}</a></li>`)
      .join('')}</ul></section>`
    : '';
  return `
    <main id="seo-static-content" class="seo-static-content">
      <nav aria-label="Primary"><a href="/">Home</a> / <span>${htmlEscape(page.heading)}</span></nav>
      <article>
        <header>
          <h1>${htmlEscape(page.heading)}</h1>
          <p>${htmlEscape(page.intro)}</p>
        </header>
        ${inventoryMarkup}
        <nav aria-label="Related pages"><h2>Continue exploring</h2><ul>${linkMarkup}</ul></nav>
      </article>
    </main>
    <style>
      .seo-static-content{max-width:960px;margin:0 auto;padding:7rem 1.5rem 4rem;color:#0D1B3E;font-family:ui-sans-serif,system-ui,sans-serif}
      .seo-static-content nav{font-size:.875rem;color:#64748b;margin-bottom:2rem}.seo-static-content a{color:#C8102E}
      .seo-static-content h1{font:700 clamp(2rem,5vw,3.5rem) Georgia,serif;margin:.5rem 0 1rem}.seo-static-content h2{font:700 1.5rem Georgia,serif;margin:2rem 0 1rem}
      .seo-static-content p{line-height:1.7;color:#475569}.seo-static-content ul{padding-left:1.25rem;line-height:1.9}
    </style>`;
}

async function writeStaticPages(cars, template) {
  const eligible = cars.filter(isIndexableVehicle);
  for (const page of STATIC_SEO_PAGES) {
    const routeDir = page.path === '/' ? DIST_DIR : join(DIST_DIR, page.path.slice(1));
    await mkdir(routeDir, { recursive: true });
    let html = template
      .replace(/<title>[\s\S]*?<\/title>/i, `<title>${htmlEscape(page.title)}</title>`)
      .replace(/<div id="root"><\/div>/i, `<div id="root">${staticPageContent(page, eligible)}</div>`);
    html = replaceMeta(html, 'name', 'description', page.description);
    html = replaceMeta(html, 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1');
    html = replaceCanonical(html, `${BASE_URL}${page.path === '/' ? '/' : page.path}`);
    html = replaceMeta(html, 'property', 'og:title', page.title);
    html = replaceMeta(html, 'property', 'og:description', page.description);
    html = replaceMeta(html, 'property', 'og:type', 'website');
    html = replaceMeta(html, 'property', 'og:url', `${BASE_URL}${page.path === '/' ? '/' : page.path}`);
    html = replaceMeta(html, 'property', 'og:image', socialImageUrl());
    html = replaceMeta(html, 'name', 'twitter:title', page.title);
    html = replaceMeta(html, 'name', 'twitter:description', page.description);
    html = replaceMeta(html, 'name', 'twitter:image', socialImageUrl());
    await writeFile(join(routeDir, 'index.html'), html, 'utf8');
  }
}

function vehicleStructuredData(car, images) {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['Product', 'Car'],
    name: vehicleName(car),
    sku: car.ref_number,
    brand: { '@type': 'Brand', name: car.make },
    model: car.model,
    itemCondition: 'https://schema.org/UsedCondition',
    url: canonicalUrl(car.ref_number),
  };
  if (images.length) data.image = images;
  if (car.year != null) data.vehicleModelDate = String(car.year);
  if (car.mileage_km != null) {
    data.mileageFromOdometer = {
      '@type': 'QuantitativeValue',
      value: car.mileage_km,
      unitCode: 'KMT',
    };
  }
  if (car.transmission) data.vehicleTransmission = car.transmission;
  if (car.fuel_type) data.fuelType = car.fuel_type;
  if (car.color) data.color = car.color;
  if (car.engine_cc != null) {
    data.vehicleEngine = {
      '@type': 'EngineSpecification',
      engineDisplacement: {
        '@type': 'QuantitativeValue',
        value: car.engine_cc,
        unitCode: 'CMQ',
      },
    };
  }
  if (Number.isFinite(car.fob_price_usd) && car.fob_price_usd > 0) {
    data.offers = {
      '@type': 'Offer',
      price: car.fob_price_usd,
      priceCurrency: 'USD',
      availability: isAvailable(car)
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: canonicalUrl(car.ref_number),
      seller: { '@type': 'Organization', name: 'Wazir Trading LLC', url: BASE_URL },
    };
  }
  if (car.updated_at) data.dateModified = car.updated_at;
  return data;
}

function breadcrumbStructuredData(car) {
  const items = [
    { name: 'Home', item: `${BASE_URL}/` },
    { name: 'Cars', item: `${BASE_URL}/cars` },
    { name: vehicleName(car), item: canonicalUrl(car.ref_number) },
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

function serverRenderedVehicleContent(car, images, relatedCars) {
  const specs = [
    ['Reference', car.ref_number],
    ['Year', car.year],
    ['Mileage', car.mileage_km != null ? `${Number(car.mileage_km).toLocaleString('en-US')} km` : null],
    ['Engine', car.engine_cc != null ? `${car.engine_cc} cc` : null],
    ['Fuel', car.fuel_type],
    ['Body type', car.body_type],
    ['Drive', car.drive],
    ['Seats', car.seats],
    ['Doors', car.doors],
    ['Transmission', car.transmission],
    ['Exterior colour', car.color],
    ['Auction grade', car.auction_grade],
    ['Stock location', car.stock_location],
    ['FOB price', Number.isFinite(car.fob_price_usd) && car.fob_price_usd > 0 ? `$${Number(car.fob_price_usd).toLocaleString('en-US', { maximumFractionDigits: 0 })}` : null],
    ['Availability', isAvailable(car) ? 'Available in Japan' : 'Sold / no longer available'],
  ].filter(([, value]) => value != null && String(value).trim() !== '');
  const specMarkup = specs
    .map(([label, value]) => `<dt>${htmlEscape(label)}</dt><dd>${htmlEscape(value)}</dd>`)
    .join('');
  const imageMarkup = images.length
    ? images.slice(0, 12).map((image, index) => (
      `<img src="${htmlEscape(image)}" alt="${htmlEscape(vehicleImageAlt(car, index))}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async"${index === 0 ? ' fetchpriority="high"' : ''} />`
    )).join('')
    : '<p>Vehicle photos are not currently available.</p>';
  const statusClass = isAvailable(car) ? 'available' : 'sold';

  return `
    <main id="seo-vehicle-content" class="seo-vehicle-content">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/cars">Cars</a> / <span>${htmlEscape(vehicleName(car))}</span></nav>
      <article>
        <header>
          <p class="seo-vehicle-eyebrow">${htmlEscape(isAvailable(car) ? 'Available in Japan' : 'Sold / no longer available')} · REF ${htmlEscape(car.ref_number)}</p>
          <h1>${htmlEscape(vehicleName(car))}</h1>
          <p>${htmlEscape(vehicleDescription(car))}</p>
        </header>
        <section aria-labelledby="seo-vehicle-summary">
          <h2 id="seo-vehicle-summary">Vehicle overview</h2>
          <p>${htmlEscape(vehicleSummary(car))}</p>
        </section>
         <section aria-labelledby="seo-vehicle-specifications">
           <h2 id="seo-vehicle-specifications">Key specifications</h2>
          <dl>${specMarkup}</dl>
        </section>
        <section aria-labelledby="seo-vehicle-photos">
          <h2 id="seo-vehicle-photos">Vehicle photos</h2>
          <div class="seo-vehicle-images">${imageMarkup}</div>
        </section>
         ${relatedCars.length ? `
         <section aria-labelledby="seo-related-vehicles">
           <h2 id="seo-related-vehicles">Related vehicles</h2>
           <ul>${relatedCars.map(related => `<li><a href="/cars/${encodeURIComponent(related.ref_number)}">${htmlEscape(vehicleName(related))}</a></li>`).join('')}</ul>
         </section>` : ''}
         <p><a href="/cars">Browse more Japanese used cars</a>, read <a href="/how-it-works">how buying works</a>, review <a href="/shipping-information">shipping information</a>, or <a href="/contact">contact Wazir Trading LLC</a>.</p>
      </article>
    </main>
    <style>
      .seo-vehicle-content{max-width:960px;margin:0 auto;padding:7rem 1.5rem 4rem;color:#0D1B3E;font-family:ui-sans-serif,system-ui,sans-serif}
      .seo-vehicle-content nav{font-size:.875rem;color:#64748b;margin-bottom:2rem}.seo-vehicle-content a{color:#C8102E}
      .seo-vehicle-content h1{font:700 clamp(2rem,5vw,3.5rem) Georgia,serif;margin:.5rem 0 1rem}.seo-vehicle-content h2{font:700 1.5rem Georgia,serif;margin:2rem 0 1rem}
      .seo-vehicle-content p{line-height:1.7;color:#475569}.seo-vehicle-eyebrow{color:#C8102E!important;font-size:.75rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
      .seo-vehicle-content dl{display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:0;border:1px solid #e2e8f0}
      .seo-vehicle-content dt,.seo-vehicle-content dd{margin:0;padding:.75rem 1rem;border-bottom:1px solid #e2e8f0}.seo-vehicle-content dt{color:#64748b}.seo-vehicle-content dd{font-weight:700}
      .seo-vehicle-images{display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:.75rem}.seo-vehicle-images img{width:100%;aspect-ratio:4/3;object-fit:contain;background:#f8fafc}
      .seo-vehicle-content .sold{color:#64748b}
    </style>`;
}

async function writeVehiclePages(cars, template) {
  const vehicles = cars.filter(isValidVehicle);
  await rm(join(DIST_DIR, 'cars'), { recursive: true, force: true });

  for (const car of vehicles) {
    const images = imageUrls(car);
    const canonical = canonicalUrl(car.ref_number);
    const relatedCars = isIndexableVehicle(car) ? rankRelatedVehicles(car, cars, 6) : [];
    let html = template
      .replace(/<title>[\s\S]*?<\/title>/i, `<title>${htmlEscape(vehicleTitle(car))}</title>`)
      .replace(/<div id="root"><\/div>/i, `<div id="root">${serverRenderedVehicleContent(car, images, relatedCars)}</div>`);
    html = replaceMeta(html, 'name', 'description', vehicleDescription(car));
    html = replaceMeta(html, 'name', 'robots', isIndexableVehicle(car) ? 'index, follow' : 'noindex, follow');
    html = replaceCanonical(html, canonical);
    html = replaceMeta(html, 'property', 'og:title', vehicleTitle(car));
    html = replaceMeta(html, 'property', 'og:description', vehicleDescription(car));
    html = replaceMeta(html, 'property', 'og:url', canonical);
    html = replaceMeta(html, 'property', 'og:type', 'product');
    if (images[0]) html = replaceMeta(html, 'property', 'og:image', images[0]);
    const structuredData = [
      `<script id="vehicle-jsonld" type="application/ld+json">${JSON.stringify(vehicleStructuredData(car, images))}</script>`,
      `<script id="breadcrumb-jsonld" type="application/ld+json">${JSON.stringify(breadcrumbStructuredData(car))}</script>`,
    ].join('\n    ');
    html = html.replace('</head>', `    ${structuredData}\n  </head>`);

    const routeDir = join(DIST_DIR, 'cars', encodeURIComponent(car.ref_number.trim()));
    await mkdir(routeDir, { recursive: true });
    await writeFile(join(routeDir, 'index.html'), html, 'utf8');
  }
  return vehicles;
}

async function writeSitemaps(cars) {
  const eligible = cars
    .filter(isIndexableVehicle)
    .filter((car, index, list) => list.findIndex(other => other.ref_number.trim() === car.ref_number.trim()) === index);
  const staticEntries = STATIC_PAGES.map(page => sitemapUrlEntry({
    loc: `${BASE_URL}${page.path}`,
    changefreq: page.changefreq,
    priority: page.priority,
  }));
  const carEntries = eligible.map(car => sitemapUrlEntry({
    loc: canonicalUrl(car.ref_number),
    lastmod: isoDate(car.updated_at),
    changefreq: 'weekly',
    priority: '0.8',
  }));
  const files = ['sitemap-static.xml'];
  await writeFile(join(DIST_DIR, files[0]), sitemapDocument(staticEntries), 'utf8');
  for (let i = 0; i < carEntries.length; i += SITEMAP_URL_LIMIT) {
    const file = `sitemap-cars-${Math.floor(i / SITEMAP_URL_LIMIT) + 1}.xml`;
    files.push(file);
    await writeFile(join(DIST_DIR, file), sitemapDocument(carEntries.slice(i, i + SITEMAP_URL_LIMIT)), 'utf8');
  }
  await writeFile(join(DIST_DIR, 'sitemap.xml'), sitemapIndexDocument(files), 'utf8');
  return { eligibleCount: eligible.length, sitemapCount: files.length };
}

async function validateGeneratedSeo(cars) {
  const eligible = cars.filter(isIndexableVehicle);
  const eligibleRefs = new Set(eligible.map(car => car.ref_number.trim()));
  const sitemapIndex = await readFile(join(DIST_DIR, 'sitemap.xml'), 'utf8');
  if (!sitemapIndex.includes('<sitemapindex') || !sitemapIndex.includes(`${BASE_URL}/sitemap-static.xml`)) {
    throw new Error('SEO validation failed: sitemap.xml is not a valid sitemap index or is missing sitemap-static.xml.');
  }
  if (eligibleRefs.size > 0 && !/<loc>[^<]+\/sitemap-cars-1\.xml<\/loc>/i.test(sitemapIndex)) {
    throw new Error('SEO validation failed: eligible vehicles exist but sitemap-cars-1.xml is missing from sitemap.xml.');
  }
  if (sitemapIndex.includes('https://wazirtradingllc.com') || /https?:\/\/(?:localhost|127\.0\.0\.1|[^\s<]*replit[^\s<]*|[^\s<]*vercel\.app)/i.test(sitemapIndex)) {
    throw new Error('SEO validation failed: sitemap.xml contains a non-production URL.');
  }
  const sitemapFiles = [...sitemapIndex.matchAll(/<loc>[^<]+\/([^<]+)<\/loc>/g)].map(match => match[1]);
  const sitemapUrls = [];
  for (const file of sitemapFiles) {
    if (!/^sitemap-(?:static|cars-\d+)\.xml$/.test(file)) {
      throw new Error(`SEO validation failed: unexpected sitemap file ${file}.`);
    }
    const xml = await readFile(join(DIST_DIR, file), 'utf8');
    if (!xml.includes('<urlset') || !xml.includes(`${BASE_URL}/`)) {
      throw new Error(`SEO validation failed: invalid or empty sitemap file ${file}.`);
    }
    if (xml.includes('https://wazirtradingllc.com') || /https?:\/\/(?:localhost|127\.0\.0\.1|[^\s<]*replit[^\s<]*|[^\s<]*vercel\.app)/i.test(xml)) {
      throw new Error(`SEO validation failed: non-production URL found in ${file}.`);
    }
    sitemapUrls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]));
  }
  const vehicleSitemapUrls = sitemapUrls.filter(url => url.includes('/cars/'));
  const uniqueVehicleUrls = new Set(vehicleSitemapUrls);
  if (uniqueVehicleUrls.size !== vehicleSitemapUrls.length) {
    throw new Error('SEO validation failed: duplicate vehicle URLs found in sitemap files.');
  }
  if (uniqueVehicleUrls.size !== eligibleRefs.size) {
    throw new Error(`SEO validation failed: sitemap has ${uniqueVehicleUrls.size} vehicle URLs but ${eligibleRefs.size} vehicles passed the quality gate.`);
  }

  const staticPaths = new Set(STATIC_PAGES.map(page => page.path));
  const generatedVehicles = cars.filter(isValidVehicle);
  for (const car of generatedVehicles) {
    const pagePath = join(DIST_DIR, 'cars', encodeURIComponent(car.ref_number.trim()), 'index.html');
    const html = await readFile(pagePath, 'utf8');
    const expectedRobots = isIndexableVehicle(car) ? 'index, follow' : 'noindex, follow';
    if (!html.includes(`name="robots" content="${expectedRobots}"`)) {
      throw new Error(`SEO validation failed: unexpected robots directive for ${car.ref_number}.`);
    }
    if (!html.includes(`rel="canonical" href="${htmlEscape(canonicalUrl(car.ref_number))}"`)) {
      throw new Error(`SEO validation failed: missing canonical for ${car.ref_number}.`);
    }
    if ((html.match(/<h1\b/gi) ?? []).length !== 1
      || !/<meta\s+name="description"\s+content="[^"]+"/i.test(html)
      || !/<meta\s+property="og:title"\s+content="[^"]+"/i.test(html)
      || !html.includes('id="vehicle-jsonld"')
      || !html.includes('id="breadcrumb-jsonld"')) {
      throw new Error(`SEO validation failed: incomplete metadata or structured data for ${car.ref_number}.`);
    }
    validateInternalLinks(html, `vehicle ${car.ref_number}`, staticPaths, eligibleRefs);
  }
  const shell = await readFile(join(DIST_DIR, 'index.html'), 'utf8');
  for (const page of STATIC_SEO_PAGES) {
    const routeDir = page.path === '/' ? DIST_DIR : join(DIST_DIR, page.path.slice(1));
    const html = await readFile(join(routeDir, 'index.html'), 'utf8');
    const expectedCanonical = `${BASE_URL}${page.path === '/' ? '/' : page.path}`;
    if (!html.includes(`<title>${htmlEscape(page.title)}</title>`)
      || !html.includes(`name="description" content="${htmlEscape(page.description)}"`)
      || !html.includes(`rel="canonical" href="${expectedCanonical}"`)
      || (html.match(/<h1\b/gi) ?? []).length !== 1) {
      throw new Error(`SEO validation failed: incomplete static page metadata for ${page.path}.`);
    }
    validateInternalLinks(html, `static page ${page.path}`, staticPaths, eligibleRefs);
  }
  validateInternalLinks(shell, 'application shell', staticPaths, eligibleRefs);
  console.log(`[seo] QA passed: ${uniqueVehicleUrls.size} unique indexable vehicle URLs, ${generatedVehicles.length} generated vehicle pages, ${STATIC_SEO_PAGES.length} pre-rendered static pages`);
  console.log('[seo] Orphan check: eligible vehicles are linked in the pre-rendered /cars inventory page and vehicle sitemap.');
}

function validateInternalLinks(html, source, staticPaths, eligibleRefs) {
  const hrefs = [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)].map(match => match[1]);
  for (const href of hrefs) {
    if (!href.startsWith('/') || href.startsWith('//') || href.startsWith('/#')) continue;
    const path = href.split(/[?#]/, 1)[0];
    if (path.startsWith('/cars/')) {
      const ref = decodeURIComponent(path.slice('/cars/'.length));
      if (ref && !eligibleRefs.has(ref)) {
        throw new Error(`SEO validation failed: ${source} contains an invalid vehicle link ${href}.`);
      }
      continue;
    }
    if (!staticPaths.has(path)) {
      throw new Error(`SEO validation failed: ${source} contains an unknown internal link ${href}.`);
    }
  }
}

async function main() {
  const template = await readFile(join(DIST_DIR, 'index.html'), 'utf8');
  const cars = await fetchInventory();
  const validVehicles = await writeVehiclePages(cars, template);
  await writeStaticPages(cars, template);
  const sitemap = await writeSitemaps(cars);
  await validateGeneratedSeo(cars);
  const availableCount = validVehicles.filter(isIndexableVehicle).length;
  const soldCount = validVehicles.filter(isSold).length;
  console.log(`[seo] ${availableCount} indexable vehicles, ${soldCount} sold/noindex vehicle pages`);
  console.log(`[seo] ${sitemap.eligibleCount} vehicle URLs across ${sitemap.sitemapCount} sitemap files`);
}

main().catch(error => {
  console.error(`[seo] ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});