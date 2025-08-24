import { createGraphQLError } from "graphql-yoga";
import type { CustomContext } from "../../../../server.js";
import type { MutationResolvers } from "./../../types.generated.js";
export const updateTenancy: NonNullable<MutationResolvers['updateTenancy']> = (
  _parent,
  arg,
  ctx: CustomContext
) => {
  if (ctx.user?.tenancyId !== arg.id)
    throw createGraphQLError(
      "Wow, these are not the drones you are looking for!"
    );

  return ctx.db.tenancy.update({
    data: {
      contactEmail: arg.data.contactEmail ?? "",
      name: arg.data.name ?? "",
      legalName: arg.data.legalName ?? null,
    },
    where: { id: arg.id },
  });
};
