import { createFileRoute } from "@tanstack/react-router";
import {
  ROOT_FOLDER,
  errorResponse,
  getCloudinaryConfig,
  notConfigured,
  searchResources,
} from "@/lib/cloudinary.server";

export const Route = createFileRoute(
  "/api/public/cloudinary/resources/$dateFolder/$subfolder",
)({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const cfg = getCloudinaryConfig();
        if (!cfg) return notConfigured();
        try {
          const folder = `${ROOT_FOLDER}/${params.dateFolder}/${params.subfolder}`.replace(
            /"/g,
            "",
          );
          const { resources } = await searchResources(cfg, `folder="${folder}"`);
          return Response.json({
            resources: resources.map((r) => ({
              public_id: r.public_id,
              secure_url: r.secure_url,
            })),
          });
        } catch (err) {
          return errorResponse(err);
        }
      },
    },
  },
});
