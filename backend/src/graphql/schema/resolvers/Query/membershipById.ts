import { db } from "../../../../db.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const membershipById: NonNullable<QueryResolvers["membershipById"]> = (
  _parent,
  arg,
  _ctx
) => {
  return db.membershipNFT.findUniqueOrThrow({
    where: { id: arg.id },
  });
};
