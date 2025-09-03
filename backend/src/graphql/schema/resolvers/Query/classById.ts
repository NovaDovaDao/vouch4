import { db } from "../../../../db.js";
import { errors } from "../../../errors.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const classById: NonNullable<QueryResolvers['classById']> = (
  _parent,
  arg,
  ctx,
) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();
  return db.class.findUniqueOrThrow({
    where: { id: arg.id, gym: { tenancyId: ctx.user.tenancyId } },
    include: { gym: true, instructor: true },
  });
};
