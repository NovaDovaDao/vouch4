import { db } from "../../../../db.ts";
import type { QueryResolvers } from "./../../types.generated.ts";
export const members: NonNullable<QueryResolvers["members"]> = (
  _parent,
  _arg,
  _ctx
) => {
  return db.user.findMany({
    where: { category: "MEMBER" },
  });
};
