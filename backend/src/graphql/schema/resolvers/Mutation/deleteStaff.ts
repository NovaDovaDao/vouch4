import type { CustomContext } from "../../../../server.js";
import type { MutationResolvers } from "./../../types.generated.js";
export const deleteStaff: NonNullable<
  MutationResolvers["deleteStaff"]
> = async (_parent, arg, ctx: CustomContext) => {
  const response = await ctx.db.user.delete({ where: { id: arg.id } });
  return !!response.id;
};
