import { timingSafeEqual } from "node:crypto";
import type { NextFunction, Request, Response } from "express";

/**
 * Gates every /api/admin/cloudinary/* route behind a single shared
 * password, sent by the browser in the `x-admin-password` header.
 *
 * - 503 → ADMIN_PASSWORD isn't set on the server at all (misconfiguration).
 * - 401 → header missing or doesn't match.
 * - next() → header matches, request proceeds.
 */
export function requireAdminPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Keep ADMIN_PASSWORD as the preferred dedicated credential. JWT_2 is the
  // existing server-only secret configured for this project and is a safe
  // compatibility fallback for the protected admin tool.
  const expected = process.env["ADMIN_PASSWORD"] || process.env["JWT_2"];

  if (!expected) {
    res.status(503).json({ error: "Admin access is not configured on the server." });
    return;
  }

  const provided = req.header("x-admin-password");

  const providedBuffer = Buffer.from(provided ?? "");
  const expectedBuffer = Buffer.from(expected);
  const matches =
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer);

  if (!provided || !matches) {
    res.status(401).json({ error: "Incorrect password." });
    return;
  }

  next();
}
