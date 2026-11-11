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

const tierOneContentPath = path.resolve("src/lib/vehicle-tier-one-content.ts");
const tierOneContentSource = fs.readFileSync(tierOneContentPath, "utf8");
const tierOneContentCompiled = ts.transpileModule(tierOneContentSource, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
}).outputText;
const tierOneContentModule = { exports: {} };
new Function("exports", "module", tierOneContentCompiled)(
  tierOneContentModule.exports,
  tierOneContentModule,
);
const tierOneContent = tierOneContentModule.exports.VEHICLE_TIER_ONE_CONTENT;
if (!tierOneContent || typeof tierOneContent !== "object") {
  console.error("Could not load VEHICLE_TIER_ONE_CONTENT.");
  process.exit(1);
}

const priorityImportPattern =
  /^import\s+\{\s*VEHICLE_TIER_ONE_CONTENT\s*\}\s+from\s+['"]\.\/vehicle-tier-one-content['"]\s*;?\s*$/m;
if (!priorityImportPattern.test(source)) {
  console.error("Could not locate the Tier 1 content import in vehicle-landing-pages.ts.");
  process.exit(1);
}
source = source.replace(
  priorityImportPattern,
  "const VEHICLE_TIER_ONE_CONTENT = " + JSON.stringify(tierOneContent) + ";",
);

const tierTwoContentPath = path.resolve("src/lib/vehicle-tier-two-content.ts");
const tierTwoContentSource = fs.readFileSync(tierTwoContentPath, "utf8");
const tierTwoContentCompiled = ts.transpileModule(tierTwoContentSource, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
}).outputText;
const tierTwoContentModule = { exports: {} };
new Function("exports", "module", tierTwoContentCompiled)(
  tierTwoContentModule.exports,
  tierTwoContentModule,
);
const tierTwoContent = tierTwoContentModule.exports.VEHICLE_TIER_TWO_CONTENT;
if (!tierTwoContent || typeof tierTwoContent !== "object") {
  console.error("Could not load VEHICLE_TIER_TWO_CONTENT.");
  process.exit(1);
}

const tierTwoImportPattern =
  /^import\s+\{\s*VEHICLE_TIER_TWO_CONTENT\s*\}\s+from\s+['"]\.\/vehicle-tier-two-content['"]\s*;?\s*$/m;
if (!tierTwoImportPattern.test(source)) {
  console.error("Could not locate the Tier 2 content import in vehicle-landing-pages.ts.");
  process.exit(1);
}
source = source.replace(
  tierTwoImportPattern,
  "const VEHICLE_TIER_TWO_CONTENT = " + JSON.stringify(tierTwoContent) + ";",
);

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

const expectedTierOneMakes = new Set(["toyota", "nissan", "honda", "suzuki", "mazda", "lexus"]);
const expectedTierOneModels = new Set([
  "toyota/prius",
  "toyota/aqua",
  "toyota/sienta",
  "toyota/voxy",
  "toyota/alphard",
  "toyota/land-cruiser",
  "toyota/yaris",
  "toyota/raize",
  "toyota/hiace",
  "toyota/rav4",
  "toyota/hilux",
  "toyota/corolla-fielder",
  "toyota/prius-a",
  "toyota/premio",
  "toyota/yaris-cross",
  "nissan/note",
  "nissan/serena",
  "nissan/march",
  "honda/vezel",
  "honda/zr-v",
  "suzuki/swift",
  "suzuki/wagon-r",
  "mazda/demio",
  "lexus/nx",
]);

const tierCounts = (items) =>
  [1, 2, 3].map((tier) => items.filter((item) => item.seoTier === tier).length);
const makeTierCounts = tierCounts(makes);
const modelTierCounts = tierCounts(models);

if (makes.length !== 14) fail("The make registry should contain exactly 14 manufacturer pages.");
if (models.length !== 51) fail("The model registry should contain exactly 51 model pages.");
if (makeTierCounts.join("/") !== "6/6/2") {
  fail("Expected make SEO tiers 6/6/2; found " + makeTierCounts.join("/"));
}
if (modelTierCounts.join("/") !== "24/18/9") {
  fail("Expected model SEO tiers 24/18/9; found " + modelTierCounts.join("/"));
}

const tierOneMakeSlugs = new Set(
  makes.filter((page) => page.seoTier === 1).map((page) => page.slug),
);
const tierOneModelKeys = new Set(
  models.filter((page) => page.seoTier === 1).map((page) => page.makeSlug + "/" + page.slug),
);
if (
  tierOneMakeSlugs.size !== expectedTierOneMakes.size ||
  [...expectedTierOneMakes].some((slug) => !tierOneMakeSlugs.has(slug))
) {
  fail("Tier 1 manufacturer assignment does not match the approved six-make shortlist.");
}
if (
  tierOneModelKeys.size !== expectedTierOneModels.size ||
  [...expectedTierOneModels].some((key) => !tierOneModelKeys.has(key))
) {
  fail("Tier 1 model assignment does not match the approved 24-model shortlist.");
}

const expectedContentKeys = new Set([
  ...[...expectedTierOneMakes].map((slug) => "make:" + slug),
  ...[...expectedTierOneModels].map((key) => "model:" + key),
]);
const contentKeys = Object.keys(tierOneContent);
if (
  contentKeys.length !== expectedContentKeys.size ||
  [...expectedContentKeys].some((key) => !Object.hasOwn(tierOneContent, key)) ||
  contentKeys.some((key) => !expectedContentKeys.has(key))
) {
  fail("Tier 1 editorial content must cover exactly six makes and 24 models with no extras.");
}

for (const [key, content] of Object.entries(tierOneContent)) {
  const page = key.startsWith("make:")
    ? makes.find((item) => item.slug === key.slice("make:".length))
    : models.find((item) => key === "model:" + item.makeSlug + "/" + item.slug);

  if (!page) {
    fail("Tier 1 content has no matching registry page: " + key);
    continue;
  }
  if (content.seoTier !== 1 || content.kind !== page.kind || page.seoTier !== 1) {
    fail("Tier 1 kind/priority metadata does not match the registry page: " + key);
  }
  if (!content.title || content.title.length > 70) {
    fail("Tier 1 SEO title must be present and at most 70 characters: " + key);
  }
  if (
    !content.description ||
    content.description.length < 110 ||
    content.description.length > 175
  ) {
    fail("Tier 1 meta description must be 110–175 characters: " + key);
  }
  if (!content.intro || content.intro.length < 180) {
    fail("Tier 1 page introduction is too short: " + key);
  }
  if (!content.buyerGuide || content.buyerGuide.length < 180) {
    fail("Tier 1 buyer guide is too short: " + key);
  }
  if (!Array.isArray(content.searchThemes) || content.searchThemes.length < 4) {
    fail("Tier 1 page needs at least four editorial search-intent themes: " + key);
  }
  if (!Array.isArray(content.focusPoints) || content.focusPoints.length < 4) {
    fail("Tier 1 page needs at least four distinct buyer checks: " + key);
  }
  if (!Array.isArray(content.faqs) || content.faqs.length < 4) {
    fail("Tier 1 page needs at least four model/make-specific FAQs: " + key);
  }
  for (const faq of content.faqs ?? []) {
    if (!faq.question?.trim() || !faq.answer?.trim()) {
      fail("Tier 1 FAQ question/answer missing: " + key);
    }
  }
  if (content.searchThemes?.some((theme) => !theme?.trim())) {
    fail("Tier 1 search-intent theme must not be blank: " + key);
  }
  if (page.title !== content.title || page.description !== content.description) {
    fail("Tier 1 SEO metadata was not applied to the generated page: " + key);
  }
  if (page.intro !== content.intro || page.buyerGuide !== content.buyerGuide) {
    fail("Tier 1 editorial content was not applied to the generated page: " + key);
  }
  if (
    page.focusPoints?.length !== content.focusPoints?.length ||
    page.faqs?.length !== content.faqs?.length
  ) {
    fail("Tier 1 buyer checklist/FAQ content was not applied to the generated page: " + key);
  }
  if (page.directoryVisible === false) {
    fail("Tier 1 pages must not promote an intentionally retired legacy route: " + key);
  }
}


const expectedTierTwoMakes = new Set([
  "subaru",
  "mitsubishi",
  "daihatsu",
  "isuzu",
  "audi",
  "mercedes-benz",
]);
const expectedTierTwoModels = new Set([
  "toyota/corolla",
  "toyota/vitz",
  "toyota/harrier",
  "nissan/x-trail",
  "nissan/leaf",
  "honda/fit",
  "honda/civic",
  "honda/freed",
  "suzuki/jimny",
  "mazda/cx-5",
  "subaru/forester",
  "mitsubishi/outlander",
  "daihatsu/mira",
  "lexus/rx",
  "isuzu/elf",
  "mitsubishi-fuso/canter",
  "nissan/cube",
  "toyota/esquire",
]);
const expectedTierTwoHiddenModels = new Set([
  "toyota/corolla",
  "toyota/vitz",
  "toyota/harrier",
  "nissan/x-trail",
  "nissan/leaf",
  "honda/fit",
  "honda/civic",
  "honda/freed",
  "suzuki/jimny",
  "mazda/cx-5",
  "subaru/forester",
  "daihatsu/mira",
  "lexus/rx",
]);
const tierTwoMakeSlugs = new Set(
  makes.filter((page) => page.seoTier === 2).map((page) => page.slug),
);
const tierTwoModelKeys = new Set(
  models
    .filter((page) => page.seoTier === 2)
    .map((page) => page.makeSlug + "/" + page.slug),
);
if (
  tierTwoMakeSlugs.size !== expectedTierTwoMakes.size ||
  [...expectedTierTwoMakes].some((slug) => !tierTwoMakeSlugs.has(slug))
) {
  fail("Tier 2 manufacturer assignment does not match the approved six-make shortlist.");
}
if (
  tierTwoModelKeys.size !== expectedTierTwoModels.size ||
  [...expectedTierTwoModels].some((key) => !tierTwoModelKeys.has(key))
) {
  fail("Tier 2 model assignment does not match the approved 18-model shortlist.");
}
const expectedTierTwoContentKeys = new Set([
  ...[...expectedTierTwoMakes].map((slug) => "make:" + slug),
  ...[...expectedTierTwoModels].map((key) => "model:" + key),
]);
const tierTwoContentKeys = Object.keys(tierTwoContent);
if (
  tierTwoContentKeys.length !== expectedTierTwoContentKeys.size ||
  [...expectedTierTwoContentKeys].some((key) => !Object.hasOwn(tierTwoContent, key)) ||
  tierTwoContentKeys.some((key) => !expectedTierTwoContentKeys.has(key))
) {
  fail("Tier 2 editorial content must cover exactly six makes and 18 models with no extras.");
}
for (const [key, content] of Object.entries(tierTwoContent)) {
  const page = key.startsWith("make:")
    ? makes.find((item) => item.slug === key.slice("make:".length))
    : models.find((item) => key === "model:" + item.makeSlug + "/" + item.slug);

  if (!page) {
    fail("Tier 2 content has no matching registry page: " + key);
    continue;
  }
  if (content.seoTier !== 2 || content.kind !== page.kind || page.seoTier !== 2) {
    fail("Tier 2 kind/priority metadata does not match the registry page: " + key);
  }
  if (!content.title || content.title.length > 70) {
    fail("Tier 2 SEO title must be present and at most 70 characters: " + key);
  }
  if (
    !content.description ||
    content.description.length < 110 ||
    content.description.length > 175
  ) {
    fail("Tier 2 meta description must be 110–175 characters: " + key);
  }
  if (!content.intro || content.intro.length < 180) {
    fail("Tier 2 page introduction is too short: " + key);
  }
  if (!content.buyerGuide || content.buyerGuide.length < 180) {
    fail("Tier 2 buyer guide is too short: " + key);
  }
  if (!Array.isArray(content.searchThemes) || content.searchThemes.length < 4) {
    fail("Tier 2 page needs at least four editorial search-intent themes: " + key);
  }
  if (!Array.isArray(content.focusPoints) || content.focusPoints.length < 4) {
    fail("Tier 2 page needs at least four distinct buyer checks: " + key);
  }
  if (!Array.isArray(content.faqs) || content.faqs.length < 4) {
    fail("Tier 2 page needs at least four model/make-specific FAQs: " + key);
  }
  for (const faq of content.faqs ?? []) {
    if (!faq.question?.trim() || !faq.answer?.trim()) {
      fail("Tier 2 FAQ question/answer missing: " + key);
    }
  }
  if (content.searchThemes?.some((theme) => !theme?.trim())) {
    fail("Tier 2 search-intent theme must not be blank: " + key);
  }
  if (page.title !== content.title || page.description !== content.description) {
    fail("Tier 2 SEO metadata was not applied to the generated page: " + key);
  }
  if (page.intro !== content.intro || page.buyerGuide !== content.buyerGuide) {
    fail("Tier 2 editorial content was not applied to the generated page: " + key);
  }
  if (
    page.focusPoints?.length !== content.focusPoints?.length ||
    page.faqs?.length !== content.faqs?.length
  ) {
    fail("Tier 2 buyer checklist/FAQ content was not applied to the generated page: " + key);
  }
  if (
    page.kind === "model" &&
    expectedTierTwoHiddenModels.has(page.makeSlug + "/" + page.slug) !==
      (page.directoryVisible === false)
  ) {
    fail("Tier 2 must preserve the existing model route visibility state: " + key);
  }
}

if (routePageSource.includes("searchThemes") || routePageSource.includes("searchThemes.join")) {
  fail("Editorial search themes must not be rendered as hidden or visible keyword lists.");
}
if (
  !routePageSource.includes("qualifiedCount < MIN_INDEXABLE_LANDING_STOCK") ||
  !routePageSource.includes("page.directoryVisible === false") ||
  registry.MIN_INDEXABLE_LANDING_STOCK !== 5
) {
  fail(
    "Tier metadata must not bypass the five-qualifying-vehicle indexation/visibility safeguards.",
  );
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
