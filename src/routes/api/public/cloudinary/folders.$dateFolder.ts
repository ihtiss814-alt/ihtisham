import { createFileRoute } from "@tanstack/react-router";
import {
  ROOT_FOLDER,
  cloudinaryGet,
  errorResponse,
  getCloudinaryConfig,
  notConfigured,
} from "@/lib/cloudinary.server";

export const Route = createFileRoute("/api/public/cloudinary/folders/$dateFolder")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const cfg = getCloudinaryConfig();
        if (!cfg) return notConfigured();
        try {
          const data = (await cloudinaryGet(
            cfg,
            `folders/${ROOT_FOLDER}/${params.dateFolder}`,
          )) as { folders?: { name: string; path: string }[] };
          return Response.json({ folders: data.folders ?? [] });
        } catch (err) {
          return errorResponse(err);
        }
      },
    },
  },
});
