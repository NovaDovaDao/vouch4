import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const scheduledClassById: NonNullable<QueryResolvers['scheduledClassById']> = async (_parent, arg, ctx: CustomContext) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  return ctx.db.scheduledClass.findUniqueOrThrow({
    where: {
      id: arg.id,
      classTemplate: { gym: { tenancyId: ctx.user.tenancyId } },
    },
  });
};
