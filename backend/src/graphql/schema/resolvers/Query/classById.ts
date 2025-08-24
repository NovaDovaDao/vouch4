import { db } from "../../../../db.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const classById: NonNullable<QueryResolvers['classById']> = (
  _parent,
  arg,
  _ctx
) => {
  return db.class.findUniqueOrThrow({
    where: { id: arg.id },
    include: { gym: true, instructor: true },
  });
};
