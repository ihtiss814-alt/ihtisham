import { useEffect, useState } from "react";
import { Bus, CarFront, Truck, type LucideIcon } from "lucide-react";

const MAKE_LOGO_ALIASES: Record<string, string> = {
  "mercedes benz": "mercedes",
  "mercedes-benz": "mercedes",
  "land rover": "landrover",
  "mitsubishi fuso": "mitsubishi",
  "john deere": "john-deere",
  "massey ferguson": "massey-ferguson",
};

function normalizeMake(make: string): string {
  const normalized = make.trim().toLowerCase().replace(/\s+/g, " ");
  return (
    MAKE_LOGO_ALIASES[normalized] ?? normalized.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  );
}

function initials(value: string): string {
  const words = value.trim().split(/\s+/).filter(Boolean);
  return (words.length > 1 ? `${words[0][0]}${words[1][0]}` : value.slice(0, 2)).toUpperCase();
}

export function MakeLogo({
  make,
  className = "",
  size = "md",
}: {
  make: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const slug = normalizeMake(make);
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [slug]);
  const dimensions = size === "sm" ? "h-9 w-9" : size === "lg" ? "h-16 w-16" : "h-12 w-12";
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const src = `${base}/logos/${slug}.svg`;

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white ${dimensions} ${className}`}
      aria-label={`${make} manufacturer`}
      title={make}
    >
      {!failed ? (
        <img
          src={src}
          alt={`${make} logo`}
          className="h-[72%] w-[72%] object-contain"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="font-bold tracking-tight text-slate-600" aria-hidden="true">
          {initials(make)}
        </span>
      )}
    </span>
  );
}

const COUNTRY_ISO2: Record<string, string> = {
  pakistan: "pk",
  "sri-lanka": "lk",
  bangladesh: "bd",
  "united-arab-emirates": "ae",
  oman: "om",
  qatar: "qa",
  bahrain: "bh",
  "saudi-arabia": "sa",
  kenya: "ke",
  tanzania: "tz",
  uganda: "ug",
  zambia: "zm",
  malawi: "mw",
  mozambique: "mz",
  zimbabwe: "zw",
  botswana: "bw",
  namibia: "na",
  "south-africa": "za",
  ghana: "gh",
  nigeria: "ng",
  senegal: "sn",
  "the-gambia": "gm",
  "sierra-leone": "sl",
  liberia: "lr",
  mauritius: "mu",
  seychelles: "sc",
  madagascar: "mg",
  fiji: "fj",
  "papua-new-guinea": "pg",
  "solomon-islands": "sb",
  vanuatu: "vu",
  "new-zealand": "nz",
  australia: "au",
  jamaica: "jm",
  guyana: "gy",
  "trinidad-and-tobago": "tt",
  barbados: "bb",
  cameroon: "cm",
  lesotho: "ls",
  bahamas: "bs",
};

export function countryFlagCode(slug: string): string | null {
  return COUNTRY_ISO2[slug.toLowerCase()] ?? null;
}

export function CountryFlag({
  slug,
  country,
  className = "",
}: {
  slug: string;
  country: string;
  className?: string;
}) {
  const code = countryFlagCode(slug);
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [slug]);

  return (
    <span
      className={`inline-flex h-9 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-white ${className}`}
    >
      {code && !failed ? (
        <img
          src={`https://flagcdn.com/w80/${code}.png`}
          alt={`${country} flag`}
          width="80"
          height="60"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="text-[10px] font-bold uppercase tracking-wide text-slate-500"
          aria-label={`${country} flag unavailable`}
        >
          {code ?? country.slice(0, 2)}
        </span>
      )}
    </span>
  );
}

function bodyIcon(bodyType: string): LucideIcon {
  const value = bodyType.toLowerCase();
  if (value.includes("truck") || value.includes("pickup") || value.includes("cabin")) return Truck;
  if (value.includes("bus")) return Bus;
  return CarFront;
}

function bodyTypeAsset(bodyType: string): string | null {
  const value = bodyType.toLowerCase().replace(/[_-]+/g, " ");
  if (value.includes("off road") || value.includes("4x4")) return "car-bt-off-road-vehicles.svg";
  if (value.includes("suv")) return "car-bt-compact-suv.svg";
  if (value.includes("double cabin")) return "car-bt-double-cabin.svg";
  if (value.includes("single cabin")) return "car-bt-single-cabin.svg";
  if (value.includes("hatchback"))
    return value.includes("subcompact")
      ? "car-bt-subcompact-hatchback.svg"
      : "car-bt-compact-hatchback.svg";
  if (value.includes("sedan")) return "car-bt-compact-sedan.svg";
  if (value.includes("micro van") || value.includes("minivan")) return "car-bt-micro-van.svg";
  if (value.includes("bus")) return "car-bt-bus.svg";
  if (value.includes("mini")) return "car-bt-mini-vehicles.svg";
  return null;
}

export function BodyTypeIcon({
  bodyType,
  className = "",
}: {
  bodyType: string;
  className?: string;
}) {
  const Icon = bodyIcon(bodyType);
  const asset = bodyTypeAsset(bodyType);
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  return (
    <span
      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 ${className}`}
    >
      {asset ? (
        <img
          src={`${base}/icons/${asset}`}
          alt={`${bodyType} vehicle icon`}
          className="h-9 w-9 object-contain"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <Icon size={23} strokeWidth={1.7} aria-label={`${bodyType} vehicle`} />
      )}
    </span>
  );
}
