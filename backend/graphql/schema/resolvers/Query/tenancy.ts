import { db } from "../../../../db.ts";
import type { QueryResolvers } from "./../../types.generated.ts";
export const tenancy: NonNullable<QueryResolvers["tenancy"]> = (
  _parent,
  _arg,
  _ctx
) => {
  return db.tenancy.findUniqueOrThrow({
    where: { id: "123" },
  });
};
