import { errors } from "../../../errors.js";
import type { CustomContext } from "../../../../server.js";
import type { MutationResolvers } from "./../../types.generated.js";

export const deleteClassTemplate: NonNullable<MutationResolvers['deleteClassTemplate']> = async (_parent, { id }, ctx: CustomContext) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  await ctx.db.classTemplate.delete({ where: { id } });

  return true;
};
