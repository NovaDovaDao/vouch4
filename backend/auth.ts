import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI } from "better-auth/plugins";

import { PrismaClient } from "./prisma/generated/client.ts";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

export const auth = betterAuth({
  appName: "Ascend",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [openAPI()],
  session: {
    cookieCache: {
      enabled: true,
    },
  },
  secret: process.env.JWT_SECRET_KEY,
});
