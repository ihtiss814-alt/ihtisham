/**
 * useExchangeRate — live USD exchange rates via open.er-api.com
 *
 * Fetches once per hour (staleTime), falls back to hardcoded constants
 * if the network is unavailable. Returns a plain object so it can be
 * used in any component without suspense / error boundaries.
 */
import { useQuery } from '@tanstack/react-query';

export interface ExchangeRates {
  jpy: number;   // ¥ per $1
  pkr: number;   // ₨ per $1
  gbp: number;   // £ per $1
  eur: number;   // € per $1
  isLive: boolean;
  updatedAt: Date | null;
}

/** Conservative static fallbacks — update annually if the site ever goes offline long-term */
export const RATE_FALLBACK: ExchangeRates = {
  jpy: 162,
  pkr: 278,
  gbp: 0.79,
  eur: 0.91,
  isLive: false,
  updatedAt: null,
};

async function fetchRates(): Promise<ExchangeRates> {
  const res = await fetch('https://open.er-api.com/v6/latest/USD', {
    // Don't send cookies or auth headers to the external API
    credentials: 'omit',
  });
  if (!res.ok) throw new Error(`Exchange rate fetch failed: ${res.status}`);
  const json = await res.json();
  if (json.result !== 'success') throw new Error('Exchange rate API returned non-success');
  const r = json.rates as Record<string, number>;
  return {
    jpy: r.JPY ?? RATE_FALLBACK.jpy,
    pkr: r.PKR ?? RATE_FALLBACK.pkr,
    gbp: r.GBP ?? RATE_FALLBACK.gbp,
    eur: r.EUR ?? RATE_FALLBACK.eur,
    isLive: true,
    updatedAt: json.time_last_update_utc ? new Date(json.time_last_update_utc) : null,
  };
}

export function useExchangeRate(): ExchangeRates {
  const { data } = useQuery<ExchangeRates>({
    queryKey: ['usd-exchange-rates'],
    queryFn: fetchRates,
    staleTime: 60 * 60 * 1000,      // re-fetch after 1 hour
    gcTime:    2  * 60 * 60 * 1000, // keep in cache for 2 hours
    retry: 2,
    retryDelay: 3000,
  });
  return data ?? RATE_FALLBACK;
}
