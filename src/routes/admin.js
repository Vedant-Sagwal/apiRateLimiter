import { Router } from "express";
import { config } from "../config.js";
import { redis } from "../services/redisClient.js";

const r = Router();

r.get("/health", async (req, res) => {
  try {
    await redis.ping();
    res.json({ ok: true, redis: "up" })
  } catch (ex) {
    res.status(500).json({ ok: false, redis: "down" });
  }
});

// view current policy
r.get("/config", (req, res) => {
  res.json({ policy: config.policy, identity: config.identity });
});

r.post("/config", (req, res) => {
  const { strategy, windowSeconds, maxRequests, identityMode, identityHeader } = req.body || {};
  if (strategy) config.policy.strategy = String(strategy).toLowerCase();
  if (Number.isFinite(Number(windowSeconds))) config.policy.windowSeconds = Number(windowSeconds);
  if (Number.isFinite(Number(maxRequests))) config.policy.maxRequests = Number(maxRequests);
  if (identityMode) config.identity.mode = String(identityMode).toLowerCase();
  if (identityHeader) config.identity.header = String(identityHeader).toLowerCase();
  res.json({ updated: true, policy: config.policy, identity: config.identity });
});

export default r;
