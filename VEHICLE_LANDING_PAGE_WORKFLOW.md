# Vehicle make/model landing-page workflow

The make/model landing pages use a typed registry in `src/lib/vehicle-landing-pages.ts`, a shared route template in `src/pages/vehicle-landing-pages.tsx`, server SEO bootstrap in `src/lib/seo-bootstrap.ts`, and the dynamic sitemap in `src/routes/sitemap[.]xml.ts`.

## Tiered editorial content

- Tier 1: `src/lib/vehicle-tier-one-content.ts` — 6 manufacturer pages and 24 model pages.
- Tier 2: `src/lib/vehicle-tier-two-content.ts` — 6 manufacturer pages and 18 model pages.
- Tier 3: `src/lib/vehicle-tier-three-content.ts` — 2 manufacturer pages and 9 model pages.
- The registry contains 14 manufacturer pages and 51 model pages overall. Body-style pages are managed separately and are not assigned to these make/model tiers.

Each enriched page needs a distinct title and meta description, original introduction, practical buyer guide, at least four buyer checks, at least four visible FAQs, and at least four editorial search-intent themes. Search themes are internal planning data only and must never be rendered as hidden keyword lists.

## Adding or changing a page

1. Review current inventory taxonomy and actual matching vehicle records. Do not claim stock volumes, model-year ranges, grades, equipment or technical specifications unless supported by the current records or reliable documentation.
2. Keep one canonical URL for a make/model family. Use aliases to map verified raw inventory labels to the existing page rather than creating near-duplicate routes.
3. Prioritise by business relevance and verified stock/search evidence. Do not present internal tiers as measured search volume or ranking forecasts.
4. Preserve existing URL paths, canonical metadata, server-rendered SEO bootstrap, structured data, directory links and sitemap integration.
5. Keep the five-qualifying-available-vehicle threshold. Tier assignment must never bypass inventory quality or availability checks. Retired legacy routes remain resolvable/noindex and must not be promoted into the directory or sitemap.
6. Do not add make × model × country permutations unless each page has distinct, useful information and a genuine inventory/use case.
7. Run `npm run validate:vehicle-pages`, `npm run validate:country-pages`, `npm run typecheck`, `npm run lint` and `npm run build`.
8. Inspect server-rendered output, canonical/robots tags, structured data, internal links and sitemap entries. Follow with live browser checks and Search Console monitoring; a successful build alone does not prove production rendering, indexing or organic performance.

## Current priority split

| Page type | Tier 1 | Tier 2 | Tier 3 | Total |
|---|---:|---:|---:|---:|
| Manufacturers | 6 | 6 | 2 | 14 |
| Models | 24 | 18 | 9 | 51 |

Tier 1 manufacturers: Toyota, Nissan, Honda, Suzuki, Mazda and Lexus.

Tier 2 manufacturers: Subaru, Mitsubishi, Daihatsu, Isuzu, Audi and Mercedes-Benz.

Tier 3 manufacturers: Mitsubishi Fuso and Hino.

Tier 3 model pages: Daihatsu Tanto, Toyota Dyna, Subaru XV, Audi TT, Mercedes-Benz C-Class, Mitsubishi Canter, Mitsubishi Minicab Truck, Daihatsu Move Canbus and Lexus LS.

These tiers are internal editorial priorities, not assertions about measured search demand. Revisit them when verified Search Console and inventory data are available.
