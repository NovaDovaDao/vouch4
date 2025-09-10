import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const scheduledClassById: NonNullable<
  QueryResolvers["scheduledClassById"]
> = async (_parent, arg, ctx: CustomContext) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  const scheduledClass = await ctx.db.scheduledClass.findUniqueOrThrow({
    where: {
      id: arg.id,
      classTemplate: { gym: { tenancyId: ctx.user.tenancyId } },
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

  return {
    bookings: scheduledClass.bookings.map((b) => ({
      bookedAt: b.bookedAt,
      id: b.id,
      member: b.user,
    })),
    endTime: scheduledClass.endTime,
    gym: scheduledClass.classTemplate.gym,
    id: scheduledClass.id,
    name: scheduledClass.classTemplate.name,
    startTime: scheduledClass.startTime,
    instructor: scheduledClass.classTemplate.instructor,
  };
};
