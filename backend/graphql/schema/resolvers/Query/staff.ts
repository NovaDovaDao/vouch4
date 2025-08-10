import { db } from "../../../db.ts";
import type { QueryResolvers } from "./../../types.generated.ts";
export const staff: NonNullable<QueryResolvers['staff']> = (
  _parent,
  _arg,
  _ctx
) => {
  return db.user.findMany({
    where: { category: "STAFF" },
  });
};
