import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: import.meta.env.VITE_BETTER_AUTH_URL,
  plugins: [
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
