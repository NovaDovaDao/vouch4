import type { CustomContext } from "../../../../server.js";
import type { MutationResolvers } from "./../../types.generated.js";
import { db } from "../../../../db.js";
import { errors } from "../../../errors.js";
import { randomUUID } from "crypto";
import { sendSetPasswordEmail } from "../../../../email.js";

export const createStaff: NonNullable<
  MutationResolvers["createStaff"]
> = async (_parent, { data }, ctx: CustomContext) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  const user = await db.user.create({
    data: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      category: "STAFF",
      tenancyId: ctx.user.tenancyId,
      emailVerified: false,
    },
  });

  if (!user) {
    throw errors.couldNotCreateUser();
  }

  const token = randomUUID();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  await db.invitationToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    },
  });

  // TODO: Make this URL configurable
  const setPasswordUrl = `http://localhost:1337/set-password/${token}`;
  await sendSetPasswordEmail(user.email, setPasswordUrl);

  return user;
};
