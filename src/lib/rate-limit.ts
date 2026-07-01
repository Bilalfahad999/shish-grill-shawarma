// Simple in-memory rate limiter — fine for a single Node instance.
// TODO: swap for Upstash Redis or similar when deploying to multi-instance/edge.

const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit: number, windowMs: number): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (bucket.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  bucket.count += 1;
  return { allowed: true, remaining: limit - bucket.count };
}

export function getClientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0].trim() ?? headers.get("x-real-ip") ?? "unknown";
}
