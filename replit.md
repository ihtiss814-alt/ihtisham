# Wazir Trading LLC

A car trading and export website built with React + Vite and Supabase.

## Stack

- **Frontend**: React 19, Vite, TailwindCSS, shadcn/ui, Wouter (routing), TanStack Query
- **Backend/Data**: Supabase (cars inventory, inquiries, shipping rates)
- **API Server**: Express 5 (`artifacts/api-server`) — minimal, currently only a `/api/health` route

## Running the app

The frontend dev server starts automatically via the **`artifacts/wazir-trading: web`** workflow:

```
pnpm install --frozen-lockfile && PORT=24102 BASE_PATH=/ pnpm --filter @workspace/wazir-trading run dev
```

The app is served at `/` in the Replit preview.

## Environment variables

The frontend requires two Supabase env vars to load real data:

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `VITE_WHATSAPP_NUMBER` | WhatsApp contact number (optional — defaults to `818089227375`) |

Without Supabase credentials the app renders but data queries will fail silently.

## Project structure

```
artifacts/
  wazir-trading/     # React/Vite frontend (main app)
    src/
      pages/         # Route-level components (home, cars, car-detail, contact, …)
      components/    # Shared components (Navbar, Footer, CarCard, …)
      lib/           # supabase.ts client, utils
      hooks/         # useExchangeRate, etc.
  api-server/        # Express API server (minimal — /api/health only)
```

## User preferences
