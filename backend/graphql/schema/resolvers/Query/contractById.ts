import { db } from "../../../db.ts";
import type { QueryResolvers } from "./../../types.generated.ts";
export const contractById: NonNullable<QueryResolvers['contractById']> = (
  _parent,
  arg,
  _ctx
) => {
  return db.userTenancyAgreement.findUniqueOrThrow({ where: { id: arg.id } });
};
