import { betterAuth } from "npm:better-auth";
import { prismaAdapter } from "npm:better-auth/adapters/prisma";
import { db } from "./db.ts";

export const auth = betterAuth({
  advanced: {
    cookiePrefix: "ascend",
  },
  appName: "Ascend",
  database: prismaAdapter(db, {
    provider: "postgresql",
    debugLogs: {
      create: true,
      update: true,
    },
  }),
  trustedOrigins: ["http://localhost:1337"],
  emailAndPassword: {
    enabled: true,
  },
  secret: Deno.env.get("JWT_SECRET_KEY"),
  session: {
    cookieCache: {
      enabled: true,
    },
    expiresIn: 60 * 60 * 24 * 7, // 7 days?
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
