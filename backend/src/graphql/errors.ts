import { createGraphQLError } from "graphql-yoga";

export const errors = {
  notAuthenticated: () =>
    createGraphQLError("Wow cowboy 🤠, you gotta login first!"),
  missingTenant: () =>
    createGraphQLError("This action requires a tenant."),
  alreadyHaveTenant: () =>
    createGraphQLError("You already have a tenancy."),
  notImplemented: () =>
    createGraphQLError("Not implemented yet."),
  couldNotCreateUser: () =>
    createGraphQLError("Could not create user."),
};
