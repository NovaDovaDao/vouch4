import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { MutationResolvers } from "../../types.generated.js";
export const updateStaff: NonNullable<MutationResolvers["updateStaff"]> = (
  _parent,
  arg,
  ctx: CustomContext,
) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  return ctx.db.user.update({
    data: {
      email: arg.input.email ?? "",
      firstName: arg.input.firstName ?? "",
      lastName: arg.input.lastName ?? "",
    },
    where: {
      id: arg.id,
      tenancyId: ctx.user?.tenancyId!,
    },
  });
};
