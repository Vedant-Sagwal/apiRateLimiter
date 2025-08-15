import redis from "../services/redisClient.js";

async function slidingWindow(key, windowSize, maxRequests) {
  const nowMS = Date.now();
  const windowStart = nowMS - windowSize * 1000; //when window was started

  const zkey = `rl:sw:{key}`;

  //remove old enteries
  await redis.zremrangebyscore(zkey, 0, windowStart);

  //count of number of requests in windoeSize
  const count = await redis.zcard(zkey);

  if (count > maxRequests) {
    const earliest = await redis.zrange(zkey, 0, 0, "WITHSCORES");
    const earliestScore = earliest?.[1] ? Number(earliest[1]) : nowMS;
    const resetEpochSec = Math.ceil((earliestScore + windowSize * 1000) / 1000)
    return { allowed: false, remaining: 0, resetEpochSec: resetEpochSec }
  }

  //add to redis
  redis.zadd(zkey, nowMS, String(nowMS));

  //expire the key if inactive
  redis.expire(zkey, Math.max(windowSize + 1, 2));

  const remaining = maxRequests - (count + 1);
  const earliest = await redis.zrange(zkey, 0, 0, "WITHSCORES");
  const earliestScore = earliest?.[1] ? Number(earliest[1]) : nowMS;
  const resetEpochSec = Math.ceil((windowSize + earliestScore * 1000) / 1000)
  return { allowed: true, remaining: remaining, resetEpochSec: resetEpochSec }
}
