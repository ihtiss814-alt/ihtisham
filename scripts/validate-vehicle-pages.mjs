import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let ts;
try {
  ts = require("typescript");
} catch {
  console.error("TypeScript is required. Run npm install before validating vehicle landing pages.");
  process.exit(1);
}

const sourcePath = path.resolve("src/lib/vehicle-landing-pages.ts");
let source = fs.readFileSync(sourcePath, "utf8");
const carsPageSource = fs.readFileSync(path.resolve("src/pages/cars.tsx"), "utf8");
const routePageSource = fs.readFileSync(
  path.resolve("src/pages/vehicle-landing-pages.tsx"),
  "utf8",
);
const seoBootstrapSource = fs.readFileSync(path.resolve("src/lib/seo-bootstrap.ts"), "utf8");
const sitemapSource = fs.readFileSync(path.resolve("src/routes/sitemap[.]xml.ts"), "utf8");
const appSource = fs.readFileSync(path.resolve("src/App.tsx"), "utf8");
const footerSource = fs.readFileSync(path.resolve("src/components/Footer.tsx"), "utf8");
// Strip the sole runtime import before evaluating the registry in an isolated
// CommonJS sandbox. Accept either quote style and optional semicolons so
// formatting changes cannot accidentally reintroduce a require() call.
const importPattern =
  /^import\s+\{\s*SITE_URL\s*,\s*type\s+VehicleSeoCar\s*\}\s+from\s+['"]\.\/vehicle-seo['"]\s*;?\s*$/m;
if (!importPattern.test(source)) {
  console.error("Could not locate the expected vehicle-seo import in vehicle-landing-pages.ts.");
  process.exit(1);
}
source = source.replace(importPattern, "const SITE_URL = 'https://www.wazirtradingllc.com';");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
}).outputText;
const sandboxModule = { exports: {} };
new Function("exports", "module", compiled)(sandboxModule.exports, sandboxModule);
const registry = sandboxModule.exports;

const failures = [];
const pages = registry.ALL_VEHICLE_LANDING_PAGES;
const makes = registry.MAKE_LANDING_PAGES;
const models = registry.MODEL_LANDING_PAGES;
const bodyTypes = registry.BODY_TYPE_LANDING_PAGES;

function fail(message) {
  failures.push(message);
}

if (!Array.isArray(pages) || pages.length < 40)
  fail("At least 40 vehicle landing pages are required.");
if (makes.length < 8) fail("At least 8 manufacturer landing pages are required.");
if (models.length < 20) fail("At least 20 model landing pages are required.");
if (bodyTypes.length < 8) fail("At least 8 body-style landing pages are required.");
if (registry.MIN_INDEXABLE_LANDING_STOCK !== 5)
  fail("Landing-page indexation threshold must be 5 qualifying vehicles.");

const paths = new Set();
const titles = new Set();
for (const page of pages) {
  if (paths.has(page.path)) fail(`Duplicate canonical path: ${page.path}`);
  paths.add(page.path);
  if (titles.has(page.title)) fail(`Duplicate page title: ${page.title}`);
  titles.add(page.title);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(page.slug)) fail(`Invalid slug: ${page.slug}`);
  const expectedPath =
    page.kind === "make"
      ? `/used-japanese-cars/${page.slug}`
      : page.kind === "model"
        ? `/used-japanese-cars/${page.makeSlug}/${page.slug}`
        : `/used-japanese-cars/body-type/${page.slug}`;
  if (page.path !== expectedPath) fail(`Path does not match page kind/slug: ${page.path}`);
  if (!page.path.startsWith("/used-japanese-cars/")) fail(`Unexpected path prefix: ${page.path}`);
  if (page.title.length > 70)
    fail(`Title exceeds 70 characters (${page.title.length}): ${page.path}`);
  if (page.description.length < 110 || page.description.length > 175) {
    fail(
      `Description length must be 110–175 characters (${page.description.length}): ${page.path}`,
    );
  }
  if (page.intro.length < 120) fail(`Intro is too short: ${page.path}`);
  if (page.buyerGuide.length < 120) fail(`Buyer guide is too short: ${page.path}`);
  if (!Array.isArray(page.focusPoints) || page.focusPoints.length < 3)
    fail(`At least three buyer checks are required: ${page.path}`);
  if (!Array.isArray(page.faqs) || page.faqs.length < 3)
    fail(`At least three FAQs are required: ${page.path}`);
  for (const faq of page.faqs ?? []) {
    if (!faq.question?.trim() || !faq.answer?.trim())
      fail(`FAQ question/answer missing: ${page.path}`);
  }
  if (registry.getVehicleLandingPage(page.path)?.path !== page.path)
    fail(`Path lookup failed: ${page.path}`);
}

for (const model of models) {
  const parent = makes.find((make) => make.slug === model.makeSlug);
  if (!parent) fail(`Model has no parent make page: ${model.path}`);
  else if (parent.make !== model.make)
    fail(`Model make value does not match its parent: ${model.path}`);
}

const arrayBody = (sourceText, start, end) => {
  const startIndex = sourceText.indexOf(start);
  if (startIndex < 0) return "";
  const endIndex = sourceText.indexOf(end, startIndex + start.length);
  return endIndex < 0 ? "" : sourceText.slice(startIndex + start.length, endIndex);
};
const makeFilterBlock = arrayBody(carsPageSource, "const MAKE_NAMES = [", "];");
const makeFilterValues = new Set(
  [...makeFilterBlock.matchAll(/['"]([^'"]+)['"]/g)].map((match) => match[1]),
);
for (const make of makes) {
  if (!makeFilterValues.has(make.make))
    fail(`Manufacturer guide is not present in the inventory filter taxonomy: ${make.make}`);
}
const bodyFilterBlock = arrayBody(carsPageSource, "const BODY_TYPE_ITEMS = [", "];");
const bodyFilterValues = new Set(
  [...bodyFilterBlock.matchAll(/name:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]),
);
for (const bodyType of bodyTypes) {
  if (bodyType.directoryVisible === false) continue;
  const labels = [bodyType.label, bodyType.bodyType, ...(bodyType.bodyTypeAliases ?? [])].filter(
    Boolean,
  );
  if (!labels.some((label) => bodyFilterValues.has(label)))
    fail(`Body-style guide is not present in the inventory filter taxonomy: ${bodyType.bodyType}`);
}
if (
  !routePageSource.includes("vehicleLandingDirectoryCounts()") ||
  !routePageSource.includes("directoryCounts.makes") ||
  !routePageSource.includes("directoryCounts.models") ||
  !routePageSource.includes("directoryCounts.bodyTypes")
)
  fail("Vehicle directory must display the visible manufacturer, model and body-style counts.");
if (!routePageSource.includes("return page ? <DetailPageContent page={page} /> : <NotFound />"))
  fail("Unknown vehicle guide routes must render the existing 404 page.");
if (!seoBootstrapSource.includes("pathname.startsWith(`${VEHICLE_LANDING_DIRECTORY_PATH}/`)"))
  fail("Unknown vehicle guide URLs must be handled as server-side 404s.");
if (
  !sitemapSource.includes("MIN_INDEXABLE_LANDING_STOCK") ||
  !sitemapSource.includes("VEHICLE_LANDING_CAR_LIMIT")
)
  fail("Sitemap must share the registry stock threshold and evaluation limit.");
if (!sitemapSource.includes("landingPage.directoryVisible === false"))
  fail("Sitemap must exclude retired/hidden legacy guide pages.");
if (!routePageSource.includes("page.directoryVisible === false"))
  fail("Hidden legacy guide pages must be noindex even if inventory later grows.");
if (!routePageSource.includes("item.directoryVisible !== false"))
  fail("Related-model links must not promote hidden legacy guide pages.");
if (!seoBootstrapSource.includes("vehicleLandingPage.directoryVisible === false"))
  fail("SSR robots must keep hidden legacy guide pages out of the index.");
if (
  !appSource.includes('path="/used-japanese-cars"') ||
  !appSource.includes('path="/used-japanese-cars/body-type/:bodySlug"')
)
  fail("Vehicle landing directory/body-style routes are not registered.");
if (!/href:\s*['"]\/used-japanese-cars['"]/.test(footerSource))
  fail("Footer must link to the vehicle guide directory.");

const sampleCar = {
  make: "Toyota",
  model: "Prius",
  body_type: "SUV",
};
const sampleMatches = registry.vehicleLandingPagesForVehicle(sampleCar).map((page) => page.path);
if (!sampleMatches.includes("/used-japanese-cars/toyota")) fail("Vehicle-to-make mapping failed.");
if (!sampleMatches.includes("/used-japanese-cars/toyota/prius"))
  fail("Vehicle-to-model mapping failed.");
if (!sampleMatches.includes("/used-japanese-cars/body-type/suv"))
  fail("Vehicle-to-body-style mapping failed.");

const aliasMatches = registry
  .vehicleLandingPagesForVehicle({ make: "Isuzu", model: "Elf Truck", body_type: "truck" })
  .map((page) => page.path);
if (!aliasMatches.includes("/used-japanese-cars/isuzu/elf"))
  fail("Isuzu Elf Truck alias must map to the canonical Elf model page.");
const hiaceMatches = registry
  .vehicleLandingPagesForVehicle({ make: "Toyota", model: "Hiace Wagon", body_type: "van" })
  .map((page) => page.path);
if (!hiaceMatches.includes("/used-japanese-cars/toyota/hiace"))
  fail("Toyota Hiace Wagon alias must map to the canonical Hiace model page.");
const fusoMatches = registry
  .vehicleLandingPagesForVehicle({ make: "Mitsubishi Fuso", model: "Canter", body_type: "truck" })
  .map((page) => page.path);
if (!fusoMatches.includes("/used-japanese-cars/mitsubishi-fuso/canter"))
  fail("Mitsubishi Fuso Canter must remain separate from Mitsubishi Canter.");

if (
  !registry
    .vehicleLandingPagesForVehicle({ make: "Suzuki", model: "Swif", body_type: "hatchback" })
    .some((page) => page.path === "/used-japanese-cars/suzuki/swift")
)
  fail("Suzuki Swif typo must map to the existing Swift page without a duplicate URL.");
if (
  !registry
    .vehicleLandingPagesForVehicle({ make: "Toyota", model: "Dyna Truck", body_type: "truck" })
    .some((page) => page.path === "/used-japanese-cars/toyota/dyna")
)
  fail("Toyota Dyna Truck alias must map to the canonical Dyna page.");
if (
  !registry
    .vehicleLandingPagesForVehicle({ make: "Audi", model: "TT Coupe", body_type: "coupe" })
    .some((page) => page.path === "/used-japanese-cars/audi/tt")
)
  fail("Audi TT Coupe alias must map to the canonical TT page.");
if (
  !registry
    .vehicleLandingPagesForVehicle({ make: "Toyota", model: "Yaris Cross", body_type: "hatchback" })
    .some((page) => page.path === "/used-japanese-cars/toyota/yaris-cross")
)
  fail("Toyota Yaris Cross must remain one model page across raw body-style variants.");
if (
  !registry
    .vehicleLandingPagesForVehicle({ make: "Mitsubishi", model: "Canter Guts", body_type: "truck" })
    .some((page) => page.path === "/used-japanese-cars/mitsubishi/canter")
)
  fail("Mitsubishi Canter Guts must map to the Mitsubishi Canter family.");
if (!/\.eq\(\s*["']is_featured["']\s*,\s*true\s*\)/.test(seoBootstrapSource))
  fail("Homepage Featured Collection must query is_featured, not the legacy new-arrival flag.");
if (!carsPageSource.includes("newArrivalCutoffIso()"))
  fail("New Arrivals must use a bounded created_at recency window.");
if (!sitemapSource.includes("verifiedVehicleModifiedAt"))
  fail("Sitemap must omit lastmod when updated_at is not a verified post-creation modification.");

const modelPage = registry.getModelLandingPage("toyota", "prius");
const sampleListing = { make: "Toyota", model: "Prius", ref_number: "TEST-001", year: 2021 };
const modelStructuredData = modelPage
  ? registry.vehicleLandingStructuredData(modelPage, [sampleListing])
  : [];
if (modelStructuredData.length !== 2 || modelStructuredData[0]?.["@type"] !== "CollectionPage") {
  fail("Qualified vehicle landing pages must return CollectionPage and BreadcrumbList JSON-LD.");
}
const directorySchema = registry.vehicleLandingDirectoryStructuredData();
const visiblePageCount = pages.filter((page) => page.directoryVisible !== false).length;
if (directorySchema.mainEntity?.numberOfItems !== visiblePageCount) {
  fail("Directory ItemList count does not match visible detail pages.");
}
if (registry.vehicleLandingCarsFilterPath(modelPage) !== "/cars?make=Toyota&advModel=Prius") {
  fail("Model landing page must link to the matching inventory filters.");
}

if (failures.length) {
  console.error(`Vehicle landing page validation failed (${failures.length} issue(s)):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Vehicle landing page validation passed: ${makes.length} manufacturers, ${models.length} models, ${bodyTypes.length} body styles (${pages.length} detail pages).`,
);
console.log(
  `Indexation requires at least ${registry.MIN_INDEXABLE_LANDING_STOCK} qualifying, available vehicle records per detail page.`,
);
