import { isSupabaseConfigured, supabase } from '@/lib/supabase';

/**
 * Shipping rates and landed-cost maths.
 *
 * Both the stock-list estimator (pages/cars.tsx) and the per-car calculator
 * (pages/car-detail.tsx) used to carry their own copy of the country/port
 * table and their own arithmetic, and they disagreed: the stock list fell back
 * to invented freight figures when no rate row existed, while the car page
 * honestly said "ask us". Same route, two different numbers. It all lives here
 * now so that cannot drift again.
 */

export interface ShippingRate {
  country: string;
  port: string;
  freight_usd: number;
  inspection_fee: number;
  insurance_rate: number;
}

/** Destination countries and the ports we ship to. Single source of truth. */
export const COUNTRY_PORTS: Record<string, string[]> = {
  // ── Africa ──────────────────────────────────────────────────────
  Angola:           ['Luanda'],
  Botswana:         ['Durban (via ZA)'],
  Cameroon:         ['Douala'],
  Djibouti:         ['Djibouti'],
  Ethiopia:         ['Djibouti (via DJ)'],
  Ghana:            ['Tema', 'Takoradi'],
  'Ivory Coast':    ['Abidjan'],
  Kenya:            ['Mombasa'],
  Madagascar:       ['Toamasina'],
  Malawi:           ['Beira (via MZ)'],
  Mauritius:        ['Port Louis'],
  Mozambique:       ['Maputo'],
  Namibia:          ['Walvis Bay'],
  Nigeria:          ['Lagos (Apapa)', 'Tin Can Island'],
  Rwanda:           ['Mombasa (via KE)'],
  Senegal:          ['Dakar'],
  'South Africa':   ['Durban', 'Cape Town'],
  'South Sudan':    ['Mombasa (via KE)'],
  Tanzania:         ['Dar es Salaam'],
  Uganda:           ['Mombasa (via KE)'],
  Zambia:           ['Durban (via ZA)'],
  Zimbabwe:         ['Beira (via MZ)'],
  // ── Americas ────────────────────────────────────────────────────
  Canada:           ['Vancouver', 'Halifax'],
  Chile:            ['Valparaíso', 'San Antonio'],
  Colombia:         ['Buenaventura', 'Cartagena'],
  Ecuador:          ['Guayaquil'],
  Guyana:           ['Georgetown'],
  Mexico:           ['Manzanillo', 'Veracruz'],
  Panama:           ['Colón'],
  Peru:             ['Callao'],
  Suriname:         ['Paramaribo'],
  USA:              ['Los Angeles', 'Houston', 'New York'],
  // ── Caribbean ───────────────────────────────────────────────────
  Anguilla:                ['Blowing Point'],
  Antigua:                 ["St. John's"],
  Aruba:                   ['Oranjestad'],
  Bahamas:                 ['Nassau (Freeport)'],
  Barbados:                ['Bridgetown'],
  Belize:                  ['Belize City'],
  Bermuda:                 ['Hamilton'],
  'British Virgin Islands':['Road Town'],
  'Cayman Islands':        ['George Town'],
  Cuba:                    ['Havana'],
  'Curaçao':               ['Willemstad'],
  Dominica:                ['Roseau'],
  'Dominican Republic':    ['Santo Domingo', 'Caucedo'],
  Grenada:                 ["St. George's"],
  Guadeloupe:              ['Pointe-à-Pitre'],
  Haiti:                   ['Port-au-Prince'],
  Jamaica:                 ['Kingston'],
  Martinique:              ['Fort-de-France'],
  Montserrat:              ['Little Bay'],
  'Sint Maarten':          ['Philipsburg'],
  'St Kitts':              ['Basseterre'],
  'St Lucia':              ['Castries'],
  'St Vincent':            ['Kingstown'],
  Trinidad:                ['Port of Spain'],
  'Turks and Caicos':      ['Providenciales'],
  // ── Asia & Middle East ──────────────────────────────────────────
  Azerbaijan:       ['Baku'],
  Bahrain:          ['Manama'],
  Bangladesh:       ['Chittagong'],
  Cambodia:         ['Sihanoukville'],
  Georgia:          ['Poti', 'Batumi'],
  India:            ['Mumbai', 'Chennai', 'Nhava Sheva'],
  Iraq:             ['Umm Qasr'],
  Jordan:           ['Aqaba'],
  Kuwait:           ['Kuwait City'],
  Myanmar:          ['Yangon'],
  Oman:             ['Muscat', 'Sohar'],
  Pakistan:         ['Karachi', 'Gwadar'],
  Philippines:      ['Manila', 'Cebu'],
  Qatar:            ['Doha (Hamad Port)'],
  'Saudi Arabia':   ['Jeddah', 'Dammam'],
  'Sri Lanka':      ['Colombo'],
  Thailand:         ['Bangkok (Laem Chabang)'],
  UAE:              ['Dubai', 'Abu Dhabi', 'Sharjah'],
  Vietnam:          ['Ho Chi Minh City', 'Hai Phong'],
  // ── Europe ──────────────────────────────────────────────────────
  Belgium:          ['Antwerp'],
  Cyprus:           ['Limassol'],
  France:           ['Le Havre', 'Marseille'],
  Germany:          ['Hamburg', 'Bremen'],
  Malta:            ['Valletta'],
  Netherlands:      ['Rotterdam'],
  Poland:           ['Gdańsk'],
  Russia:           ['Vladivostok', 'St. Petersburg'],
  UK:               ['Southampton', 'Tilbury'],
  // ── Pacific & Oceania ───────────────────────────────────────────
  Australia:        ['Melbourne', 'Sydney', 'Brisbane', 'Fremantle'],
  Fiji:             ['Suva'],
  'New Caledonia':  ['Nouméa'],
  'New Zealand':    ['Auckland', 'Wellington', 'Christchurch'],
  'Papua New Guinea':['Port Moresby', 'Lae'],
  Samoa:            ['Apia'],
  'Solomon Islands':['Honiara'],
  Tonga:            ['Nukualofa'],
  Vanuatu:          ['Port Vila'],
};

export const DEST_COUNTRIES = Object.keys(COUNTRY_PORTS);

/**
 * Older links and marketing copy used a few alternate country labels. Keep
 * those links working while all new controls use the exact country keys above.
 */
const COUNTRY_ALIASES: Record<string, string> = {
  'Antigua & Barbuda': 'Antigua',
  'St. Kitts & Nevis': 'St Kitts',
  'Saint Lucia': 'St Lucia',
  'St. Vincent & Grenadines': 'St Vincent',
  'Trinidad & Tobago': 'Trinidad',
  'Turks & Caicos': 'Turks and Caicos',
  'United Kingdom': 'UK',
};

export function canonicalCountry(country: string): string {
  const value = country.trim();
  return COUNTRY_PORTS[value] ? value : COUNTRY_ALIASES[value] ?? value;
}

/** Ports for a country, or an empty list if we do not ship there. */
export function portsFor(country: string): string[] {
  return COUNTRY_PORTS[canonicalCountry(country)] ?? [];
}

/**
 * Look up the published rate for a route. Returns null when we have no rate on
 * file — callers must ask the buyer to request a quote rather than guess.
 */
export async function fetchShippingRate(
  country: string,
  port: string,
): Promise<ShippingRate | null> {
  const countryKey = canonicalCountry(country);
  if (!countryKey || !port || !portsFor(countryKey).includes(port)) return null;
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('shipping_rates')
    .select('country, port, freight_usd, inspection_fee, insurance_rate')
    .eq('country', countryKey)
    .eq('port', port)
    .maybeSingle();
  if (error) return null;
  return (data as ShippingRate) ?? null;
}

export interface LandedCostOptions {
  /** 'Collect' means the buyer settles freight at destination, so it is excluded. */
  freightType?: 'Prepaid' | 'Collect';
  withInspection?: boolean;
  withInsurance?: boolean;
}

export interface LandedCost {
  fob: number;
  freight: number;
  inspection: number;
  insurance: number;
  total: number;
}

/**
 * Landed cost for one vehicle on one route. Returns null when no rate is on
 * file, which callers should surface as "request a quote" — never a guess.
 */
export function computeLandedCost(
  fobUsd: number | null | undefined,
  rate: ShippingRate | null,
  opts: LandedCostOptions = {},
): LandedCost | null {
  if (rate == null) return null;
  const fob = Number(fobUsd);
  if (!Number.isFinite(fob) || fob < 0) return null;
  const { freightType = 'Prepaid', withInspection = true, withInsurance = true } = opts;
  const freight = freightType === 'Prepaid' ? Math.max(0, Number(rate.freight_usd) || 0) : 0;
  const inspection = withInspection ? Math.max(0, Number(rate.inspection_fee) || 0) : 0;
  const insuranceRate = Math.max(0, Number(rate.insurance_rate) || 0);
  const insurance = withInsurance ? fob * insuranceRate : 0;
  return { fob, freight, inspection, insurance, total: fob + freight + inspection + insurance };
}
