import { CustomContext } from "../../../server.ts";
import type { QueryResolvers } from "./../../types.generated.ts";
export const staff: NonNullable<QueryResolvers['staff']> = (
  _parent,
  _arg,
  ctx: CustomContext
) => {
  return ctx.db.user.findMany({
    where: { category: "STAFF" },
  });
};
