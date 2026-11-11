import { useEffect, useState } from "react";
import { Globe2, MapPin, ChevronDown, Check, X } from "lucide-react";
import DestinationFields from "@/components/DestinationFields";
import { useDestinationPreference } from "@/hooks/useDestinationPreference";

export default function DestinationPreferenceControl({ mobile = false }: { mobile?: boolean }) {
  const preference = useDestinationPreference();
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [port, setPort] = useState("");

  useEffect(() => {
    setCountry(preference.country);
    setPort(preference.port);
  }, [preference.country, preference.port]);

  const save = () => {
    preference.setDestination({ country, port });
    setOpen(false);
  };

  return (
    <div className={mobile ? "relative w-full" : "relative"}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={
          mobile
            ? "flex w-full items-center justify-between gap-3 rounded-sm border border-slate-200 bg-white px-4 py-3 text-left"
            : "flex items-center gap-2 rounded-sm border border-gray-200 px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-gray-700 transition-colors hover:border-[#C8102E]/50"
        }
      >
        <span className="flex min-w-0 items-center gap-2">
          {mobile ? (
            <Globe2 size={16} className="text-[#C8102E]" />
          ) : (
            <MapPin size={14} className="text-[#C8102E]" />
          )}
          <span className="truncate">
            {preference.country
              ? `Destination: ${preference.country}${preference.port ? ` · ${preference.port}` : ""}`
              : "Choose destination"}
          </span>
        </span>
        <ChevronDown
          size={14}
          className={open ? "rotate-180 transition-transform" : "transition-transform"}
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Choose your destination"
          className={
            mobile
              ? "mt-2 rounded-sm border border-slate-200 bg-white p-4 shadow-sm"
              : "absolute right-0 top-full z-[80] mt-3 w-[min(430px,calc(100vw-2rem))] rounded-sm border border-slate-200 bg-white p-5 text-left shadow-xl"
          }
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#0D1B3E]">Your destination</h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Save a country and optional port or city to prefill calculators and enquiries on
                this device.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close destination selector"
              className="rounded p-1 text-slate-400 hover:bg-slate-100"
            >
              <X size={16} />
            </button>
          </div>
          <DestinationFields
            country={country}
            port={port}
            onCountryChange={(nextCountry) => {
              setCountry(nextCountry);
              setPort("");
            }}
            onPortChange={setPort}
            compact
            showGuidance={false}
          />
          <p className="mt-3 text-[11px] leading-5 text-slate-500">
            Saving this preference does not confirm an available shipping route or a price.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={save}
              disabled={!country}
              className="inline-flex items-center gap-2 rounded-sm bg-[#C8102E] px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Check size={14} /> Save destination
            </button>
            <button
              type="button"
              onClick={() => {
                setCountry("");
                setPort("");
                preference.setDestination({ country: "", port: "" });
                setOpen(false);
              }}
              className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900"
            >
              Clear saved destination
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
