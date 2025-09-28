import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { config } from "@/constants/config";

export const authClient = createAuthClient({
  baseURL: config.AUTH_URL,
  plugins: [
    expoClient({
      scheme: "aleapp",
      storagePrefix: "aleapp",
      storage: SecureStore,
    }),
    inferAdditionalFields({
      user: {
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
          defaultValue: true,
          input: false,
        },
        walletAddress: {
          type: "string",
          unique: true,
          required: false,
          input: false,
        },
        phoneNumber: {
          type: "string",
          unique: true,
          required: false,
          input: false,
        },
        tenancyId: {
          type: "string",
          required: false,
          input: false,
        },
      },
    }),
  ],
});

export type BetterAuthUser = typeof authClient.$Infer.Session.user;
