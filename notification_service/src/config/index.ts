// This file contains all the basic configuration for the project. You can add more configurations as needed.

import dotenv from "dotenv";
dotenv.config();

type ServerConfig = {
  PORT: number;
};

type RedisConfig = {
  REDIS_PORT: number;
  REDIS_HOST: string;
};

type NodeMailerConfig = {
  MAIL_PASS?: string;
  MAIL_USER?: string;
};

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3000,
};

export const redisConfig: RedisConfig = {
  REDIS_PORT: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
};

export const mailerConfig: NodeMailerConfig = {
  MAIL_PASS: process.env.MAIL_PASS || "",
  MAIL_USER: process.env.MAIL_USER || "",
};
