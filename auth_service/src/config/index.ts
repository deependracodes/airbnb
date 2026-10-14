// This file contains all the basic configuration for the project. You can add more configurations as needed.

import dotenv from "dotenv";
dotenv.config();

type ServerConfig = {
  PORT: number;
  HOTELS_SERVICE_URL: string;
  BOOKINGS_SERVICE_URL: string;
  REVIEW_SERVICE_URL: string;
};

type DbConfig = {
  MONGO_URI: string;
};

type RedisConfig = {
  REDIS_SERVER_URL: string;
  
};

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3000,
  HOTELS_SERVICE_URL: process.env.HOTELS_SERVICE_URL || "http://localhost:3001",
  BOOKINGS_SERVICE_URL:
    process.env.BOOKINGS_SERVICE_URL || "http://localhost:3002",
  REVIEW_SERVICE_URL: process.env.REVIEW_SERVICE_URL || "http://localhost:3003",
};

export const dbConfig: DbConfig = {
  MONGO_URI:
    process.env.MONGO_URI || "mongodb://localhost:27017/airbnb_auth_service",
};



export const redisConig: RedisConfig = {
  REDIS_SERVER_URL: process.env.REDIS_SERVER_URL || "redis://localhost:6379",
};
