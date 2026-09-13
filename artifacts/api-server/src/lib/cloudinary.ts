import { v2 as cloudinary } from "cloudinary";

/**
 * Cloudinary is configured lazily, at request time, so that changing the
 * env vars in Vercel and redeploying always takes effect without needing
 * a separate init step. Credentials never leave this file / the server.
 */
export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env["CLOUDINARY_CLOUD_NAME"] &&
      process.env["CLOUDINARY_API_KEY"] &&
      process.env["CLOUDINARY_API_SECRET"],
  );
}

export function getCloudinary() {
  cloudinary.config({
    cloud_name: process.env["CLOUDINARY_CLOUD_NAME"],
    api_key: process.env["CLOUDINARY_API_KEY"],
    api_secret: process.env["CLOUDINARY_API_SECRET"],
    secure: true,
  });
  return cloudinary;
}

// Root folder that all Wazir Trading vehicle images live under in Cloudinary.
export const ROOT_FOLDER = "wazir-trading";
