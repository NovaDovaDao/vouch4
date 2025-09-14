import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const entitlementById: NonNullable<QueryResolvers['entitlementById']> = async (_parent, arg, ctx: CustomContext) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  return ctx.db.entitlement.findUniqueOrThrow({
    where: {
      id: arg.id,
      product: {
        tenancyId: ctx.user.tenancyId,
      },
    },
  });
};
