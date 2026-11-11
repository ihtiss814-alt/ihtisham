import { cachedRequest } from "@/lib/request-cache";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
export function getAvailableStockCount(): Promise<number | null> {
  if (!isSupabaseConfigured) return Promise.resolve(null);
  return cachedRequest(
    "inventory:available-count",
    async () => {
      const { count, error } = await supabase
        .from("cars")
        .select("id", { count: "exact", head: true })
        .eq("status", "available");
      if (error) throw error;
      return count;
    },
    30000,
  );
}
