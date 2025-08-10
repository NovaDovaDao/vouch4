import { db } from "../../../db.ts";
import type { QueryResolvers } from "./../../types.generated.ts";
export const gyms: NonNullable<QueryResolvers["gyms"]> = (
  _parent,
  _arg,
  _ctx
) => {
  return db.gym.findMany();
};
