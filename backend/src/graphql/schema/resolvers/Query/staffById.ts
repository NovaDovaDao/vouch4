import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const staffById: NonNullable<QueryResolvers['staffById']> = (
  _parent,
  arg,
  ctx: CustomContext,
) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  return ctx.db.user.findUniqueOrThrow({
    where: { id: arg.id, category: "STAFF", tenancyId: ctx.user.tenancyId },
  });
};
