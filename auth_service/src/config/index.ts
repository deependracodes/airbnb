// This file contains all the basic configuration for the project. You can add more configurations as needed.

import dotenv from "dotenv";
dotenv.config();

type ServerConfig = {
  PORT: number;
};

type DbConfig = {
  MONGO_URI: string;
};

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3000,
};

export const dbConfig: DbConfig = {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/airbnb_auth_service",
};