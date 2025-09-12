import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { QueryResolvers } from "./../../types.generated.js";

export const classTemplates: NonNullable<QueryResolvers['classTemplates']> = async (_parent, _arg, ctx: CustomContext) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  return ctx.db.classTemplate.findMany({
    where: { gym: { tenancyId: ctx.user.tenancyId } },
  });
};
