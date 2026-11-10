# Wazir Trading — Phase 3 country landing pages

## Delivered

- A scalable typed country registry with 40 initial destination records.
- A country directory at `/import-japanese-cars` grouped by region.
- Forty individual routes at `/import-japanese-cars/{country-slug}`.
- Server-side route metadata through the existing TanStack Start catch-all loader: unique title, description, canonical, robots, Open Graph/Twitter metadata and JSON-LD.
- Country-specific WebPage and BreadcrumbList structured data; directory CollectionPage/ItemList structured data.
- Dynamic sitemap inclusion for the directory and every country record whose `indexable` flag is true.
- Query-string country URLs are noindex and canonicalize to the clean URL.
- Unknown country slugs use the existing server-side not-found flow.
- Footer discoverability link to the country directory.
- `npm run validate:country-pages` to validate unique slugs, required copy, source links, dates, indexability flags and minimum count.
- `COUNTRY_LANDING_PAGE_WORKFLOW.md` documents how to add future destinations without changing routing or sitemap code.

## Initial 40 destinations

Pakistan, Sri Lanka, Bangladesh, United Arab Emirates, Oman, Qatar, Bahrain, Saudi Arabia, Kenya, Tanzania, Uganda, Zambia, Malawi, Mozambique, Zimbabwe, Botswana, Namibia, South Africa, Ghana, Nigeria, Senegal, The Gambia, Sierra Leone, Liberia, Mauritius, Seychelles, Madagascar, Fiji, Papua New Guinea, Solomon Islands, Vanuatu, New Zealand, Australia, Jamaica, Guyana, Trinidad and Tobago, Barbados, Cameroon, Lesotho and The Bahamas.

## Accuracy safeguards

- The pages are destination planning guides, not a claim that Wazir Trading has a local office or confirmed shipping/carrier service in every country.
- Each page directs buyers to official source material and tells them to verify current eligibility, duty, tax, permits and destination charges before purchase.
- A vehicle-specific export route and service availability must be confirmed in writing for each enquiry.
- The `indexable` flag controls publication/indexing. Keep it false for a destination until the guide is sufficiently reviewed and the business approves enquiries for that market.
- Country-specific laws change. `reviewedOn` must be updated only after the linked sources and copy are rechecked.

## Design protection

No CSS, global style tokens, image assets, logo, fonts, existing page layout or existing page visual components were changed. The country pages reuse the existing brand palette and utility classes. The only existing component change is one footer navigation link to the new country directory.

## Validation

- Country registry validation: 40 unique records passed, each with at least two HTTPS source links and required content fields.
- TypeScript/TSX transpile syntax: 104 source files, zero syntax diagnostics.
- Full `npm run typecheck`, `npm run lint` and `npm run build`: not completed in this environment because `npm ci` timed out while installing dependencies. Run them locally before deployment.
- Live HTML, sitemap, canonical, robots and Google Search Console verification remain production checks.

## Commands

```powershell
npm install
npm run validate:country-pages
npm run typecheck
npm run lint
npm run build
```

After successful checks, commit and push the changed files from the existing repository. Do not commit `.env` or real credentials.
