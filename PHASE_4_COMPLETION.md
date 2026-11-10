# Wazir Trading LLC — Phase 4 vehicle landing pages

## Delivered

- New vehicle-guide directory: `/used-japanese-cars`.
- 10 manufacturer landing pages: Toyota, Nissan, Honda, Suzuki, Mazda, Subaru, Mitsubishi, Daihatsu, Lexus and Isuzu.
- 25 model landing pages covering the curated Toyota, Nissan, Honda, Suzuki, Mazda, Subaru, Mitsubishi, Daihatsu, Lexus and Isuzu model set.
- 10 body-style landing pages: SUV, Hatchback, Sedan, Van, Mini Van, Truck, MPV, Station Wagon, Compact SUV and Off-Road Vehicles.
- Shared typed registry and routing conventions so future pages can be added through data entries rather than new route components.
- Server-side metadata and canonical URLs for the directory and each registered detail page.
- Server-side matching against current available inventory with the existing vehicle data-quality rules.
- Indexation gate: a make, model or body-style page is indexable only when at least 3 matching available vehicles pass the quality checks. Otherwise it remains accessible as `noindex, follow`.
- Query-string variants remain noindex and canonicalize to the clean page URL.
- Unknown paths under `/used-japanese-cars/` use the server not-found flow and render the existing noindex 404 UI during client-side navigation.
- Client-side Wouter navigation fetches matching inventory when the initial server loader data belongs to a different route, then updates page metadata and the noindex state when that result is known.
- CollectionPage, ItemList and BreadcrumbList JSON-LD for qualified inventory pages; directory CollectionPage/ItemList JSON-LD for the hub.
- Dynamic sitemap aggregation adds only detail pages meeting the same 3-vehicle quality threshold, evaluated against the same 200 newest matching available rows as the metadata loader. The directory is included as a static hub URL.
- Footer discoverability link to the new directory.
- `npm run validate:vehicle-pages` checks counts, unique paths, metadata lengths, content fields, model-parent links, indexation threshold and vehicle-to-page mapping.
- `VEHICLE_LANDING_PAGE_WORKFLOW.md` documents how to add new pages safely.

## Accuracy and SEO safeguards

- A registry entry alone does not create an indexable page.
- Inventory must be `available` and pass the shared vehicle SEO quality gate, including a valid image and meaningful specification.
- The metadata loader and sitemap use the same minimum threshold of 3 qualifying vehicles.
- Page templates do not guarantee current stock, destination import permission, local dealer coverage, warranty, shipping routes or carrier availability.
- Model matching uses the exact `cars.model` value (case-insensitive). Make and body-style matching also use the exact stored value (case-insensitive) to prevent accidental category expansion.
- Vehicle records remain separate URLs with their existing quality and indexation rules.

## Design protection

- No existing CSS file, global style token, image, logo, font, navbar, home-page layout, inventory layout or vehicle-detail layout was changed.
- New pages reuse the existing navy/red brand palette, utility classes and `CarCard` component.
- The only existing component change is one additional footer link in the existing Quick Links group.

## Validation status (owner's Windows environment, 2026-11-10)

- Country registry validator passed: 40 unique destination records.
- Vehicle registry validator passed: 10 manufacturers, 25 models, 10 body styles and 45 unique detail routes; manufacturer and body-type entries are checked against the existing inventory filter taxonomy.
- `npm run typecheck` passed after compatibility corrections to the vehicle-detail bootstrap type boundary and TanStack root error-component prop type.
- `npm run build` completed successfully for the client, SSR and Cloudflare Nitro outputs. Non-fatal warnings remain for a large client chunk, the `vite-tsconfig-paths` plugin recommendation, and an ignored `inlineDynamicImports` option.
- `npm run lint` is **not clean**: the owner reported 5,728 errors and 11 warnings. The detailed JSON report/rule breakdown has not been reviewed; this phase does not claim lint is fixed. Avoid broad `eslint --fix` until affected rules/files are understood.
- Live SSR output, Supabase matching, sitemap content, canonical/robots headers, Cloudflare preview and Google Search Console indexation still require verification against the deployed environment. The 45 registered guide URLs are not all guaranteed to be indexable: each detail page enters the sitemap only after three matching vehicles pass the shared quality gate.

See `ALL_PHASES_HANDOFF.md` for the integrated Phase 1–4 handoff and pre-deployment checklist.

## Commands

```bash
npm install
npm run validate:country-pages
npm run validate:vehicle-pages
npm run typecheck
npm run lint
npm run build
```

Do not deploy until the full local checks pass and the Supabase-backed inventory is available to the server runtime. Do not commit `.env` or real credentials.
