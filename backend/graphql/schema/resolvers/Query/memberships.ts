import { db } from "../../../db.ts";
import type { QueryResolvers } from "./../../types.generated.ts";
export const memberships: NonNullable<QueryResolvers['memberships']> = (
  _parent,
  _arg,
  _ctx
) => {
  return db.membershipNFT.findMany();
};
