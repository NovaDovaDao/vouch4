import { db } from "../../../../db.ts";
import type { QueryResolvers } from "./../../types.generated.ts";
export const memberById: NonNullable<QueryResolvers["memberById"]> = (
  _parent,
  arg,
  _ctx
) => {
  return db.user.findUniqueOrThrow({
    where: { id: arg.id, category: "MEMBER" },
  });
};
