# Destination, inquiry and customer journey workflow

## Purpose

This workflow connects inventory discovery, manufacturer/model research, destination planning, shipping-rate checks and customer enquiries. It aims to help buyers understand what to do next without implying that a country, route, vehicle or price is automatically available.

## Destination selection

- The country selector contains a global country and territory list. Inclusion means only that a visitor can describe their intended destination; it is not a list of Wazir Trading service locations.
- A preferred seaport, border crossing or final city is free text. Static port suggestions are convenience hints, not a shipping network or confirmation of carrier service.
- The optional country/port preference is stored locally on the visitor's device only. It is not customer identity data and is not submitted until the visitor sends an enquiry.
- Country aliases normalize known naming differences to the database keys used by existing route-rate records.

## Shipping calculator rules

- A displayed rate must come from an exact country + port row in the existing `shipping_rates` table.
- Freight, inspection and insurance fields must be numeric and non-negative before use.
- If no exact valid rate exists, show a request-a-quote action. Never use a guessed, regional, neighboring-port or generic freight figure as a substitute.
- A recorded export subtotal is not a delivered, duty-paid or tax-inclusive price. Clearly identify the included rate components and state that destination customs duties, taxes, clearance, terminal/port fees, storage, registration and inland transport are excluded unless the written quotation expressly includes them.
- A route rate is not evidence that a carrier booking is currently open. Confirm validity, sailing, method, dimensions and availability in the written vehicle-specific quotation.

## Enquiries

- `/request-a-quote` is the main guided entry point for a specific vehicle, sourcing request, shipping-only enquiry or general question.
- Internal links may prefill destination, port/city, vehicle reference, make/model and request type. Visitors can edit all prefilled fields.
- The form writes only the existing inquiry field names already used by website forms. It must not claim to reserve stock, issue an import permit, create a purchase contract or guarantee a reply time.
- Keep the customer's destination and vehicle context with the inquiry. Do not open a second WhatsApp tab automatically after an asynchronous form submission; offer an explicit WhatsApp follow-up after saving.
- Contact remains available for general communication. Use the guided quote page for requests that need vehicle and destination detail.

## Internal linking

- Main navigation and footer connect the primary hubs: inventory, make/model guides, destination import guides, how it works, shipping information, buyer information, FAQs and quote request.
- Manufacturer/model pages link naturally to matching inventory and relevant parent/child guides. Country pages link to destination context and quote requests with the country prefilled.
- Use descriptive, human-readable anchor text that tells buyers where the link goes. Avoid repeated keyword-heavy anchors, hidden links, generated link lists with no user value or cross-product/country doorway pages.
- Search-indexable country/make/model pages retain their existing canonical paths, live inventory requirements and indexation safeguards. Query-filtered URLs must not become new indexable landing-page variants.

## Content and trust

- Distinguish facts from suggestions, estimates, unknowns and buyer responsibilities.
- Vehicle details and stock status must remain sourced from the live vehicle record.
- Do not invent current stock, price, freight, service areas, import eligibility, regulatory approval, delivery time, carrier space or included costs.
- Country import guides are informational starting points, not tax, customs or legal advice. Direct buyers to the relevant official authority for current vehicle-specific rules.
- Written quotes should state currency, vehicle reference, named route, quotation validity, included and excluded items, payment milestones, documents and any buyer-side costs.

## Validation

Run:

```bash
npm run validate:destination-journey
npm run typecheck
npm run lint
npm run validate:country-pages
npm run validate:vehicle-pages
npm run build
```

The destination journey validator checks route wiring, global country coverage, exact rate lookup, calculator fallback behavior, saved preferences, page metadata, sitemap inclusion and key customer navigation paths.
