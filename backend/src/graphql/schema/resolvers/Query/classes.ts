import { db } from "../../../../db.js";
import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const classes: NonNullable<QueryResolvers["classes"]> = async (
  _parent,
  _arg,
  ctx: CustomContext,
) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();
  const classes = await db.class.findMany({
    where: { gym: { tenancyId: ctx.user.tenancyId } },
    include: { gym: true, instructor: true },
  });
  return classes;
};
