import type { CustomContext } from "../../../server.js";
import type { MemberResolvers } from "./../types.generated.js";
export const Member: MemberResolvers = {
  entitlements: (parent, _arg, ctx: CustomContext) =>
    ctx.db.entitlement.findMany({
      where: {
        ownerId: parent.id,
        renterId: parent.id,
        product: {
          tenancyId: ctx.user?.tenancyId!,
        },
      },
    }),
};
