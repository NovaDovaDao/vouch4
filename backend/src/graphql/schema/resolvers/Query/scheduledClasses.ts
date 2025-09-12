import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const scheduledClasses: NonNullable<QueryResolvers['scheduledClasses']> = async (_parent, { args }, ctx: CustomContext) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  return ctx.db.scheduledClass.findMany({
    where: {
      classTemplate: { gym: { tenancyId: ctx.user.tenancyId } },
      startTime: {
        gte: args.startDate!,
      },
      endTime: {
        lte: args.endDate!,
      },
    },
  });
};
