# Wazir Trading LLC — Performance Edition

This branch preserves the current TanStack Start + Wouter + Supabase architecture, visual design, public routes, SEO work and live inventory source of truth.

## Included changes
- Shared, short-lived in-tab request cache with concurrent-request deduplication.
- Homepage and navbar use one shared live stock-count request.
- Vehicle detail reads and related-vehicle lookups are cached; detail prefetch helper is available.
- Inventory result pages can be prefetched before navigation; list results are cached for 25 seconds.
- Exact-count inventory queries select only the id column.
- Published shipping rates are cached for five minutes without inventing fallback prices.
- Japan clock refreshes once per minute instead of every second.
- Common font, flag, Unsplash and configured Supabase hosts are preconnected.
- Browser history scroll restoration and hover/focus prefetch for inventory and vehicle-detail links.
- Vehicle detail visual design and existing SEO routes are preserved.

The cache is memory-only and clears on reload/tab close. The workflow validates TypeScript, lint, SEO validators, detail validator and production build before creating the full tracked-source ZIP. It excludes node_modules, .git, local environment files and generated build output.
