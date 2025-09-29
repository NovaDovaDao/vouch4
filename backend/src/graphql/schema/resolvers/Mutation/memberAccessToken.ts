import { auth } from "../../../../auth.js";
import type { CustomContext } from "../../../../server.js";
import type { MutationResolvers } from "./../../types.generated.js";
export const memberAccessToken: NonNullable<MutationResolvers['memberAccessToken']> = async (_parent, _arg, ctx: CustomContext) => {
  const response = await auth.api.createApiKey({
    body: {
      expiresIn: 60,
      metadata: {
        foo: "bar",
      },
      name: "one-time-access-token",
      permissions: {
        foo: ["bar"],
      },
      prefix: "aleapp",
      rateLimitEnabled: true,
      rateLimitMax: 1,
      userId: ctx.user?.id,
    },
  });
  return response.key;
};
