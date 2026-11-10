# Wazir Trading — Phase 2 completion handoff

## Scope

This is Phase 2 of the SEO and buyer-trust roadmap for the **existing TanStack Start + React + Wouter + Supabase website**. It is not the separate Next.js rebuild.

The objective was to make the current buying journey clearer and safer for an international buyer while preserving the established visual design. This phase does not implement country, make, model, category or editorial SEO hubs; those belong to later roadmap phases.

## Implemented

### Homepage and buyer journey
- Clarified the homepage hero message to **“Japanese Used Cars / For Export from Japan”** and changed the CTA to **“Browse Available Cars”**. Existing structure, class names and visual layout are unchanged.
- Replaced unsupported trust-strip promises with transaction-based statements about written payment instructions, documents, shipping information and current listings.
- Adjusted destination enquiry and vehicle-request wording so submitting a request does not imply a vehicle reservation, auction access or guaranteed availability.
- Added a clear link to buyer information/privacy guidance near the relevant enquiry journey.

### Vehicle listing lifecycle and price clarity
- Available vehicles can show the current listed FOB price when a positive FOB amount exists, with a reminder to confirm it in the written quotation.
- Sold or unavailable listings do not display a stale historic FOB price as a current offer.
- Sold/unavailable pages direct visitors to similar currently available stock.
- The export-cost calculator is shown only for an available listing with a positive FOB price.
- The result is labelled an **estimated export subtotal**, not a guaranteed delivered or fully landed price. The interface explains that destination duty, taxes, customs clearance, port/terminal charges, registration, storage and inland delivery are excluded unless the written quote expressly includes them.
- Vehicle photo captions no longer imply that every image represents an independent inspection.
- Enquiry actions distinguish current available stock from requests for similar vehicles.

### Shipping and payment transparency
- Removed the old schedule presentation that used month/day values without a year and described the schedule as live/regularly updated.
- Shipping information now explains Ro-Ro and container options, the quote items buyers should check, possible documents, and destination-side costs. It explicitly says that routes, ports, carrier, schedule and final costs are confirmed for the specific booking.
- Payment page labels the published bank details as reference information. Buyers are told to compare them against the current Proforma Invoice/agreement and independently verify beneficiary/account details before every transfer.
- Payment copy avoids asserting a universal deposit split, refund outcome or intermediary rule unless stated in transaction-specific documents.

### Business and policy pages
- Reconciled About-page wording to describe the Japan business base and transaction-level confirmation rather than implying unverified overseas offices or universal operating coverage.
- Added `/buyer-information` with a practical pre-purchase checklist.
- Added `/terms-and-conditions` with general website/listing, quote, payment, shipping, import, document and cancellation principles. The signed transaction documents remain controlling for the actual order, subject to mandatory law.
- Added `/privacy-policy` describing the website enquiry and service-provider context without inventing an unsupported retention schedule.
- Registered the new pages in the existing Wouter route tree, SEO bootstrap and dynamic sitemap.
- Updated footer links so visitors can find the buyer/policy information.

## Design preservation

No redesign was performed. Compared with the Phase 1 baseline, these files were confirmed unchanged:
- `src/styles.css`
- `src/pages/cars.css`
- `src/pages/car-detail.css`
- `public/logo.webp`
- `public/logo-small.png`
- `public/og-image.jpg`

The homepage hero text changes only; it retains its existing element structure and CSS classes. New policy pages use the existing site's typography, colours and layout conventions.

## Source validation completed in this environment

- Parsed all 102 TypeScript/TSX/JS source files with the TypeScript parser: **zero syntax parse errors**.
- Checked local imports in every Phase 2 changed/new source file: **zero unresolved local imports**.
- Confirmed no `.env`, `.env.local`, service-role key file or other real environment credential file is included in the project bundle.
- Confirmed the visual CSS and brand assets listed above are byte-for-byte unchanged.

A full dependency-based typecheck, lint and production build were **not run in this environment** because `node_modules` is not installed here. Run the commands below on the local project before committing/deploying.

## Owner verification required before production

Code cannot establish these business facts. The owner should verify them against current company documents and real operating procedures before publishing/accepting orders:

1. **Business identity and address:** confirm the legal entity name and the published Kuwana, Mie, Japan address.
2. **Contact details:** confirm the published phone/WhatsApp number, email address and business hours/time zone.
3. **CEO identity/photo:** confirm the name, title, portrait and consent to publish.
4. **Bank information:** the payment page retains bank details from the existing site and marks them as reference only. Verify every bank name, branch, beneficiary, account number, SWIFT code and bank address with the bank/current company documents. Remove or correct any field that is not current before launch. Never rely on the website alone to initiate a transfer.
5. **Payment process:** verify the TT procedure, currencies, beneficiary and invoice workflow. Deposit/balance amounts must be stated only in the vehicle-specific invoice/agreement.
6. **Shipping scope:** verify which Ro-Ro/container routes, ports and destinations are currently serviceable. The website deliberately avoids promising universal coverage or a live timetable.
7. **Documents and inspection:** confirm which export documents and inspection records can actually be supplied per transaction. Do not imply every vehicle has an auction sheet or independent inspection.
8. **Privacy and terms:** have qualified counsel review the new Privacy Policy and Terms & Conditions for the business's actual processing, Japan-law obligations and target markets. These are website drafts, not legal advice.
9. **Operational photography:** genuine office/team, stock, inspection and port/loading images were not supplied. Existing imagery was retained; replace stock photography only with authentic company-approved assets. Do not use generated imagery as evidence of real operations.

## Local verification commands

From the project root:

```powershell
npm install
npm run typecheck
npm run lint
npm run build
```

After a successful build, test these routes locally and then on the production domain:

- `/`
- `/cars`
- `/cars?make=Toyota` (must be noindex with clean `/cars` canonical)
- `/cars/{real-available-reference}`
- `/cars/{real-sold-reference}` (if a sold record exists)
- `/about`
- `/how-it-works`
- `/shipping-information`
- `/payment-information`
- `/buyer-information`
- `/terms-and-conditions`
- `/privacy-policy`
- `/faqs`
- `/contact`
- `/robots.txt`
- `/sitemap.xml`
- `/this-url-should-not-exist` (must return an actual 404 response)

Inspect the initial HTML (View Source or `curl -L`) for real page copy, title, description, canonical and JSON-LD. Verify the sitemap contains only canonical, eligible URLs. Then verify the live sitemap in Google Search Console.

## Not included in Phase 2

- Country landing-page programme.
- Make/model/category SEO landing pages.
- Large editorial buyer-guide programme.
- International hreflang/localization.
- Backlink/digital PR programme.
- Search Console account verification, indexing submissions or analytics conversion configuration.

Those are later phases and are intentionally not added here.
