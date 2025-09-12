import { errors } from "../../../errors.js";
import type { MutationResolvers } from "./../../types.generated.js";
import { auth } from "../../../../auth.js";
import type { CustomContext } from "../../../../server.js";

export const setInitialPassword: NonNullable<
  MutationResolvers["setInitialPassword"]
> = async (_parent, args, ctx: CustomContext) => {
  const invitationToken = await ctx.db.invitationToken.findUniqueOrThrow({
    where: { token: args.token },
  });

  if (invitationToken.expiresAt < new Date()) {
    throw errors.expiredToken();
  }

  const user = await ctx.db.user.findUniqueOrThrow({
    where: { id: invitationToken.userId },
  });

  const context = await auth.$context;
  const hashedPassword = await context.password.hash(args.password);
  await context.internalAdapter.createAccount({
    accountId: user.email,
    password: hashedPassword,
    userId: user.id,
    providerId: "credential",
  });

  await ctx.db.$transaction([
    ctx.db.invitationToken.delete({
      where: { id: invitationToken.id },
    }),
    ctx.db.user.update({
      data: {
        emailVerified: true,
      },
      where: {
        id: invitationToken.userId,
      },
    }),
  ]);

  return {
    ...user,
    __typename: "Staff",
  };
};
