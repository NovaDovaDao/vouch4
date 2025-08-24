import type { CustomContext } from "../../../../server.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const staff: NonNullable<QueryResolvers['staff']> = (
  _parent,
  _arg,
  ctx: CustomContext
) => {
  return ctx.db.user.findMany({
    where: { category: "STAFF" },
  });
};
