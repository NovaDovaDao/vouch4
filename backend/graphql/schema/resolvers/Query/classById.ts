import { db } from "../../../../db.ts";
import type { QueryResolvers } from "./../../types.generated.ts";
export const classById: NonNullable<QueryResolvers["classById"]> = (
  _parent,
  arg,
  _ctx
) => {
  return db.class.findUniqueOrThrow({ where: { id: arg.id } });
};
