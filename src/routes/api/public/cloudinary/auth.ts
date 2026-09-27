import { createFileRoute } from "@tanstack/react-router";
import { getCloudinaryConfig, notConfigured } from "@/lib/cloudinary.server";

export const Route = createFileRoute("/api/public/cloudinary/auth")({
  server: {
    handlers: {
      GET: async () => {
        const cfg = getCloudinaryConfig();
        if (!cfg) return notConfigured();
        return Response.json({ ok: true, cloud_name: cfg.cloudName });
      },
    },
  },
});
