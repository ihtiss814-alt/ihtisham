# API Vercel deployment

The API intentionally has no `vercel.json` runtime/functions override. Vercel should auto-detect `api/[...path].ts` as the serverless function.

Set the API Vercel project Root Directory to `artifacts/api-server` and Node.js Version to 24.x.

Required API environment variables:
- ADMIN_PASSWORD
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
