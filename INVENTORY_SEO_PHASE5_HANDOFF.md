# Wazir Trading — Inventory-backed vehicle SEO handoff

## Purpose

This update aligns the existing website's vehicle SEO landing pages and inventory UI with the supplied read-only Supabase inventory audit. It is a targeted SEO/data-integration update, not a redesign.

**Inventory evidence used:** the user's audit endpoint summary and complete compact inventory report generated on 10 November 2026. The supplied snapshot contained 865 `available` records, 14 normalized manufacturers and 124 normalized make/model/body-type combinations. The model registry in this source contains 51 canonical model routes; it does not create one route for every raw database label.

The audit endpoint could not be freshly queried from this build environment. The application itself reads inventory at runtime, but the curated page registry is based on the supplied 10 November snapshot and should be re-reviewed against a fresh export during the next scheduled inventory review.

## What changed

### 1. Manufacturer and model coverage

- Manufacturer registry now includes 14 normalized makes: Toyota, Nissan, Isuzu, Suzuki, Mitsubishi, Audi, Mazda, Daihatsu, Honda, Lexus, Mercedes-Benz, Mitsubishi Fuso, Subaru and Hino.
- Model registry now contains 51 model guide definitions. The directory promotes 38 of them based on the supplied stock snapshot; thin or overlapping legacy routes remain resolvable but are hidden/noindex.
- Added a dedicated Mitsubishi Canter page. Mitsubishi Canter (including the Mitsubishi `Canter Guts` raw label) is separate from Mitsubishi Fuso Canter.
- Added/retained inventory-backed guides for high-stock groups including Corolla Fielder, Isuzu Elf, Nissan Note, Suzuki Swift, Land Cruiser, Yaris, Aqua, RAV4, Raize, Demio, Canter, Prius, Hiace, Premio, Lexus NX, Fuso Canter, Vezel, Cube, Prius A/Alpha, Yaris Cross, Esquire, Tanto, Hilux, Dyna, ZR-V, Subaru XV, Audi TT, Mercedes C-Class, Alphard, Sienta, March, Wagon R, Minicab Truck, Move Canbus and Lexus LS.
- Alias matching is used in both server-rendered and client-side guide inventory queries. Examples include Isuzu Elf/Elf Truck, Toyota Hiace/Hiace Wagon, Land Cruiser/Wagon/Cygnus, Suzuki Swift/Swif, Toyota Dyna/Dyna Truck, Toyota Prius A/Prius Alpha, Audi TT/TT Coupe, and Mitsubishi Canter/Canter Guts.
- Mitsubishi Fuso Canter remains separate from Mitsubishi Canter.
- Potentially misclassified source records (for example Suzuki XV and Toyota ZR-V) were not silently reassigned to another manufacturer. They need verification against vehicle documents before any database correction.

### 2. Indexation and page retirement rules

- A detail page requires at least **5 qualifying available vehicle records** to be indexable.
- A vehicle is not counted as a qualifying landing-page listing if it fails the site's vehicle data/image checks or carries a future model year.
- Hidden legacy/overlapping pages remain resolvable for old links, but are marked `noindex` and omitted from the directory, related-model links and sitemap until explicitly promoted again.
- The current directory exposes 14 manufacturer pages, 38 model pages and 9 body-style pages (61 directory entries). The registry retains 77 total detail route definitions, including 16 hidden/noindex legacy or overlapping routes.
- The Coupe body-style route is retained but hidden/noindex: the snapshot had only five coupe listings and they overlap with the dedicated Audi TT model guide.
- Sitemap landing-page counts use the same aliases, qualification threshold and inventory scan limit as the page loader.

### 3. Body-style taxonomy

The site's body-style filter now maps display labels to the exact database taxonomy, including:

- `Station Wagon` → `wagon`
- `Minivan` → `minivan`
- `Pickup Truck` → `pickup truck`

The catalogue uses the body styles represented in the supplied inventory. There is no standalone indexable Bus guide from the snapshot because only one bus was recorded. Compact SUV and Off-Road legacy guides remain hidden/noindex because those exact body-type values are not represented in the source taxonomy.

### 4. Featured and recently listed inventory

The audit showed `is_new_arrival = TRUE` for all 865 available records, so it is not a reliable freshness flag.

- Homepage **Featured Collection** now queries `is_featured = true` and `status = available`.
- The New Arrivals catalogue tab now uses a bounded 30-day `created_at` window and is labelled **Recently Added**.
- Vehicle-card badges say **Recently Listed**, not New Arrival, and use the same 30-day `created_at` rule.
- This is a listing-date indicator, not proof of the vehicle's physical arrival at the yard. No Supabase records or flags were changed.

### 5. Timestamp and year quality

- `dateModified` in vehicle structured data and `<lastmod>` in the sitemap are emitted only when `updated_at` is a valid timestamp later than `created_at`.
- The supplied snapshot had 839 records with identical creation/update timestamps, so the site no longer presents those unchanged timestamps as verified modification dates.
- Future-dated vehicle model years are excluded from indexable vehicle URLs and vehicle-guide quality counts. The supplied snapshot included one 2027 Lexus NX record that needs documentary verification. No database record was edited.

### 6. Visual design

No redesign was performed. The following files were compared against the supplied complete Phase 1–4 archive and remain byte-for-byte unchanged:

- `src/styles.css`
- `src/pages/cars.css`
- `src/pages/car-detail.css`
- `public/logo.webp`
- `public/logo-small.png`
- `public/og-image.jpg`

### 7. Files changed

- `scripts/validate-vehicle-pages.mjs`
- `src/components/CarCard.tsx`
- `src/lib/seo-bootstrap.ts`
- `src/lib/vehicle-landing-pages.ts`
- `src/lib/vehicle-seo-core.mjs`
- `src/lib/vehicle-seo.ts`
- `src/pages/cars.tsx`
- `src/pages/home.tsx`
- `src/pages/vehicle-landing-pages.tsx`
- `src/routes/sitemap[.]xml.ts`

Country landing-page source was not changed in this update.

## Validation performed in this environment

Passed:

- Country landing-page validator: **40 unique countries**.
- Vehicle landing-page validator: **14 manufacturers, 51 models, 12 body-style route definitions, 77 detail routes**; five qualified vehicles required for indexation.
- TypeScript/TSX syntax transpile: **106 source files, 0 syntax diagnostics, 0 transpile failures**.
- Design preservation checks listed above.

Not run successfully here:

- `npm run typecheck`: project dependencies are not installed in this environment; TypeScript reported missing `vite/client` type definitions.
- `npm run lint`: ESLint binary is not installed here.
- `npm run build`: Vite binary is not installed here.

Run the full local verification commands below after copying this project to your working repository and installing dependencies.

## Local verification (PowerShell)

```powershell
npm ci
npm run validate:country-pages
npm run validate:vehicle-pages
npm run typecheck
npm run lint
npm run build
```

Do not overwrite or commit your real `.env` file. Keep `.git`, your deployment environment variables and any local secrets outside this ZIP when applying the source update.

## Important limitations and next audit

- This is an inventory-backed update from the user's supplied **10 November 2026** export, not a claim that we fetched a newer snapshot during this build.
- The live Supabase endpoint is read-only and is not embedded with a secret key in the website source.
- New landing pages are deliberately curated, not generated automatically for every new database value. A new make/model must be normalized, reviewed for meaningful inventory and distinct search intent, given useful content, and validated before it is made indexable.
- The Supabase summary reported 859 of 865 vehicles with images (six without). The compact report identified one vehicle without a selected primary image (`WTL-000112`, Honda Vezel 2024); reconcile the remaining image records in the next inventory audit before declaring image coverage complete.
- The `is_new_arrival` database flag remains unchanged and should be fixed in the inventory workflow separately once the business definition of “arrival” is agreed.
- The 2027 Lexus NX year and the apparent Suzuki XV / Toyota ZR-V manufacturer mismatches require original-document verification. This code does not modify those production records.
