import type { DestinationPreference } from "@/hooks/useDestinationPreference";
import { canonicalCountry } from "@/lib/shipping";
import { COUNTRY_LANDING_PAGES, countryLandingPath } from "@/lib/country-landing-pages";

export function quoteRequestHref(input: Partial<DestinationPreference> & {
  vehicleRef?: string;
  vehicleModel?: string;
  requestType?: "vehicle" | "sourcing" | "shipping" | "general";
} = {}): string {
  const params = new URLSearchParams();
  if (input.country?.trim()) params.set("country", input.country.trim());
  if (input.port?.trim()) params.set("port", input.port.trim());
  if (input.vehicleRef?.trim()) params.set("vehicleRef", input.vehicleRef.trim());
  if (input.vehicleModel?.trim()) params.set("vehicleModel", input.vehicleModel.trim());
  if (input.requestType) params.set("type", input.requestType);
  const query = params.toString();
  return query ? `/request-a-quote?${query}` : "/request-a-quote";
}

export function countryGuidePathForName(countryName: string): string | null {
  if (!countryName.trim()) return null;
  const key = canonicalCountry(countryName).toLocaleLowerCase();
  const page = COUNTRY_LANDING_PAGES.find(
    (country) => canonicalCountry(country.name).toLocaleLowerCase() === key,
  );
  return page ? countryLandingPath(page) : null;
}
