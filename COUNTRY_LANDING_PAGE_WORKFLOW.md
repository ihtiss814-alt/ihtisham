# Country landing-page system — authoring and publishing workflow

The country landing pages use a single typed registry at `src/lib/country-landing-pages.ts`.
The shared route template is `src/pages/country-landing-pages.tsx`; metadata and robots rules are produced by `src/lib/seo-bootstrap.ts`; the dynamic sitemap reads the same registry in `src/routes/sitemap[.]xml.ts`.

## Add a country

1. Confirm that Wazir Trading is prepared to accept enquiries for the destination. Do not imply a shipping route, carrier relationship, customs service, local office, delivery promise or guaranteed eligibility unless the business has verified it.
2. Research the destination from current primary sources: customs authority, trade ministry, vehicle registration authority and, where relevant, the port or standards authority. Prefer official government domains and current legal notices over blogs or broker summaries.
3. Add one complete `CountryLandingPage` object to `COUNTRY_LANDING_PAGES`:
   - `slug`: lowercase ASCII words separated by hyphens; keep existing URLs stable.
   - `name` and `region`: the public country name and a useful region label.
   - `seoTier`: internal priority (`1`, `2`, or `3`). Keep the published country slug and URL stable.
   - `title`: concise, distinct search title (aim for 50–65 characters).
   - `description`: unique, accurate search description (aim for 120–160 characters).
   - `intro`, `buyerContext`, `regulatorySnapshot`: destination-specific explanatory copy, not a find/replace template.
   - `checks`: at least three practical pre-purchase/import checks.
   - `quoteFocus`: the vehicle, importer and destination details needed for a useful enquiry.
   - `sources`: at least two HTTPS links to official/primary information, each with a descriptive label and authority.
   - `reviewedOn`: ISO date (`YYYY-MM-DD`) when the sources and summary were checked.
   - `indexable`: set `true` only after content is useful, accurate, source-backed, and the business has approved the destination for enquiry handling. Otherwise keep `false` until reviewed.
4. For Tier 1 destinations, add a complete entry to `src/lib/country-tier-one-content.ts`; for Tier 2 destinations, add a complete entry to `src/lib/country-tier-two-content.ts`. Each entry needs a distinct page heading, internal search-intent themes, destination overview, four or more buyer steps, logistics guidance, local compliance checks, landed-cost components, four or more visible FAQs and enquiry instructions. Search themes are editorial data only; do not render hidden keyword lists.
5. Do not copy another country's duty, vehicle-age, steering, emissions or permit rules. Never promise that a vehicle is importable based only on a general guide. Keep all destination-specific claims tied to current primary sources.
6. Run `npm run validate:country-pages`, `npm run typecheck`, `npm run lint`, and `npm run build`.
7. Inspect the rendered HTML and the resulting sitemap entry. The registry automatically feeds the directory, country route, metadata, structured data and sitemap; do not manually add duplicate route entries elsewhere.

## Indexing policy

- `indexable: true` enables index/follow, a self-canonical, country WebPage + BreadcrumbList JSON-LD, and sitemap inclusion.
- `indexable: false` keeps the page accessible to visitors but applies `noindex, follow` and excludes it from the sitemap and directory structured-data ItemList.
- Query-string variants are always `noindex, follow` and canonicalize to the clean country URL.
- Unknown slugs return a real not-found response from the server bootstrap.

## Current initial set

The registry contains 40 country records. The destination guides are research/planning pages, not a representation that Wazir Trading has a local office or confirmed carrier service in each country. Every quote and route must be confirmed for the actual vehicle and destination.


## SEO priority tiers (internal)

- **Tier 1 (10):** Kenya, Tanzania, United Arab Emirates, New Zealand, South Africa, Sri Lanka, Pakistan, Uganda, Nigeria and Jamaica. These destinations use the extended country-specific content layer in `src/lib/country-tier-one-content.ts`.
- **Tier 2 (13):** Bangladesh, Zambia, Malawi, Mozambique, Zimbabwe, Namibia, Ghana, Mauritius, Fiji, Australia, Guyana, Trinidad and Tobago, and The Bahamas. These destinations use `src/lib/country-tier-two-content.ts` with the same public layout and structured buyer guidance as Tier 1.
- **Tier 3 (17):** Oman, Qatar, Bahrain, Saudi Arabia, Botswana, Senegal, The Gambia, Sierra Leone, Liberia, Seychelles, Madagascar, Papua New Guinea, Solomon Islands, Vanuatu, Barbados, Cameroon and Lesotho.

`seoTier` is internal planning metadata and does not change a country's route, canonical, or indexation by itself. Tier 1 pages retain their distinct country content and official sources, with additional buyer planning, destination logistics, cost categories and visible FAQs. Keyword themes are not rendered as hidden text and are not claims of measured search volume.

The country-page validator enforces the 10/13/17 split and checks that every Tier 1 and Tier 2 destination has the required country-specific enrichment. Keep `reviewedOn` truthful: update it only when the destination's underlying sources and summary have actually been reviewed.
