import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  CircleHelp,
  Copy,
  Fuel,
  Gauge,
  Heart,
  MapPin,
  Send,
  Settings2,
  Share2,
  ShieldCheck,
} from "lucide-react";
import CarCard, { type Car } from "@/components/CarCard";
import { MakeLogo as ManufacturerLogo } from "@/components/VehicleIdentity";
import VehiclePhotoGallery from "@/components/VehiclePhotoGallery";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { useMeta } from "@/lib/use-meta";
import { useSeoBootstrap } from "@/lib/seo-bootstrap-context";
import {
  breadcrumbJsonLd,
  isAvailableVehicle,
  isIndexableVehicle,
  isSoldVehicle,
  validImageUrls,
  vehicleCanonical,
  vehicleDescription,
  vehicleJsonLd,
  vehicleSummary,
  vehicleTitle,
  rankRelatedVehicles,
  type VehicleSeoCar,
  type VehicleSeoImage,
} from "@/lib/vehicle-seo";
import {
  COUNTRY_PORTS,
  DEST_COUNTRIES,
  fetchShippingRate,
  computeLandedCost,
  type ShippingRate,
} from "@/lib/shipping";
import { VEHICLE_RELATED_SELECT } from "@/lib/vehicle-detail-data";
import { getCachedVehicleDetail } from "@/lib/vehicle-request-cache";
import { cachedRequest } from "@/lib/request-cache";
import "./car-detail.css";

type DetailCar = Omit<Car, "car_images" | "chassis_number"> &
  VehicleSeoCar & {
    engine_code?: string | null;
    model_code?: string | null;
    lot_number?: string | null;
    manufacture_month?: string | number | null;
    features?: unknown;
    updated_at?: string | null;
    car_images?: VehicleSeoImage[] | null;
  };

type SimilarCar = Car & { primaryImage?: string };
type FormStatus = "idle" | "submitting" | "success" | "error";
type SpecRow = { label: string; value: string | number | null | undefined };

const WA_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER || "818089227375").replace(/\D/g, "");
const FEATURE_LABELS = [
  "360 Camera",
  "Air Bag",
  "Air Conditioner",
  "Alloy Wheels",
  "Anti Brake System",
  "Automatic Air Conditioning",
  "Back Camera",
  "Back Spoiler",
  "Double Muffler",
  "FOG Light",
  "HID",
  "Keyless Entry",
  "Leather Seats",
  "Navigation",
  "Parking Sensors",
  "Power Steering",
  "Power Windows",
  "Push Start",
  "Radio",
  "Retractable Mirror",
  "Roof Rail",
  "Sun Roof",
  "TV",
  "Cruise Control",
  "Blind Spot Monitor",
];
const FEATURE_ALIASES: Record<string, string> = {
  ps: "Power Steering",
  pw: "Power Windows",
  aw: "Alloy Wheels",
  abs: "Anti Brake System",
  aac: "Automatic Air Conditioning",
  navi: "Navigation",
  hid: "HID",
  ac: "Air Conditioner",
  keyless: "Keyless Entry",
};
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function valueText(value: unknown): string | null {
  if (value == null) return null;
  if (typeof value === "string") return value.trim() || null;
  if (typeof value === "number")
    return Number.isFinite(value) ? new Intl.NumberFormat("en-US").format(value) : null;
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return null;
}

function money(value: number | null | undefined): string | null {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return moneyAmount(amount);
}

function moneyAmount(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function fmtMonthYear(
  month: string | number | null | undefined,
  year: number | null | undefined,
): string | null {
  if (year == null) return null;
  if (month == null || month === "") return String(year);
  const parsed = Number.parseInt(String(month), 10);
  if (Number.isInteger(parsed) && parsed >= 1 && parsed <= 12)
    return `${MONTH_NAMES[parsed - 1]} ${year}`;
  return `${String(month)} ${year}`;
}

function featureIsPresent(features: unknown, label: string): boolean {
  const aliases = Object.entries(FEATURE_ALIASES)
    .filter(([, full]) => full.toLowerCase() === label.toLowerCase())
    .map(([alias]) => alias);
  const accepted = new Set([label.toLowerCase(), ...aliases]);
  const isEnabled = (value: unknown) =>
    value === true ||
    value === 1 ||
    (typeof value === "string" &&
      ["true", "1", "yes", "y", "on"].includes(value.trim().toLowerCase()));
  if (Array.isArray(features))
    return features.some((item) => accepted.has(String(item).toLowerCase()));
  if (features && typeof features === "object") {
    return Object.entries(features as Record<string, unknown>).some(
      ([key, enabled]) => accepted.has(key.toLowerCase()) && isEnabled(enabled),
    );
  }
  return false;
}

function GradePill({ value }: { value: string }) {
  const letter = value.trim().toUpperCase().charAt(0);
  const tone =
    letter === "A"
      ? "is-grade-a"
      : letter === "B"
        ? "is-grade-b"
        : letter === "C"
          ? "is-grade-c"
          : letter === "D"
            ? "is-grade-d"
            : "";
  return <span className={`vehicle-grade-pill ${tone}`}>{value}</span>;
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="vehicle-section-heading">
      {eyebrow && <p className="vehicle-section-eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function WhatsAppMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.5 0 .15 5.35.15 11.94c0 2.1.55 4.16 1.6 5.96L.05 24l6.25-1.64a11.94 11.94 0 0 0 5.77 1.48h.01c6.58 0 11.93-5.35 11.93-11.94 0-3.19-1.24-6.19-3.49-8.42ZM12.08 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98.99-3.63-.23-.37a9.88 9.88 0 0 1-1.52-5.25c0-5.47 4.45-9.92 9.91-9.92a9.86 9.86 0 0 1 7.02 2.91 9.87 9.87 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.94 9.92Zm5.44-7.43c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.64.07-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.49-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.9 1.22 3.1c.15.2 2.1 3.22 5.1 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

export default function CarDetailPage() {
  const params = useParams();
  const ref = params.ref ?? "";
  const bootstrap = useSeoBootstrap();
  const hasServerVehicle =
    bootstrap?.vehicleResolved === true &&
    bootstrap.vehicleRef === ref &&
    Boolean(bootstrap.vehicle);
  const initialVehicle = hasServerVehicle ? (bootstrap?.vehicle as unknown as DetailCar) : null;
  const [car, setCar] = useState<DetailCar | null>(initialVehicle);
  const [loading, setLoading] = useState(!hasServerVehicle);
  const [similarCars, setSimilarCars] = useState<SimilarCar[]>([]);
  const [saved, setSaved] = useState(false);
  const [shareState, setShareState] = useState<"idle" | "copied">("idle");
  const [country, setCountry] = useState("Pakistan");
  const [port, setPort] = useState(COUNTRY_PORTS.Pakistan?.[0] ?? "");
  const [freightType, setFreightType] = useState<"Prepaid" | "Collect">("Prepaid");
  const [withInspection, setWithInspection] = useState(true);
  const [withInsurance, setWithInsurance] = useState(true);
  const [shippingRate, setShippingRate] = useState<ShippingRate | null>(null);
  const [rateLoading, setRateLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  useMeta({
    title: car ? vehicleTitle(car) : "Vehicle details | Wazir Trading LLC",
    description: car
      ? vehicleDescription(car)
      : "Review Japanese used vehicle details, photographs and export enquiry information from Wazir Trading LLC.",
    canonical: ref ? vehicleCanonical(ref) : undefined,
    noindex: !car || !isIndexableVehicle(car),
  });

  useEffect(() => {
    if (hasServerVehicle) return;
    let active = true;
    const loadVehicle = async () => {
      if (!ref || !isSupabaseConfigured) {
        if (active) setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await getCachedVehicleDetail(ref);
        if (active) setCar(data as DetailCar | null);
      } catch (error) {
        console.warn("Could not load vehicle details:", error);
        if (active) setCar(null);
      } finally {
        if (active) setLoading(false);
      }
    };
    void loadVehicle();
    return () => {
      active = false;
    };
  }, [hasServerVehicle, ref]);

  useEffect(() => {
    try {
      const current = JSON.parse(localStorage.getItem("wazir_saved_cars") || "[]");
      setSaved(Array.isArray(current) && current.includes(ref));
    } catch {
      setSaved(false);
    }
  }, [ref]);

  useEffect(() => {
    if (!car) return;
    const title = vehicleTitle(car);
    const description = vehicleDescription(car);
    const canonical = vehicleCanonical(car.ref_number);
    const image = validImageUrls(car)[0];
    const setMeta = (property: string, content: string) => {
      let element = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }
      element.content = content;
    };
    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:url", canonical);
    setMeta("og:type", "product");
    if (image) setMeta("og:image", image);

    const upsertJsonLd = (
      id: string,
      value: Record<string, unknown>,
      matches: (candidate: Record<string, unknown>) => boolean,
    ) => {
      let node = document.getElementById(id) as HTMLScriptElement | null;
      if (!node) {
        node =
          Array.from(
            document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
          ).find((candidate) => {
            try {
              return matches(JSON.parse(candidate.textContent || "{}") as Record<string, unknown>);
            } catch {
              return false;
            }
          }) ?? null;
      }
      if (!node) {
        node = document.createElement("script");
        node.type = "application/ld+json";
        document.head.appendChild(node);
      }
      node.id = id;
      node.textContent = JSON.stringify(value);
    };
    upsertJsonLd(
      "vehicle-jsonld",
      vehicleJsonLd(car, validImageUrls(car)),
      (candidate) => candidate.sku === car.ref_number,
    );
    upsertJsonLd(
      "breadcrumb-jsonld",
      breadcrumbJsonLd(car),
      (candidate) => candidate["@type"] === "BreadcrumbList",
    );
    return () => {
      document.getElementById("vehicle-jsonld")?.remove();
      document.getElementById("breadcrumb-jsonld")?.remove();
    };
  }, [car]);

  useEffect(() => {
    if (!car || !isSupabaseConfigured) {
      setSimilarCars([]);
      return;
    }
    let active = true;
    const loadRelated = async () => {
      const candidates = await cachedRequest(
        `vehicle:related:${car.id}:${car.make}:${car.model}:${car.body_type ?? ""}`,
        async () => {
          const queries = [
            supabase
              .from("cars")
              .select(VEHICLE_RELATED_SELECT)
              .eq("make", car.make)
              .eq("model", car.model),
            supabase.from("cars").select(VEHICLE_RELATED_SELECT).eq("make", car.make),
            ...(car.body_type
              ? [
                  supabase
                    .from("cars")
                    .select(VEHICLE_RELATED_SELECT)
                    .eq("body_type", car.body_type),
                ]
              : []),
          ];
          const results = await Promise.all(
            queries.map((query) =>
              query
                .neq("id", car.id)
                .eq("status", "available")
                .order("year", { ascending: false })
                .limit(16)
                .returns<Car[]>(),
            ),
          );
          return results.flatMap((result) => result.data ?? []);
        },
        60_000,
      );
      if (!active) return;
      const ranked = rankRelatedVehicles(car, candidates, 6) as Car[];
      setSimilarCars(
        ranked.map((item) => ({ ...item, primaryImage: validImageUrls(item)[0] ?? undefined })),
      );
    };
    void loadRelated().catch((error) => console.warn("Could not load related vehicles:", error));
    return () => {
      active = false;
    };
  }, [car]);

  useEffect(() => {
    let active = true;
    setShippingRate(null);
    if (!country || !port) {
      setRateLoading(false);
      return () => {
        active = false;
      };
    }
    if (!car || !isAvailableVehicle(car) || !(Number(car.fob_price_usd) > 0)) {
      setRateLoading(false);
      return () => {
        active = false;
      };
    }
    setRateLoading(true);
    fetchShippingRate(country, port)
      .then((rate) => {
        if (active) setShippingRate(rate);
      })
      .catch((error) => {
        console.warn("Could not load the published shipping rate:", error);
        if (active) setShippingRate(null);
      })
      .finally(() => {
        if (active) setRateLoading(false);
      });
    return () => {
      active = false;
    };
  }, [car, country, port]);

  const available = car ? isAvailableVehicle(car) : false;
  const sold = car ? isSoldVehicle(car) : false;
  const fobPrice = car ? Number(car.fob_price_usd) : 0;
  const hasFobPrice = available && Number.isFinite(fobPrice) && fobPrice > 0;
  const exportEstimate = useMemo(() => {
    if (!hasFobPrice) return null;
    return computeLandedCost(fobPrice, shippingRate, {
      freightType,
      withInspection,
      withInsurance,
    });
  }, [freightType, hasFobPrice, fobPrice, shippingRate, withInspection, withInsurance]);
  const activePorts = COUNTRY_PORTS[country] ?? [];
  const availableFeatures = useMemo(
    () => FEATURE_LABELS.filter((label) => car && featureIsPresent(car.features, label)),
    [car],
  );

  const handleSave = () => {
    try {
      const current = JSON.parse(localStorage.getItem("wazir_saved_cars") || "[]");
      const list = Array.isArray(current)
        ? current.filter((item): item is string => typeof item === "string")
        : [];
      const next = saved ? list.filter((item) => item !== ref) : [...new Set([...list, ref])];
      localStorage.setItem("wazir_saved_cars", JSON.stringify(next));
      setSaved(!saved);
    } catch {
      setSaved(false);
    }
  };

  const handleShare = async () => {
    const shareData = { title: document.title, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(window.location.href);
        setShareState("copied");
        window.setTimeout(() => setShareState("idle"), 1800);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError")
        console.warn("Share action failed:", error);
    }
  };

  const changeCountry = (nextCountry: string) => {
    setCountry(nextCountry);
    setPort(COUNTRY_PORTS[nextCountry]?.[0] ?? "");
  };

  const handleInquirySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!car || !isSupabaseConfigured) {
      setFormStatus("error");
      return;
    }
    setFormStatus("submitting");
    const form = new FormData(event.currentTarget);
    const payload = {
      car_ref: car.ref_number,
      car_name: `${car.make} ${car.model}${car.year ? ` ${car.year}` : ""}`,
      destination_country: country,
      destination_port: port,
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      message: String(form.get("message") ?? "").trim(),
      inquiry_type: "car-inquiry",
    };
    try {
      const { error } = await supabase.from("inquiries").insert([payload]);
      if (error) throw error;
      setFormStatus("success");
    } catch (error) {
      console.warn("Vehicle enquiry submission failed:", error);
      setFormStatus("error");
    }
  };

  if (loading) {
    return (
      <main className="vehicle-detail-loading">
        <span className="vehicle-detail-spinner" aria-hidden="true" />
        <p>Loading vehicle details…</p>
      </main>
    );
  }

  if (!car) {
    return (
      <main className="vehicle-detail-not-found">
        <div className="vehicle-detail-not-found-icon">
          <CircleHelp size={30} />
        </div>
        <p className="vehicle-detail-kicker">Vehicle record</p>
        <h1>Vehicle details are unavailable</h1>
        <p>
          We could not load this reference from the current public inventory. It may have been
          removed or the record may be temporarily unavailable.
        </p>
        <Link href="/cars" className="vehicle-primary-button">
          <ArrowLeft size={16} /> Browse available vehicles
        </Link>
      </main>
    );
  }

  const carName = `${car.make} ${car.model}`;
  const requestText = encodeURIComponent(
    `Hello Wazir Trading, please confirm the current status and written quotation for ${carName}${car.year ? ` ${car.year}` : ""}, reference ${car.ref_number}.`,
  );
  const whatsappUrl = `https://wa.me/${WA_NUMBER}?text=${requestText}`;

  const groups: { title: string; rows: SpecRow[] }[] = [
    {
      title: "Vehicle identity",
      rows: [
        { label: "Reference number", value: car.ref_number },
        { label: "Model year", value: fmtMonthYear(car.manufacture_month, car.year) },
        { label: "Variant / grade", value: car.variant },
        { label: "Model code", value: car.model_code },
        { label: "Lot number", value: car.lot_number },
        { label: "Body type", value: car.body_type },
      ],
    },
    {
      title: "Engine & drivetrain",
      rows: [
        {
          label: "Engine capacity",
          value:
            car.engine_cc != null
              ? `${new Intl.NumberFormat("en-US").format(car.engine_cc)} cc`
              : null,
        },
        { label: "Engine code", value: car.engine_code },
        { label: "Fuel type", value: car.fuel_type },
        { label: "Transmission", value: car.transmission },
        { label: "Drive", value: car.drive },
        { label: "Steering", value: car.steering },
      ],
    },
    {
      title: "Dimensions & appearance",
      rows: [
        {
          label: "Mileage",
          value:
            car.mileage_km != null
              ? `${new Intl.NumberFormat("en-US").format(car.mileage_km)} km`
              : null,
        },
        { label: "Exterior colour", value: car.color },
        { label: "Seats", value: car.seats },
        { label: "Doors", value: car.doors },
      ],
    },
    {
      title: "Recorded condition",
      rows: [
        { label: "Auction grade", value: car.auction_grade },
        { label: "Exterior grade", value: car.exterior_grade },
        { label: "Interior grade", value: car.interior_grade },
      ],
    },
    {
      title: "Stock & export details",
      rows: [
        { label: "Stock location", value: car.stock_location },
        { label: "Port of loading", value: car.port_of_loading },
        { label: "Shipment method", value: car.shipment_method },
      ],
    },
  ];
  const visibleGroups = groups
    .map((group) => ({
      ...group,
      rows: group.rows
        .map((row) => ({ ...row, value: valueText(row.value) }))
        .filter((row) => row.value !== null),
    }))
    .filter((group) => group.rows.length > 0);

  return (
    <main className="vehicle-detail-page">
      <div className="vehicle-detail-container">
        <nav className="vehicle-detail-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <Link href="/cars">Available cars</Link>
          <ChevronRight size={14} />
          <span aria-current="page">{car.ref_number}</span>
        </nav>

        <header className="vehicle-detail-heading">
          <div className="vehicle-detail-heading-brand">
            <ManufacturerLogo make={car.make} size="lg" />
            <div className="min-w-0">
              <p className="vehicle-detail-kicker">Japanese vehicle export listing</p>
              <h1>
                {carName}
                {car.year ? <span className="vehicle-detail-year">{car.year}</span> : null}
              </h1>
              {car.variant && <p className="vehicle-detail-variant">{car.variant}</p>}
            </div>
          </div>
          <div className="vehicle-detail-heading-actions">
            <span
              className={`vehicle-status ${available ? "is-available" : sold ? "is-sold" : "is-check"}`}
            >
              <span />{" "}
              {available
                ? "Available — confirm before purchase"
                : sold
                  ? "Sold / historical listing"
                  : "Availability to be confirmed"}
            </span>
            <button
              type="button"
              className={`vehicle-utility-button ${saved ? "is-saved" : ""}`}
              onClick={handleSave}
              aria-pressed={saved}
              aria-label={saved ? "Remove from saved vehicles" : "Save vehicle"}
            >
              <Heart size={17} fill={saved ? "currentColor" : "none"} />
              <span>{saved ? "Saved" : "Save"}</span>
            </button>
            <button type="button" className="vehicle-utility-button" onClick={handleShare}>
              {shareState === "copied" ? <Check size={17} /> : <Share2 size={17} />}
              <span>{shareState === "copied" ? "Copied" : "Share"}</span>
            </button>
          </div>
        </header>

        <div className="vehicle-detail-meta-strip">
          <span>
            <BadgeCheck size={15} /> Ref. <strong>{car.ref_number}</strong>
          </span>
          {car.stock_location && (
            <span>
              <MapPin size={15} /> {car.stock_location}
            </span>
          )}
          <span>
            <ShieldCheck size={15} /> Vehicle-specific details from listing record
          </span>
        </div>

        <div className="vehicle-detail-layout">
          <div className="vehicle-detail-main-column">
            <section
              className="vehicle-detail-panel vehicle-detail-gallery-panel"
              aria-label="Vehicle photographs"
            >
              <div className="vehicle-panel-topline">
                <div>
                  <p className="vehicle-section-eyebrow">Visual inspection</p>
                  <h2>Vehicle photographs</h2>
                </div>
                <span className="vehicle-photo-reference">{car.ref_number}</span>
              </div>
              <VehiclePhotoGallery car={car} />
              <p className="vehicle-gallery-note">
                Images are those attached to this vehicle record. Confirm the exact condition, grade
                and included equipment against the current vehicle documents.
              </p>
            </section>

            <section className="vehicle-detail-quickfacts" aria-label="Key specifications">
              {[
                {
                  label: "Mileage",
                  value:
                    car.mileage_km != null
                      ? `${new Intl.NumberFormat("en-US").format(car.mileage_km)} km`
                      : null,
                  icon: Gauge,
                },
                {
                  label: "Engine",
                  value:
                    car.engine_cc != null
                      ? `${new Intl.NumberFormat("en-US").format(car.engine_cc)} cc`
                      : null,
                  icon: Settings2,
                },
                { label: "Fuel", value: valueText(car.fuel_type), icon: Fuel },
                { label: "Transmission", value: valueText(car.transmission), icon: Settings2 },
              ]
                .filter((item) => item.value)
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <div className="vehicle-quickfact" key={item.label}>
                      <span>
                        <Icon size={17} />
                      </span>
                      <div>
                        <small>{item.label}</small>
                        <strong>{item.value}</strong>
                      </div>
                    </div>
                  );
                })}
            </section>

            <section className="vehicle-detail-panel vehicle-detail-overview">
              <SectionHeading
                eyebrow="At a glance"
                title="Vehicle overview"
                description="A concise summary built from the information recorded for this listing."
              />
              <p className="vehicle-overview-copy">{vehicleSummary(car)}</p>
              <div className="vehicle-context-links">
                <Link href="/buyer-information">
                  Buyer checklist <ArrowRight size={14} />
                </Link>
                <Link href="/shipping-information">
                  Shipping information <ArrowRight size={14} />
                </Link>
                <Link href="/payment-information">
                  Payment information <ArrowRight size={14} />
                </Link>
              </div>
            </section>

            {visibleGroups.length > 0 && (
              <section className="vehicle-detail-panel">
                <SectionHeading
                  eyebrow="Record details"
                  title="Specifications"
                  description="Only values present in the vehicle record are shown. Missing fields are deliberately omitted."
                />
                <div className="vehicle-spec-groups">
                  {visibleGroups.map((group) => (
                    <div className="vehicle-spec-group" key={group.title}>
                      <h3>{group.title}</h3>
                      <dl>
                        {group.rows.map((row) => (
                          <div className="vehicle-spec-row" key={row.label}>
                            <dt>{row.label}</dt>
                            <dd>
                              {row.label.toLowerCase().includes("grade") ? (
                                <GradePill value={String(row.value)} />
                              ) : (
                                row.value
                              )}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {availableFeatures.length > 0 && (
              <section className="vehicle-detail-panel">
                <SectionHeading
                  eyebrow="Recorded equipment"
                  title="Features & equipment"
                  description="These are the features marked on this vehicle's inventory record."
                />
                <ul className="vehicle-feature-list">
                  {availableFeatures.map((feature) => (
                    <li key={feature}>
                      <Check size={15} /> {feature}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {similarCars.length > 0 && (
              <section className="vehicle-detail-panel vehicle-related-panel">
                <div className="vehicle-related-heading">
                  <SectionHeading
                    eyebrow="Continue browsing"
                    title="Similar available vehicles"
                    description="Other available records selected by make, model or body type."
                  />
                  <Link
                    href={`/cars?make=${encodeURIComponent(car.make)}`}
                    className="vehicle-text-link"
                  >
                    View inventory <ArrowRight size={15} />
                  </Link>
                </div>
                <div className="vehicle-related-grid">
                  {similarCars.map((similar) => (
                    <CarCard
                      key={similar.id}
                      car={similar}
                      variant="compact"
                      primaryImage={similar.primaryImage ?? null}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="vehicle-detail-aside">
            <div className="vehicle-aside-sticky">
              <section className="vehicle-quote-card">
                <div className="vehicle-quote-top">
                  <p className="vehicle-section-eyebrow">Vehicle quotation</p>
                  {hasFobPrice ? (
                    <>
                      <p className="vehicle-price-label">FOB price shown in listing</p>
                      <p className="vehicle-price-value">{money(fobPrice)}</p>
                      <p className="vehicle-price-caption">
                        FOB Japan · Confirm the current price and inclusions in a written quotation.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="vehicle-price-value vehicle-price-on-request">
                        {sold ? "Historical listing" : "Price on request"}
                      </p>
                      <p className="vehicle-price-caption">
                        {sold
                          ? "This record is not presented as current stock. Ask about a similar vehicle."
                          : "A current price has not been supplied for this listing."}
                      </p>
                    </>
                  )}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vehicle-whatsapp-button"
                  >
                    <WhatsAppMark /> {available ? "Confirm on WhatsApp" : "Ask about similar stock"}
                  </a>
                  <a href="#vehicle-enquiry" className="vehicle-primary-button">
                    <Send size={16} />{" "}
                    {available ? "Request a written quote" : "Enquire about alternatives"}
                  </a>
                </div>
                <div className="vehicle-quote-reference">
                  <span>Listing reference</span>
                  <strong>{car.ref_number}</strong>
                  <button
                    type="button"
                    onClick={() => void navigator.clipboard?.writeText(car.ref_number)}
                    aria-label="Copy vehicle reference"
                  >
                    <Copy size={15} />
                  </button>
                </div>
                <p className="vehicle-quote-disclaimer">
                  A listing is not a reservation or purchase contract. Confirm availability, price
                  basis, specifications and export scope before payment.
                </p>
              </section>

              {hasFobPrice && (
                <section className="vehicle-detail-panel vehicle-shipping-card">
                  <SectionHeading
                    eyebrow="Destination planning"
                    title="Export cost estimate"
                    description="Shown only when a route rate is available in the shipping-rate database."
                  />
                  <label className="vehicle-form-label" htmlFor="vehicle-country">
                    Destination country
                  </label>
                  <select
                    id="vehicle-country"
                    value={country}
                    onChange={(event) => changeCountry(event.target.value)}
                  >
                    {DEST_COUNTRIES.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <label className="vehicle-form-label" htmlFor="vehicle-port">
                    Destination port
                  </label>
                  <select
                    id="vehicle-port"
                    value={port}
                    onChange={(event) => setPort(event.target.value)}
                    disabled={!activePorts.length}
                  >
                    {activePorts.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <div className="vehicle-rate-options">
                    <label>
                      <input
                        type="radio"
                        name="freight-type"
                        checked={freightType === "Prepaid"}
                        onChange={() => setFreightType("Prepaid")}
                      />{" "}
                      Freight prepaid
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="freight-type"
                        checked={freightType === "Collect"}
                        onChange={() => setFreightType("Collect")}
                      />{" "}
                      Freight collect
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={withInspection}
                        onChange={(event) => setWithInspection(event.target.checked)}
                      />{" "}
                      Include recorded inspection fee
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={withInsurance}
                        onChange={(event) => setWithInsurance(event.target.checked)}
                      />{" "}
                      Include rate-based insurance
                    </label>
                  </div>
                  {rateLoading ? (
                    <p className="vehicle-rate-message">Checking the recorded route rate…</p>
                  ) : exportEstimate ? (
                    <div className="vehicle-estimate-result">
                      <div>
                        <span>FOB vehicle price</span>
                        <strong>{moneyAmount(exportEstimate.fob)}</strong>
                      </div>
                      <div>
                        <span>Freight</span>
                        <strong>{moneyAmount(exportEstimate.freight)}</strong>
                      </div>
                      <div>
                        <span>Inspection</span>
                        <strong>{moneyAmount(exportEstimate.inspection)}</strong>
                      </div>
                      <div>
                        <span>Insurance</span>
                        <strong>{moneyAmount(exportEstimate.insurance)}</strong>
                      </div>
                      <div className="vehicle-estimate-total">
                        <span>Estimated export subtotal</span>
                        <strong>{moneyAmount(exportEstimate.total)}</strong>
                      </div>
                      <p>
                        Illustrative estimate based on the rate currently recorded for this route.
                        Destination duties, taxes, customs, port and inland charges are excluded
                        unless stated in a written quotation.
                      </p>
                    </div>
                  ) : (
                    <div className="vehicle-rate-empty">
                      <CircleHelp size={18} />
                      <p>
                        No published rate was found for this country and port. We will not estimate
                        a freight charge without a matching rate record.
                      </p>
                      <a href={whatsappUrl}>
                        Request a route quote <ArrowRight size={14} />
                      </a>
                    </div>
                  )}
                </section>
              )}

              <section id="vehicle-enquiry" className="vehicle-detail-panel vehicle-enquiry-card">
                <SectionHeading
                  eyebrow="Talk to our team"
                  title={available ? "Enquire about this vehicle" : "Find a similar vehicle"}
                  description="Send the reference and destination so the team can review your request."
                />
                {formStatus === "success" ? (
                  <div className="vehicle-form-success">
                    <span>
                      <Check size={22} />
                    </span>
                    <h3>Enquiry received</h3>
                    <p>
                      Your request was saved. You can also message our team directly with the
                      vehicle reference.
                    </p>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      Continue on WhatsApp <ArrowRight size={14} />
                    </a>
                  </div>
                ) : (
                  <form className="vehicle-enquiry-form" onSubmit={handleInquirySubmit}>
                    <div className="vehicle-form-ref">
                      <span>Vehicle reference</span>
                      <strong>{car.ref_number}</strong>
                    </div>
                    <label className="vehicle-form-label" htmlFor="inquiry-country">
                      Destination country
                    </label>
                    <select
                      id="inquiry-country"
                      value={country}
                      onChange={(event) => changeCountry(event.target.value)}
                      required
                    >
                      {DEST_COUNTRIES.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                    <label className="vehicle-form-label" htmlFor="inquiry-port">
                      Nearest port
                    </label>
                    <select
                      id="inquiry-port"
                      value={port}
                      onChange={(event) => setPort(event.target.value)}
                      required
                      disabled={!activePorts.length}
                    >
                      {activePorts.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                    <label className="vehicle-form-label" htmlFor="inquiry-name">
                      Full name
                    </label>
                    <input
                      id="inquiry-name"
                      name="name"
                      autoComplete="name"
                      required
                      placeholder="Your name"
                    />
                    <label className="vehicle-form-label" htmlFor="inquiry-phone">
                      WhatsApp / phone
                    </label>
                    <input
                      id="inquiry-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      placeholder="Include country code"
                    />
                    <label className="vehicle-form-label" htmlFor="inquiry-email">
                      Email address
                    </label>
                    <input
                      id="inquiry-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                    />
                    <label className="vehicle-form-label" htmlFor="inquiry-message">
                      What would you like confirmed?
                    </label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      rows={4}
                      defaultValue={`Please confirm current availability, specification, condition documents and a written export quotation for ${carName}${car.year ? ` ${car.year}` : ""} (Ref: ${car.ref_number}) to ${country}.`}
                    />
                    {formStatus === "error" && (
                      <p className="vehicle-form-error">
                        We could not save this enquiry. Please try again or contact us directly
                        using WhatsApp.
                      </p>
                    )}
                    <button
                      className="vehicle-primary-button"
                      type="submit"
                      disabled={formStatus === "submitting" || !isSupabaseConfigured}
                    >
                      {formStatus === "submitting" ? (
                        "Sending enquiry…"
                      ) : (
                        <>
                          <Send size={16} /> Send vehicle enquiry
                        </>
                      )}
                    </button>
                    {!isSupabaseConfigured && (
                      <p className="vehicle-form-error">
                        The enquiry service is not configured. Please contact us through WhatsApp.
                      </p>
                    )}
                    <p className="vehicle-form-privacy">
                      An enquiry does not reserve a vehicle or create a purchase contract. See our{" "}
                      <Link href="/privacy-policy">Privacy Policy</Link>.
                    </p>
                  </form>
                )}
              </section>

              <div className="vehicle-buying-help">
                <ShieldCheck size={19} />
                <div>
                  <strong>Before you pay</strong>
                  <p>
                    Verify the vehicle reference, current status, documents, price basis and
                    destination charges in writing.
                  </p>
                  <Link href="/buyer-information">
                    Read the buyer checklist <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="vehicle-mobile-actions">
        <div className="vehicle-mobile-price">
          <small>{hasFobPrice ? "FOB Japan" : "Vehicle listing"}</small>
          <strong>
            {hasFobPrice ? money(fobPrice) : sold ? "Historical" : "Price on request"}
          </strong>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="vehicle-mobile-wa"
        >
          <WhatsAppMark size={17} /> WhatsApp
        </a>
        <a href="#vehicle-enquiry" className="vehicle-mobile-enquire">
          <Send size={15} /> Enquire
        </a>
      </div>
    </main>
  );
}
