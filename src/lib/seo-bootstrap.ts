import { VEHICLE_DETAIL_SELECT } from "@/lib/vehicle-detail-data";
import { isSupabaseConfigured, supabase } from "./supabase";
import { buildFaqStructuredData } from "../pages/faqs";
import {
  VEHICLE_LANDING_CAR_LIMIT,
  MIN_INDEXABLE_LANDING_STOCK,
  vehicleLandingAliasOrFilter,
  summarizeVehicleLandingInventory,
  type VehicleLandingInventorySummary,
  VEHICLE_LANDING_DIRECTORY_PATH,
  getVehicleLandingPage,
  vehicleLandingDirectoryStructuredData,
  vehicleLandingStructuredData,
  type VehicleLandingPage,
} from "./vehicle-landing-pages";
import {
  countryDirectoryStructuredData,
  countryPageStructuredData,
  countryLandingPath,
  getCountryLandingPage,
  type CountryLandingPage,
} from "./country-landing-pages";
import {
  SITE_URL,
  isIndexableVehicle,
  vehicleCanonical,
  vehicleDescription,
  vehicleJsonLd,
  vehicleTitle,
  breadcrumbJsonLd,
  validImageUrls,
  type VehicleSeoCar,
} from "./vehicle-seo";

const DEFAULT_TITLE = "Japanese Used Cars for Export | Wazir Trading LLC";
const DEFAULT_DESCRIPTION =
  "Browse Japanese used vehicle listings, review specifications and photos, and request export and shipping information from Wazir Trading LLC.";
const SOCIAL_IMAGE = `${SITE_URL}/og-image.jpg`;

const PAGE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: DEFAULT_TITLE,
    description:
      "Browse current Japanese used vehicle listings, review specifications and photos, and request export and shipping information from Wazir Trading LLC.",
  },
  "/import-japanese-cars": {
    title: "Import Japanese Used Cars by Country | Wazir Trading LLC",
    description:
      "Explore country-specific planning guides for importing Japanese used vehicles, with official customs resources and buyer checklists for 40 destinations.",
  },
  "/cars": {
    title: "Browse Japanese Used Cars for Export | Wazir Trading LLC",
    description:
      "Browse current Japanese used cars available for export. Filter by make, model, price, and body type, then review FOB prices and vehicle records from Japan.",
  },
  "/about": {
    title: "About Us | Wazir Trading LLC — Japanese Car Exporters",
    description:
      "Learn how Wazir Trading LLC helps buyers review Japanese used vehicle listings, understand export steps, and request shipping information.",
  },
  "/how-it-works": {
    title: "How It Works — Buy a Car from Japan | Wazir Trading LLC",
    description:
      "Learn how to select, purchase, pay for, and ship a Japanese used car through Wazir Trading LLC.",
  },
  "/auto-parts": {
    title: "Auto Parts & Dismantling Services | Wazir Trading LLC",
    description:
      "Source quality Japanese auto parts through Wazir Trading LLC. Share your requirements and we will prepare an export quotation for your destination.",
  },
  "/shipping-information": {
    title: "Shipping Information — Japan Car Export | Wazir Trading",
    description:
      "Review shipping routes, export documentation, and delivery information for Japanese used cars purchased through Wazir Trading LLC.",
  },
  "/contact": {
    title: "Contact Wazir Trading LLC | Japanese Car Export",
    description:
      "Contact Wazir Trading LLC by WhatsApp, email, or inquiry form about Japanese used car exports, vehicle pricing, and shipping.",
  },
  "/faqs": {
    title: "FAQs — Japanese Car Import Questions Answered | Wazir Trading LLC",
    description:
      "Answers to common questions about buying, shipping, and paying for Japanese used cars through Wazir Trading LLC.",
  },
  "/payment-information": {
    title: "Payment Information — Bank Transfer Details | Wazir Trading",
    description:
      "Review payment steps and bank transfer information for Japanese used vehicle purchases through Wazir Trading LLC.",
  },
  "/buyer-information": {
    title: "Buyer Information & Vehicle Purchase Checklist | Wazir Trading LLC",
    description:
      "A practical checklist for reviewing Japanese used vehicle listings, export quotations, payment instructions, shipping scope and destination import requirements.",
  },
  "/terms-and-conditions": {
    title: "Website Terms & Vehicle Purchase Conditions | Wazir Trading LLC",
    description:
      "General website use and Japanese used vehicle purchase information, including listing accuracy, quotations, payment, shipping and import responsibilities.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Wazir Trading LLC",
    description:
      "Learn what information Wazir Trading LLC receives through website enquiries, how it is used to respond, and how to contact the business about privacy requests.",
  },
};

export interface SeoBootstrapData {
  pathname: string;
  search: string;
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogType: string;
  ogImage: string;
  ogImageAlt: string;
  structuredData: Record<string, unknown>[];
  vehicle?: (VehicleSeoCar & Record<string, unknown>) | null;
  vehicleRef?: string;
  vehicleResolved?: boolean;
  inventoryCars?: Record<string, unknown>[];
  inventoryCount?: number;
  inventoryResolved?: boolean;
  featuredCars?: Record<string, unknown>[];
  featuredResolved?: boolean;
  stockCount?: number;
  stockCountResolved?: boolean;
  notFound?: boolean;
  country?: CountryLandingPage;
  vehicleLandingPage?: VehicleLandingPage;
  vehicleLandingCars?: Record<string, unknown>[];
  vehicleLandingAvailableCount?: number;
  vehicleLandingQualifiedCount?: number;
  vehicleLandingInventorySummary?: VehicleLandingInventorySummary;
  vehicleLandingResolved?: boolean;
}

function normalizeSearch(value: string): string {
  if (!value) return "";
  return value.startsWith("?") ? value : `?${value}`;
}

function absoluteUrl(pathname: string): string {
  return `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
}

function basePayload(
  pathname: string,
  search: string,
  title: string,
  description: string,
): SeoBootstrapData {
  return {
    pathname,
    search,
    title,
    description,
    canonical: absoluteUrl(pathname),
    robots: "index, follow, max-image-preview:large, max-snippet:-1",
    ogType: "website",
    ogImage: SOCIAL_IMAGE,
    ogImageAlt: "Wazir Trading LLC — Japanese used vehicles for export",
    structuredData: [],
  };
}

const INVENTORY_SELECT = "*, car_images(image_url, is_primary, display_order)";
const FEATURED_SELECT =
  "id,ref_number,make,model,variant,year,engine_cc,fob_price_usd,is_featured,created_at,mileage_km,transmission,fuel_type,car_images(image_url,is_primary,display_order)";

/**
 * Server/route-loader bootstrap for the existing Wouter pages. This uses the
 * same public anon-key Supabase client as the current browser application; no
 * service-role credential is required or exposed here.
 */
export async function loadSeoBootstrap(
  pathnameValue: string,
  searchValue = "",
): Promise<SeoBootstrapData> {
  const pathname = pathnameValue.length > 1 ? pathnameValue.replace(/\/+$/, "") : "/";
  const search = normalizeSearch(searchValue);
  const params = new URLSearchParams(search);

  if (pathname === "/import-japanese-cars") {
    const payload = basePayload(
      pathname,
      search,
      PAGE_META[pathname].title,
      PAGE_META[pathname].description,
    );
    if (params.toString()) payload.robots = "noindex, follow";
    payload.structuredData = [countryDirectoryStructuredData()];
    return payload;
  }

  if (pathname === VEHICLE_LANDING_DIRECTORY_PATH) {
    const payload = basePayload(
      pathname,
      search,
      "Japanese Used Cars by Make, Model & Body Type | Wazir Trading",
      "Browse Japanese used vehicle guides by manufacturer, model and body type. Compare specifications and view matching available inventory from Japan.",
    );
    if (params.toString()) payload.robots = "noindex, follow";
    payload.structuredData = [vehicleLandingDirectoryStructuredData()];
    return payload;
  }

  const vehicleLandingPage = getVehicleLandingPage(pathname);
  if (vehicleLandingPage) {
    const payload = basePayload(
      pathname,
      search,
      vehicleLandingPage.title,
      vehicleLandingPage.description,
    );
    payload.vehicleLandingPage = vehicleLandingPage;
    payload.canonical = `${SITE_URL}${vehicleLandingPage.path}`;

    if (
      params.toString() ||
      !isSupabaseConfigured ||
      vehicleLandingPage.directoryVisible === false
    ) {
      payload.robots = "noindex, follow";
      return payload;
    }

    try {
      let query = supabase
        .from("cars")
        .select(INVENTORY_SELECT, { count: "exact" })
        .eq("status", "available");
      if (vehicleLandingPage.make) {
        const aliases = vehicleLandingPage.makeAliases?.length
          ? vehicleLandingPage.makeAliases
          : [vehicleLandingPage.make];
        query =
          aliases.length > 1
            ? query.or(vehicleLandingAliasOrFilter("make", aliases))
            : query.ilike("make", aliases[0]);
      }
      if (vehicleLandingPage.model) {
        const aliases = vehicleLandingPage.modelAliases?.length
          ? vehicleLandingPage.modelAliases
          : [vehicleLandingPage.model];
        query =
          aliases.length > 1
            ? query.or(vehicleLandingAliasOrFilter("model", aliases))
            : query.ilike("model", aliases[0]);
      }
      if (vehicleLandingPage.bodyType) {
        const aliases = vehicleLandingPage.bodyTypeAliases?.length
          ? vehicleLandingPage.bodyTypeAliases
          : [vehicleLandingPage.bodyType];
        query =
          aliases.length > 1
            ? query.or(vehicleLandingAliasOrFilter("body_type", aliases))
            : query.ilike("body_type", aliases[0]);
      }

      const { data, count, error } = await query
        .order("created_at", { ascending: false })
        .range(0, VEHICLE_LANDING_CAR_LIMIT - 1);
      if (error) {
        payload.robots = "noindex, follow";
        console.warn(
          `SEO bootstrap could not load ${vehicleLandingPage.path} inventory:`,
          error.message,
        );
        return payload;
      }

      const qualityCars = ((data ?? []) as unknown as VehicleSeoCar[]).filter(isIndexableVehicle);
      payload.vehicleLandingCars = qualityCars.slice(0, 8) as unknown as Record<string, unknown>[];
      payload.vehicleLandingAvailableCount = count ?? data?.length ?? 0;
      payload.vehicleLandingQualifiedCount = qualityCars.length;
      payload.vehicleLandingInventorySummary = summarizeVehicleLandingInventory(
        qualityCars,
        count ?? data?.length ?? 0,
      );
      payload.vehicleLandingResolved = true;

      if (qualityCars.length < MIN_INDEXABLE_LANDING_STOCK) {
        payload.robots = "noindex, follow";
      } else {
        payload.structuredData = vehicleLandingStructuredData(vehicleLandingPage, qualityCars);
        const firstImage = validImageUrls(qualityCars[0])[0];
        if (firstImage) {
          payload.ogImage = firstImage;
          payload.ogImageAlt = `${vehicleLandingPage.label} vehicle from Japan`;
        }
      }
    } catch (error) {
      payload.robots = "noindex, follow";
      console.warn(`SEO bootstrap could not load ${vehicleLandingPage.path} inventory:`, error);
    }
    return payload;
  }

  // Unknown paths inside the vehicle-guide namespace must be true 404s, not
  // soft-200 pages with the site's default title and indexable robots state.
  if (pathname.startsWith(`${VEHICLE_LANDING_DIRECTORY_PATH}/`)) {
    const missing = basePayload(
      pathname,
      search,
      "Page Not Found | Wazir Trading LLC",
      "The requested vehicle guide could not be found.",
    );
    missing.robots = "noindex, follow";
    missing.notFound = true;
    return missing;
  }

  const countryMatch = pathname.match(/^\/import-japanese-cars\/([^/]+)$/);
  if (countryMatch) {
    let slug = countryMatch[1];
    try {
      slug = decodeURIComponent(slug);
    } catch {
      const invalid = basePayload(
        pathname,
        search,
        "Page Not Found | Wazir Trading LLC",
        "The requested destination guide could not be found.",
      );
      invalid.robots = "noindex, follow";
      invalid.notFound = true;
      return invalid;
    }
    const country = getCountryLandingPage(slug);
    if (!country) {
      const missing = basePayload(
        pathname,
        search,
        "Page Not Found | Wazir Trading LLC",
        "The requested destination guide could not be found.",
      );
      missing.robots = "noindex, follow";
      missing.notFound = true;
      return missing;
    }
    const payload = basePayload(pathname, search, country.title, country.description);
    payload.country = country;
    payload.canonical = `${SITE_URL}${countryLandingPath(country)}`;
    if (!country.indexable || params.toString()) payload.robots = "noindex, follow";
    payload.structuredData = countryPageStructuredData(country);
    return payload;
  }

  if (pathname === "/cars") {
    const payload = basePayload(
      pathname,
      search,
      PAGE_META["/cars"].title,
      PAGE_META["/cars"].description,
    );
    if (params.toString().length > 0) {
      payload.robots = "noindex, follow";
      return payload;
    }
    if (!isSupabaseConfigured) {
      // Do not index an inventory route that cannot render its stock data.
      payload.robots = "noindex, follow";
      return payload;
    }

    try {
      const { data, count, error } = await supabase
        .from("cars")
        .select(INVENTORY_SELECT, { count: "exact" })
        .eq("status", "available")
        .order("created_at", { ascending: false })
        .range(0, 19);
      if (error) {
        payload.robots = "noindex, follow";
        console.warn("SEO bootstrap could not load the first inventory page:", error.message);
      } else {
        payload.inventoryCars = (data ?? []) as unknown as Record<string, unknown>[];
        payload.inventoryCount = count ?? data?.length ?? 0;
        payload.inventoryResolved = true;
        const hasIndexableInventory = (data ?? []).some((car) =>
          isIndexableVehicle(car as unknown as VehicleSeoCar),
        );
        if (payload.inventoryCount === 0 || !hasIndexableInventory) {
          payload.robots = "noindex, follow";
        }
      }
    } catch (error) {
      payload.robots = "noindex, follow";
      console.warn("SEO bootstrap could not load the first inventory page:", error);
    }
    return payload;
  }

  if (pathname === "/") {
    const payload = basePayload(pathname, search, PAGE_META["/"].title, PAGE_META["/"].description);
    if (!isSupabaseConfigured) return payload;

    try {
      const [featuredResult, countResult] = await Promise.all([
        supabase
          .from("cars")
          .select(FEATURED_SELECT)
          .eq("status", "available")
          .eq("is_featured", true)
          .order("created_at", { ascending: false })
          .limit(50),
        supabase
          .from("cars")
          .select("id", { count: "exact", head: true })
          .eq("status", "available"),
      ]);

      if (!featuredResult.error) {
        payload.featuredCars = (featuredResult.data ?? []) as unknown as Record<string, unknown>[];
        payload.featuredResolved = true;
      }
      if (!countResult.error && countResult.count != null) {
        payload.stockCount = countResult.count;
        payload.stockCountResolved = true;
      }
    } catch (error) {
      // The public page can still render its static content when inventory is
      // temporarily unreachable; the client keeps its existing refresh path.
      console.warn("SEO bootstrap could not load homepage inventory:", error);
    }
    return payload;
  }

  const vehicleMatch = pathname.match(/^\/cars\/([^/]+)$/);
  if (vehicleMatch) {
    let ref = vehicleMatch[1];
    try {
      ref = decodeURIComponent(vehicleMatch[1]);
    } catch {
      const malformed = basePayload(
        pathname,
        search,
        "Page Not Found | Wazir Trading LLC",
        "The requested vehicle URL is invalid.",
      );
      malformed.robots = "noindex, follow";
      malformed.notFound = true;
      return malformed;
    }
    const payload = basePayload(
      pathname,
      search,
      "Vehicle details | Wazir Trading LLC",
      "Review this Japanese used vehicle record, specifications, photographs, and export enquiry information from Wazir Trading LLC.",
    );
    payload.vehicleRef = ref;
    payload.canonical = vehicleCanonical(ref);
    payload.robots = "noindex, follow";

    if (!isSupabaseConfigured) return payload;

    try {
      const { data, error } = await supabase
        .from("cars")
        .select(VEHICLE_DETAIL_SELECT)
        .eq("ref_number", ref)
        .maybeSingle();

      if (error) {
        console.warn("SEO bootstrap vehicle lookup failed:", error.message);
        return payload;
      }

      if (!data) {
        payload.vehicleResolved = true;
        payload.notFound = true;
        return payload;
      }

      const vehicle = data as unknown as VehicleSeoCar & Record<string, unknown>;
      payload.vehicle = vehicle;
      payload.vehicleResolved = true;
      payload.title = vehicleTitle(vehicle);
      payload.description = vehicleDescription(vehicle);
      payload.ogType = "product";
      payload.ogImage = validImageUrls(vehicle)[0] ?? SOCIAL_IMAGE;
      payload.ogImageAlt = `${vehicleTitle(vehicle)} — vehicle photograph`;
      payload.robots = isIndexableVehicle(vehicle)
        ? "index, follow, max-image-preview:large, max-snippet:-1"
        : "noindex, follow";

      if (isIndexableVehicle(vehicle)) {
        payload.structuredData = [vehicleJsonLd(vehicle), breadcrumbJsonLd(vehicle)];
      }
    } catch (error) {
      console.warn("SEO bootstrap vehicle lookup threw:", error);
    }
    return payload;
  }

  if (pathname.startsWith("/admin/")) {
    const payload = basePayload(
      pathname,
      search,
      "Administration | Wazir Trading LLC",
      "Private administration page.",
    );
    payload.robots = "noindex, nofollow";
    // Only the existing bulk-upload screen is a real admin route. Unknown
    // admin paths should return 404 rather than a soft 200.
    if (pathname !== "/admin/bulk-upload") payload.notFound = true;
    return payload;
  }

  const page = PAGE_META[pathname];
  if (!page) {
    const payload = basePayload(
      pathname,
      search,
      "Page Not Found | Wazir Trading LLC",
      "The requested page could not be found.",
    );
    payload.robots = "noindex, follow";
    payload.notFound = true;
    return payload;
  }

  const payload = basePayload(pathname, search, page.title, page.description);
  if (pathname === "/faqs") payload.structuredData = [buildFaqStructuredData()];
  return payload;
}

function safeJsonLd(value: Record<string, unknown>): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function buildSeoHead(data: SeoBootstrapData | undefined) {
  // A thrown notFound() can leave loaderData undefined. Keep the document
  // explicitly noindex and avoid pointing an unknown URL at the homepage.
  if (!data) {
    return {
      meta: [
        { title: "Page Not Found | Wazir Trading LLC" },
        { name: "description", content: "The requested page could not be found." },
        { name: "robots", content: "noindex, follow" },
      ],
      links: [],
      scripts: [],
    };
  }
  const payload = data;
  const meta = [
    { title: payload.title },
    { name: "description", content: payload.description },
    { name: "robots", content: payload.robots },
    { property: "og:site_name", content: "Wazir Trading LLC" },
    { property: "og:locale", content: "en_US" },
    { property: "og:title", content: payload.title },
    { property: "og:description", content: payload.description },
    { property: "og:type", content: payload.ogType },
    { property: "og:url", content: payload.canonical },
    { property: "og:image", content: payload.ogImage },
    { property: "og:image:alt", content: payload.ogImageAlt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: payload.title },
    { name: "twitter:description", content: payload.description },
    { name: "twitter:image", content: payload.ogImage },
    { name: "twitter:image:alt", content: payload.ogImageAlt },
  ];
  const links = [{ rel: "canonical", href: payload.canonical }];
  const scripts = payload.structuredData.map((item) => ({
    type: "application/ld+json",
    children: safeJsonLd(item),
  }));
  return { meta, links, scripts };
}

export const ORGANIZATION_STRUCTURED_DATA: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Wazir Trading LLC",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.webp`,
  },
  email: "wazirtrading-pc@outlook.jp",
  telephone: "+818089227375",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Heights Mizutani 1C, 158-1 Jizou",
    addressLocality: "Kuwana-City",
    addressRegion: "Mie-Prefecture",
    addressCountry: "JP",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+818089227375",
      email: "wazirtrading-pc@outlook.jp",
      availableLanguage: ["English"],
    },
  ],
  sameAs: ["https://www.instagram.com/wazirtradingllc/"],
};

export const WEBSITE_STRUCTURED_DATA: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Wazir Trading LLC",
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/cars?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export function buildGlobalStructuredDataScripts() {
  return [ORGANIZATION_STRUCTURED_DATA, WEBSITE_STRUCTURED_DATA].map((item) => ({
    type: "application/ld+json",
    children: safeJsonLd(item),
  }));
}
