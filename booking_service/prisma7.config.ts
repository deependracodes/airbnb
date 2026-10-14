/// <reference types="node" />
/*
It is a TypeScript directive called a triple-slash reference directive.

It tells the TypeScript compiler to explicitly include type definitions for a specific package—in this case, 
Node.js (@types/node)—for that single file, bypassing any restrictions imposed by your main tsconfig.json settings like rootDir.
*/
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "src/prisma/schema.prisma",
  migrations: {
    path: "src/prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"] ||""
  },
});
