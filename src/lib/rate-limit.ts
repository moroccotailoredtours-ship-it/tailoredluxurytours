/**
 * Minimal in-memory sliding-window limiter.
 * NOTE: on serverless hosts each instance has its own memory, so this is best-effort protection only.
 * For stronger guarantees, swap in a shared store (e.g. Upstash Redis / Vercel KV) behind the same signature.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60_000, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  }
  return true;
}

export const _resetRateLimit = () => hits.clear();
