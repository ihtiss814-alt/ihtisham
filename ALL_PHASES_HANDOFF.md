# Wazir Trading LLC — Integrated SEO implementation (Phases 1–4)

## Project identity

This is the existing **TanStack Start + React + Wouter + Supabase** website for `https://www.wazirtradingllc.com`. It is not the separate Next.js rebuild. The implementation keeps the established site design and applies SEO and buyer-information improvements to the current application.

## Included work

### Phase 1 — Technical SEO foundation

- Initial server-rendered page metadata, canonical URLs, robots directives, Open Graph/Twitter metadata, and JSON-LD.
- Server-side SEO bootstrap for public pages, vehicle detail pages, and vehicle guide pages.
- Dynamic `/sitemap.xml` including public routes and only qualifying, available vehicle records and inventory-dependent guide pages.
- `/robots.txt` sitemap declaration and admin/API crawl restrictions.
- Filtered inventory URLs remain `noindex, follow` and canonicalize to `/cars`; unknown paths and non-qualifying vehicle records are handled with 404/noindex rules.

### Phase 2 — Buyer trust and transaction clarity

- Improved buying-journey and vehicle-availability wording.
- More careful price, export subtotal, shipping, payment and destination-cost disclosures.
- Buyer information, terms and privacy pages, plus updates to related business-information pages and navigation.
- Vehicle listing lifecycle logic avoids showing stale FOB prices as current offers for sold/unavailable stock.

### Phase 3 — Country SEO guides

- 40 country landing pages under `/import-japanese-cars/{country}`.
- Typed country registry, unique page metadata/content, official/source links, buyer checks, and a consistent workflow for adding more destinations.
- Directory page and sitemap integration.

### Phase 4 — Vehicle SEO guides

- 10 manufacturer guides, 25 model guides and 10 body-style guides (45 detail pages), under `/used-japanese-cars`.
- A directory page, typed registry, reusable guide-page templates and a documented workflow for adding future entries.
- Inventory-filter links, shared taxonomy checks, route handling, structured data and sitemap integration.
- Indexation requires at least three qualifying available vehicles per detail page; the shared quality gate prevents empty or thin guide pages from being indexed.

## Design preservation

No redesign was performed. Existing global styles, inventory styles, vehicle-detail styles, logos and hero/social imagery are preserved. The following files are unchanged from the supplied source snapshot:

- `src/styles.css`
- `src/pages/cars.css`
- `src/pages/car-detail.css`
- `public/logo.webp`
- `public/logo-small.png`
- `public/og-image.jpg`

The footer adds a text navigation link to the vehicle guide directory using the existing footer link styling. No unrelated CSS or visual component redesign is included.

## Targeted lint corrections included

The package includes the reviewed, targeted lint changes for the remaining known explicit-`any` and unused-expression issues in `CarCard`, inventory filtering, FAQ/payment environment access, and bulk upload selection. No blanket lint suppression was added.

## Validation status

### Re-run against this consolidated source package

- `npm run validate:country-pages` — **passed: 40 unique countries**.
- `npm run validate:vehicle-pages` — **passed: 10 manufacturers, 25 models, 10 body styles (45 detail pages)**.
- TypeScript/TSX syntax transpilation — **106 source files checked, 0 syntax diagnostics**.

### Full checks not rerun in this packaging environment

A fresh dependency install was attempted with `npm ci --offline`, but npm could not proceed because the local cache does not contain the locked `zod` package tarball. Therefore this packaging run does not claim a fresh full ESLint run, semantic TypeScript check, or production build. Earlier local project logs reported `npm run lint` with 0 errors and 11 warnings after the targeted lint patch, and reported passing `npm run typecheck` and `npm run build`; rerun all checks below on the target machine before deployment.

The country and vehicle validators depend on the project's existing TypeScript dev dependency. They work after `npm ci` / `npm install`.

## Required pre-deployment checks

Run from the project root:

```powershell
npm ci
npm run validate:country-pages
npm run validate:vehicle-pages
npm run typecheck
npm run lint
npm run build
```

Then preview the deployment and confirm:

1. `/`, `/cars`, `/import-japanese-cars`, `/used-japanese-cars`, a country detail page, a manufacturer/model/body-style page, and an eligible vehicle detail page return the expected HTML and status.
2. Initial page source includes the correct title, description, canonical, robots and relevant JSON-LD.
3. `/sitemap.xml` is valid XML and contains only the intended indexable pages.
4. Unknown vehicle-guide paths return the site's 404/noindex handling.
5. The live Supabase data has the expected fields and row-level access for public inventory reads.
6. All destinations listed are genuinely within the company's service scope and all import/regulatory information is reviewed against current official sources before being relied on by customers.

## Apply this ZIP over an existing Git checkout

1. Make a backup or commit pending work first.
2. Extract the folder in this archive over the existing project root. Copy its contents into the root of `ihtisham-seo-deploy` and allow source files to be overwritten.
3. **Do not delete or replace `.git` or your real `.env` file.** This archive does not contain either one and includes only `.env.example` placeholders.
4. Run the checks above. Inspect `git status` and `git diff` before staging or pushing.
5. Commit and push only after the checks pass on your machine.

No ranking guarantee is implied. Google Search Console, live HTTP responses, actual inventory data, destination eligibility, security configuration, and real-device performance still require post-deployment verification.
