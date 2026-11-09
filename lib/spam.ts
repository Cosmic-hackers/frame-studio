const hits = new Map<string, number[]>();

export function assessTiming(startedAt: number, now = Date.now()) {
  if (!Number.isFinite(startedAt)) return "missing-time";
  const elapsed = now - startedAt;
  if (elapsed < 1200) return "too-fast";
  if (elapsed > 1000 * 60 * 60 * 12) return "expired";
  return null;
}

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((stamp) => now - stamp < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}

export function countLinks(value: string) {
  return value.match(/https?:\/\/|www\./gi)?.length ?? 0;
}
