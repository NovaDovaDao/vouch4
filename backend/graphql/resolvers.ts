import { db } from "./db.ts";
import { Resolvers } from "./schema/types.generated.ts";

export const resolvers: Resolvers = {
  Query: {
    gym: (_, args) =>
      db.gym.findFirstOrThrow({
        where: { id: args.id },
      }),
    gyms: (_, _args, ctx) => {
      console.log("todo", ctx);
      return db.gym.findMany();
    },

    tenancy: (_, args) =>
      db.tenancy.findFirstOrThrow({ where: { id: args.id } }),
  },
};
