import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const products: NonNullable<QueryResolvers['products']> = async (
  _parent,
  _arg,
  ctx: CustomContext,
) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  return ctx.db.product.findMany({
    where: {
      tenancyId: ctx.user.tenancyId,
    },
  });
};
