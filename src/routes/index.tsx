import { createFileRoute } from "@tanstack/react-router";
import WazirApp from "../components/WazirApp";
import { buildSeoHead, loadSeoBootstrap } from "../lib/seo-bootstrap";

export const Route = createFileRoute("/")({
  loader: () => loadSeoBootstrap("/", ""),
  head: ({ loaderData }) => ({
    ...buildSeoHead(loaderData),
  }),
  component: Index,
});

function Index() {
  const bootstrap = Route.useLoaderData();
  return <WazirApp ssrPath="/" bootstrap={bootstrap} />;
}
