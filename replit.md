# Wazir Trading LLC

A premium Japanese used-car export website built with React + Vite + Supabase.

## Stack

- **Frontend**: React 19, TypeScript, Vite 7, Tailwind CSS v4, Wouter (routing), Framer Motion
- **Backend/Data**: Supabase (PostgreSQL) — cars, shipping rates, exchange rates
- **Images**: Cloudinary (`txb1wiw1`) — `f_auto,q_auto,w_600` transformations on car photos
- **Deployment**: Vercel at **https://wazirtradingllc.com**
- **Monorepo**: pnpm workspace — artifact lives at `artifacts/wazir-trading/`

## Running locally on Replit

Two workflows run in parallel:

| Workflow | Command | Port |
|---|---|---|
| `artifacts/wazir-trading: web` | `pnpm --filter @workspace/wazir-trading run dev` | 24102 |
| `artifacts/api-server: API Server` | `pnpm --filter @workspace/api-server run dev` | 8080 |

The frontend is available in the Replit preview pane (port 24102).  
The Vite dev server proxies `/api/*` → `http://localhost:8080/*` so the admin panel's Cloudinary endpoints work in development.

### API server notes
- `artifacts/api-server/build.mjs` bundles the server with esbuild before starting.  
  Required devDeps: `esbuild`, `esbuild-plugin-pino`, `pino-pretty`, `thread-stream`.
- Workspace packages (`@workspace/api-zod` etc.) are resolved via `alias` in `build.mjs`
  since they export TypeScript source directly (no compiled dist).

## Environment variables (already set in Replit)

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for car images |
| `VITE_WHATSAPP_NUMBER` | WhatsApp business number |

## Key pages

| Route | File |
|---|---|
| `/` | `src/pages/home.tsx` |
| `/cars` | `src/pages/cars.tsx` |
| `/cars/:ref` | `src/pages/car-detail.tsx` |
| `/about` | `src/pages/about.tsx` |
| `/contact` | `src/pages/contact.tsx` |
| `/how-it-works` | `src/pages/how-it-works.tsx` |
| `/shipping-information` | `src/pages/shipping-information.tsx` |
| `/payment-information` | `src/pages/payment-information.tsx` |
| `/faqs` | `src/pages/faqs.tsx` |
| `/admin/bulk-upload` | `src/pages/admin/bulk-upload.tsx` (**secret, no public link**) |

## Admin panel (`/admin/bulk-upload`)

Password-protected admin tool (session: 24 h, stored in `localStorage`). No link from the public site.

Features:
1. **CSV/Excel Upload** — parse columns 3-23 from auction sheets, preview parsed data, confirm-insert to `cars` table
2. **Image Matching** — enter Cloudinary date folder (e.g. `23-july-2026`), auto-match subfolders by `chassis_number`, insert into `car_images` table (primary = `_01a`, last = `_map` with `display_order 99`)
3. **Review Dashboard** — list all cars with image counts (✅/❌), featured toggle, bulk delete, export to XLSX

Additional env vars needed for Image Matching:

| Variable | Purpose |
|---|---|
| `VITE_CLOUDINARY_API_KEY` | Cloudinary API key (for admin folder listing) |
| `VITE_CLOUDINARY_API_SECRET` | Cloudinary API secret (for admin folder listing) |

## Performance approach

- All JS/CSS chunks are content-hashed → Vercel serves them with `Cache-Control: immutable` (1 year)
- Lazy-loaded page routes — only the current page's code is downloaded
- Cloudinary `f_auto,q_auto` delivers WebP/AVIF automatically
- Non-blocking Google Fonts via `media="print"` trick + `display=swap`
- Hero image preloaded with `fetchpriority="high"` in `<head>`
- Supabase preconnect in `<head>` — DNS/TLS resolved before JS runs
- Code-split vendor chunks: framer-motion, supabase, radix-ui separated for long-term caching

## User preferences

- Keep the existing project structure — do not migrate or restructure
- Production domain is **wazirtradingllc.com** — use it for canonical URLs, OG tags, and sitemap
