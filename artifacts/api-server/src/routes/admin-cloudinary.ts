import { Router, type IRouter, type Request, type Response } from "express";
import { createHash } from "node:crypto";

const router: IRouter = Router();

// Secrets live server-side only — never sent to the browser
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "WazirAdmin2024";
const CLOUD_NAME     = process.env.CLOUDINARY_CLOUD_NAME || "txb1wiw1";
const API_KEY        = process.env.CLOUDINARY_API_KEY    || "";
const API_SECRET     = process.env.CLOUDINARY_API_SECRET || "";

function checkAdmin(req: Request, res: Response): boolean {
  const pw = req.headers["x-admin-password"];
  if (pw !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

async function cloudinaryFetch(path: string): Promise<unknown> {
  if (!API_KEY || !API_SECRET) {
    throw new Error(
      "CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET must be set as server environment variables."
    );
  }
  const creds = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}${path}`, {
    headers: { Authorization: `Basic ${creds}` },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Cloudinary ${res.status}: ${body}`);
  }
  return res.json();
}

/**
 * GET /api/admin/cloudinary/folders/:dateFolder
 * Lists all subfolders inside wazir-trading/<dateFolder>/
 */
router.get("/admin/cloudinary/folders/:dateFolder", async (req, res) => {
  if (!checkAdmin(req, res)) return;
  try {
    const { dateFolder } = req.params;
    const data = await cloudinaryFetch(
      `/folders/wazir-trading/${encodeURIComponent(dateFolder)}`
    );
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
});

/**
 * GET /api/admin/cloudinary/resources/:dateFolder/:subfolder
 * Lists all images inside wazir-trading/<dateFolder>/<subfolder>/
 */
router.get(
  "/admin/cloudinary/resources/:dateFolder/:subfolder",
  async (req, res) => {
    if (!checkAdmin(req, res)) return;
    try {
      const { dateFolder, subfolder } = req.params;
      const folder = `wazir-trading/${dateFolder}/${subfolder}`;
      const data = await cloudinaryFetch(
        `/resources/image?type=upload&prefix=${encodeURIComponent(folder)}/&max_results=100`
      );
      res.json(data);
    } catch (err) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : "Unknown error" });
    }
  }
);

/**
 * POST /api/admin/cloudinary/sign
 * Body: { public_id: string }
 * Generates a signed timestamp so the browser can upload directly to Cloudinary.
 * The API secret is never sent to the browser — only the resulting HMAC signature.
 */
router.post("/admin/cloudinary/sign", (req, res) => {
  if (!checkAdmin(req, res)) return;

  if (!API_KEY || !API_SECRET) {
    res.status(500).json({
      error:
        "CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET must be set as server environment variables.",
    });
    return;
  }

  const { public_id } = req.body as { public_id?: string };
  if (!public_id) {
    res.status(400).json({ error: "public_id is required" });
    return;
  }

  const timestamp = Math.round(Date.now() / 1000);

  // Cloudinary signed upload: SHA-1("public_id=X&timestamp=T" + API_SECRET)
  const paramsToSign = `public_id=${public_id}&timestamp=${timestamp}`;
  const signature = createHash("sha1")
    .update(paramsToSign + API_SECRET)
    .digest("hex");

  res.json({
    signature,
    timestamp,
    api_key: API_KEY,
    cloud_name: CLOUD_NAME,
    public_id,
  });
});

export default router;
