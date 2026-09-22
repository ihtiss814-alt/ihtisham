import { createFileRoute } from "@tanstack/react-router";
import WazirApp from "../components/WazirApp";

// Catch-all: every site path (/cars, /about, /admin/...) is handled by the
// Wazir Trading app's own client-side router.
export const Route = createFileRoute("/$")({
  component: CatchAll,
});

function CatchAll() {
  return <WazirApp />;
}
