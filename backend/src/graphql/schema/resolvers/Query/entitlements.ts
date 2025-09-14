import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const entitlements: NonNullable<QueryResolvers['entitlements']> = async (
  _parent,
  _arg,
  ctx: CustomContext,
) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  return ctx.db.entitlement.findMany({
    where: {
      ownerId: ctx.user.id,
    },
  });
};
