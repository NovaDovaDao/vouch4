import { db } from "../../../../db.ts";
import type { QueryResolvers } from "./../../types.generated.ts";
export const staffById: NonNullable<QueryResolvers["staffById"]> = (
  _parent,
  arg,
  _ctx
) => {
  return db.user.findUniqueOrThrow({
    where: { id: arg.id, category: "STAFF" },
  });
};
