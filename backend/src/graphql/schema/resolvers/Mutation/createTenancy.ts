import { createGraphQLError } from "graphql-yoga";
import type { CustomContext } from "../../../../server.js";
import type { MutationResolvers } from "./../../types.generated.js";
import { auth } from "../../../../auth.js";

export const createTenancy: NonNullable<
  MutationResolvers["createTenancy"]
> = async (_parent, arg, ctx: CustomContext) => {
  if (ctx.user?.tenancyId)
    throw createGraphQLError("You already have a tenancy");

  const tenancy = await ctx.db.tenancy.create({
    data: {
      name: arg.data.name,
      contactEmail: arg.data.contactEmail,
      legalName: arg.data.legalName ?? null,
      tenancyOwnerUserId: ctx.user?.id ?? null,
    },
  });

  if (ctx.user) {
    // TODO: update user session
    const authContext = await auth.$context;
    const updatedUser = await authContext.internalAdapter.updateUser(
      ctx.user.id,
      {
        tenancyId: tenancy.id,
      }
    );
    console.log({ updatedUser });
  }

  return tenancy;
};
