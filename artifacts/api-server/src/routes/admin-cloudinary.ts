import { Router, type IRouter, type Request, type Response } from "express";
import { createHash } from "node:crypto";

const router: IRouter = Router();

// Secrets read at request time — never at module load — so they are always
// current even if the process started before the secrets were injected.
const ADMIN_PASSWORD = () => process.env.ADMIN_PASSWORD     || "WazirAdmin2024";
const CLOUD_NAME     = () => process.env.CLOUDINARY_CLOUD_NAME || "txb1wiw1";
const API_KEY        = () => process.env.CLOUDINARY_API_KEY ?? "";
const API_SECRET     = () => process.env.CLOUDINARY_API_SECRET ?? "";

function checkAdmin(req: Request, res: Response): boolean {
  const pw = req.headers["x-admin-password"];
  if (pw !== ADMIN_PASSWORD()) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

async function cloudinaryFetch(path: string): Promise<unknown> {
  const apiKey = API_KEY();
  const apiSecret = API_SECRET();
  if (!apiKey || !apiSecret) {
    throw new Error(
      "CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET must be set as server environment variables."
    );
  }
  const creds = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME()}${path}`, {
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
 * POST /api/admin/cloudinary/upload
 * Body: { image_base64: string, mime_type: string, public_id: string }
 *
 * The browser sends raw image bytes (base64-encoded) to this server endpoint.
 * The server generates the Cloudinary signature and POSTs the file directly
 * to Cloudinary — the API secret never touches the browser, and we avoid all
 * browser-side signature/CORS issues entirely.
 *
 * Returns: { secure_url: string }
 */
router.post("/admin/cloudinary/upload", async (req, res) => {
  if (!checkAdmin(req, res)) return;

  const apiKey    = API_KEY().trim();
  const apiSecret = API_SECRET().trim();
  const cloudName = CLOUD_NAME().trim();

  if (!apiKey || !apiSecret) {
    res.status(500).json({
      error:
        "CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET must be set as server environment variables.",
    });
    return;
  }

  const { image_base64, mime_type, public_id } = req.body as {
    image_base64?: string;
    mime_type?: string;
    public_id?: string;
  };

  if (!image_base64 || !public_id) {
    res.status(400).json({ error: "image_base64 and public_id are required" });
    return;
  }

  try {
    const timestamp = Math.round(Date.now() / 1000);

    // Cloudinary signed upload signature:
    // SHA-1( "public_id=X&timestamp=T" + API_SECRET )
    // Parameters sorted alphabetically; values NOT URL-encoded.
    const paramsToSign = `public_id=${public_id}&timestamp=${timestamp}`;
    const signature = createHash("sha1")
      .update(paramsToSign + apiSecret)
      .digest("hex");

    // Build the multipart request from the server directly to Cloudinary
    const imageBuffer = Buffer.from(image_base64, "base64");
    const mimeType    = mime_type ?? "image/jpeg";

    const fd = new FormData();
    fd.append(
      "file",
      new Blob([imageBuffer], { type: mimeType }),
      public_id.split("/").pop() ?? "image",
    );
    fd.append("api_key",   apiKey);
    fd.append("timestamp", String(timestamp));
    fd.append("signature", signature);
    fd.append("public_id", public_id);

    const upRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: fd },
    );

    const upBody = await upRes.json() as Record<string, unknown>;

    if (!upRes.ok) {
      const msg =
        (upBody?.error as { message?: string } | undefined)?.message ??
        `Cloudinary ${upRes.status}`;
      res.status(502).json({ error: msg, cloudinary: upBody });
      return;
    }

    res.json({ secure_url: upBody.secure_url });
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "Upload failed",
    });
  }
});

export default router;
