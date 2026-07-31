/**
 * generate-sitemap.mjs
 * Runs before `vite build` to produce public/sitemap.xml.
 * Fetches all live car ref_numbers from Supabase via the REST API
 * (no Node SDK needed — plain fetch) and combines them with static routes.
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL  = 'https://wazirtradingllc.com';

// Static pages — sorted by importance
const STATIC_PAGES = [
  { path: '/',                        priority: '1.0', changefreq: 'daily'   },
  { path: '/cars',                    priority: '0.9', changefreq: 'daily'   },
  { path: '/how-it-works',            priority: '0.7', changefreq: 'monthly' },
  { path: '/shipping-information',    priority: '0.7', changefreq: 'monthly' },
  { path: '/payment-information',     priority: '0.6', changefreq: 'monthly' },
  { path: '/about',                   priority: '0.6', changefreq: 'monthly' },
  { path: '/contact',                 priority: '0.6', changefreq: 'monthly' },
  { path: '/faqs',                    priority: '0.6', changefreq: 'monthly' },
];

async function fetchCarRefs() {
  const url    = process.env.VITE_SUPABASE_URL;
  const apiKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !apiKey) {
    console.warn('[sitemap] Supabase env vars not set — skipping dynamic car pages');
    return [];
  }

  try {
    const res = await fetch(
      `${url}/rest/v1/cars?select=ref_number,updated_at&status=eq.available&limit=2000`,
      { headers: { apikey: apiKey, Authorization: `Bearer ${apiKey}` } },
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[sitemap] Could not fetch car refs:', err.message);
    return [];
  }
}

function urlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

(async () => {
  const today = new Date().toISOString().split('T')[0];
  const cars  = await fetchCarRefs();

  const staticEntries = STATIC_PAGES.map(p =>
    urlEntry(`${BASE_URL}${p.path}`, today, p.changefreq, p.priority),
  );

  const carEntries = cars.map(car =>
    urlEntry(
      `${BASE_URL}/cars/${car.ref_number}`,
      car.updated_at ? car.updated_at.split('T')[0] : today,
      'weekly',
      '0.8',
    ),
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...carEntries].join('\n')}
</urlset>
`;

  const outPath = join(__dirname, 'public', 'sitemap.xml');
  writeFileSync(outPath, sitemap, 'utf-8');
  console.log(`[sitemap] ✓ ${staticEntries.length} static + ${carEntries.length} car pages → public/sitemap.xml`);
})().catch(err => {
  // Never fail the build — sitemap is nice-to-have
  console.error('[sitemap] Generation failed (build continues):', err);
});
