import type { ScheduledClassResolvers } from "./../types.generated.js";
export const ScheduledClass: ScheduledClassResolvers = {
  bookings: (parent, _arg, ctx) => {
    return ctx.db.booking.findMany({
      where: { scheduledClassId: parent.id },
    });
  },
};
