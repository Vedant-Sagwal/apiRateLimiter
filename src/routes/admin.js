import { Router } from "express";
import { config1 } from "../config.js";
import redis1 from "../services/redisClient.js";

const r = Router();

r.get("/health", async (req, res) => {
  try {
    await redis1.ping();
    res.json({ ok: true, redis: "up" })
  } catch (ex) {
    res.status(500).json({ ok: false, redis: "down" });
  }
});

// view current policy
r.get("/config", (req, res) => {
  res.json({ policy: config1.policy, identity: config1.identity });
});

r.post("/config", (req, res) => {
  const { strategy, windowSeconds, maxRequests, identityMode, identityHeader } = req.body || {};
  if (strategy) config1.policy.strategy = String(strategy).toLowerCase();
  if (Number.isFinite(Number(windowSeconds))) config1.policy.windowSeconds = Number(windowSeconds);
  if (Number.isFinite(Number(maxRequests))) config1.policy.maxRequests = Number(maxRequests);
  if (identityMode) config1.identity.mode = String(identityMode).toLowerCase();
  if (identityHeader) config1.identity.header = String(identityHeader).toLowerCase();
  res.json({ updated: true, policy: config1.policy, identity: config1.identity });
});

export default r;
