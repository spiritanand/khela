import Redis from "ioredis";

const serverRedis = new Redis(process.env.REDIS_URL!);

export default serverRedis;
