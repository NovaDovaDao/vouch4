import { GraphQLScalarType } from "npm:graphql";
export const Json = new GraphQLScalarType({
  name: "Json",
  description: "Json description",
  serialize: (value) => {
    /* Implement logic to turn the returned value from resolvers to a value that can be sent to clients */
    return value;
  },
  parseValue: (value) => {
    /* Implement logic to parse input that was sent to the server as variables */
    return value;
  },
  parseLiteral: (ast) => {
    /* Implement logic to parse input that was sent to the server as literal values (string, number, or boolean) */
    return ast;
  },
});
