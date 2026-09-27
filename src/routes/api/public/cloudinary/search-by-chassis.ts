import { createFileRoute } from "@tanstack/react-router";
import {
  ROOT_FOLDER,
  errorResponse,
  getCloudinaryConfig,
  notConfigured,
  searchResources,
} from "@/lib/cloudinary.server";

export const Route = createFileRoute("/api/public/cloudinary/search-by-chassis")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const cfg = getCloudinaryConfig();
        if (!cfg) return notConfigured();
        try {
          const body = (await request.json().catch(() => ({}))) as {
            chassis_number?: string;
          };
          const chassis = (body.chassis_number ?? "").toString().trim();
          if (!chassis) {
            return Response.json({ error: "chassis_number is required." }, { status: 400 });
          }
          const safe = chassis.replace(/"/g, "");
          const { resources } = await searchResources(
            cfg,
            `resource_type:image AND (public_id:${safe}* OR public_id:${ROOT_FOLDER}/${safe}*)`,
          );
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
