import type { CustomContext } from "../../../server.js";
import type { EntitlementResolvers } from "./../types.generated.js";
export const Entitlement: EntitlementResolvers = {
  product: (parent, _arg, ctx: CustomContext) =>
    ctx.db.product.findUniqueOrThrow({
      where: {
        id: parent.productId,
      },
    }),
  renter: (parent, _arg, ctx: CustomContext) =>
    ctx.db.user.findUnique({
      where: {
        id: parent.renterId!,
      },
    }),
  owner: (parent, _arg, ctx: CustomContext) =>
    ctx.db.user.findUniqueOrThrow({
      where: {
        id: parent.ownerId,
      },
    }),
};
