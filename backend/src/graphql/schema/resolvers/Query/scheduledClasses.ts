import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const scheduledClasses: NonNullable<
  QueryResolvers["scheduledClasses"]
> = async (_parent, { args }, ctx: CustomContext) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  const results = await ctx.db.scheduledClass.findMany({
    where: {
      classTemplate: { gym: { tenancyId: ctx.user.tenancyId } },
      startTime: {
        gte: args.startDate!,
      },
      endTime: {
        lte: args.endDate!,
      },
    },
    include: {
      classTemplate: {
        include: {
          gym: true,
          instructor: true,
        },
      },
      bookings: {
        include: {
          user: true,
        },
      },
    },
  });

  return results.map((r) => {
    return {
      bookings: r.bookings.map((b) => ({
        ...b,
        member: b.user,
      })),
      startTime: r.startTime,
      endTime: r.endTime,
      gym: r.classTemplate.gym,
      id: r.id,
      name: r.classTemplate.name,
      instructor: r.classTemplate.instructor,
    };
  });
};
