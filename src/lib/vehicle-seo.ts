export const SITE_URL = "https://www.wazirtradingllc.com";
export const ORGANIZATION_NAME = "Wazir Trading LLC";
import {
  normalizedStatus as coreNormalizedStatus,
  isAvailableVehicle as coreIsAvailableVehicle,
  isSoldVehicle as coreIsSoldVehicle,
  validImageUrls as coreValidImageUrls,
  vehicleQualityIssues as coreVehicleQualityIssues,
  isIndexableVehicle as coreIsIndexableVehicle,
  vehicleName as coreVehicleName,
  vehicleTitle as coreVehicleTitle,
  vehicleDescription as coreVehicleDescription,
  vehicleSummary as coreVehicleSummary,
  vehicleImageAlt as coreVehicleImageAlt,
  rankRelatedVehicles,
} from "./vehicle-seo-core.mjs";

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
  created_at?: string | null;
  updated_at?: string | null;
  car_images?: VehicleSeoImage[] | null;
}

/** Treat a listing as a new arrival only during a real, bounded recency window.
 * The legacy is_new_arrival database flag is currently TRUE on every record,
 * so it must not be used as a user-facing freshness signal.
 */
export const NEW_ARRIVAL_WINDOW_DAYS = 30;

export function newArrivalCutoffIso(now = new Date()): string {
  return new Date(now.getTime() - NEW_ARRIVAL_WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString();
}

export function isRecentInventoryListing(
  createdAt: string | null | undefined,
  now = new Date(),
): boolean {
  if (!createdAt) return false;
  const created = new Date(createdAt);
  if (Number.isNaN(created.getTime())) return false;
  const age = now.getTime() - created.getTime();
  return age >= 0 && age <= NEW_ARRIVAL_WINDOW_DAYS * 24 * 60 * 60 * 1000;
}

/** Only publish dateModified when it represents a real post-creation change. */
export function verifiedVehicleModifiedAt(
  car: Pick<VehicleSeoCar, "created_at" | "updated_at">,
): string | null {
  if (!car.created_at || !car.updated_at) return null;
  const created = new Date(car.created_at);
  const updated = new Date(car.updated_at);
  if (Number.isNaN(created.getTime()) || Number.isNaN(updated.getTime())) return null;
  return updated.getTime() > created.getTime() ? updated.toISOString() : null;
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
  if (typeof value === "string") return value.trim().length > 0;
  return typeof value === "number" ? Number.isFinite(value) : value != null;
}

function hasFiniteNumber(value: unknown): boolean {
  return typeof value === "number" && Number.isFinite(value);
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
  return coreVehicleTitle(car);
}

export function vehicleDescription(car: VehicleSeoCar): string {
  return coreVehicleDescription(car);
}

function joinFacts(facts: string[]): string {
  if (facts.length < 2) return facts[0] ?? "";
  if (facts.length === 2) return `${facts[0]} and ${facts[1]}`;
  return `${facts.slice(0, -1).join(", ")}, and ${facts[facts.length - 1]}`;
}

/**
 * A short, factual overview for both the rendered vehicle page and the
 * build-time HTML. It only describes fields present on the record.
 */
export function vehicleSummary(car: VehicleSeoCar): string {
  return coreVehicleSummary(car);
}

export function vehicleImageAlt(
  car: VehicleSeoCar,
  index: number,
  suffix = "vehicle photo",
): string {
  return coreVehicleImageAlt(car, index, suffix);
}

export function vehicleCanonical(refNumber: string): string {
  return `${SITE_URL}/cars/${encodeURIComponent(refNumber.trim())}`;
}

export function validImageUrls(car: VehicleSeoCar): string[] {
  return coreValidImageUrls(car);
}

export { rankRelatedVehicles };

export function vehicleJsonLd(
  car: VehicleSeoCar,
  imageUrls = validImageUrls(car),
): Record<string, unknown> {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Product", "Car"],
    name: vehicleName(car),
    description: vehicleDescription(car),
    sku: car.ref_number,
    brand: { "@type": "Brand", name: car.make },
    model: car.model,
    itemCondition: "https://schema.org/UsedCondition",
    url: vehicleCanonical(car.ref_number),
  };
  if (imageUrls.length) jsonLd.image = imageUrls;

  if (car.year != null) jsonLd.vehicleModelDate = String(car.year);
  if (car.mileage_km != null) {
    jsonLd.mileageFromOdometer = {
      "@type": "QuantitativeValue",
      value: car.mileage_km,
      unitCode: "KMT",
    };
  }
  if (car.transmission) jsonLd.vehicleTransmission = car.transmission;
  if (car.fuel_type) jsonLd.fuelType = car.fuel_type;
  if (car.color) jsonLd.color = car.color;
  if (car.engine_cc != null) {
    jsonLd.vehicleEngine = {
      "@type": "EngineSpecification",
      engineDisplacement: {
        "@type": "QuantitativeValue",
        value: car.engine_cc,
        unitCode: "CMQ",
      },
    };
  }
  if (
    typeof car.fob_price_usd === "number" &&
    Number.isFinite(car.fob_price_usd) &&
    car.fob_price_usd > 0
  ) {
    jsonLd.offers = {
      "@type": "Offer",
      price: car.fob_price_usd,
      priceCurrency: "USD",
      availability: isAvailableVehicle(car)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: vehicleCanonical(car.ref_number),
      seller: { "@id": `${SITE_URL}/#organization` },
    };
  }
  const modifiedAt = verifiedVehicleModifiedAt(car);
  if (modifiedAt) jsonLd.dateModified = modifiedAt;
  return jsonLd;
}

export function breadcrumbJsonLd(car: VehicleSeoCar): Record<string, unknown> {
  const items = [
    { name: "Home", item: `${SITE_URL}/` },
    { name: "Cars", item: `${SITE_URL}/cars` },
    { name: vehicleName(car), item: vehicleCanonical(car.ref_number) },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}
