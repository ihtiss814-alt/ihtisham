import { useId } from "react";
import { DEST_COUNTRIES, portsFor } from "@/lib/shipping";

interface DestinationFieldsProps {
  country: string;
  port: string;
  onCountryChange: (country: string) => void;
  onPortChange: (port: string) => void;
  idPrefix?: string;
  dark?: boolean;
  compact?: boolean;
  showGuidance?: boolean;
  countryRequired?: boolean;
}

export default function DestinationFields({
  country,
  port,
  onCountryChange,
  onPortChange,
  idPrefix,
  dark = false,
  compact = false,
  showGuidance = true,
  countryRequired = true,
}: DestinationFieldsProps) {
  const generatedId = useId();
  const prefix = idPrefix ?? `destination-${generatedId.replace(/:/g, "")}`;
  const countryId = `${prefix}-country`;
  const portId = `${prefix}-port`;
  const suggestions = portsFor(country);
  const labelClass = dark
    ? "mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-white/70"
    : "mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-slate-600";
  const inputClass = dark
    ? "w-full rounded-sm border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white outline-none focus:border-[#C8102E]"
    : "w-full rounded-sm border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#C8102E]";

  return (
    <div className={compact ? "grid grid-cols-1 gap-3" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}>
      <div>
        <label className={labelClass} htmlFor={countryId}>
          Destination country or territory{countryRequired ? " *" : ""}
        </label>
        <select
          id={countryId}
          value={country}
          onChange={(event) => onCountryChange(event.target.value)}
          required={countryRequired}
          className={inputClass}
        >
          <option value="" className="text-slate-900">
            Select your destination
          </option>
          {DEST_COUNTRIES.map((name) => (
            <option key={name} value={name} className="text-slate-900">
              {name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass} htmlFor={portId}>
          Preferred seaport, border or final city
          <span className="ml-1 normal-case tracking-normal font-normal opacity-70">(optional)</span>
        </label>
        <input
          id={portId}
          type="text"
          list={suggestions.length ? `${prefix}-port-suggestions` : undefined}
          value={port}
          onChange={(event) => onPortChange(event.target.value)}
          placeholder="Enter a port, border crossing or city"
          maxLength={120}
          autoComplete="address-level2"
          className={inputClass}
        />
        {suggestions.length > 0 && (
          <datalist id={`${prefix}-port-suggestions`}>
            {suggestions.map((suggestion) => (
              <option key={suggestion} value={suggestion} />
            ))}
          </datalist>
        )}
      </div>
      {showGuidance && (
        <p className={dark ? "text-[11px] leading-5 text-white/55 sm:col-span-2" : "text-[11px] leading-5 text-slate-500 sm:col-span-2"}>
          Enter any destination worldwide. Suggested locations are only starting points; the
          actual route, carrier availability, port handling and price must be confirmed for your
          vehicle. For a landlocked country, you can enter your final city or preferred border.
        </p>
      )}
    </div>
  );
}
