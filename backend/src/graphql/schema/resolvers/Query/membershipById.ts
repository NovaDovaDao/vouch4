import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const membershipById: NonNullable<QueryResolvers['membershipById']> = (
  _parent,
  arg,
  ctx: CustomContext,
) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  return ctx.db.membershipNFT.findUniqueOrThrow({
    where: { id: arg.id, tenancyId: ctx.user.tenancyId },
  });
};
