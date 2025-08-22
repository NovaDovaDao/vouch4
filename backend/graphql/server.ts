import {
  createSchema,
  createYoga,
  YogaInitialContext,
  createGraphQLError,
} from "npm:graphql-yoga";
import { typeDefs } from "./schema/typeDefs.generated.ts";
import { resolvers } from "./schema/resolvers.generated.ts";
import { db } from "../db.ts";
import { auth, AuthUser } from "../auth.ts";
import { verifyJWT } from "../jwt.ts";

export interface CustomContext extends YogaInitialContext {
  db: typeof db;
  user?: AuthUser;
  isInternal: boolean;
}

export const yogaServer = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  logging: "debug",
  context: async ({ request, params }) => {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) {
      const internalAccessToken = await verifyJWT(
        request.headers.get("authorization")?.split("bearer").at(1)?.trim() ??
          ""
      );
      if (!internalAccessToken)
        throw createGraphQLError("Wow cowboy 🤠, you gotta login first!");
    }

    return {
      db,
      user: session?.user,
      isInternal: !session?.user,
      request,
      params,
    } as any;
  },
});
