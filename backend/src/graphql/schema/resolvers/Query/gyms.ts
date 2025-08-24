import { db } from "../../../../db.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const gyms: NonNullable<QueryResolvers['gyms']> = (
  _parent,
  _arg,
  _ctx
) => {
  return db.gym.findMany();
};
