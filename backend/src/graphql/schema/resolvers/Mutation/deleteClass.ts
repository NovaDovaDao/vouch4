import type { CustomContext } from "../../../../server.js";
import type { MutationResolvers } from "./../../types.generated.js";
export const deleteClass: NonNullable<
  MutationResolvers["deleteClass"]
> = async (_parent, arg, ctx: CustomContext) => {
  const response = await ctx.db.class.delete({ where: { id: arg.id } });
  return !!response.id;
};
