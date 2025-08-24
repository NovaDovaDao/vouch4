import type { CustomContext } from "../../../../server.js";
import type { MutationResolvers } from "../../types.generated.js";
export const updateStaff: NonNullable<MutationResolvers['updateStaff']> = (
  _parent,
  arg,
  ctx: CustomContext,
) => {
  return ctx.db.user.update({
    data: {
      email: arg.data.email ?? "",
      firstName: arg.data.firstName ?? "",
      lastName: arg.data.lastName ?? "",
    },
    where: {
      id: arg.id,
      tenancyId: ctx.user?.tenancyId!,
    },
  });
};
