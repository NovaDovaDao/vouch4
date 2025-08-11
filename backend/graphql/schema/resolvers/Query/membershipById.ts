import { db } from "../../../../db.ts";
import type { QueryResolvers } from "./../../types.generated.ts";
export const membershipById: NonNullable<QueryResolvers["membershipById"]> = (
  _parent,
  arg,
  _ctx
) => {
  return db.membershipNFT.findUniqueOrThrow({
    where: { id: arg.id },
  });
};
