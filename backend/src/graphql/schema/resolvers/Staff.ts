import type { CustomContext } from "../../../server.js";
import type { StaffResolvers } from "./../types.generated.js";
export const Staff: StaffResolvers = {
  /* Implement Staff resolver logic here */
  roles: (parent, _arg, ctx: CustomContext) => ["MANAGER"],
};
