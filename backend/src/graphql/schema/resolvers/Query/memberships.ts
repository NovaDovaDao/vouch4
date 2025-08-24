import { db } from "../../../../db.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const memberships: NonNullable<QueryResolvers['memberships']> = (
  _parent,
  _arg,
  _ctx
) => {
  return db.membershipNFT.findMany();
};
