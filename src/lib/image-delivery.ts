const CLOUDINARY_HOST = "res.cloudinary.com";

function cloudinaryImageAtWidth(imageUrl: string, width: number): string | null {
  if (!Number.isFinite(width) || width < 1) return null;

  try {
    const url = new URL(imageUrl);
    if (url.hostname !== CLOUDINARY_HOST) return null;

    const uploadMarker = "/image/upload/";
    const markerIndex = url.pathname.indexOf(uploadMarker);
    if (markerIndex < 0) return null;

    const prefix = url.pathname.slice(0, markerIndex + uploadMarker.length);
    const segments = url.pathname.slice(markerIndex + uploadMarker.length).split("/");
    const versionIndex = segments.findIndex((segment) => /^v\d+$/.test(segment));
    const firstSegmentLooksLikeTransform =
      /^(?:a_|b_|bo_|c_|co_|dpr_|e_|f_|fl_|g_|h_|if_|l_|o_|q_|r_|t_|u_|w_|x_|y_|z_)/.test(
        segments[0] ?? "",
      );
    if (versionIndex < 0 && firstSegmentLooksLikeTransform) return null;
    const insertAt = versionIndex < 0 ? 0 : versionIndex;

    segments.splice(insertAt, 0, `f_auto,q_auto,w_${Math.round(width)}`);
    url.pathname = prefix + segments.join("/");
    return url.toString();
  } catch {
    return null;
  }
}

/** Return the original URL for non-Cloudinary providers; never rewrite unknown hosts. */
export function getResponsiveImageUrl(imageUrl: string, width: number): string {
  return cloudinaryImageAtWidth(imageUrl, width) ?? imageUrl;
}

/** Use responsive candidates only for URLs on the Cloudinary image CDN. */
export function getResponsiveImageSrcSet(
  imageUrl: string,
  widths: readonly number[],
): string | undefined {
  const candidates = widths
    .map((width) => {
      const url = cloudinaryImageAtWidth(imageUrl, width);
      return url ? `${url} ${Math.round(width)}w` : null;
    })
    .filter((candidate): candidate is string => candidate !== null);

  return candidates.length === widths.length ? candidates.join(", ") : undefined;
}
