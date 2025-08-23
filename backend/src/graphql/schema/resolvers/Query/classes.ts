import { db } from "../../../../db.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const classes: NonNullable<QueryResolvers["classes"]> = async (
  _parent,
  _arg,
  _ctx
) => {
  const classes = await db.class.findMany({
    include: { gym: true, instructor: true },
  });
  return classes;
};
