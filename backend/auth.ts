import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI } from "better-auth/plugins";
import { db } from "./db.ts";

export const auth = betterAuth({
  appName: "Ascend",
  database: prismaAdapter(db, {
    provider: "postgresql",
    debugLogs: {
      create: true,
      update: true,
    },
  }),
  trustedOrigins: ["http://localhost:1337/"],
  emailAndPassword: {
    enabled: true,
  },
  plugins: [openAPI()],
  secret: Deno.env.get("JWT_SECRET_KEY"),
  session: {
    cookieCache: {
      enabled: true,
    },
  },
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: true,
      },
      lastName: {
        type: "string",
        required: true,
      },
      category: {
        type: "string",
        required: true,
      },
      isSuperUser: {
        type: "boolean",
        required: false,
        defaultValue: false,
      },
      isActive: {
        type: "boolean",
        required: false,
        defaultValue: true,
      },
      walletAddress: {
        type: "string",
        unique: true,
        required: false,
      },
      phoneNumber: {
        type: "string",
        unique: true,
        required: false,
      },
      tenancyId: {
        type: "string",
        required: false,
      },
    },
  },
});

export type AuthUser = typeof auth.$Infer.Session.user;
