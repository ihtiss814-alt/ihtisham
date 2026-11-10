import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let ts;
try {
  ts = require('typescript');
} catch {
  console.error('TypeScript is required. Run npm install before validating country landing pages.');
  process.exit(1);
}

const sourcePath = new URL('../src/lib/country-landing-pages.ts', import.meta.url);
const source = readFileSync(sourcePath, 'utf8');
const sourceFile = ts.createSourceFile('country-landing-pages.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
const errors = [];
const seen = new Set();
const countries = [];

function propertyName(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name)) return name.text;
  return undefined;
}

function getProperty(object, name) {
  if (!object || !ts.isObjectLiteralExpression(object)) return undefined;
  const property = object.properties.find((item) =>
    (ts.isPropertyAssignment(item) || ts.isShorthandPropertyAssignment(item)) && propertyName(item.name) === name,
  );
  return property && ts.isPropertyAssignment(property) ? property.initializer : undefined;
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
  if (ts.isVariableDeclaration(node) && propertyName(node.name) === 'COUNTRY_LANDING_PAGES') {
    registryInitializer = node.initializer;
  }
  ts.forEachChild(node, visit);
}
visit(sourceFile);

if (!registryInitializer || !ts.isArrayLiteralExpression(registryInitializer)) {
  errors.push('Could not find COUNTRY_LANDING_PAGES as an exported array in src/lib/country-landing-pages.ts');
}

for (const [index, entry] of arrayValues(registryInitializer).entries()) {
  const line = sourceFile.getLineAndCharacterOfPosition(entry.getStart(sourceFile)).line + 1;
  if (!ts.isObjectLiteralExpression(entry)) {
    errors.push(`Country entry ${index + 1} (line ${line}) must be an object`);
    continue;
  }

  const slug = stringValue(getProperty(entry, 'slug'));
  const name = stringValue(getProperty(entry, 'name'));
  const title = stringValue(getProperty(entry, 'title'));
  const description = stringValue(getProperty(entry, 'description'));
  const intro = stringValue(getProperty(entry, 'intro'));
  const buyerContext = stringValue(getProperty(entry, 'buyerContext'));
  const regulatorySnapshot = stringValue(getProperty(entry, 'regulatorySnapshot'));
  const quoteFocus = stringValue(getProperty(entry, 'quoteFocus'));
  const reviewedOn = stringValue(getProperty(entry, 'reviewedOn'));
  const checks = arrayValues(getProperty(entry, 'checks')).map(stringValue).filter(Boolean);
  const sources = arrayValues(getProperty(entry, 'sources'))
    .map((item) => stringValue(getProperty(item, 'url')))
    .filter(Boolean);
  const indexable = getProperty(entry, 'indexable');
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  if (!slug || !slugPattern.test(slug)) errors.push(`Invalid or missing slug at line ${line}: ${slug ?? '(missing)'}`);
  if (slug && seen.has(slug)) errors.push(`Duplicate slug: ${slug}`);
  if (slug) seen.add(slug);
  if (!name || !title || !description || !intro || !buyerContext || !regulatorySnapshot || !quoteFocus || !reviewedOn) {
    errors.push(`${slug ?? `Country entry at line ${line}`}: required content field missing`);
  }
  if (title && title.length > 70) errors.push(`${slug}: title is longer than 70 characters (${title.length})`);
  if (description && (description.length < 90 || description.length > 180)) {
    errors.push(`${slug}: description should be 90–180 characters (${description.length})`);
  }
  if (checks.length < 3) errors.push(`${slug ?? `Entry at line ${line}`}: at least three buyer checks are required`);
  if (sources.length < 2) errors.push(`${slug ?? `Entry at line ${line}`}: at least two official/source links are required`);
  if (sources.some((url) => !url.startsWith('https://'))) errors.push(`${slug}: source links must use HTTPS`);
  if (!indexable || (indexable.kind !== ts.SyntaxKind.TrueKeyword && indexable.kind !== ts.SyntaxKind.FalseKeyword)) {
    errors.push(`${slug ?? `Entry at line ${line}`}: explicit boolean indexable flag is required`);
  }

  countries.push({ slug, name, titleLength: title?.length ?? 0, sources: sources.length });
}

if (countries.length < 40) errors.push(`Expected at least 40 countries; found ${countries.length}`);
if (errors.length) {
  console.error(`Country landing-page validation failed (${errors.length} issue(s)):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Country landing-page validation passed: ${countries.length} unique countries.`);
  console.table(countries);
}
