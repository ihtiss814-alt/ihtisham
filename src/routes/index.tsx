import { createFileRoute } from "@tanstack/react-router";
import WazirApp from "../components/WazirApp";
import { buildSeoHead, loadSeoBootstrap } from "../lib/seo-bootstrap";

export const Route = createFileRoute("/")({
  loader: () => loadSeoBootstrap("/", ""),
  head: ({ loaderData }) => {
    const seoHead = buildSeoHead(loaderData);
    return {
      ...seoHead,
      links: [
        ...(seoHead.links ?? []),
        {
          rel: "preload",
          as: "image",
          href: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80",
        },
      ],
    };
  },
  component: Index,
});

function Index() {
  const bootstrap = Route.useLoaderData();
  return <WazirApp ssrPath="/" bootstrap={bootstrap} />;
}
