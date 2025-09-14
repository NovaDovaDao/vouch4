import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const members: NonNullable<QueryResolvers['members']> = async (
  _parent,
  _arg,
  ctx: CustomContext,
) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();
  const tenancyId = ctx.user.tenancyId;

  return ctx.db.user.findMany({
    where: {
      category: "MEMBER",
      OR: [
        {
          tenancyId,
        },
        {
          entitlements: {
            some: {
              product: {
                tenancyId,
              },
            },
          },
        },
        {
          userGymAssociations: {
            some: {
              gym: {
                tenancyId,
              },
            },
          },
        },
      ],
    },
  });
};
