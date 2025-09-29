import { betterAuth, type BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI, oneTimeToken } from "better-auth/plugins";
import { expo } from "@better-auth/expo";
import { db } from "./db.js";
import "dotenv/config";
import { sendVerificationEmail } from "./email.js";

const config = {
  advanced: {
    cookiePrefix: "ale",
  },
  appName: "Alé",
  database: prismaAdapter(db, {
    provider: "postgresql",
    debugLogs: {
      create: true,
      update: true,
    },
  }),
  plugins: [
    openAPI(),
    oneTimeToken({
      expiresIn: 1,
    }),
    expo(),
  ],
  trustedOrigins: String(process.env.TRUSTED_ORIGINS).split(","),
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
        input: false,
      },
      isSuperUser: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
      isActive: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
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
        input: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        async before(user) {
          return {
            data: {
              ...user,
              name: undefined as unknown as string,
            },
          };
        },
      },
    },
  },
  emailVerification: {
    sendOnSignIn: true,
    sendOnSignUp: true,
    async sendVerificationEmail(data) {
      await sendVerificationEmail(data.user.email, data.url);
    },
  },
} satisfies BetterAuthOptions;

export const auth = betterAuth(config) as ReturnType<
  typeof betterAuth<typeof config>
>;

export type AuthUser = typeof auth.$Infer.Session.user;
