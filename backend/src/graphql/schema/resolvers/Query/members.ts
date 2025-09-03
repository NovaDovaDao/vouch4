import type { CustomContext } from "../../../../server.js";
import type { QueryResolvers } from "./../../types.generated.js";
import { errors } from "../../../errors.js";
export const members: NonNullable<QueryResolvers['members']> = async (
  _parent,
  _arg,
  ctx: CustomContext,
) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  return ctx.db.user.findMany({
    where: { tenancyId: ctx.user?.tenancyId, category: "MEMBER" },
  });
};
