import type { MutationResolvers } from "./../../types.generated.js";
import { errors } from "../../../errors.js";
import type { CustomContext } from "../../../../server.js";

export const updateMember: NonNullable<
  MutationResolvers["updateMember"]
> = async (_parent, arg, ctx: CustomContext) => {
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
