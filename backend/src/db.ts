import { PrismaClient } from "./prisma/generated/client.js";

export const db = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL as string,
  log: ["error", "warn", "query", "info"],
});
