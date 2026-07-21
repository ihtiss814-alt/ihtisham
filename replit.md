# Wazir Trading LLC

A Japanese used car export website for Wazir Trading LLC — a company that sources vehicles directly from Japan auctions and exports worldwide.

## Project Structure

This is a pnpm monorepo with:
- `artifacts/wazir-trading/` — React + Vite frontend (main website)
- `artifacts/api-server/` — Express API server (backend)
- `artifacts/mockup-sandbox/` — Canvas/design preview server
- `lib/api-client-react/` — Generated API client
- `lib/api-spec/` — OpenAPI spec
- `lib/api-zod/` — Zod schemas

## Running the Project

The main website runs via the configured workflow:
```
pnpm --filter @workspace/wazir-trading run dev
```

The API server runs via:
```
pnpm --filter @workspace/api-server run dev
```

Install dependencies:
```
pnpm install
```

## Tech Stack

- **Frontend**: React 19, Vite 7, TypeScript, Tailwind CSS v4, shadcn/ui, Wouter (routing), TanStack Query, Framer Motion
- **Backend**: Express 5, TypeScript, Pino (logging)
- **Database**: Supabase (PostgreSQL) — connection via `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- **Images**: Cloudinary (`VITE_CLOUDINARY_CLOUD_NAME`)

## Environment Variables / Secrets

- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Supabase anonymous key
- `VITE_WHATSAPP_NUMBER` — WhatsApp contact number (default: 818089227375)
- `VITE_CLOUDINARY_CLOUD_NAME` — Cloudinary cloud name (default: txb1wiw1)
- `SESSION_SECRET` — Session secret for API server

## Key Pages

- `/` — Home page
- `/cars` — Car inventory with Supabase-connected filters, search, pagination
- `/cars/:ref` — Car detail page
- `/about` — About page
- `/how-it-works` — How It Works page
- `/contact` — Contact page

## Database Tables (Supabase)

- `cars` — Vehicle inventory
- `car_images` — Vehicle images (columns: id, car_id, url, sort_order)
- `inquiries` — Customer inquiries
- `shipping_rates` — Freight rates by country/port (columns: country, port, freight_usd, inspection_fee, insurance_rate)
- `exchange_rates` — Currency exchange rates (columns: currency, rate)

## User Preferences

- Keep the existing design language (dark navy + red accent color scheme)
- Maintain the pnpm workspace structure
