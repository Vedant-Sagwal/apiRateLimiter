import redis1 from "../services/redisClient.js"

export default async function tokenBucket(key, windowSize, maxRequests) {
  const rate = (max / (windowSize * 1000)); //per second
  const zkey = `rl:tb:${key}`;
  const nowMS = Date.now();
  const data = await redis1.hmget(zkey, "tokens", "last");
  const tokens = data[0] ? Number(data[0]) : maxRequests;
  const last = data[1] ? Number(data[1]) : nowMS;

  let allowed, remaining, resetEpochSec;

  //refill
  const addedAfterLast = (nowMS - last) * rate;
  tokens = Math.min(maxRequests, (addedAfterLast + tokens));
  last = nowMS;
  if (tokens >= 1) {
    tokens--;
    allowed = true;
    remaining = tokens;
    const toFull = (maxRequests - tokens) / rate;
    resetEpochSec = Math.ceil((nowMS + toFull) / 1000);
  }
  else {
    allowed = false;
    remaining = 0;
    const waitTime = (1 - tokens) / rate;
    resetEpochSec = Math.ceil((nowMS + waitTime) / 1000);
  }
  await redis1.hset(zkey, { tokens, last });
  //expire if inactive
  await redis1.expire(zkey, Math.max(2, windowSize + 1));
  return { allowed, remaining, resetEpochSec };
}
