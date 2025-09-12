import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const contracts: NonNullable<QueryResolvers['contracts']> = (
  _parent,
  _arg,
  ctx: CustomContext,
) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  return ctx.db.userTenancyAgreement.findMany({
    where: { tenancyId: ctx.user.tenancyId },
  });
};
