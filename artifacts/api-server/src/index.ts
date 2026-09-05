import app from "./app.js";
import { logger } from "./lib/logger.js";

// Export the Express app for serverless platforms (Vercel). When running
// in a normal Node process (local dev or Docker) the server should still
// listen on the configured port. On Vercel the runtime will import this
// module and use the exported app as the request handler, so we must avoid
// calling `app.listen()` when `VERCEL` is set.

export default app;

const isVercel = typeof process.env.VERCEL !== 'undefined' && process.env.VERCEL !== 'false';
if (!isVercel) {
  const PORT = parseInt(process.env.PORT ?? "8080", 10);
  app.listen(PORT, "0.0.0.0", () => {
    logger.info({ port: PORT }, "API server listening");
  });
}
