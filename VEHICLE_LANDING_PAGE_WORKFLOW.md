# Vehicle landing page workflow — Phase 4

## Current architecture

Vehicle SEO pages are data-driven from `src/lib/vehicle-landing-pages.ts` and use the existing Wouter application inside the TanStack Start catch-all route. The directory is `/used-japanese-cars`. The current registry contains 14 manufacturer pages, 51 model pages and the existing body-style pages.

- Manufacturer pages: `/used-japanese-cars/{make-slug}`
- Model pages: `/used-japanese-cars/{make-slug}/{model-slug}`
- Body-style pages: `/used-japanese-cars/body-type/{body-slug}`

The current registry includes 14 manufacturers, 51 models and the existing body-style guides (75 detail pages when the 10 body-style routes are included). The detail-page component, metadata loader and sitemap integration are shared; future pages should normally require only registry content. Unknown paths inside this namespace are handled as noindex 404s. When visitors navigate internally with Wouter, the page fetches its own matching inventory if the current server bootstrap belongs to another route.

## Publication and indexing policy

A registered URL is not automatically indexable. The server loads matching rows from the public `cars` table using `status = available`, then applies the existing `isIndexableVehicle` quality gate. That gate requires a valid vehicle reference, make, model, numeric year, available status, at least one meaningful specification and at least one valid image.

A detail page is indexable only when at least **5** matching rows pass that gate. The same threshold is used in the metadata loader and sitemap aggregation. Pages below the threshold remain accessible as useful guides but receive `noindex, follow` and are omitted from the sitemap. Query-string variants are also noindex and canonicalize to the clean registry path.

The inventory query is capped at the 200 newest matching rows for page rendering and indexability evaluation. The sitemap scans the broader inventory but caps its per-page `scanned` count at the same 200 newest matching rows, so its indexation threshold mirrors the page loader. If the catalogue grows substantially, increase or paginate both sides together and consider splitting the sitemap before relaxing the quality threshold.

## Make/model SEO priority tiers

`seoTier` is internal editorial prioritisation and does not change a route, canonical URL or indexation by itself. The current 14 manufacturers use a 6/6/2 split and the 51 models use a 24/18/9 split. Tier 1 contains Toyota, Nissan, Honda, Suzuki, Mazda and Lexus, plus 24 existing model pages with dedicated content in `src/lib/vehicle-tier-one-content.ts`. Tier 2 contains Subaru, Mitsubishi, Daihatsu, Isuzu, Audi and Mercedes-Benz, plus 18 existing model pages with dedicated content in `src/lib/vehicle-tier-two-content.ts`. Tier 3 remains in the registry for its own later editorial pass.

The Tier 1 shortlist uses a combination of current Japanese market/sales signals, existing catalogue coverage and commercial search intent. It is not represented as measured Wazir Trading inventory demand or Search Console keyword volume. Reassess the assignments using Search Console impressions/clicks, qualified available stock, enquiry conversion and destination mix when those first-party measurements are available. Do not unhide retired model URLs or lower the five-qualifying-vehicle indexation threshold to make a page indexable.

Tier 1 and Tier 2 content each include a unique title, description, introduction, buyer guide, at least four buyer checks, at least four visible FAQs and editorial search-intent themes. Search themes live only in editorial data and must never be rendered as hidden keyword blocks. Tier 2 editorial content does not change the visibility of any legacy route: the existing hidden/noindex model set remains hidden until a separate data-backed review authorises promotion.

## Adding a manufacturer

1. Add one item to `makeContent` in `src/lib/vehicle-landing-pages.ts`.
2. Use the exact normalized manufacturer value stored in `cars.make` for `name`.
3. Write a manufacturer-specific introduction and buyer guide. Do not invent current stock, dealership coverage, warranty, reliability, shipping availability or manufacturer approval.
4. Include at least three practical checks. The shared FAQ builder adds purchase and quotation questions.
5. Set the internal `seoTier` and, for Tier 1 makes, add a curated `make:{slug}` entry to `src/lib/vehicle-tier-one-content.ts`; for Tier 2 makes, use `src/lib/vehicle-tier-two-content.ts`. Keep titles within 70 characters and descriptions between 110 and 175 characters. Do not render search themes as keyword lists.
6. Run `npm run validate:vehicle-pages`.

## Adding a model

1. Confirm the parent make slug already exists in `makeContent`.
2. Add an item to `modelContent` with `makeSlug`, `make`, `model` and a unique model `slug`.
3. Match the value in `model` to the value stored in `cars.model` (case-insensitive match is used). Do not combine aliases or generations unless the database actually uses the same model value.
4. Describe only the distinctions a buyer should verify. For hybrid, plug-in hybrid and electric models, request unit-specific battery or charging details instead of implying a standard battery condition.
5. Set the internal `seoTier` and, for Tier 1 models, add a curated `model:{makeSlug}/{slug}` entry to `src/lib/vehicle-tier-one-content.ts`; for Tier 2 models, use `src/lib/vehicle-tier-two-content.ts`. Include vehicle-specific selection checks and FAQs; do not add unsupported mechanical claims or destination guarantees.
6. Run the validator and confirm that the model path maps to its parent make page.

## Adding a body style

1. Add a record to `bodyContent`.
2. Match `bodyType` to the exact label used in `cars.body_type`; matching is case-insensitive but otherwise exact.
3. Keep the guidance tied to the body configuration: dimensions, seat count, cargo layout, weight/payload or drivetrain as relevant.
4. Do not add broad taxonomy terms unless inventory uses that value consistently.

## Validation and launch

```bash
npm install
npm run validate:country-pages
npm run validate:vehicle-pages
npm run typecheck
npm run lint
npm run build
```

After deploying to the canonical host, verify representative make, model and body-style URLs in rendered HTML. Check unique title and description, one canonical, server-rendered inventory cards, robots meta, JSON-LD, and the sitemap. Test each page below the stock threshold to confirm it is noindex and absent from the sitemap. Recheck after stock changes because these pages can enter or leave the sitemap as qualifying vehicles are added or sold.

## Design protection

Vehicle landing pages reuse the current navy/red palette, typography utilities, existing `CarCard` component and existing layout patterns. No new CSS file or design token is required. Tier 1 enhances content and metadata within the shared template; it does not introduce a separate visual design. Do not alter existing global styles or the current home, inventory or vehicle-detail page layout when adding registry entries.
