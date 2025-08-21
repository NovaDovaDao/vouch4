import { CustomContext } from "../../../server.ts";
import type { MutationResolvers } from "./../../types.generated.ts";
export const deleteClass: NonNullable<
  MutationResolvers["deleteClass"]
> = async (_parent, arg, ctx: CustomContext) => {
  const response = await ctx.db.class.delete({ where: { id: arg.id } });
  return !!response.id;
};
