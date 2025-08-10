import { db } from "../../../db.ts";
import type { QueryResolvers } from "./../../types.generated.ts";
export const classes: NonNullable<QueryResolvers['classes']> = (
  _parent,
  _arg,
  _ctx
) => {
  return db.class.findMany();
};
