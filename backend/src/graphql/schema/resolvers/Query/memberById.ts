import type { CustomContext } from "../../../../server.js";
import type { QueryResolvers } from "./../../types.generated.js";
import { errors } from "../../../errors.js";
export const memberById: NonNullable<QueryResolvers["memberById"]> = async (
  _parent,
  arg,
  ctx: CustomContext,
) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  return ctx.db.user.findFirstOrThrow({
    where: { tenancyId: ctx.user?.tenancyId, category: "MEMBER", id: arg.id },
  });
};
