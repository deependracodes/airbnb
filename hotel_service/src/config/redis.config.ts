import Redis from "ioredis";
import { redisConfig } from ".";

// Singleton pattern to connect to Redis
function connectToRedis() {
    try {

        let connection: Redis;

        const configuration  = {
            port: redisConfig.REDIS_PORT,
            host: redisConfig.REDIS_HOST,
            maxRetriesPerRequest: null, // Disable automatic reconnection
        }

        return () => {
            if (!connection) {
                connection = new Redis(configuration);
                return connection;
            }

            return connection;
        }
        

    } catch (error) {
        console.error('Error connecting to Redis:', error);
        throw error;
    }
}

export const getRedisConnObject = connectToRedis();

