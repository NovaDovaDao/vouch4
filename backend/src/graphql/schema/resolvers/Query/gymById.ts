import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const gymById: NonNullable<QueryResolvers['gymById']> = (
  _parent,
  arg,
  ctx: CustomContext,
) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  return ctx.db.gym.findUniqueOrThrow({ where: { id: arg.id } });
};
