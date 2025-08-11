import {
  createSchema,
  createYoga,
  YogaInitialContext,
  createGraphQLError,
} from "graphql-yoga";
import { typeDefs } from "./schema/typeDefs.generated.ts";
import { resolvers } from "./schema/resolvers.generated.ts";
import { db } from "../db.ts";
import { auth } from "../auth.ts";

export interface CustomContext extends YogaInitialContext {
  db: typeof db;
}

export const yogaServer = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  context: async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    console.log({ session });
    if (!session) {
      throw createGraphQLError("Wow cowboy 🤠, you gotta login first!");
    }
    return {
      db,
    };
  },
});
