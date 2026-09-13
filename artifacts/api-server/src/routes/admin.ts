import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { requireAdminPassword } from "../middlewares/adminAuth.js";
import { getCloudinary, isCloudinaryConfigured, ROOT_FOLDER } from "../lib/cloudinary.js";

const router: IRouter = Router();

// Every route below requires the shared admin password.
router.use("/admin/cloudinary", requireAdminPassword);

/**
 * GET /api/admin/cloudinary/auth
 * The frontend calls this just to check the password is correct.
 * If requireAdminPassword() let the request through, it's valid.
 */
router.get("/admin/cloudinary/auth", (_req: Request, res: Response) => {
  if (!requireCloudinaryConfigured(res)) return;
  res.status(200).json({
    ok: true,
    cloud_name: process.env["CLOUDINARY_CLOUD_NAME"],
  });
});

function requireCloudinaryConfigured(res: Response): boolean {
  if (!isCloudinaryConfigured()) {
    res.status(503).json({
      error:
        "Cloudinary is not configured on the server (missing CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET).",
    });
    return false;
  }
  return true;
}

/**
 * GET /api/admin/cloudinary/folders/:dateFolder
 * Lists subfolders under wazir-trading/{dateFolder}.
 */
router.get(
  "/admin/cloudinary/folders/:dateFolder",
  async (req: Request, res: Response) => {
    if (!requireCloudinaryConfigured(res)) return;
    try {
      const { dateFolder } = req.params;
      const cloudinary = getCloudinary();
      const result = await cloudinary.api.sub_folders(`${ROOT_FOLDER}/${dateFolder}`);
      res.json({ folders: result.folders ?? [] });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown Cloudinary error";
      res.status(500).json({ error: message });
    }
  },
);

/**
 * GET /api/admin/cloudinary/resources/:dateFolder/:subfolder
 * Lists images inside wazir-trading/{dateFolder}/{subfolder}/.
 */
router.get(
  "/admin/cloudinary/resources/:dateFolder/:subfolder",
  async (req: Request, res: Response) => {
    if (!requireCloudinaryConfigured(res)) return;
    try {
      const { dateFolder, subfolder } = req.params;
      const cloudinary = getCloudinary();
      const result = await cloudinary.api.resources({
        type: "upload",
        prefix: `${ROOT_FOLDER}/${dateFolder}/${subfolder}/`,
        max_results: 500,
      });
      res.json({ resources: result.resources ?? [] });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown Cloudinary error";
      res.status(500).json({ error: message });
    }
  },
);

/**
 * GET /api/admin/cloudinary/fetch-flat-folder?next_cursor=...
 * Paginated flat listing of everything under wazir-trading/.
 */
router.get(
  "/admin/cloudinary/fetch-flat-folder",
  async (req: Request, res: Response) => {
    if (!requireCloudinaryConfigured(res)) return;
    try {
      const nextCursor = typeof req.query["next_cursor"] === "string"
        ? req.query["next_cursor"]
        : undefined;
      const cloudinary = getCloudinary();
      const result = await cloudinary.api.resources({
        type: "upload",
        prefix: `${ROOT_FOLDER}/`,
        max_results: 500,
        next_cursor: nextCursor,
      });
      res.json({
        resources: result.resources ?? [],
        next_cursor: result.next_cursor,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown Cloudinary error";
      res.status(500).json({ error: message });
    }
  },
);

/**
 * POST /api/admin/cloudinary/search-by-chassis
 * Body: { chassis_number: string }
 * Finds every image whose public_id starts with wazir-trading/{chassis_number}.
 */
router.post(
  "/admin/cloudinary/search-by-chassis",
  async (req: Request, res: Response) => {
    if (!requireCloudinaryConfigured(res)) return;
    try {
      const chassisNumber = (req.body?.chassis_number ?? "").toString().trim();
      if (!chassisNumber) {
        res.status(400).json({ error: "chassis_number is required." });
        return;
      }
      const cloudinary = getCloudinary();
      const result = await cloudinary.api.resources({
        type: "upload",
        prefix: `${ROOT_FOLDER}/${chassisNumber}`,
        max_results: 500,
      });
      res.json({ resources: result.resources ?? [] });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown Cloudinary error";
      res.status(500).json({ error: message });
    }
  },
);

export default router;
