import Redis from "ioredis";

const serverRedis = new Redis(
  process.env.REDIS_URL || "redis://localhost:6379",
);

export default serverRedis;
