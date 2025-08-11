import { PrismaClient } from "./prisma/generated/client.ts";

export const db = new PrismaClient({
  datasourceUrl: Deno.env.get("DATABASE_URL"),
  log: ["error", "warn"],
});
