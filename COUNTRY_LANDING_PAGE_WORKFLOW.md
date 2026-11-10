# Country landing-page system — authoring and publishing workflow

The country landing pages use a single typed registry at `src/lib/country-landing-pages.ts`.
The shared route template is `src/pages/country-landing-pages.tsx`; metadata and robots rules are produced by `src/lib/seo-bootstrap.ts`; the dynamic sitemap reads the same registry in `src/routes/sitemap[.]xml.ts`.

## Add a country

1. Confirm that Wazir Trading is prepared to accept enquiries for the destination. Do not imply a shipping route, carrier relationship, customs service, local office, delivery promise or guaranteed eligibility unless the business has verified it.
2. Research the destination from current primary sources: customs authority, trade ministry, vehicle registration authority and, where relevant, the port or standards authority. Prefer official government domains and current legal notices over blogs or broker summaries.
3. Add one complete `CountryLandingPage` object to `COUNTRY_LANDING_PAGES`:
   - `slug`: lowercase ASCII words separated by hyphens; keep existing URLs stable.
   - `name` and `region`: the public country name and a useful region label.
   - `title`: concise, distinct search title (aim for 50–65 characters).
   - `description`: unique, accurate search description (aim for 120–160 characters).
   - `intro`, `buyerContext`, `regulatorySnapshot`: destination-specific explanatory copy, not a find/replace template.
   - `checks`: at least three practical pre-purchase/import checks.
   - `quoteFocus`: the vehicle, importer and destination details needed for a useful enquiry.
   - `sources`: at least two HTTPS links to official/primary information, each with a descriptive label and authority.
   - `reviewedOn`: ISO date (`YYYY-MM-DD`) when the sources and summary were checked.
   - `indexable`: set `true` only after content is useful, accurate, source-backed, and the business has approved the destination for enquiry handling. Otherwise keep `false` until reviewed.
4. Do not copy another country's duty, vehicle-age, steering, emissions or permit rules. Never promise that a vehicle is importable based only on a general guide.
5. Run `npm run validate:country-pages`, `npm run typecheck`, `npm run lint`, and `npm run build`.
6. Inspect the rendered HTML and the resulting sitemap entry. The registry automatically feeds the directory, country route, metadata, structured data and sitemap; do not manually add duplicate route entries elsewhere.

## Indexing policy

- `indexable: true` enables index/follow, a self-canonical, country WebPage + BreadcrumbList JSON-LD, and sitemap inclusion.
- `indexable: false` keeps the page accessible to visitors but applies `noindex, follow` and excludes it from the sitemap and directory structured-data ItemList.
- Query-string variants are always `noindex, follow` and canonicalize to the clean country URL.
- Unknown slugs return a real not-found response from the server bootstrap.

## Current initial set

The registry contains 40 country records. The destination guides are research/planning pages, not a representation that Wazir Trading has a local office or confirmed carrier service in each country. Every quote and route must be confirmed for the actual vehicle and destination.
