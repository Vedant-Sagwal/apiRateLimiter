import dotenv, { config } from "dotenv";
dotenv.config()

//convert the values from .env to int
function int(name, def) {
  const v = parseInt(process.env[name], 10);
  return Number.isFinite(v) ? v : def;
}

export const config = {
  port: int("PORT", 3000),
  redis: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: int("REDIS_PORT", 6379)
  },
  policy: {
    stategy: (process.env.RATE_STRATEGY || "sliding-window").toLowerCase(),
    maxRequests: int("MAX_REQUESTS", 100),
    windowSeconds: int("WINDOW_SIZE", 60)
  },
  identity: {
    mode: (process.env.IDENTITY_MODE || "ip").toLowerCase(),
    header: (process.env.IDENTITY_HEADER || "x-api-key").toLowerCase()
  }
}
