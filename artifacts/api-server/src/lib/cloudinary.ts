import { v2 as cloudinary } from "cloudinary";

/**
 * Cloudinary is configured lazily, at request time, so that changing the
 * env vars in Vercel and redeploying always takes effect without needing
 * a separate init step. Credentials never leave this file / the server.
 */
export function isCloudinaryConfigured(): boolean {
  return Boolean(
    (process.env["CLOUDINARY_CLOUD_NAME"] || process.env["CLOUD_NAME"] || "txb1wiw1") &&
      (process.env["CLOUDINARY_API_KEY"] || process.env["API_KEY"]) &&
      (process.env["CLOUDINARY_API_SECRET"] || process.env["API_KEY_2"]),
  );
}

export function getCloudinary() {
  cloudinary.config({
    cloud_name: process.env["CLOUDINARY_CLOUD_NAME"] || process.env["CLOUD_NAME"] || "txb1wiw1",
    api_key: process.env["CLOUDINARY_API_KEY"] || process.env["API_KEY"],
    api_secret: process.env["CLOUDINARY_API_SECRET"] || process.env["API_KEY_2"],
    secure: true,
  });
  return cloudinary;
}

// Root folder that all Wazir Trading vehicle images live under in Cloudinary.
export const ROOT_FOLDER = "wazir-trading";
