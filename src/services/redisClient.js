import redis from "ioredis"
import dotenv from "dotenv"
dotenv.config()

const redis = new redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  lazyConnect: true
})

redis.on("connect", () => {
  console.log("Connected Successfully!!");
})
redis.on("error", (e) => {
  console.error("Error!!", e);
})

export default redis;
