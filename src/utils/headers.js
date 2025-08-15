export function setLimitHeaders(res, { limit, remaining, resetEpochSec }) {
  res.setHeader("X-RateLimit-limit", String(limit));
  res.setHeader("X-RateLimit-remaining", String(remaining));
  res.setHeader("X-RateLimit-reset", String(resetEpochSec));
}
