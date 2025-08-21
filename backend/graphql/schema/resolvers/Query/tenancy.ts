import { db } from "../../../../db.ts";
import { CustomContext } from "../../../server.ts";
import type { QueryResolvers } from "./../../types.generated.ts";
export const tenancy: NonNullable<QueryResolvers["tenancy"]> = (
  _parent,
  _arg,
  ctx: CustomContext
) => {
  return db.tenancy.findUniqueOrThrow({
    where: { id: ctx.user?.tenancyId! },
  });
};
