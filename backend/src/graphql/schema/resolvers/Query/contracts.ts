import { db } from "../../../../db.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const contracts: NonNullable<QueryResolvers["contracts"]> = (
  _parent,
  _arg,
  _ctx
) => {
  return db.userTenancyAgreement.findMany();
};
