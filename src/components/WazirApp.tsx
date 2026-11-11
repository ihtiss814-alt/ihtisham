import App from "../App";
import { SeoBootstrapProvider } from "../lib/seo-bootstrap-context";
import type { SeoBootstrapData } from "../lib/seo-bootstrap";

/**
 * Render the existing Wouter application during the TanStack Start request.
 * Wouter's ssrPath makes its route matching use the incoming request path on
 * the server and the browser location during hydration.
 */
export default function WazirApp({
  ssrPath,
  bootstrap,
}: {
  ssrPath: string;
  bootstrap: SeoBootstrapData | null;
}) {
  return (
    <SeoBootstrapProvider value={bootstrap}>
      <App ssrPath={ssrPath} />
    </SeoBootstrapProvider>
  );
}
