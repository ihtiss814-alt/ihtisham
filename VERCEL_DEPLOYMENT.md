# Vercel deployment notes

This repository contains two Vercel projects:

- `artifacts/wazir-trading` — frontend
- `artifacts/api-server` — API

## API project

Set the Vercel Root Directory to `artifacts/api-server`.

Required server-only environment variables:

- `ADMIN_PASSWORD`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

The API function intentionally does **not** declare a legacy/custom `runtime` in
`vercel.json`. Node.js 24 is selected through the package `engines` field.

## Frontend project

Set the Vercel Root Directory to `artifacts/wazir-trading`.

Required environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

`VITE_CLOUDINARY_CLOUD_NAME` is optional. The admin tool now receives the public Cloudinary cloud name from the authenticated API, so it does not need a separate frontend Cloudinary variable.

Keep the Cloudinary API key/secret and `ADMIN_PASSWORD` out of the frontend project.

After changing environment variables, create a new deployment so the new values
are used by the build.

## Expected API endpoint

The health endpoint is:

`/api/healthz`

The admin Cloudinary tool uses:

`/api/admin/cloudinary/*`

The frontend already rewrites `/api/*` to the API Vercel project.
