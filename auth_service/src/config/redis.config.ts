import IORedis, { Redis } from "ioredis";
import { redisConig } from ".";

function connectToRedis() {
  try {
    let connection: Redis;

    return () => {
      if (!connection) {
        connection = new IORedis(redisConig.REDIS_SERVER_URL, {
          enableOfflineQueue: false,
        });
        return connection;
      }

      return connection;
    };
  } catch (error) {
    console.error("Error connecting to Redis:", error);
    throw error;
  }
}

export const getRedisConnObject = connectToRedis();
