import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "wazir_destination_preference_v1";
const CHANGE_EVENT = "wazir:destination-preference-change";

export interface DestinationPreference {
  country: string;
  port: string;
}

interface StoredPreference extends DestinationPreference {
  version: 1;
}

const EMPTY_PREFERENCE: DestinationPreference = { country: "", port: "" };

function readPreference(): DestinationPreference {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_PREFERENCE;
    const parsed = JSON.parse(raw) as Partial<StoredPreference>;
    if (parsed.version !== 1) return EMPTY_PREFERENCE;
    return {
      country: typeof parsed.country === "string" ? parsed.country : "",
      port: typeof parsed.port === "string" ? parsed.port : "",
    };
  } catch {
    return EMPTY_PREFERENCE;
  }
}

export function useDestinationPreference() {
  const [destination, setDestinationState] = useState<DestinationPreference>(EMPTY_PREFERENCE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const sync = () => setDestinationState(readPreference());
    sync();
    setLoaded(true);
    window.addEventListener("storage", sync);
    window.addEventListener(CHANGE_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(CHANGE_EVENT, sync);
    };
  }, []);

  const setDestination = useCallback((next: DestinationPreference) => {
    const normalized = {
      country: next.country.trim(),
      port: next.port.trim(),
    };
    setDestinationState(normalized);
    try {
      if (!normalized.country) window.localStorage.removeItem(STORAGE_KEY);
      else window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, ...normalized }));
    } catch {
      // Destination selection still works for this page if storage is unavailable.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return {
    country: destination.country,
    port: destination.port,
    loaded,
    setDestination,
  };
}
