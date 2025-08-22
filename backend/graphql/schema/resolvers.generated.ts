/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import type { Resolvers } from "./types.generated";
import { classById as Query_classById } from "./resolvers/Query/classById.ts";
import { classes as Query_classes } from "./resolvers/Query/classes.ts";
import { contractById as Query_contractById } from "./resolvers/Query/contractById.ts";
import { contracts as Query_contracts } from "./resolvers/Query/contracts.ts";
import { gymById as Query_gymById } from "./resolvers/Query/gymById.ts";
import { gyms as Query_gyms } from "./resolvers/Query/gyms.ts";
import { membershipById as Query_membershipById } from "./resolvers/Query/membershipById.ts";
import { memberships as Query_memberships } from "./resolvers/Query/memberships.ts";
import { staff as Query_staff } from "./resolvers/Query/staff.ts";
import { staffById as Query_staffById } from "./resolvers/Query/staffById.ts";
import { tenancy as Query_tenancy } from "./resolvers/Query/tenancy.ts";
import { createClass as Mutation_createClass } from "./resolvers/Mutation/createClass.ts";
import { createGym as Mutation_createGym } from "./resolvers/Mutation/createGym.ts";
import { createStaff as Mutation_createStaff } from "./resolvers/Mutation/createStaff.ts";
import { createTenancy as Mutation_createTenancy } from "./resolvers/Mutation/createTenancy.ts";
import { deleteClass as Mutation_deleteClass } from "./resolvers/Mutation/deleteClass.ts";
import { deleteGym as Mutation_deleteGym } from "./resolvers/Mutation/deleteGym.ts";
import { deleteStaff as Mutation_deleteStaff } from "./resolvers/Mutation/deleteStaff.ts";
import { updateClass as Mutation_updateClass } from "./resolvers/Mutation/updateClass.ts";
import { updateGym as Mutation_updateGym } from "./resolvers/Mutation/updateGym.ts";
import { updateStaff as Mutation_updateStaff } from "./resolvers/Mutation/updateStaff.ts";
import { updateTenancy as Mutation_updateTenancy } from "./resolvers/Mutation/updateTenancy.ts";
import { Booking } from "./resolvers/Booking.ts";
import { CheckIn } from "./resolvers/CheckIn.ts";
import { Class } from "./resolvers/Class.ts";
import { Gym } from "./resolvers/Gym.ts";
import { GymAddress } from "./resolvers/GymAddress.ts";
import { InvitationToken } from "./resolvers/InvitationToken.ts";
import { MembershipNFT } from "./resolvers/MembershipNFT.ts";
import { Tenancy } from "./resolvers/Tenancy.ts";
import { User } from "./resolvers/User.ts";
import { UserGymAssociation } from "./resolvers/UserGymAssociation.ts";
import { UserTenancyAgreement } from "./resolvers/UserTenancyAgreement.ts";
import { Json } from "./resolvers/Json.ts";
import { DateTimeResolver } from "npm:graphql-scalars";
export const resolvers: Resolvers = {
  Query: {
    classById: Query_classById,
    classes: Query_classes,
    contractById: Query_contractById,
    contracts: Query_contracts,
    gymById: Query_gymById,
    gyms: Query_gyms,
    membershipById: Query_membershipById,
    memberships: Query_memberships,
    staff: Query_staff,
    staffById: Query_staffById,
    tenancy: Query_tenancy,
  },
  Mutation: {
    createClass: Mutation_createClass,
    createGym: Mutation_createGym,
    createStaff: Mutation_createStaff,
    createTenancy: Mutation_createTenancy,
    deleteClass: Mutation_deleteClass,
    deleteGym: Mutation_deleteGym,
    deleteStaff: Mutation_deleteStaff,
    updateClass: Mutation_updateClass,
    updateGym: Mutation_updateGym,
    updateStaff: Mutation_updateStaff,
    updateTenancy: Mutation_updateTenancy,
  },

  Booking: Booking,
  CheckIn: CheckIn,
  Class: Class,
  Gym: Gym,
  GymAddress: GymAddress,
  InvitationToken: InvitationToken,
  MembershipNFT: MembershipNFT,
  Tenancy: Tenancy,
  User: User,
  UserGymAssociation: UserGymAssociation,
  UserTenancyAgreement: UserTenancyAgreement,
  Json: Json,
  DateTime: DateTimeResolver,
};
