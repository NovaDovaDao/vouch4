import { db } from "../../../../db.js";
import type { Gym } from "../../types.generated.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const gymById: NonNullable<QueryResolvers["gymById"]> = (
  _parent,
  arg,
  _ctx
) => {
  return db.gym.findUniqueOrThrow({ where: { id: arg.id } }) as Promise<Gym>;
};
