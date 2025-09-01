import type { CustomContext } from "../../../../server.js";
import type { MutationResolvers } from "./../../types.generated.js";
import { auth } from "../../../../auth.js";
import { db } from "../../../../db.js";
import { errors } from "../../../errors.js";

export const createStaff: NonNullable<
  MutationResolvers["createStaff"]
> = async (_parent, { data }, ctx: CustomContext) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  const response = await auth.api.signUpEmail({
    body: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      name: "",
      password: data.email,
    },
  });
  const user = db.user.update({
    data: {
      category: "STAFF",
      tenancyId: ctx.user.tenancyId,
    },
    where: {
      id: response.user.id,
    },
  });

  if (!user) {
    throw errors.couldNotCreateUser();
  }

  return user;
};
