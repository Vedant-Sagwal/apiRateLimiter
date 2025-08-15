import express from "express";
import { config } from "./config.js";
import { redis } from "./services/redisClient.js";
import publicRoutes from "./routes/public.js";
import adminRoutes from "./routes/admin.js";
import { rateLimiter } from "./middleware/rateLimiter.js";

const app = express();

app.use(express.json())
app.use((req, res, next) => {
  if (req.path.startsWith("/admin")) return next();
  return rateLimiter(req, res, next);
})


app.use("/", publicRoutes);
app.use("/admin", adminRoutes);

const server = app.listen(config.port, async () => {
  try {
    await redis.connect();
  }
  catch (err) {
    console.error("Failed to Connect to Redis", err);
  }
  console.log(`Serve running on ${config.port} startegy : ${config.policy.stategy}`);
})

process.on("SIGINT", async () => {
  await redis.quit();
  server.close(() => {
    process.exit(0)
  })
})
