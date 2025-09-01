import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { MutationResolvers } from "./../../types.generated.js";
export const deleteMember: NonNullable<
  MutationResolvers["deleteMember"]
> = async (_parent, arg, ctx: CustomContext) => {
  const response = await ctx.db.user.delete({ where: { id: arg.id } });
  return !!response.id;
};
