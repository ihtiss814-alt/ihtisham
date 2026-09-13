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
  const expected = process.env["ADMIN_PASSWORD"];

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
