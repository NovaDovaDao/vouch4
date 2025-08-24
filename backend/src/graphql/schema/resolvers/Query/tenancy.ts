import { db } from "../../../../db.js";
import type { CustomContext } from "../../../../server.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const tenancy: NonNullable<QueryResolvers['tenancy']> = (
  _parent,
  _arg,
  ctx: CustomContext
) => {
  return db.tenancy.findUniqueOrThrow({
    where: { id: ctx.user?.tenancyId! },
  });
};
