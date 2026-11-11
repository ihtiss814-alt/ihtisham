import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, ImageOff, MapPinned, X } from "lucide-react";
import { isThirdPartyListing, ThirdPartyImageBadge } from "@/components/ThirdPartyImageBadge";
import { vehicleImageAlt, type VehicleSeoCar, type VehicleSeoImage } from "@/lib/vehicle-seo";

type GalleryImage = VehicleSeoImage & { display_order?: number | null };

function isHttpImage(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export default function VehiclePhotoGallery({
  car,
}: {
  car: VehicleSeoCar & { car_images?: GalleryImage[] | null };
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const images = useMemo(() => {
    const source = (car.car_images ?? []).filter(
      (image) => image?.image_url && isHttpImage(image.image_url),
    );
    const unique = new Map<string, GalleryImage>();
    source.forEach((image) => unique.set(image.image_url, image));
    return [...unique.values()].sort((a, b) => {
      if (Boolean(a.is_primary) !== Boolean(b.is_primary)) return a.is_primary ? -1 : 1;
      return (
        (a.display_order ?? Number.MAX_SAFE_INTEGER) - (b.display_order ?? Number.MAX_SAFE_INTEGER)
      );
    });
  }, [car.car_images]);
  const mapImages = images.filter((image) =>
    /(?:_map|map[_-]?\b)/i.test(image.image_url.split("/").pop() ?? ""),
  );
  const photos = images.filter((image) => !mapImages.includes(image));
  const active = photos[activeIndex];

  useEffect(() => {
    setActiveIndex(0);
    setImageFailed(false);
  }, [car.ref_number]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % photos.length);
        setImageFailed(false);
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + photos.length) % photos.length);
        setImageFailed(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, photos.length]);

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + photos.length) % photos.length);
    setImageFailed(false);
  };

  return (
    <div className="vehicle-gallery">
      <div className="vehicle-gallery-stage">
        {active && !imageFailed ? (
          <img
            key={active.image_url}
            src={active.image_url}
            alt={vehicleImageAlt(car, activeIndex)}
            className="vehicle-gallery-main-image"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="vehicle-gallery-empty">
            <ImageOff size={38} strokeWidth={1.4} />
            <strong>
              {photos.length ? "Photo unavailable" : "No vehicle photographs supplied"}
            </strong>
            <span>
              {car.make} {car.model}
              {car.year ? ` · ${car.year}` : ""}
            </span>
          </div>
        )}
        {isThirdPartyListing(car.ref_number) && <ThirdPartyImageBadge className="left-4 top-4" />}
        {photos.length > 0 && active && !imageFailed && (
          <>
            <button
              type="button"
              className="vehicle-gallery-expand"
              onClick={() => setLightboxOpen(true)}
              aria-label="Open photo viewer"
            >
              <Expand size={17} /> <span>View photos</span>
            </button>
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  className="vehicle-gallery-arrow vehicle-gallery-arrow-left"
                  onClick={() => move(-1)}
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  className="vehicle-gallery-arrow vehicle-gallery-arrow-right"
                  onClick={() => move(1)}
                  aria-label="Next photo"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
            <span className="vehicle-gallery-count">
              {activeIndex + 1} / {photos.length}
            </span>
          </>
        )}
      </div>

      {photos.length > 1 && (
        <div className="vehicle-gallery-thumbnails" aria-label="Vehicle photographs">
          {photos.slice(0, 8).map((image, index) => (
            <button
              key={image.image_url}
              type="button"
              className={`vehicle-gallery-thumb ${index === activeIndex ? "is-active" : ""}`}
              onClick={() => {
                setActiveIndex(index);
                setImageFailed(false);
              }}
              aria-label={`Show vehicle photo ${index + 1}`}
              aria-pressed={index === activeIndex}
            >
              <img src={image.image_url} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
          {photos.length > 8 && (
            <button
              type="button"
              className="vehicle-gallery-more"
              onClick={() => setLightboxOpen(true)}
            >
              +{photos.length - 8} more
            </button>
          )}
        </div>
      )}

      {mapImages.length > 0 && (
        <a
          href={mapImages[0].image_url}
          target="_blank"
          rel="noopener noreferrer"
          className="vehicle-gallery-map-link"
        >
          <MapPinned size={16} /> Open attached map / inspection diagram
          <span>Opens the original supplied image</span>
        </a>
      )}

      {lightboxOpen && active && (
        <div
          className="vehicle-gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Vehicle photo viewer"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            className="vehicle-gallery-close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close photo viewer"
          >
            <X size={24} />
          </button>
          {photos.length > 1 && (
            <button
              type="button"
              className="vehicle-gallery-lightbox-arrow left-3 sm:left-8"
              onClick={(event) => {
                event.stopPropagation();
                move(-1);
              }}
              aria-label="Previous photo"
            >
              <ChevronLeft size={28} />
            </button>
          )}
          <img
            src={active.image_url}
            alt={vehicleImageAlt(car, activeIndex)}
            onClick={(event) => event.stopPropagation()}
          />
          {photos.length > 1 && (
            <button
              type="button"
              className="vehicle-gallery-lightbox-arrow right-3 sm:right-8"
              onClick={(event) => {
                event.stopPropagation();
                move(1);
              }}
              aria-label="Next photo"
            >
              <ChevronRight size={28} />
            </button>
          )}
          <span className="vehicle-gallery-lightbox-caption">
            {car.make} {car.model} · {activeIndex + 1} of {photos.length}
          </span>
        </div>
      )}
    </div>
  );
}
