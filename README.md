# Wazir Trading LLC — Existing Website

This repository contains the existing **TanStack Start + React + Wouter + Supabase** Wazir Trading LLC website. The SEO implementation is integrated into the existing application; this is not a separate Next.js rebuild.

## Development

Requirements: Node.js 22 or later and npm.

```sh
npm ci
npm run dev
```

## SEO validation and production checks

Run these commands from the project root:

```sh
npm run validate:country-pages
npm run validate:vehicle-pages
npm run typecheck
npm run lint
npm run build
```

The country validator checks the 40-country registry. The vehicle validator checks the manufacturer, model, and body-style page registries, taxonomy integration, route registration, indexation policy, and structured data.

## Important deployment notes

- Configure the real environment variables in your hosting provider. `.env.example` contains placeholders only.
- Never commit `.env`, Supabase service-role credentials, Cloudinary secrets, or other private keys.
- Preserve the existing `.git` directory when applying a source ZIP over an existing checkout.
- Vehicle guide indexation is inventory-dependent. A guide page is eligible for indexing only after the configured minimum of three qualifying available vehicles is met.
- Review the country service coverage and current destination import requirements before launch; page presence does not itself promise service availability or import eligibility.
