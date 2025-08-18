import { createGraphQLError } from "graphql-yoga";
import { CustomContext } from "../../../server.ts";
import type { MutationResolvers } from "./../../types.generated.ts";
export const createStaff: NonNullable<MutationResolvers["createStaff"]> = (
  _parent,
  arg,
  ctx: CustomContext
) => {
  if (!ctx.user?.tenancyId)
    throw createGraphQLError("Staff must be associated to a tenancy");

  return ctx.db.user.create({
    data: {
      category: "STAFF",
      email: arg.data.email,
      emailVerified: false,
      firstName: arg.data.firstName,
      lastName: arg.data.lastName,
      tenancyId: ctx.user.tenancyId,
    },
  });
};
