import app from '../dist/index.mjs';

// Re-export the Express app as the default export for Vercel serverless
// functions. Vercel will call the exported function/object as the request
// handler. The built `dist/index.mjs` exports the `app` (see src/index.ts).

export default app;
