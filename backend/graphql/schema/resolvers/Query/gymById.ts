import { db } from "../../../db.ts";
import { Gym } from "../../types.generated.ts";
import { QueryResolvers } from "./../../types.generated.ts";
export const gymById: NonNullable<QueryResolvers['gymById']> = (
  _parent,
  arg,
  _ctx
) => {
  return db.gym.findUniqueOrThrow({ where: { id: arg.id } }) as Promise<Gym>;
};
