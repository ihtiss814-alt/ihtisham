import { createFileRoute } from "@tanstack/react-router";
import WazirApp from "../components/WazirApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Japanese Used Cars for Export | Wazir Trading LLC" },
      {
        name: "description",
        content:
          "Wazir Trading LLC — Browse current Japanese used vehicle listings, review specifications and photos, and request export information.",
      },
      {
        property: "og:title",
        content: "Japanese Used Cars for Export | Wazir Trading LLC",
      },
      {
        property: "og:description",
        content:
          "Browse current Japanese used vehicle listings, review specifications and photos, and request export information.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content: "https://www.wazirtradingllc.com/og-image.jpg",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: "https://www.wazirtradingllc.com/og-image.jpg",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <WazirApp />;
}
