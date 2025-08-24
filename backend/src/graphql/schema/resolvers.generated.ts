/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import type { Resolvers } from "./types.generated.js";
import { classById as Query_classById } from "./resolvers/Query/classById.js";
import { classes as Query_classes } from "./resolvers/Query/classes.js";
import { contractById as Query_contractById } from "./resolvers/Query/contractById.js";
import { contracts as Query_contracts } from "./resolvers/Query/contracts.js";
import { gymById as Query_gymById } from "./resolvers/Query/gymById.js";
import { gyms as Query_gyms } from "./resolvers/Query/gyms.js";
import { memberById as Query_memberById } from "./resolvers/Query/memberById.js";
import { members as Query_members } from "./resolvers/Query/members.js";
import { membershipById as Query_membershipById } from "./resolvers/Query/membershipById.js";
import { memberships as Query_memberships } from "./resolvers/Query/memberships.js";
import { staff as Query_staff } from "./resolvers/Query/staff.js";
import { staffById as Query_staffById } from "./resolvers/Query/staffById.js";
import { tenancy as Query_tenancy } from "./resolvers/Query/tenancy.js";
import { createClass as Mutation_createClass } from "./resolvers/Mutation/createClass.js";
import { createGym as Mutation_createGym } from "./resolvers/Mutation/createGym.js";
import { createMember as Mutation_createMember } from "./resolvers/Mutation/createMember.js";
import { createStaff as Mutation_createStaff } from "./resolvers/Mutation/createStaff.js";
import { createTenancy as Mutation_createTenancy } from "./resolvers/Mutation/createTenancy.js";
import { deleteClass as Mutation_deleteClass } from "./resolvers/Mutation/deleteClass.js";
import { deleteGym as Mutation_deleteGym } from "./resolvers/Mutation/deleteGym.js";
import { deleteMember as Mutation_deleteMember } from "./resolvers/Mutation/deleteMember.js";
import { deleteStaff as Mutation_deleteStaff } from "./resolvers/Mutation/deleteStaff.js";
import { updateClass as Mutation_updateClass } from "./resolvers/Mutation/updateClass.js";
import { updateGym as Mutation_updateGym } from "./resolvers/Mutation/updateGym.js";
import { updateMember as Mutation_updateMember } from "./resolvers/Mutation/updateMember.js";
import { updateStaff as Mutation_updateStaff } from "./resolvers/Mutation/updateStaff.js";
import { updateTenancy as Mutation_updateTenancy } from "./resolvers/Mutation/updateTenancy.js";
import { Booking } from "./resolvers/Booking.js";
import { CheckIn } from "./resolvers/CheckIn.js";
import { Class } from "./resolvers/Class.js";
import { Gym } from "./resolvers/Gym.js";
import { GymAddress } from "./resolvers/GymAddress.js";
import { InvitationToken } from "./resolvers/InvitationToken.js";
import { MembershipNFT } from "./resolvers/MembershipNFT.js";
import { Tenancy } from "./resolvers/Tenancy.js";
import { User } from "./resolvers/User.js";
import { UserGymAssociation } from "./resolvers/UserGymAssociation.js";
import { UserTenancyAgreement } from "./resolvers/UserTenancyAgreement.js";
import { Json } from "./resolvers/Json.js";
import { DateTimeResolver } from "graphql-scalars";
export const resolvers: Resolvers = {
  Query: {
    classById: Query_classById,
    classes: Query_classes,
    contractById: Query_contractById,
    contracts: Query_contracts,
    gymById: Query_gymById,
    gyms: Query_gyms,
    memberById: Query_memberById,
    members: Query_members,
    membershipById: Query_membershipById,
    memberships: Query_memberships,
    staff: Query_staff,
    staffById: Query_staffById,
    tenancy: Query_tenancy,
  },
  Mutation: {
    createClass: Mutation_createClass,
    createGym: Mutation_createGym,
    createMember: Mutation_createMember,
    createStaff: Mutation_createStaff,
    createTenancy: Mutation_createTenancy,
    deleteClass: Mutation_deleteClass,
    deleteGym: Mutation_deleteGym,
    deleteMember: Mutation_deleteMember,
    deleteStaff: Mutation_deleteStaff,
    updateClass: Mutation_updateClass,
    updateGym: Mutation_updateGym,
    updateMember: Mutation_updateMember,
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
