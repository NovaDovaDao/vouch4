import { betterAuth, type BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI } from "better-auth/plugins";
import { db } from "./db.js";

const config = {
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
  plugins: [openAPI()],
  trustedOrigins: ["http://localhost:1337"],
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.JWT_SECRET_KEY as string,
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
} satisfies BetterAuthOptions;

export const auth = betterAuth(config) as ReturnType<
  typeof betterAuth<typeof config>
>;

export type AuthUser = typeof auth.$Infer.Session.user;
