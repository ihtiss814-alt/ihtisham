type Entry = { expiresAt: number; promise: Promise<unknown> };
const cache = new Map<string, Entry>();
export function cachedRequest<T>(key: string, loader: () => Promise<T>, ttlMs = 30000): Promise<T> {
  const now = Date.now();
  const hit = cache.get(key);
  if (hit && (hit.expiresAt === 0 || hit.expiresAt > now)) {
    cache.delete(key);
    cache.set(key, hit);
    return hit.promise as Promise<T>;
  }
  const entry: Entry = { expiresAt: 0, promise: Promise.resolve() };
  const request = Promise.resolve()
    .then(loader)
    .then(
      (value) => {
        entry.expiresAt = Date.now() + Math.max(0, ttlMs);
        return value;
      },
      (error) => {
        if (cache.get(key) === entry) cache.delete(key);
        throw error;
      },
    );
  entry.promise = request;
  cache.set(key, entry);
  while (cache.size > 180) {
    const oldest = cache.keys().next().value;
    if (oldest === undefined) break;
    cache.delete(oldest);
  }
  return request;
}
export function invalidateCachedRequests(prefix?: string): void {
  if (!prefix) {
    cache.clear();
    return;
  }
  for (const key of cache.keys()) if (key.startsWith(prefix)) cache.delete(key);
}
