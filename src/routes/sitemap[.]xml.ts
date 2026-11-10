import { createFileRoute } from '@tanstack/react-router';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { SITE_URL, isIndexableVehicle, validImageUrls, type VehicleSeoCar } from '../lib/vehicle-seo';

const STATIC_PATHS = [
  '/',
  '/cars',
  '/about',
  '/how-it-works',
  '/auto-parts',
  '/shipping-information',
  '/contact',
  '/faqs',
  '/payment-information',
] as const;

const PAGE_SIZE = 1000;
const MAX_PAGES = 50;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function validLastModified(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function renderUrl(loc: string, lastmod?: string | null, image?: string | null): string {
  const lastmodNode = lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : '';
  const imageNode = image
    ? `<image:image><image:loc>${escapeXml(image)}</image:loc></image:image>`
    : '';
  return `<url><loc>${escapeXml(loc)}</loc>${lastmodNode}${imageNode}</url>`;
}

async function buildSitemap(): Promise<string> {
  const urls = STATIC_PATHS.map((path) => renderUrl(`${SITE_URL}${path === '/' ? '/' : path}`));
  const emittedVehicleRefs = new Set<string>();

  if (isSupabaseConfigured) {
    for (let page = 0; page < MAX_PAGES; page += 1) {
      const from = page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      const { data, error } = await supabase
        .from('cars')
        .select('ref_number,make,model,variant,year,mileage_km,engine_cc,fuel_type,transmission,body_type,drive,color,auction_grade,fob_price_usd,status,updated_at,car_images(image_url,is_primary,display_order)')
        .eq('status', 'available')
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        console.error('Sitemap inventory query failed:', error.message);
        break;
      }

      const rows = (data ?? []) as unknown as Array<VehicleSeoCar & { updated_at?: string | null }>;
      for (const car of rows) {
        if (!isIndexableVehicle(car)) continue;
        const rawRef = car.ref_number.trim();
        if (emittedVehicleRefs.has(rawRef)) continue;
        emittedVehicleRefs.add(rawRef);
        const ref = encodeURIComponent(rawRef);
        const image = validImageUrls(car)[0] ?? null;
        urls.push(
          renderUrl(
            `${SITE_URL}/cars/${ref}`,
            validLastModified(car.updated_at),
            image,
          ),
        );
      }

      if (rows.length < PAGE_SIZE) break;
    }
  }

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...urls,
    '</urlset>',
  ].join('');
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        try {
          const xml = await buildSitemap();
          return new Response(xml, {
            status: 200,
            headers: {
              'Content-Type': 'application/xml; charset=utf-8',
              'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
              'X-Content-Type-Options': 'nosniff',
            },
          });
        } catch (error) {
          console.error('Could not generate sitemap:', error);
          const fallback = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            ...STATIC_PATHS.map((path) => renderUrl(`${SITE_URL}${path === '/' ? '/' : path}`)),
            '</urlset>',
          ].join('');
          return new Response(fallback, {
            status: 200,
            headers: {
              'Content-Type': 'application/xml; charset=utf-8',
              'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=3600',
              'X-Content-Type-Options': 'nosniff',
            },
          });
        }
      },
    },
  },
});
