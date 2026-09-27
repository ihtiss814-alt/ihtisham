import { useEffect, useState } from "react";
import App from "../App";

/**
 * The Wazir Trading site is a client-side app (wouter router, browser-only
 * data fetching). Render it only after hydration so TanStack's SSR never
 * evaluates browser-dependent code.
 */
export default function WazirApp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <App />;
}
