import type { CodegenConfig } from "npm:@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "**/schema.graphql",
  generates: {
    "graphql/schema": {},
  },
};
export default config;
