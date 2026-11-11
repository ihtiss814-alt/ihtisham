import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let ts;
try {
  ts = require("typescript");
} catch {
  console.error("TypeScript is required. Run npm install before validating country landing pages.");
  process.exit(1);
}

const sourcePath = new URL("../src/lib/country-landing-pages.ts", import.meta.url);
const source = readFileSync(sourcePath, "utf8");
const sourceFile = ts.createSourceFile(
  "country-landing-pages.ts",
  source,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
);
const errors = [];
const seen = new Set();
const countries = [];

function propertyName(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name))
    return name.text;
  return undefined;
}

function getProperty(object, name) {
  if (!object || !ts.isObjectLiteralExpression(object)) return undefined;
  const property = object.properties.find(
    (item) =>
      (ts.isPropertyAssignment(item) || ts.isShorthandPropertyAssignment(item)) &&
      propertyName(item.name) === name,
  );
  return property && ts.isPropertyAssignment(property) ? property.initializer : undefined;
}

function numberValue(node) {
  return node && ts.isNumericLiteral(node) ? Number(node.text) : undefined;
}

function stringValue(node) {
  if (!node) return undefined;
  if (ts.isStringLiteralLike(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  return undefined;
}

function arrayValues(node) {
  return node && ts.isArrayLiteralExpression(node) ? [...node.elements] : [];
}

let registryInitializer;
function visit(node) {
  if (ts.isVariableDeclaration(node) && propertyName(node.name) === "COUNTRY_LANDING_PAGES") {
    registryInitializer = node.initializer;
  }
  ts.forEachChild(node, visit);
}
visit(sourceFile);

if (!registryInitializer || !ts.isArrayLiteralExpression(registryInitializer)) {
  errors.push(
    "Could not find COUNTRY_LANDING_PAGES as an exported array in src/lib/country-landing-pages.ts",
  );
}

for (const [index, entry] of arrayValues(registryInitializer).entries()) {
  const line = sourceFile.getLineAndCharacterOfPosition(entry.getStart(sourceFile)).line + 1;
  if (!ts.isObjectLiteralExpression(entry)) {
    errors.push(`Country entry ${index + 1} (line ${line}) must be an object`);
    continue;
  }

  const slug = stringValue(getProperty(entry, "slug"));
  const name = stringValue(getProperty(entry, "name"));
  const seoTier = numberValue(getProperty(entry, "seoTier"));
  const title = stringValue(getProperty(entry, "title"));
  const description = stringValue(getProperty(entry, "description"));
  const intro = stringValue(getProperty(entry, "intro"));
  const buyerContext = stringValue(getProperty(entry, "buyerContext"));
  const regulatorySnapshot = stringValue(getProperty(entry, "regulatorySnapshot"));
  const quoteFocus = stringValue(getProperty(entry, "quoteFocus"));
  const reviewedOn = stringValue(getProperty(entry, "reviewedOn"));
  const checks = arrayValues(getProperty(entry, "checks")).map(stringValue).filter(Boolean);
  const sources = arrayValues(getProperty(entry, "sources"))
    .map((item) => stringValue(getProperty(item, "url")))
    .filter(Boolean);
  const indexable = getProperty(entry, "indexable");
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  if (!slug || !slugPattern.test(slug))
    errors.push(`Invalid or missing slug at line ${line}: ${slug ?? "(missing)"}`);
  if (slug && seen.has(slug)) errors.push(`Duplicate slug: ${slug}`);
  if (slug) seen.add(slug);
  if (![1, 2, 3].includes(seoTier)) errors.push(`${slug}: seoTier must be 1, 2, or 3`);
  if (
    !name ||
    !title ||
    !description ||
    !intro ||
    !buyerContext ||
    !regulatorySnapshot ||
    !quoteFocus ||
    !reviewedOn
  ) {
    errors.push(`${slug ?? `Country entry at line ${line}`}: required content field missing`);
  }
  if (title && title.length > 70)
    errors.push(`${slug}: title is longer than 70 characters (${title.length})`);
  if (description && (description.length < 90 || description.length > 180)) {
    errors.push(`${slug}: description should be 90–180 characters (${description.length})`);
  }
  if (checks.length < 3)
    errors.push(`${slug ?? `Entry at line ${line}`}: at least three buyer checks are required`);
  if (sources.length < 2)
    errors.push(
      `${slug ?? `Entry at line ${line}`}: at least two official/source links are required`,
    );
  if (sources.some((url) => !url.startsWith("https://")))
    errors.push(`${slug}: source links must use HTTPS`);
  if (
    !indexable ||
    (indexable.kind !== ts.SyntaxKind.TrueKeyword && indexable.kind !== ts.SyntaxKind.FalseKeyword)
  ) {
    errors.push(`${slug ?? `Entry at line ${line}`}: explicit boolean indexable flag is required`);
  }

  countries.push({ slug, name, seoTier, titleLength: title?.length ?? 0, sources: sources.length });
}

if (countries.length !== 40) {
  errors.push("Expected exactly 40 countries; found " + countries.length);
}

const tierCounts = [1, 2, 3].map(
  (tier) => countries.filter((country) => country.seoTier === tier).length,
);
if (tierCounts[0] !== 10 || tierCounts[1] !== 13 || tierCounts[2] !== 17) {
  errors.push("Expected SEO tier counts 10/13/17; found " + tierCounts.join("/"));
}

const tierOnePath = new URL("../src/lib/country-tier-one-content.ts", import.meta.url);
const tierOneSource = readFileSync(tierOnePath, "utf8");
const tierOneFile = ts.createSourceFile(
  "country-tier-one-content.ts",
  tierOneSource,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
);
let tierOneInitializer;
function visitTierOne(node) {
  if (ts.isVariableDeclaration(node) && propertyName(node.name) === "COUNTRY_TIER_ONE_CONTENT") {
    tierOneInitializer = node.initializer;
  }
  ts.forEachChild(node, visitTierOne);
}
visitTierOne(tierOneFile);

const tierOneCountries = new Set(
  countries.filter((country) => country.seoTier === 1).map((country) => country.slug),
);
const tierOneEntries =
  tierOneInitializer && ts.isObjectLiteralExpression(tierOneInitializer)
    ? tierOneInitializer.properties.filter(ts.isPropertyAssignment)
    : [];
const enrichedSlugs = new Set();

if (!tierOneInitializer || !ts.isObjectLiteralExpression(tierOneInitializer)) {
  errors.push(
    "Could not find COUNTRY_TIER_ONE_CONTENT object in src/lib/country-tier-one-content.ts",
  );
}

for (const entry of tierOneEntries) {
  const slug = propertyName(entry.name);
  const value = entry.initializer;
  if (!slug || !ts.isObjectLiteralExpression(value)) {
    errors.push("Each Tier 1 enrichment must be a keyed object");
    continue;
  }
  if (enrichedSlugs.has(slug)) errors.push("Duplicate Tier 1 enrichment: " + slug);
  enrichedSlugs.add(slug);
  if (!tierOneCountries.has(slug)) {
    errors.push(slug + ": enrichment does not match a Tier 1 country");
  }

  const heading = stringValue(getProperty(value, "pageHeading"));
  const overview = stringValue(getProperty(value, "marketOverview"));
  const logistics = stringValue(getProperty(value, "logisticsSummary"));
  const enquiryNote = stringValue(getProperty(value, "enquiryNote"));
  const themes = arrayValues(getProperty(value, "searchThemes"));
  const steps = arrayValues(getProperty(value, "planningSteps"));
  const localChecks = arrayValues(getProperty(value, "localChecks"));
  const costs = arrayValues(getProperty(value, "costFactors"));
  const faqs = arrayValues(getProperty(value, "faqs"));

  if (!heading || heading.length < 30 || heading.length > 90) {
    errors.push(slug + ": missing or unsuitable Tier 1 page heading");
  }
  if (!overview || overview.length < 250) {
    errors.push(slug + ": market overview must provide substantial destination-specific guidance");
  }
  if (!logistics || logistics.length < 160) errors.push(slug + ": logistics summary is too short");
  if (!enquiryNote || enquiryNote.length < 70) {
    errors.push(slug + ": enquiry guidance is too short");
  }
  if (themes.length < 4) {
    errors.push(slug + ": at least four internal keyword/search-intent themes are required");
  }
  if (steps.length < 4) {
    errors.push(slug + ": at least four buyer planning steps are required");
  }
  if (localChecks.length < 3) {
    errors.push(slug + ": at least three local compliance checks are required");
  }
  if (costs.length < 4) {
    errors.push(slug + ": at least four landed-cost factors are required");
  }
  if (faqs.length < 4) {
    errors.push(slug + ": at least four visible buyer FAQs are required");
  }
  for (const [index, step] of steps.entries()) {
    if (
      !ts.isObjectLiteralExpression(step) ||
      !stringValue(getProperty(step, "title")) ||
      !stringValue(getProperty(step, "detail"))
    ) {
      errors.push(slug + ": planning step " + (index + 1) + " needs a title and detail");
    }
  }
  for (const [index, faq] of faqs.entries()) {
    if (
      !ts.isObjectLiteralExpression(faq) ||
      !stringValue(getProperty(faq, "question")) ||
      !stringValue(getProperty(faq, "answer"))
    ) {
      errors.push(slug + ": FAQ " + (index + 1) + " needs a question and answer");
    }
  }
}

for (const slug of tierOneCountries) {
  if (!enrichedSlugs.has(slug)) errors.push(slug + ": missing Tier 1 enrichment");
}
if (enrichedSlugs.size !== 10) {
  errors.push("Expected exactly 10 Tier 1 enrichments; found " + enrichedSlugs.size);
}


const tierTwoPath = new URL("../src/lib/country-tier-two-content.ts", import.meta.url);
const tierTwoSource = readFileSync(tierTwoPath, "utf8");
const tierTwoFile = ts.createSourceFile(
  "country-tier-two-content.ts",
  tierTwoSource,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
);
let tierTwoInitializer;
function visitTierOne(node) {
  if (ts.isVariableDeclaration(node) && propertyName(node.name) === "COUNTRY_TIER_TWO_CONTENT") {
    tierTwoInitializer = node.initializer;
  }
  ts.forEachChild(node, visitTierOne);
}
visitTierOne(tierTwoFile);

const tierTwoCountries = new Set(
  countries.filter((country) => country.seoTier === 2).map((country) => country.slug),
);
const tierTwoEntries =
  tierTwoInitializer && ts.isObjectLiteralExpression(tierTwoInitializer)
    ? tierTwoInitializer.properties.filter(ts.isPropertyAssignment)
    : [];
const enrichedSlugs = new Set();

if (!tierTwoInitializer || !ts.isObjectLiteralExpression(tierTwoInitializer)) {
  errors.push(
    "Could not find COUNTRY_TIER_TWO_CONTENT object in src/lib/country-tier-two-content.ts",
  );
}

for (const entry of tierTwoEntries) {
  const slug = propertyName(entry.name);
  const value = entry.initializer;
  if (!slug || !ts.isObjectLiteralExpression(value)) {
    errors.push("Each Tier 2 enrichment must be a keyed object");
    continue;
  }
  if (enrichedSlugs.has(slug)) errors.push("Duplicate Tier 2 enrichment: " + slug);
  enrichedSlugs.add(slug);
  if (!tierTwoCountries.has(slug)) {
    errors.push(slug + ": enrichment does not match a Tier 2 country");
  }

  const heading = stringValue(getProperty(value, "pageHeading"));
  const overview = stringValue(getProperty(value, "marketOverview"));
  const logistics = stringValue(getProperty(value, "logisticsSummary"));
  const enquiryNote = stringValue(getProperty(value, "enquiryNote"));
  const themes = arrayValues(getProperty(value, "searchThemes"));
  const steps = arrayValues(getProperty(value, "planningSteps"));
  const localChecks = arrayValues(getProperty(value, "localChecks"));
  const costs = arrayValues(getProperty(value, "costFactors"));
  const faqs = arrayValues(getProperty(value, "faqs"));

  if (!heading || heading.length < 30 || heading.length > 90) {
    errors.push(slug + ": missing or unsuitable Tier 2 page heading");
  }
  if (!overview || overview.length < 250) {
    errors.push(slug + ": market overview must provide substantial destination-specific guidance");
  }
  if (!logistics || logistics.length < 160) errors.push(slug + ": logistics summary is too short");
  if (!enquiryNote || enquiryNote.length < 70) {
    errors.push(slug + ": enquiry guidance is too short");
  }
  if (themes.length < 4) {
    errors.push(slug + ": at least four internal keyword/search-intent themes are required");
  }
  if (steps.length < 4) {
    errors.push(slug + ": at least four buyer planning steps are required");
  }
  if (localChecks.length < 3) {
    errors.push(slug + ": at least three local compliance checks are required");
  }
  if (costs.length < 4) {
    errors.push(slug + ": at least four landed-cost factors are required");
  }
  if (faqs.length < 4) {
    errors.push(slug + ": at least four visible buyer FAQs are required");
  }
  for (const [index, step] of steps.entries()) {
    if (
      !ts.isObjectLiteralExpression(step) ||
      !stringValue(getProperty(step, "title")) ||
      !stringValue(getProperty(step, "detail"))
    ) {
      errors.push(slug + ": planning step " + (index + 1) + " needs a title and detail");
    }
  }
  for (const [index, faq] of faqs.entries()) {
    if (
      !ts.isObjectLiteralExpression(faq) ||
      !stringValue(getProperty(faq, "question")) ||
      !stringValue(getProperty(faq, "answer"))
    ) {
      errors.push(slug + ": FAQ " + (index + 1) + " needs a question and answer");
    }
  }
}

for (const slug of tierTwoCountries) {
  if (!enrichedSlugs.has(slug)) errors.push(slug + ": missing Tier 2 enrichment");
}
if (enrichedSlugs.size !== 13) {
  errors.push("Expected exactly 13 Tier 2 enrichments; found " + enrichedSlugs.size);
}


if (errors.length) {
  console.error(`Country landing-page validation failed (${errors.length} issue(s)):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Country landing-page validation passed: ${countries.length} unique countries.`);
  console.table(countries);
}
