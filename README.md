# Wazir Trading LLC

Production-oriented React/Vite website and Express API for Wazir Trading LLC, a Japanese used-car export business.

This README is the short handoff for a fresh Replit import. Read the **Quick start** first; the rest documents the backend and the external services so another agent does not need to rediscover the project.

## Quick start

### Replit

1. Import this repository into Replit.
2. Add the environment variables in [Configuration](#configuration) if the live inventory, inquiry form, or admin uploader is needed.
3. Press **Run**. The checked-in `Project` workflow starts both services:
   - Website: port `5000`
   - API: port `8080`
4. Open the website preview at `/`.

The public pages can render without environment variables during development, but the production build intentionally requires Supabase access so it can generate complete inventory-backed vehicle pages and sitemaps. Live cars, inquiries, shipping rates, and the admin uploader also require the connected services described below.

### Local terminal

```bash
pnpm install

# Terminal 1: website
pnpm dev

# Terminal 2: API used by /admin/bulk-upload
pnpm dev:api
```

The website is available at `http://localhost:5000`. The API health check is `http://localhost:8080/api/healthz`.

## Project layout

Only the packages needed by the running product are kept in this repository:

```text
artifacts/
  wazir-trading/       React/Vite website and admin UI
  api-server/          Express API for Cloudinary admin operations
lib/
  api-zod/             Shared health-check response schema
public assets/         artifacts/wazir-trading/public/
.replit                Replit modules, ports, and two-service workflow
pnpm-workspace.yaml    Minimal pnpm workspace
```

The removed imported reference material and unused generated packages are not part of the runtime. Do not restore them unless a new feature explicitly needs them.

## Architecture

### Website

- React 19, TypeScript, Vite, Tailwind CSS v4
- Wouter routes are defined in `artifacts/wazir-trading/src/App.tsx`
- Vite serves the app on port `5000`
- `/api/*` is proxied to `http://localhost:8080` during development
- Static assets live in `artifacts/wazir-trading/public/`
- `pnpm --filter @workspace/wazir-trading run build` builds the bundle, generates inventory-backed vehicle HTML, and writes paginated sitemaps to `artifacts/wazir-trading/dist/`

Main routes:

| Route | Purpose |
| --- | --- |
| `/` | Homepage and featured inventory |
| `/cars` | Searchable inventory |
| `/cars/:ref` | Vehicle detail page |
| `/about` | Company information |
| `/how-it-works` | Buying process |
| `/shipping-information` | Shipping details |
| `/payment-information` | Payment details |
| `/contact` | Inquiry form |
| `/faqs` | Frequently asked questions |
| `/admin/bulk-upload` | Protected inventory/image management UI |

### API server

The API is an Express 5 server in `artifacts/api-server/`. It listens on `PORT` and defaults to `8080`.

Health endpoint:

```text
GET /api/healthz
GET /healthz
```

The second form exists for deployments that strip the `/api` prefix. The local Vite proxy forwards `/api/*` without rewriting it.

Cloudinary admin endpoints are available under `/api/admin/cloudinary/*`:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/admin/cloudinary/folders/:dateFolder` | List dated upload folders |
| GET | `/api/admin/cloudinary/resources/:dateFolder/:subfolder` | List images in a dated subfolder |
| POST | `/api/admin/cloudinary/search-by-chassis` | Find images for a chassis number |
| GET | `/api/admin/cloudinary/fetch-flat-folder` | Paginated image listing for `wazir-trading/` |
| POST | `/api/admin/cloudinary/upload` | Server-signed image upload |

Admin requests must include the `X-Admin-Password` header. Cloudinary API credentials are read only by the server and are never sent to the browser.

### Supabase data layer

The browser uses the Supabase client directly with the public anon key. The app expects these tables:

- `cars` — vehicle inventory, filtering, detail pages, and admin CRUD
- `car_images` — vehicle image URLs, primary-image state, and display order
- `shipping_rates` — destination shipping-rate lookup
- `inquiries` — contact and vehicle inquiry submissions

The frontend intentionally does not require Supabase at build time. Without valid Supabase variables, the site still starts, while live database operations return no live inventory or a form error.

## Configuration

Set these in Replit **Secrets** or environment variables. Never commit values or put secrets in this README.

### New Replit clone checklist

GitHub clones include source code and the lockfile, but they do **not** include Replit Secrets. This is intentional: secrets must not travel with a public repository. For every new Replit account:

1. Import the repository.
2. Open **Tools → Secrets** and add the variables listed below. Use the exact spelling and capitalization.
3. Set both `VITE_CLOUDINARY_CLOUD_NAME` and `CLOUDINARY_CLOUD_NAME` to the same Cloudinary cloud.
4. Keep the Supabase service-role key and Supabase dashboard password out of Git and out of all `VITE_*` variables. This code does not use either one.
5. Press **Run**. The checked-in `Project` workflow installs/uses the workspace lockfile and starts the website and API.

The repository includes `.env.example` only as a names-and-comments template. It contains no credentials and is not a replacement for Replit Secrets.

### Frontend variables

| Variable | Required for | Notes |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Live inventory, inquiries, shipping rates, admin database actions | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Same Supabase features | Supabase public anon key |
| `VITE_WHATSAPP_NUMBER` | Custom WhatsApp links | Digits only, including country code |
| `VITE_CLOUDINARY_CLOUD_NAME` | Admin Cloudinary UI | Cloudinary cloud name used by the browser-side unsigned upload |

Vite exposes `VITE_*` variables to the browser. Only use public values there; never put a Supabase service-role key, Cloudinary API secret, or admin-only credential in a `VITE_*` variable.

### Server variables

| Variable | Required for | Notes |
| --- | --- | --- |
| `PORT` | API process | Defaults to `8080`; the Replit workflow sets it explicitly |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary admin routes | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary admin routes | Server-only Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary admin routes | Server-only Cloudinary API secret |
| `ADMIN_PASSWORD` | Admin API authentication | Set a strong value before exposing the admin route |

Cloudinary listing and upload endpoints return a configuration error until both `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` are present. The server reads these values at request time, so restarting after changing them is recommended.

The current admin page sends its password in the `X-Admin-Password` header. Set `ADMIN_PASSWORD` to the value used by the admin page before using `/admin/bulk-upload`; this is an operational gate, not full user authentication.

## Admin uploader

Open `/admin/bulk-upload`. The browser-side gate and API header must use the same admin password. The uploader:

1. Reads inventory spreadsheets (`.xlsx`/`.xls`) with the `xlsx` package.
2. Can inspect ZIP image batches with `jszip`.
3. Uses the API server for Cloudinary listing, search, and signed uploads.
4. Writes vehicle rows and image metadata to Supabase.

This is an operational admin tool, not a replacement for user authentication. Restrict access to the route and set a strong password and Cloudinary credentials before production use.

## Commands

```bash
# Install from the committed lockfile
pnpm install --frozen-lockfile

# Start the website on port 5000
pnpm dev

# Start the API on port 8080
pnpm dev:api

# Type-check shared libraries and artifacts
pnpm typecheck

# Build the API and static website
pnpm build
```

The website build requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. It fails loudly when inventory cannot be read instead of publishing an incomplete sitemap. The generator paginates Supabase reads, creates static HTML at `/cars/{ref_number}`, excludes sold vehicles from the sitemap, and gives sold records `noindex` pages when they are present in the database. Vehicle eligibility is shared by the React app and generator: a record needs a valid reference, make, model, year, available status, meaningful specifications, and at least one usable image.

The production SEO generator also validates generated metadata, one-primary-heading structure, vehicle structured data, crawlable related-vehicle links, sitemap eligibility, and obvious broken internal links. Vehicle pages are considered discoverable through the crawlable `/cars` pagination path; the validator documents that the SPA shell itself does not contain runtime inventory links. Run `pnpm --filter @workspace/wazir-trading run build` with the real Supabase variables to execute the complete inventory-backed check.

The production Vercel routes serve generated vehicle files before the SPA fallback, return a real 404 for unknown vehicle and application paths, and add `X-Robots-Tag: noindex` to admin paths. Filtered `/cars` URLs keep their UX but are marked `noindex`; pagination remains available through real anchor links.

## Replit handoff notes

- Use **pnpm**, not npm or yarn. The lockfile is `pnpm-lock.yaml`.
- The main Run button is the `Project` workflow in `.replit`; keep both `Start application` and `Start backend`.
- Port `5000` is the web preview port. Port `8080` is the internal API port.
- Use relative `/api/...` URLs in frontend code. Do not hardcode `localhost` in browser code.
- If the preview is blank, check the `Start application` logs first, then verify the API workflow if the page is using admin or database features.
- If package files change, run `pnpm install --frozen-lockfile` or regenerate the lockfile before building.