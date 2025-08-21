import { CustomContext } from "../../../server.ts";
import type { MutationResolvers } from "./../../types.generated.ts";
export const deleteGym: NonNullable<MutationResolvers["deleteGym"]> = async (
  _parent,
  arg,
  ctx: CustomContext
) => {
  const response = await ctx.db.gym.delete({ where: { id: arg.id } });
  return !!response.id;
};
