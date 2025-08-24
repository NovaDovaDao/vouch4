import { db } from "../../../../db.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const contractById: NonNullable<QueryResolvers['contractById']> = (
  _parent,
  arg,
  _ctx
) => {
  return db.userTenancyAgreement.findUniqueOrThrow({ where: { id: arg.id } });
};
