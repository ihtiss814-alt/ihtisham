# Wazir Trading LLC — Performance Edition

This edition preserves the existing TanStack Start + Wouter + Supabase architecture, visual identity, SEO routes, and live inventory source of truth.

## Navigation and data

- Internal page links use normal same-origin document navigation, with the browser providing its native loading/progress UI and loading the server-rendered destination page.
- New page visits begin at the top. Browser-managed Back/Forward behavior restores prior scroll positions when the browser supports it.
- Successful read requests share an in-tab cache and concurrent callers share the same in-flight request.
- Vehicle detail, related vehicles, inventory pages, filter metadata, tab counts, model options, homepage stock/category counts, featured vehicles, and published shipping rates are cached for short, explicit periods.
- The inventory list uses a public field allowlist instead of selecting every database column; chassis numbers are not fetched into public listing cards.
- Homepage stock counts and the persistent navigation header use the same available-stock count request.

## Homepage and images

- The first hero image is preloaded for the initial page render.
- Hero images use a 1920px, lower-quality CDN variant and load progressively; the page no longer preloads all six backgrounds immediately.
- Hero autoplay pauses in hidden tabs and respects reduced-motion preferences.
- Homepage make/body-type counts are deferred until their sections approach the viewport and cached for reuse.
- Featured vehicle records and their photo relation are fetched in one Supabase query.
- Vehicle cards and galleries use Cloudinary responsive candidates when the source is a Cloudinary image URL. Non-Cloudinary image URLs are left unchanged.
- Vehicle images reserve intrinsic dimensions to reduce layout movement.
- Public Vite assets, local manufacturer logos, body-style icons, and images have browser cache headers.

## Cache freshness

The request cache is memory-only and clears when a browser tab is closed or reloaded. Current TTLs: shared stock count 30 seconds; vehicle detail 45 seconds; homepage featured inventory 45 seconds; inventory page results 25 seconds; related vehicles 60 seconds; homepage category counts 90 seconds; inventory filter metadata/model options and published shipping rates five minutes. Failed reads are not cached.

## Verification

GitHub Actions runs TypeScript, ESLint, the country/vehicle SEO validators, the vehicle detail validator, performance regression guards, and the production build on both `main` and the performance completion branch. A full source ZIP is uploaded only after every validation and the build pass.
