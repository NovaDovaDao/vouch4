import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { MutationResolvers } from "./../../types.generated.js";
export const updateTenancy: NonNullable<MutationResolvers["updateTenancy"]> = (
  _parent,
  arg,
  ctx: CustomContext,
) => {
  if (ctx.user?.tenancyId !== arg.id) throw errors.missingTenant();

  return ctx.db.tenancy.update({
    data: {
      contactEmail: arg.input.contactEmail ?? "",
      name: arg.input.name ?? "",
      legalName: arg.input.legalName ?? null,
    },
    where: { id: arg.id },
  });
};
