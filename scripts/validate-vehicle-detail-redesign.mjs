import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const failures = [];
const pass = (message) => console.log(`PASS ${message}`);
const fail = (message) => failures.push(message);

const detail = read("src/pages/car-detail.tsx");
const vehicleRequestCache = read("src/lib/vehicle-request-cache.ts");
const bootstrap = read("src/lib/seo-bootstrap.ts");
const select = read("src/lib/vehicle-detail-data.ts");
const gallery = read("src/components/VehiclePhotoGallery.tsx");
const identity = read("src/components/VehicleIdentity.tsx");
const detailCss = read("src/pages/car-detail.css");
const vehiclePages = read("src/pages/vehicle-landing-pages.tsx");
const countryPages = read("src/pages/country-landing-pages.tsx");
const makeRegistry = read("src/lib/vehicle-landing-pages.ts");
const countryRegistry = read("src/lib/country-landing-pages.ts");

if (detail.includes(".select('*')") || detail.includes('.select("*")'))
  fail("Vehicle detail page must not use select(*).");
else pass("Vehicle detail page uses an explicit Supabase select.");

if (
  !detail.includes("getCachedVehicleDetail(ref)") ||
  !vehicleRequestCache.includes(".select(VEHICLE_DETAIL_SELECT)") ||
  !bootstrap.includes(".select(VEHICLE_DETAIL_SELECT)")
) {
  fail("Client detail loader and server bootstrap must share the public field allowlist.");
} else pass("Client detail cache and server bootstrap share the explicit public field allowlist.");

if (select.includes("chassis_number"))
  fail("Public vehicle detail projection must not include chassis_number.");
else pass("Public vehicle detail projection does not expose chassis_number.");

for (const field of [
  "ref_number",
  "make",
  "model",
  "year",
  "mileage_km",
  "engine_cc",
  "fuel_type",
  "transmission",
  "body_type",
  "fob_price_usd",
  "status",
  "features",
  "car_images",
]) {
  if (!select.includes(field))
    fail(`Public vehicle projection is missing expected field: ${field}.`);
}
if (failures.length === 0)
  pass("Public detail projection contains the agreed vehicle and image fields.");

if (!gallery.includes("car.car_images") || gallery.includes(".from('car_images')")) {
  fail("Vehicle gallery should render the image relation returned with the vehicle record.");
} else pass("Vehicle gallery consumes the images attached to the Supabase vehicle record.");

if (detail.includes("ALL_FEATURES.map") || detail.includes("['Chassis No.'")) {
  fail("Vehicle detail page must not show unchecked feature placeholders or chassis number.");
} else pass("Vehicle detail page omits absent feature placeholders and chassis number.");

if (!detail.includes("fetchShippingRate(country, port)") || !detail.includes("computeLandedCost")) {
  fail("Export estimate must use the existing database-backed shipping-rate functions.");
} else pass("Export estimate uses the published route-rate lookup and existing cost calculation.");

if (
  !detailCss.includes("@media (max-width: 860px)") ||
  !detailCss.includes("@media (max-width: 640px)") ||
  !detailCss.includes("env(safe-area-inset-bottom)")
) {
  fail("Vehicle detail CSS must include tablet/mobile breakpoints and mobile safe-area spacing.");
} else
  pass("Vehicle detail styles include tablet/mobile breakpoints and mobile safe-area spacing.");

if (
  !vehiclePages.includes("vehicleLandingDirectoryCounts()") ||
  !vehiclePages.includes("directoryCounts.models") ||
  !vehiclePages.includes("directoryCounts.bodyTypes")
) {
  fail("Vehicle guide directory must preserve the corrected visible-only counters.");
} else pass("Corrected visible-only vehicle directory counts are preserved.");

if (!vehiclePages.includes("<MakeLogo") || !vehiclePages.includes("<BodyTypeIcon"))
  fail("Vehicle guide directory must display make logos and body-type icons.");
else pass("Vehicle guide directory includes manufacturer logos and body-style icons.");

if (!countryPages.includes("<CountryFlag")) fail("Country pages must display flag assets.");
else pass("Country directory and country detail page include flag components.");

const identityFlagBlock = identity.match(/const COUNTRY_ISO2:[\s\S]*?=\s*\{([\s\S]*?)\n\};/);
const mappedFlags = identityFlagBlock
  ? [
      ...identityFlagBlock[1].matchAll(/^\s*["']?([a-z0-9-]+)["']?:\s*["']([a-z]{2})["'],?\s*$/gm),
    ].map((m) => m[1])
  : [];
const registrySlugs = [...countryRegistry.matchAll(/slug:\s*["']([^"']+)["']/g)].map((m) => m[1]);
const uniqueRegistrySlugs = [...new Set(registrySlugs)].filter(
  (slug) => slug !== "import-japanese-cars",
);
const missingFlags = uniqueRegistrySlugs.filter((slug) => !mappedFlags.includes(slug));

if (uniqueRegistrySlugs.length !== 40 || missingFlags.length) {
  fail(
    `Country flag map mismatch: found ${uniqueRegistrySlugs.length} country slugs; missing flags: ${missingFlags.join(", ") || "none"}.`,
  );
} else pass(`All ${uniqueRegistrySlugs.length} registered country pages have ISO flag mappings.`);

const makeContent =
  makeRegistry.split("const makeContent = [")[1]?.split("const modelContent = [")[0] ?? "";
const makeNames = [...makeContent.matchAll(/name:\s*["']([^"']+)["']/g)].map((m) => m[1]);
const logoFiles = new Set(
  fs.readdirSync(path.join(root, "public/logos")).filter((file) => file.endsWith(".svg")),
);
const aliasBlock = identity.match(/const MAKE_LOGO_ALIASES:[\s\S]*?=\s*\{([\s\S]*?)\n\};/);
const aliases = new Map();
if (aliasBlock) {
  for (const match of aliasBlock[1].matchAll(/["']([^"']+)["']:\s*["']([^"']+)["']/g)) {
    aliases.set(match[1], match[2]);
  }
}
const normalize = (name) => {
  const normalized = name.toLowerCase().replace(/\s+/g, " ");
  return aliases.get(normalized) ?? normalized.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
};
const missingMakeLogos = makeNames.filter((name) => !logoFiles.has(`${normalize(name)}.svg`));
if (!makeNames.length || missingMakeLogos.length) {
  fail(
    `Manufacturer logo files missing for: ${missingMakeLogos.join(", ") || "could not read make registry"}.`,
  );
} else
  pass(`All ${makeNames.length} registered manufacturer guides have a matching local SVG logo.`);

if (failures.length) {
  console.error("\nVehicle detail redesign validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("\nVehicle detail redesign validation passed.");
}
