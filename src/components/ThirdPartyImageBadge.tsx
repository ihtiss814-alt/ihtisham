import React from 'react';

const WTL_THIRD_PARTY_RANGES = [
  [1, 295],
  [593, 749],
] as const;

/**
 * These WTL reference ranges use images sourced from third parties.
 * Keep this check reference-based so new image rows do not need a separate
 * database migration or manual attribution flag.
 */
export function isThirdPartyListing(refNumber: string | null | undefined): boolean {
  const match = /^WTL-(\d+)$/i.exec(refNumber?.trim() ?? '');
  if (!match) return false;

  const number = Number(match[1]);
  return (
    Number.isInteger(number) &&
    WTL_THIRD_PARTY_RANGES.some(([start, end]) => number >= start && number <= end)
  );
}

export function ThirdPartyImageBadge({
  className = '',
}: {
  className?: string;
}) {
  return (
    <span
      className={`absolute z-20 inline-flex items-center rounded-sm bg-black/75 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white shadow-sm backdrop-blur-sm ${className}`}
      role="note"
      aria-label="Third-party image"
    >
      Third-party image
    </span>
  );
}