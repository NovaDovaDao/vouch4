import { db } from "../../../../db.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const staffById: NonNullable<QueryResolvers["staffById"]> = (
  _parent,
  arg,
  _ctx
) => {
  return db.user.findUniqueOrThrow({
    where: { id: arg.id, category: "STAFF" },
  });
};
