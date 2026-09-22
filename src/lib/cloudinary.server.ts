/**
 * Server-only Cloudinary Admin API helpers.
 *
 * Uses the REST Admin API over fetch (no Node-only SDK), authenticated with
 * HTTP Basic auth: api_key:api_secret. Credentials are read inside the
 * request handlers and never reach the browser.
 */

export const ROOT_FOLDER = "wazir-trading";

type CloudinaryConfig = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
};

export function getCloudinaryConfig(): CloudinaryConfig | null {
  const cloudName = process.env["CLOUDINARY_CLOUD_NAME"];
  const apiKey = process.env["CLOUDINARY_API_KEY"];
  const apiSecret = process.env["CLOUDINARY_API_SECRET"];
  if (!cloudName || !apiKey || !apiSecret) return null;
  return { cloudName, apiKey, apiSecret };
}

export function notConfigured(): Response {
  return Response.json(
    {
      error:
        "Cloudinary is not configured on the server (missing CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET).",
    },
    { status: 503 },
  );
}

function authHeader(cfg: CloudinaryConfig): string {
  return `Basic ${btoa(`${cfg.apiKey}:${cfg.apiSecret}`)}`;
}

export async function cloudinaryGet(
  cfg: CloudinaryConfig,
  path: string,
  params: Record<string, string | number | undefined> = {},
): Promise<unknown> {
  const url = new URL(`https://api.cloudinary.com/v1_1/${cfg.cloudName}/${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  }
  const res = await fetch(url.toString(), {
    headers: { Authorization: authHeader(cfg), Accept: "application/json" },
  });
  const body = (await res.json().catch(() => ({}))) as {
    error?: { message?: string };
  };
  if (!res.ok) {
    throw new Error(body.error?.message ?? `Cloudinary API error ${res.status}`);
  }
  return body;
}

export type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  [key: string]: unknown;
};

/**
 * Lists every image under a prefix. The Admin API `resources` endpoint only
 * matches public_ids that literally start with the prefix, so anything stored
 * in a nested folder or with an unexpected case is found through the Search
 * API instead — that is what the flat-folder sync relies on.
 */
export async function searchResources(
  cfg: CloudinaryConfig,
  expression: string,
  nextCursor?: string,
): Promise<{ resources: CloudinaryResource[]; next_cursor?: string }> {
  const url = `https://api.cloudinary.com/v1_1/${cfg.cloudName}/resources/search`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: authHeader(cfg),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      expression,
      max_results: 500,
      sort_by: [{ public_id: "asc" }],
      ...(nextCursor ? { next_cursor: nextCursor } : {}),
    }),
  });
  const body = (await res.json().catch(() => ({}))) as {
    resources?: CloudinaryResource[];
    next_cursor?: string;
    error?: { message?: string };
  };
  if (!res.ok) {
    throw new Error(body.error?.message ?? `Cloudinary search error ${res.status}`);
  }
  return { resources: body.resources ?? [], next_cursor: body.next_cursor };
}

export function errorResponse(err: unknown): Response {
  const message = err instanceof Error ? err.message : "Unknown Cloudinary error";
  return Response.json({ error: message }, { status: 500 });
}
