export const SITE_URL = 'https://www.wazirtradingllc.com';
export const ORGANIZATION_NAME = 'Wazir Trading LLC';
import {
  normalizedStatus as coreNormalizedStatus,
  isAvailableVehicle as coreIsAvailableVehicle,
  isSoldVehicle as coreIsSoldVehicle,
  validImageUrls as coreValidImageUrls,
  vehicleQualityIssues as coreVehicleQualityIssues,
  isIndexableVehicle as coreIsIndexableVehicle,
  vehicleName as coreVehicleName,
  vehicleSummary as coreVehicleSummary,
  vehicleImageAlt as coreVehicleImageAlt,
  rankRelatedVehicles,
} from './vehicle-seo-core.mjs';

export interface VehicleSeoImage {
  image_url: string;
  is_primary?: boolean | null;
  display_order?: number | null;
}

export interface VehicleSeoCar {
  ref_number: string;
  make: string;
  model: string;
  variant?: string | null;
  year?: number | null;
  mileage_km?: number | null;
  engine_cc?: number | null;
  fuel_type?: string | null;
  transmission?: string | null;
  body_type?: string | null;
  drive?: string | null;
  steering?: string | null;
  seats?: number | null;
  doors?: number | null;
  auction_grade?: string | null;
  exterior_grade?: string | null;
  interior_grade?: string | null;
  stock_location?: string | null;
  port_of_loading?: string | null;
  shipment_method?: string | null;
  color?: string | null;
  fob_price_usd?: number | null;
  status?: string | null;
  updated_at?: string | null;
  car_images?: VehicleSeoImage[] | null;
}

export function normalizedStatus(car: VehicleSeoCar): string {
  return coreNormalizedStatus(car);
}

export function isAvailableVehicle(car: VehicleSeoCar): boolean {
  return coreIsAvailableVehicle(car);
}

export function isSoldVehicle(car: VehicleSeoCar): boolean {
  return coreIsSoldVehicle(car);
}

function hasText(value: unknown): boolean {
  if (typeof value === 'string') return value.trim().length > 0;
  return typeof value === 'number' ? Number.isFinite(value) : value != null;
}

function hasFiniteNumber(value: unknown): boolean {
  return typeof value === 'number' && Number.isFinite(value);
}

/**
 * The minimum information needed for a vehicle URL to be a useful search
 * result. This deliberately stays conservative: a database row is not by
 * itself a reason to create an indexable page.
 */
export function vehicleQualityIssues(car: VehicleSeoCar): string[] {
  return coreVehicleQualityIssues(car);
}

export function isIndexableVehicle(car: VehicleSeoCar): boolean {
  return coreIsIndexableVehicle(car);
}

export function vehicleName(car: VehicleSeoCar): string {
  return coreVehicleName(car);
}

export function vehicleTitle(car: VehicleSeoCar): string {
  const mileage = car.mileage_km != null
    ? `${new Intl.NumberFormat('en-US').format(car.mileage_km)} km`
    : null;
  const suffix = mileage ? ` | ${mileage}` : '';
  const lifecycle = isSoldVehicle(car) ? ' | Sold' : '';
  return `${vehicleName(car)}${suffix} | Buy from Japan | ${ORGANIZATION_NAME}${lifecycle}`;
}

export function vehicleDescription(car: VehicleSeoCar): string {
  const name = vehicleName(car);
  const details = [
    car.mileage_km != null ? `${new Intl.NumberFormat('en-US').format(car.mileage_km)} km` : null,
    car.transmission || null,
    car.fuel_type || null,
    car.body_type || null,
    car.color ? `${car.color} exterior` : null,
  ].filter(Boolean);
  const detailText = details.length ? ` ${details.join(', ')}.` : '';
  const priceText = typeof car.fob_price_usd === 'number' && Number.isFinite(car.fob_price_usd) && car.fob_price_usd > 0
    ? ` FOB price $${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(car.fob_price_usd)}.`
    : '';
  const statusText = isSoldVehicle(car)
    ? ' This vehicle is no longer available.'
    : ' View specifications, photos, price and export details from Wazir Trading LLC.';
  return `Buy this ${name} from Japan.${detailText}${priceText}${statusText}`.replace(/\s+/g, ' ').trim();
}

function joinFacts(facts: string[]): string {
  if (facts.length < 2) return facts[0] ?? '';
  if (facts.length === 2) return `${facts[0]} and ${facts[1]}`;
  return `${facts.slice(0, -1).join(', ')}, and ${facts[facts.length - 1]}`;
}

/**
 * A short, factual overview for both the rendered vehicle page and the
 * build-time HTML. It only describes fields present on the record.
 */
export function vehicleSummary(car: VehicleSeoCar): string {
  return coreVehicleSummary(car);
}

export function vehicleImageAlt(car: VehicleSeoCar, index: number, suffix = 'vehicle photo'): string {
  return coreVehicleImageAlt(car, index, suffix);
}

export function vehicleCanonical(refNumber: string): string {
  return `${SITE_URL}/cars/${encodeURIComponent(refNumber.trim())}`;
}

export function validImageUrls(car: VehicleSeoCar): string[] {
  return coreValidImageUrls(car);
}

export { rankRelatedVehicles };

export function vehicleJsonLd(car: VehicleSeoCar, imageUrls = validImageUrls(car)): Record<string, unknown> {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['Product', 'Car'],
    name: vehicleName(car),
    sku: car.ref_number,
    brand: { '@type': 'Brand', name: car.make },
    model: car.model,
    itemCondition: 'https://schema.org/UsedCondition',
    url: vehicleCanonical(car.ref_number),
  };
  if (imageUrls.length) jsonLd.image = imageUrls;

  if (car.year != null) jsonLd.vehicleModelDate = String(car.year);
  if (car.mileage_km != null) {
    jsonLd.mileageFromOdometer = {
      '@type': 'QuantitativeValue',
      value: car.mileage_km,
      unitCode: 'KMT',
    };
  }
  if (car.transmission) jsonLd.vehicleTransmission = car.transmission;
  if (car.fuel_type) jsonLd.fuelType = car.fuel_type;
  if (car.color) jsonLd.color = car.color;
  if (car.engine_cc != null) {
    jsonLd.vehicleEngine = {
      '@type': 'EngineSpecification',
      engineDisplacement: {
        '@type': 'QuantitativeValue',
        value: car.engine_cc,
        unitCode: 'CMQ',
      },
    };
  }
  if (typeof car.fob_price_usd === 'number' && Number.isFinite(car.fob_price_usd) && car.fob_price_usd > 0) {
    jsonLd.offers = {
      '@type': 'Offer',
      price: car.fob_price_usd,
      priceCurrency: 'USD',
      availability: isAvailableVehicle(car)
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: vehicleCanonical(car.ref_number),
      seller: { '@type': 'Organization', name: ORGANIZATION_NAME, url: SITE_URL },
    };
  }
  if (car.updated_at) jsonLd.dateModified = car.updated_at;
  return jsonLd;
}

export function breadcrumbJsonLd(car: VehicleSeoCar): Record<string, unknown> {
  const items = [
    { name: 'Home', item: `${SITE_URL}/` },
    { name: 'Cars', item: `${SITE_URL}/cars` },
    { name: vehicleName(car), item: vehicleCanonical(car.ref_number) },
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