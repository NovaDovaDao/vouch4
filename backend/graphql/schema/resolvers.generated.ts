/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { classById as Query_classById } from './resolvers/Query/classById';
import    { classes as Query_classes } from './resolvers/Query/classes';
import    { contractById as Query_contractById } from './resolvers/Query/contractById';
import    { contracts as Query_contracts } from './resolvers/Query/contracts';
import    { gymById as Query_gymById } from './resolvers/Query/gymById';
import    { gyms as Query_gyms } from './resolvers/Query/gyms';
import    { memberById as Query_memberById } from './resolvers/Query/memberById';
import    { members as Query_members } from './resolvers/Query/members';
import    { membershipById as Query_membershipById } from './resolvers/Query/membershipById';
import    { memberships as Query_memberships } from './resolvers/Query/memberships';
import    { staff as Query_staff } from './resolvers/Query/staff';
import    { staffById as Query_staffById } from './resolvers/Query/staffById';
import    { tenancy as Query_tenancy } from './resolvers/Query/tenancy';
import    { createGym as Mutation_createGym } from './resolvers/Mutation/createGym';
import    { createTenancy as Mutation_createTenancy } from './resolvers/Mutation/createTenancy';
import    { createUser as Mutation_createUser } from './resolvers/Mutation/createUser';
import    { deleteGym as Mutation_deleteGym } from './resolvers/Mutation/deleteGym';
import    { deleteTenancy as Mutation_deleteTenancy } from './resolvers/Mutation/deleteTenancy';
import    { deleteUser as Mutation_deleteUser } from './resolvers/Mutation/deleteUser';
import    { updateGym as Mutation_updateGym } from './resolvers/Mutation/updateGym';
import    { updateTenancy as Mutation_updateTenancy } from './resolvers/Mutation/updateTenancy';
import    { updateUser as Mutation_updateUser } from './resolvers/Mutation/updateUser';
import    { Booking } from './resolvers/Booking';
import    { CheckIn } from './resolvers/CheckIn';
import    { Class } from './resolvers/Class';
import    { Gym } from './resolvers/Gym';
import    { GymAddress } from './resolvers/GymAddress';
import    { InvitationToken } from './resolvers/InvitationToken';
import    { MembershipNFT } from './resolvers/MembershipNFT';
import    { Tenancy } from './resolvers/Tenancy';
import    { User } from './resolvers/User';
import    { UserGymAssociation } from './resolvers/UserGymAssociation';
import    { UserTenancyAgreement } from './resolvers/UserTenancyAgreement';
import    { Json } from './resolvers/Json';
import    { DateTimeResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { classById: Query_classById,classes: Query_classes,contractById: Query_contractById,contracts: Query_contracts,gymById: Query_gymById,gyms: Query_gyms,memberById: Query_memberById,members: Query_members,membershipById: Query_membershipById,memberships: Query_memberships,staff: Query_staff,staffById: Query_staffById,tenancy: Query_tenancy },
      Mutation: { createGym: Mutation_createGym,createTenancy: Mutation_createTenancy,createUser: Mutation_createUser,deleteGym: Mutation_deleteGym,deleteTenancy: Mutation_deleteTenancy,deleteUser: Mutation_deleteUser,updateGym: Mutation_updateGym,updateTenancy: Mutation_updateTenancy,updateUser: Mutation_updateUser },
      
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
DateTime: DateTimeResolver
    }