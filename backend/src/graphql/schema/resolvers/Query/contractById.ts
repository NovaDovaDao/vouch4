import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const contractById: NonNullable<QueryResolvers['contractById']> = (
  _parent,
  arg,
  ctx: CustomContext,
) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  return ctx.db.userTenancyAgreement.findUniqueOrThrow({
    where: { id: arg.id, tenancyId: ctx.user.tenancyId },
  });
};
