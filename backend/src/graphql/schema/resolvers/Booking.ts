import type { CustomContext } from "../../../server.js";
import type { BookingResolvers } from "./../types.generated.js";
export const Booking: BookingResolvers = {
  member: (parent, _arg, ctx: CustomContext) => {
    return ctx.db.user.findUniqueOrThrow({ where: { id: parent.userId } });
  },
};
