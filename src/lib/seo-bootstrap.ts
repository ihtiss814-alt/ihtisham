import { isSupabaseConfigured, supabase } from './supabase';
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
} from './vehicle-seo';

const DEFAULT_TITLE = 'Japanese Used Cars for Export | Wazir Trading LLC';
const DEFAULT_DESCRIPTION =
  'Browse Japanese used vehicle listings, review specifications and photos, and request export and shipping information from Wazir Trading LLC.';
const SOCIAL_IMAGE = `${SITE_URL}/og-image.jpg`;

const PAGE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: DEFAULT_TITLE,
    description: 'Browse current Japanese used vehicle listings, review specifications and photos, and request export and shipping information from Wazir Trading LLC.',
  },
  '/cars': {
    title: 'Browse Japanese Used Cars for Export | Wazir Trading LLC',
    description: 'Browse current Japanese used cars available for export. Filter by make, model, price, and body type, then review FOB prices and vehicle records from Japan.',
  },
  '/about': {
    title: 'About Us | Wazir Trading LLC — Japanese Car Exporters',
    description: 'Learn how Wazir Trading LLC helps buyers review Japanese used vehicle listings, understand export steps, and request shipping information.',
  },
  '/how-it-works': {
    title: 'How It Works — Buy a Car from Japan | Wazir Trading LLC',
    description: 'Learn how to select, purchase, pay for, and ship a Japanese used car through Wazir Trading LLC.',
  },
  '/auto-parts': {
    title: 'Auto Parts & Dismantling Services | Wazir Trading LLC',
    description: 'Source quality Japanese auto parts through Wazir Trading LLC. Share your requirements and we will prepare an export quotation for your destination.',
  },
  '/shipping-information': {
    title: 'Shipping Information — Japan Car Export | Wazir Trading',
    description: 'Review shipping routes, export documentation, and delivery information for Japanese used cars purchased through Wazir Trading LLC.',
  },
  '/contact': {
    title: 'Contact Wazir Trading LLC | Japanese Car Export',
    description: 'Contact Wazir Trading LLC by WhatsApp, email, or inquiry form about Japanese used car exports, vehicle pricing, and shipping.',
  },
  '/faqs': {
    title: 'FAQs — Japanese Car Import Questions Answered | Wazir Trading LLC',
    description: 'Answers to common questions about buying, shipping, and paying for Japanese used cars through Wazir Trading LLC.',
  },
  '/payment-information': {
    title: 'Payment Information — Bank Transfer Details | Wazir Trading',
    description: 'Review payment steps and bank transfer information for Japanese used vehicle purchases through Wazir Trading LLC.',
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
}

function normalizeSearch(value: string): string {
  if (!value) return '';
  return value.startsWith('?') ? value : `?${value}`;
}

function absoluteUrl(pathname: string): string {
  return `${SITE_URL}${pathname === '/' ? '/' : pathname}`;
}

function basePayload(pathname: string, search: string, title: string, description: string): SeoBootstrapData {
  return {
    pathname,
    search,
    title,
    description,
    canonical: absoluteUrl(pathname),
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    ogType: 'website',
    ogImage: SOCIAL_IMAGE,
    structuredData: [],
  };
}

const VEHICLE_DETAIL_SELECT =
  '*, car_images(image_url, is_primary, display_order)';
const INVENTORY_SELECT =
  '*, car_images(image_url, is_primary, display_order)';
const FEATURED_SELECT =
  'id,ref_number,make,model,variant,year,engine_cc,fob_price_usd,is_new_arrival,mileage_km,transmission,fuel_type,car_images(image_url,is_primary,display_order)';

/**
 * Server/route-loader bootstrap for the existing Wouter pages. This uses the
 * same public anon-key Supabase client as the current browser application; no
 * service-role credential is required or exposed here.
 */
export async function loadSeoBootstrap(
  pathnameValue: string,
  searchValue = '',
): Promise<SeoBootstrapData> {
  const pathname = pathnameValue.length > 1 ? pathnameValue.replace(/\/+$/, '') : '/';
  const search = normalizeSearch(searchValue);
  const params = new URLSearchParams(search);

  if (pathname === '/cars') {
    const payload = basePayload(pathname, search, PAGE_META['/cars'].title, PAGE_META['/cars'].description);
    if (params.toString().length > 0) {
      payload.robots = 'noindex, follow';
      return payload;
    }
    if (!isSupabaseConfigured) return payload;

    try {
      const { data, count, error } = await supabase
        .from('cars')
        .select(INVENTORY_SELECT, { count: 'exact' })
        .eq('status', 'available')
        .order('created_at', { ascending: false })
        .range(0, 19);
      if (!error) {
        payload.inventoryCars = (data ?? []) as unknown as Record<string, unknown>[];
        payload.inventoryCount = count ?? 0;
        payload.inventoryResolved = true;
      }
    } catch (error) {
      console.warn('SEO bootstrap could not load the first inventory page:', error);
    }
    return payload;
  }

  if (pathname === '/') {
    const payload = basePayload(pathname, search, PAGE_META['/'].title, PAGE_META['/'].description);
    if (!isSupabaseConfigured) return payload;

    try {
      const [featuredResult, countResult] = await Promise.all([
        supabase
          .from('cars')
          .select(FEATURED_SELECT)
          .eq('is_new_arrival', true)
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('cars')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'available'),
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
      console.warn('SEO bootstrap could not load homepage inventory:', error);
    }
    return payload;
  }

  const vehicleMatch = pathname.match(/^\/cars\/([^/]+)$/);
  if (vehicleMatch) {
    let ref = vehicleMatch[1];
    try {
      ref = decodeURIComponent(vehicleMatch[1]);
    } catch {
      const malformed = basePayload(pathname, search, 'Page Not Found | Wazir Trading LLC', 'The requested vehicle URL is invalid.');
      malformed.robots = 'noindex, follow';
      malformed.notFound = true;
      return malformed;
    }
    const payload = basePayload(
      pathname,
      search,
      'Vehicle details | Wazir Trading LLC',
      'Review this Japanese used vehicle record, specifications, photographs, and export enquiry information from Wazir Trading LLC.',
    );
    payload.vehicleRef = ref;
    payload.canonical = vehicleCanonical(ref);
    payload.robots = 'noindex, follow';

    if (!isSupabaseConfigured) return payload;

    try {
      const { data, error } = await supabase
        .from('cars')
        .select(VEHICLE_DETAIL_SELECT)
        .eq('ref_number', ref)
        .maybeSingle();

      if (error) {
        console.warn('SEO bootstrap vehicle lookup failed:', error.message);
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
      payload.ogType = 'product';
      payload.ogImage = validImageUrls(vehicle)[0] ?? SOCIAL_IMAGE;
      payload.robots = isIndexableVehicle(vehicle)
        ? 'index, follow, max-image-preview:large, max-snippet:-1'
        : 'noindex, follow';

      if (isIndexableVehicle(vehicle)) {
        payload.structuredData = [
          vehicleJsonLd(vehicle),
          breadcrumbJsonLd(vehicle),
        ];
      }
    } catch (error) {
      console.warn('SEO bootstrap vehicle lookup threw:', error);
    }
    return payload;
  }

  if (pathname.startsWith('/admin/')) {
    const payload = basePayload(pathname, search, 'Administration | Wazir Trading LLC', 'Private administration page.');
    payload.robots = 'noindex, nofollow';
    // Only the existing bulk-upload screen is a real admin route. Unknown
    // admin paths should return 404 rather than a soft 200.
    if (pathname !== '/admin/bulk-upload') payload.notFound = true;
    return payload;
  }

  const page = PAGE_META[pathname];
  if (!page) {
    const payload = basePayload(pathname, search, 'Page Not Found | Wazir Trading LLC', 'The requested page could not be found.');
    payload.robots = 'noindex, follow';
    payload.notFound = true;
    return payload;
  }

  return basePayload(pathname, search, page.title, page.description);
}

function safeJsonLd(value: Record<string, unknown>): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function buildSeoHead(data: SeoBootstrapData | undefined) {
  // A thrown notFound() can leave loaderData undefined. Keep the document
  // explicitly noindex and avoid pointing an unknown URL at the homepage.
  if (!data) {
    return {
      meta: [
        { title: 'Page Not Found | Wazir Trading LLC' },
        { name: 'description', content: 'The requested page could not be found.' },
        { name: 'robots', content: 'noindex, follow' },
      ],
      links: [],
      scripts: [],
    };
  }
  const payload = data;
  const meta = [
    { title: payload.title },
    { name: 'description', content: payload.description },
    { name: 'robots', content: payload.robots },
    { property: 'og:title', content: payload.title },
    { property: 'og:description', content: payload.description },
    { property: 'og:type', content: payload.ogType },
    { property: 'og:url', content: payload.canonical },
    { property: 'og:image', content: payload.ogImage },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: payload.title },
    { name: 'twitter:description', content: payload.description },
    { name: 'twitter:image', content: payload.ogImage },
  ];
  const links = [{ rel: 'canonical', href: payload.canonical }];
  const scripts = payload.structuredData.map((item) => ({
    type: 'application/ld+json',
    children: safeJsonLd(item),
  }));
  return { meta, links, scripts };
}

export const ORGANIZATION_STRUCTURED_DATA: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Wazir Trading LLC',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.webp`,
};

export const WEBSITE_STRUCTURED_DATA: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Wazir Trading LLC',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/cars?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export function buildGlobalStructuredDataScripts() {
  return [ORGANIZATION_STRUCTURED_DATA, WEBSITE_STRUCTURED_DATA].map((item) => ({
    type: 'application/ld+json',
    children: safeJsonLd(item),
  }));
}
