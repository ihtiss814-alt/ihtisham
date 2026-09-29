# Wazir Trading — Cloudinary Image Sync Fix

This build fixes the admin image-linking issue where Cloudinary images could exist but were not linked to a car because the filename and Supabase chassis number used different casing/separators or because the image sequence was stored as `_01`.

## What changed

- Chassis matching is normalized for case, spaces, hyphens, and underscores.
- Cloudinary filenames support both `-01` and `_01` image sequence formats.
- Cloudinary random suffixes such as `_abc123` are handled separately from numeric image sequences.
- Bulk image sync loads the car index once instead of querying Supabase once per chassis.
- Ambiguous duplicate chassis records are reported instead of guessing.
- The per-car **Sync** button falls back to the full Cloudinary inventory when the fast prefix search finds nothing.
- The sync result now reports how many matches required normalization.

## After deploying

Open `/admin/bulk-upload` → **Review Dashboard** → **Sync Images from Cloudinary**.

The sync is duplicate-safe, so running it again will not insert the same Cloudinary URLs twice.
