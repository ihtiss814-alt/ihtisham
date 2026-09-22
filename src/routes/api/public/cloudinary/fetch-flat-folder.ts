import { createFileRoute } from "@tanstack/react-router";
import {
  errorResponse,
  getCloudinaryConfig,
  notConfigured,
  searchResources,
} from "@/lib/cloudinary.server";

export const Route = createFileRoute("/api/public/cloudinary/fetch-flat-folder")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const cfg = getCloudinaryConfig();
        if (!cfg) return notConfigured();
        try {
          const url = new URL(request.url);
          const nextCursor = url.searchParams.get("next_cursor") ?? undefined;
          // Every image in the account: assets live both at the root and under
          // the wazir-trading folder, so the sync must not filter by folder.
          const { resources, next_cursor } = await searchResources(
            cfg,
            `resource_type:image`,
            nextCursor,
          );
          return Response.json({
            resources: resources.map((r) => ({
              public_id: r.public_id,
              secure_url: r.secure_url,
            })),
            next_cursor,
          });
        } catch (err) {
          return errorResponse(err);
        }
      },
    },
  },
});
