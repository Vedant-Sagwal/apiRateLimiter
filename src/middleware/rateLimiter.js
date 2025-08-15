import { config1 } from "../config.js"
import slidingWindow from "../utils/slidingWindow.js";
import { tokenBucket } from "../utils/tokenBucket.js";
import { setLimitHeaders } from "../utils/headers.js"

function identityOf(req) {
  if (config1.identity.mode === "ip") { return req.ip };
  const val = (req.headers[config1.identity.header] || "").toString().trim();
  return val || req.ip; // fallback to IP if header missing
}

export async function rateLimiter(req, res, next) {
  const identity = identityOf(req);
  const maxRequests = config1.policy.maxRequests;
  const windowSize = config1.policy.windowSeconds;
  let outcome;
  if (config1.policy.stategy == "sliding-window") {
    outcome = await slidingWindow(identity, windowSize, maxRequests);
  }
  else {
    outcome = await tokenBucket(identity, windowSize, maxRequests);
  }
  setLimitHeaders(res, {
    limit: maxRequests,
    remaining: outcome.remaining,
    resetEpochSec: outcome.resetEpochSec
  });
  if (!outcome.allowed) {
    return res.status(429).json({
      error: "Too Many Requests",
      detail: `Retry after ${Math.max(outcome.resetEpochSec - Math.floor(Date.now() / 1000), 0)}s`,
    });
  }
  next();
}
