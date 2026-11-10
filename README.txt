Wazir Trading SEO validation script fix

Copy this patch into the root of the existing ihtisham-seo-deploy repository.
It replaces only:
  scripts/validate-country-pages.mjs
  scripts/validate-vehicle-pages.mjs

The country validator now parses the TypeScript registry with the TypeScript AST instead of depending on exact indentation/quote formatting.
The vehicle validator strips its one registry-only import with a quote-style-tolerant matcher before running the TypeScript transpiled module in an isolated CommonJS sandbox.

Requires the project's existing TypeScript devDependency (`npm install` already completed).

After applying, run:
  npm run validate:country-pages
  npm run validate:vehicle-pages

These are validation-tool fixes; they do not alter page copy, inventory filtering, SEO metadata, routes, CSS, or design.
