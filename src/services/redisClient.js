import redis from "ioredis"
import dotenv from "dotenv"
dotenv.config()

const redis1 = new redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  lazyConnect: true
})

redis1.on("connect", () => {
  console.log("Connected Successfully!!");
})
redis1.on("error", (e) => {
  console.error("Error!!", e);
})

export default redis1;
