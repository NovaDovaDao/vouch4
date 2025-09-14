import type { CodegenConfig } from "@graphql-codegen/cli";
import { defineConfig } from "@eddeee888/gcg-typescript-resolver-files";

const config: CodegenConfig = {
  schema: "**/schema.graphql",
  generates: {
    "src/graphql/schema": defineConfig({
      typesPluginsConfig: {
        mappers: {
          Booking: "../../prisma/generated/client.js#Booking as BookingModel",
          CheckIn: "../../prisma/generated/client.js#CheckIn as CheckInModel",
          ClassTemplate:
            "../../prisma/generated/client.js#ClassTemplate as ClassTemplateModel",
          Gym: "../../prisma/generated/client.js#Gym as GymModel",
          Member: "../../prisma/generated/client.js#User as UserModel",
          Entitlement:
            "../../prisma/generated/client.js#Entitlement as EntitlementModel",
          Product: "../../prisma/generated/client.js#Product as ProductModel",
          Person: "../../prisma/generated/client.js#User as UserModel",
          ScheduledClass:
            "../../prisma/generated/client.js#ScheduledClass as ScheduledClassModel",
          Staff: "../../prisma/generated/client.js#User as UserModel",
          Tenancy: "../../prisma/generated/client.js#Tenancy as TenancyModel",
          UserTenancyAgreement:
            "../../prisma/generated/client.js#UserTenancyAgreement as UserTenancyAgreementModel",
        },
        inputMaybeValue: "undefined | T",
      },
    }),
  },
  debug: true,
  verbose: true,
};
export default config;
