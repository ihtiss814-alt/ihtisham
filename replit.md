# Replit run notes

This repository is a pnpm workspace with two services:

- `Start application`: `pnpm --filter @workspace/wazir-trading run dev` on port `5000`
- `Start backend`: `PORT=8080 pnpm --filter @workspace/api-server run dev` on port `8080`

The main Run button uses the `Project` workflow, which starts both services in
parallel. If the imported project reports `vite: not found` or cannot resolve
`esbuild`, install the committed dependencies with:

```bash
pnpm install --frozen-lockfile
```

The checked-in workflows call `scripts/ensure-dependencies.sh` before starting
either service. The package-level `dev` commands also call the same bootstrap,
so automatically generated artifact workflows are safe on a fresh import too.
On a fresh import it installs the committed lockfile once, coordinates the
parallel service startup, and then launches the website and API automatically.

The website can render its public pages without external service credentials in
development. The production website build requires Supabase variables so the
inventory-backed vehicle HTML and paginated sitemap cannot silently be
published incomplete. Supabase and Cloudinary variables are also needed for
live inventory, inquiries, shipping rates, and admin upload features; see
`.env.example` and `README.md`.