import { db } from "../../../../db.ts";
import type { QueryResolvers } from "./../../types.generated.ts";
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
