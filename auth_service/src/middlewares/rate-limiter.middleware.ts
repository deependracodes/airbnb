import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { getRedisConnObject } from "../config/redis.config";

// Get the Redis instance using your factory
const redisClient = getRedisConnObject();

export const globalLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: async (command: string, ...args: string[]) => {
      return (await redisClient.call(command, ...args)) as any;
    },
    prefix: "rl:global:",
  }),
  // windowMs: 15 * 60 * 1000, // 15 minutes
  // 	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  windowMs: 60 * 1000, // 1 minute window
  max: 10, // Maximum 10 calls per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests from this IP address, please try again later.",
  },
});

export const strictApiLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: async (command: string, ...args: string[]) => {
      return (await redisClient.call(command, ...args)) as any;
    },
    prefix: "rl:strict:",
  }),
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Rate limit exceeded for sensitive endpoints, please slow down.",
  },
});
