import { db } from "../../../../db.ts";
import type { QueryResolvers } from "./../../types.generated.ts";
export const contracts: NonNullable<QueryResolvers["contracts"]> = (
  _parent,
  _arg,
  _ctx
) => {
  return db.userTenancyAgreement.findMany();
};
