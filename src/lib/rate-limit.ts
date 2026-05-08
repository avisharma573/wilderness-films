// ── In-memory rate limiter ────────────────────────────────────────────────────
// Suitable for single-instance deployments (Vercel hobby/pro with 1 instance).
// For multi-instance or Edge deployments, replace with Upstash Redis or similar.
//
// Design:
//   - Sliding window per IP address
//   - Automatic stale-entry cleanup to prevent unbounded memory growth

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

// Purge expired entries every 10 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of store) {
      if (now > entry.resetAt) store.delete(key)
    }
  }, 10 * 60 * 1000)
}

/**
 * Returns true when the request is within the allowed rate.
 * Returns false when the limit has been exceeded.
 *
 * @param key      Identifier (typically IP address)
 * @param limit    Max requests allowed in the window (default: 5)
 * @param windowMs Window size in milliseconds (default: 60 seconds)
 */
export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): boolean {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= limit) return false

  entry.count += 1
  return true
}
