import { createFileRoute } from "@tanstack/react-router";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import {
  SITE_URL,
  isIndexableVehicle,
  validImageUrls,
  verifiedVehicleModifiedAt,
  type VehicleSeoCar,
} from "../lib/vehicle-seo";
import { COUNTRY_LANDING_PAGES, countryLandingPath } from "../lib/country-landing-pages";
import {
  ALL_VEHICLE_LANDING_PAGES,
  MIN_INDEXABLE_LANDING_STOCK,
  VEHICLE_LANDING_CAR_LIMIT,
  VEHICLE_LANDING_DIRECTORY_PATH,
  vehicleLandingPagesForVehicle,
} from "../lib/vehicle-landing-pages";

const STATIC_PATHS = [
  "/",
  "/cars",
  "/import-japanese-cars",
  VEHICLE_LANDING_DIRECTORY_PATH,
  "/about",
  "/how-it-works",
  "/auto-parts",
  "/shipping-information",
  "/contact",
  "/faqs",
  "/payment-information",
  "/buyer-information",
  "/terms-and-conditions",
  "/privacy-policy",
] as const;

const PAGE_SIZE = 1000;
// Keep vehicle URLs below the protocol limit, leaving room for static pages.
const MAX_PAGES = 49;
const SITEMAP_VEHICLE_SELECT =
  "ref_number,make,model,variant,year,mileage_km,engine_cc,fuel_type,transmission,body_type,drive,color,auction_grade,status,created_at,updated_at,car_images(image_url,is_primary,display_order)";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function validLastModified(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function renderUrl(loc: string, lastmod?: string | null, image?: string | null): string {
  const lastmodNode = lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : "";
  const imageNode = image
    ? `<image:image><image:loc>${escapeXml(image)}</image:loc></image:image>`
    : "";
  return `<url><loc>${escapeXml(loc)}</loc>${lastmodNode}${imageNode}</url>`;
}

async function buildSitemap(): Promise<string> {
  const urls = STATIC_PATHS.filter((path) => path !== "/cars").map((path) =>
    renderUrl(`${SITE_URL}${path === "/" ? "/" : path}`),
  );
  for (const country of COUNTRY_LANDING_PAGES) {
    if (!country.indexable) continue;
    urls.push(
      renderUrl(`${SITE_URL}${countryLandingPath(country)}`, `${country.reviewedOn}T00:00:00.000Z`),
    );
  }

  const emittedVehicleRefs = new Set<string>();
  const vehicleLandingStats = new Map<
    string,
    { scanned: number; count: number; lastmod: string | null }
  >();
  let hasIndexableCatalogPage = false;

  if (isSupabaseConfigured) {
    for (let page = 0; page < MAX_PAGES; page += 1) {
      const from = page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      const { data, error } = await supabase
        .from("cars")
        .select(SITEMAP_VEHICLE_SELECT)
        .eq("status", "available")
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) {
        console.error("Sitemap inventory query failed:", error.message);
        break;
      }

      const rows = (data ?? []) as unknown as Array<VehicleSeoCar & { updated_at?: string | null }>;
      if (page === 0) {
        // Match /cars indexation: its first 20 server-rendered records must
        // include at least one vehicle that passes the same quality gate.
        hasIndexableCatalogPage = rows.slice(0, 20).some(isIndexableVehicle);
      }
      for (const car of rows) {
        const indexable = isIndexableVehicle(car);
        // Mirror the landing-page loader: both evaluate the newest 200
        // available rows that match each make/model/body-style filter.
        for (const landingPage of vehicleLandingPagesForVehicle(car)) {
          const previous = vehicleLandingStats.get(landingPage.path) ?? {
            scanned: 0,
            count: 0,
            lastmod: null,
          };
          if (previous.scanned >= VEHICLE_LANDING_CAR_LIMIT) continue;
          const scanned = previous.scanned + 1;
          const count = previous.count + (indexable ? 1 : 0);
          const modified = indexable ? verifiedVehicleModifiedAt(car) : null;
          const lastmod =
            modified && (!previous.lastmod || modified > previous.lastmod)
              ? modified
              : previous.lastmod;
          vehicleLandingStats.set(landingPage.path, { scanned, count, lastmod });
        }
        if (!indexable) continue;
        const rawRef = car.ref_number.trim();
        if (emittedVehicleRefs.has(rawRef)) continue;
        emittedVehicleRefs.add(rawRef);
        const ref = encodeURIComponent(rawRef);
        const image = validImageUrls(car)[0] ?? null;
        urls.push(renderUrl(`${SITE_URL}/cars/${ref}`, verifiedVehicleModifiedAt(car), image));
      }

      if (rows.length < PAGE_SIZE) break;
      if (page === MAX_PAGES - 1) {
        console.warn(
          `Sitemap reached its ${MAX_PAGES * PAGE_SIZE} vehicle URL safety cap; split into sitemap index files if inventory grows further.`,
        );
      }
    }
  }

  for (const landingPage of ALL_VEHICLE_LANDING_PAGES) {
    if (landingPage.directoryVisible === false) continue;
    const stats = vehicleLandingStats.get(landingPage.path);
    if (!stats || stats.count < MIN_INDEXABLE_LANDING_STOCK) continue;
    urls.push(renderUrl(`${SITE_URL}${landingPage.path}`, stats.lastmod));
  }

  if (hasIndexableCatalogPage) {
    // Keep the catalogue URL in the sitemap only when it has eligible stock.
    urls.splice(1, 0, renderUrl(`${SITE_URL}/cars`));
  }

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...urls,
    "</urlset>",
  ].join("");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const xml = await buildSitemap();
          return new Response(xml, {
            status: 200,
            headers: {
              "Content-Type": "application/xml; charset=utf-8",
              "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
              "X-Content-Type-Options": "nosniff",
            },
          });
        } catch (error) {
          console.error("Could not generate sitemap:", error);
          const fallback = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            ...STATIC_PATHS.filter((path) => path !== "/cars").map((path) =>
              renderUrl(`${SITE_URL}${path === "/" ? "/" : path}`),
            ),
            ...COUNTRY_LANDING_PAGES.filter((country) => country.indexable).map((country) =>
              renderUrl(
                `${SITE_URL}${countryLandingPath(country)}`,
                `${country.reviewedOn}T00:00:00.000Z`,
              ),
            ),
            "</urlset>",
          ].join("");
          return new Response(fallback, {
            status: 200,
            headers: {
              "Content-Type": "application/xml; charset=utf-8",
              "Cache-Control": "public, s-maxage=300, stale-while-revalidate=1800",
              "X-Content-Type-Options": "nosniff",
            },
          });
        }
      },
    },
  },
});
