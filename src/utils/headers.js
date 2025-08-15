export function setLimitHeaders(res, { limit, remaining, resetEpochSec }) {
  res.setHeader("X-rate-limit limit : ", String(limit));
  res.setHeader("X-rate-limit remaining : ", String(remaining));
  res.setHeader("X-rate-limit reset : ", String(resetEpochSec));
}
