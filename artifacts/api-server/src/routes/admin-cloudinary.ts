import { Router, type IRouter, type Request, type Response } from "express";
import { createHash } from "node:crypto";
import { v2 as cloudinary } from "cloudinary";

const router: IRouter = Router();

// Secrets read at request time — never at module load — so they are always
// current even if the process started before the secrets were injected.
const ADMIN_PASSWORD = () => process.env.ADMIN_PASSWORD?.trim() ?? "";
const CLOUD_NAME     = () => process.env.CLOUDINARY_CLOUD_NAME?.trim() ?? "";
const API_KEY        = () => process.env.CLOUDINARY_API_KEY?.trim() ?? "";
const API_SECRET     = () => process.env.CLOUDINARY_API_SECRET?.trim() ?? "";

function checkAdmin(req: Request, res: Response): boolean {
  if (!ADMIN_PASSWORD()) {
    res.status(503).json({ error: "Admin authentication is not configured" });
    return false;
  }
  const pw = req.headers["x-admin-password"];
  if (pw !== ADMIN_PASSWORD()) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

async function cloudinaryFetch(path: string): Promise<unknown> {
  const cloudName = CLOUD_NAME();
  const apiKey = API_KEY();
  const apiSecret = API_SECRET();
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET must be set as server environment variables."
    );
  }
  const creds = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}${path}`, {
    headers: { Authorization: `Basic ${creds}` },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Cloudinary ${res.status}: ${body}`);
  }
  return res.json();
}

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  [key: string]: unknown;
};

function normalizeChassis(value: string): string {
  return value.trim().toUpperCase();
}

/**
 * Keep this parser in sync with the dashboard's flat-folder matcher.
 * Cloudinary image IDs can include a generated suffix after an underscore
 * and a sequence number at the end of the original filename.
 */
function extractChassisFromPublicId(publicId: string): string {
  const filename = (publicId.split("/").pop() ?? publicId).replace(/\.[^._]+$/, "");
  const parts = filename.split("_");
  const base = parts.length > 1 ? parts.slice(0, -1).join("_") : filename;

  if (/[_-]map$/i.test(base)) {
    return base.replace(/[_-]map$/i, "");
  }

  const lastDash = base.lastIndexOf("-");
  if (lastDash !== -1 && /^\d{1,3}[a-z]?$/i.test(base.slice(lastDash + 1))) {
    return base.slice(0, lastDash);
  }

  return base;
}

function resourceMatchesChassis(resource: CloudinaryResource, chassis: string): boolean {
  const wanted = normalizeChassis(chassis);
  const pathSegments = resource.public_id.split("/").slice(0, -1);
  return normalizeChassis(extractChassisFromPublicId(resource.public_id)) === wanted
    || pathSegments.some(segment => normalizeChassis(segment) === wanted);
}

/**
 * Fetch every image in wazir-trading using the same source as the full sync.
 * This is the correctness fallback for individual syncs when Cloudinary's
 * prefix/search expression does not return an asset that is visibly present.
 */
async function fetchAllWazirTradingResources(): Promise<CloudinaryResource[]> {
  const cloudName = CLOUD_NAME();
  const apiKey = API_KEY();
  const apiSecret = API_SECRET();
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET must be set as server environment variables."
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  const resources: CloudinaryResource[] = [];
  const seen = new Set<string>();
  const addResources = (batch: CloudinaryResource[]) => {
    for (const resource of batch) {
      if (!seen.has(resource.public_id)) {
        seen.add(resource.public_id);
        resources.push(resource);
      }
    }
  };

  // This is the same named-folder search used by the full sync UI.
  try {
    let nextCursor: string | undefined;
    do {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let search = (cloudinary.search as any)
        .expression("folder:wazir-trading")
        .sort_by("public_id", "asc")
        .max_results(500);
      if (nextCursor) search = search.next_cursor(nextCursor);

      const page = await search.execute() as {
        resources?: CloudinaryResource[];
        next_cursor?: string;
      };
      addResources(page.resources ?? []);
      nextCursor = page.next_cursor;
    } while (nextCursor);
  } catch {
    // Try the prefix API below for legacy/prefix-uploaded assets.
  }

  // Include prefix-uploaded assets if the named-folder search returned none.
  if (resources.length === 0) {
    let nextCursor: string | undefined;
    do {
      const options: Record<string, unknown> = {
        type: "upload",
        prefix: "wazir-trading/",
        max_results: 500,
      };
      if (nextCursor) options.next_cursor = nextCursor;

      const page = await cloudinary.api.resources(options) as {
        resources?: CloudinaryResource[];
        next_cursor?: string;
      };
      addResources(page.resources ?? []);
      nextCursor = page.next_cursor;
    } while (nextCursor);
  }

  return resources;
}

router.get("/admin/cloudinary/auth", (req, res) => {
  if (!checkAdmin(req, res)) return;
  res.json({ ok: true });
});

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
 * POST /api/admin/cloudinary/search-by-chassis
 * Body: { chassis_number: string }
 *
 * Searches for all images for a given chassis number across two folder structures:
 *   1. wazir-trading/<chassis_number>/         (flat — images uploaded directly by chassis)
 *   2. wazir-trading/<dateFolder>/<chassis_number>/  (nested — images from bulk upload flow)
 *
 * Lists all date subfolders under wazir-trading/, then probes each one for the chassis
 * subfolder in parallel. Results are deduplicated by public_id.
 */
router.post("/admin/cloudinary/search-by-chassis", async (req, res) => {
  if (!checkAdmin(req, res)) return;
  const { chassis_number } = req.body as { chassis_number?: string };
  if (!chassis_number) {
    res.status(400).json({ error: "chassis_number is required" });
    return;
  }
  if (!API_KEY() || !API_SECRET()) {
    res.status(500).json({
      error: "CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET must be set as server environment variables.",
    });
    return;
  }

  try {
    const seen = new Set<string>();
    const allResources: CloudinaryResource[] = [];

    const addResources = (resources: CloudinaryResource[]) => {
      for (const r of resources) {
        if (!seen.has(r.public_id)) {
          seen.add(r.public_id);
          allResources.push(r);
        }
      }
    };

    // Helper: list all images under a given folder prefix (non-throwing)
    const listByPrefix = async (prefix: string): Promise<CloudinaryResource[]> => {
      try {
        const data = await cloudinaryFetch(
          `/resources/image?type=upload&prefix=${encodeURIComponent(prefix)}&max_results=100`
        ) as { resources?: CloudinaryResource[] };
        return data.resources ?? [];
      } catch {
        return [];
      }
    };

    // 1. Flat structure: wazir-trading/<chassis>/
    const flatResults = await listByPrefix(`wazir-trading/${chassis_number}/`);
    addResources(flatResults);

    // 2. Nested structure: wazir-trading/<dateFolder>/<chassis>/
    //    First discover all date subfolders under wazir-trading/
    let dateFolders: string[] = [];
    try {
      const foldersData = await cloudinaryFetch(`/folders/wazir-trading`) as {
        folders?: { path?: string; name?: string }[];
      };
      dateFolders = (foldersData.folders ?? []).map(f => f.path ?? f.name ?? "").filter(Boolean);
    } catch {
      // If listing folders fails we still return any flat results already found
    }

    if (dateFolders.length > 0) {
      const nestedResults = await Promise.all(
        dateFolders.map(dateFolder =>
          listByPrefix(`${dateFolder}/${chassis_number}/`)
        )
      );
      for (const batch of nestedResults) addResources(batch);
    }

    // 3. Flat filename structure: images may live inside wazir-trading/ or at root.
    //    Search for public_ids matching either:
    //      public_id:wazir-trading/<chassis>*
    //      public_id:<chassis>*
    //    This covers both folder-prefixed and root-level uploads.
    const chassisExpression = chassis_number.replace(/([\\"])/g, "\\$1");
    const expression = `public_id:(wazir-trading/${chassisExpression}* OR ${chassisExpression}*)`;
    try {
      const creds = Buffer.from(`${API_KEY()}:${API_SECRET()}`).toString("base64");
      const searchRes = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME()}/resources/search`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${creds}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            expression,
            max_results: 100,
          }),
        }
      );
      if (searchRes.ok) {
        const searchData = (await searchRes.json()) as { resources?: CloudinaryResource[] };
        addResources(searchData.resources ?? []);
      }
    } catch { /* continue with results so far */ }

    // The full-folder sync uses Cloudinary's folder search and parses each
    // public_id. Use that same path when the targeted Cloudinary searches
    // miss an asset that is present in the folder.
    const matchingResources = allResources.filter(resource =>
      resourceMatchesChassis(resource, chassis_number)
    );
    if (matchingResources.length === 0) {
      try {
        const folderResources = await fetchAllWazirTradingResources();
        res.json({
          resources: folderResources.filter(resource =>
            resourceMatchesChassis(resource, chassis_number)
          ),
        });
        return;
      } catch {
        // Return the targeted results (if any) rather than hiding a useful
        // Cloudinary response behind a fallback failure.
      }
    }

    res.json({ resources: matchingResources });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
});

/**
 * GET /admin/cloudinary/fetch-flat-folder[?next_cursor=...]
 *
 * Lists one page (≤500) of images from the wazir-trading folder.
 * Primary: search(folder:wazir-trading) — works for named-folder assets.
 * Fallback: api.resources(prefix) — works for prefix-uploaded assets.
 *
 * Returns: { resources: [{ public_id, secure_url }], next_cursor?, total_count? }
 */
router.get("/admin/cloudinary/fetch-flat-folder", async (req, res) => {
  if (!checkAdmin(req, res)) return;
  const cloudName = CLOUD_NAME();
  const apiKey    = API_KEY();
  const apiSecret = API_SECRET();
  if (!cloudName || !apiKey || !apiSecret) {
    res.status(500).json({
      error: "CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET must be set as server environment variables.",
    });
    return;
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key:    apiKey,
    api_secret: apiSecret,
  });

  const { next_cursor } = req.query as { next_cursor?: string };

  type Resource = { public_id: string; secure_url: string };
  type PageResult = { resources?: Resource[]; next_cursor?: string; total_count?: number };

  // ── Primary: Search API with named-folder expression ───────────────────
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let search = (cloudinary.search as any)
      .expression("folder:wazir-trading")
      .sort_by("public_id", "asc")
      .max_results(500);
    if (next_cursor) search = search.next_cursor(next_cursor);

    const data = await search.execute() as PageResult;
    const resources = data.resources ?? [];
    if (resources.length > 0 || !next_cursor) {
      res.json({
        resources,
        total_count: data.total_count ?? resources.length,
        ...(data.next_cursor ? { next_cursor: data.next_cursor } : {}),
      });
      return;
    }
  } catch { /* fall through to backup */ }

  // ── Fallback: api.resources with prefix (prefix-uploaded assets) ────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const opts: Record<string, any> = {
    type: "upload", prefix: "wazir-trading/", max_results: 500,
  };
  if (next_cursor) opts["next_cursor"] = next_cursor;

  const data = await cloudinary.api.resources(opts) as PageResult;
  const resources = data.resources ?? [];
  res.json({
    resources,
    total_count: data.total_count ?? resources.length,
    ...(data.next_cursor ? { next_cursor: data.next_cursor } : {}),
  });
});

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

  if (!cloudName || !apiKey || !apiSecret) {
    res.status(500).json({
      error:
        "CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET must be set as server environment variables.",
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
