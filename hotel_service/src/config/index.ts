// This file contains all the basic configuration for the project. You can add more configurations as needed.

import dotenv from "dotenv";
dotenv.config();

type ServerConfig = {
  PORT: number;
};

type DatabaseConfig = {
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_NAME: string;
  DB_PORT: number;
};

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3000,
};

export const dbConfig: DatabaseConfig = {
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "root",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT : Number(process.env.DB_PORT) || 3306,
  DB_NAME: process.env.DB_NAME || "airbnb",
};
