import type { CustomContext } from "../../../../server.js";
import type { MutationResolvers } from "./../../types.generated.js";
export const deleteGym: NonNullable<MutationResolvers['deleteGym']> = async (
  _parent,
  arg,
  ctx: CustomContext
) => {
  const response = await ctx.db.gym.delete({ where: { id: arg.id } });
  return !!response.id;
};
