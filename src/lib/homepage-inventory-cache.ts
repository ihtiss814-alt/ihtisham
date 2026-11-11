import { cachedRequest } from "@/lib/request-cache";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export type HomepageCountOption = {
  name: string;
  databaseValue?: string;
};

/**
 * Share exact-count requests for the homepage's make and body-type directories.
 * Each category total remains sourced from the live available-inventory table.
 */
export function getHomepageInventoryCounts(
  column: "make" | "body_type",
  options: readonly HomepageCountOption[],
): Promise<Record<string, number>> {
  if (!isSupabaseConfigured) return Promise.resolve({});

  const key = `homepage:category-counts:${column}:${options
    .map(
      (option) =>
        `${option.name.toLowerCase()}=${(option.databaseValue ?? option.name).toLowerCase()}`,
    )
    .join("|")}`;

  return cachedRequest(
    key,
    async () => {
      const results = await Promise.all(
        options.map(async (option) => {
          const { count, error } = await supabase
            .from("cars")
            .select("id", { count: "exact", head: true })
            .eq("status", "available")
            .ilike(column, option.databaseValue ?? option.name);

          if (error) throw error;
          return [option.name, count ?? 0] as const;
        }),
      );

      return Object.fromEntries(results);
    },
    90_000,
  );
}
