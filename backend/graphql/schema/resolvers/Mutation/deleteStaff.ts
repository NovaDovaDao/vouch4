import { CustomContext } from "../../../server.ts";
import type { MutationResolvers } from "./../../types.generated.ts";
export const deleteStaff: NonNullable<
  MutationResolvers["deleteStaff"]
> = async (_parent, arg, ctx: CustomContext) => {
  const response = await ctx.db.user.delete({ where: { id: arg.id } });
  return !!response.id;
};
