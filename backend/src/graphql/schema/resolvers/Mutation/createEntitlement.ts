import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import { type MutationResolvers } from "../../types.generated.js";

export const createEntitlement: NonNullable<MutationResolvers['createEntitlement']> = async (_parent, arg, ctx: CustomContext) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  const { productId, ownerId, usesLeft = 0 } = arg.input;

  const validFrom = new Date(arg.input.validFrom);
  const expiresAt = arg.input.expiresAt
    ? new Date(arg.input.expiresAt)
    : new Date();

  const entitlement = await ctx.db.entitlement.create({
    data: {
      product: {
        connect: {
          id: productId,
        },
      },
      owner: {
        connect: {
          id: ownerId,
        },
      },
      validFrom,
      expiresAt,
      usesLeft,
    },
  });

  return entitlement;
};
