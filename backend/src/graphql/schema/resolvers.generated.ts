/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import type { Resolvers } from "./types.generated.js";
import { bookings as Query_bookings } from "./resolvers/Query/bookings.js";
import { classTemplateById as Query_classTemplateById } from "./resolvers/Query/classTemplateById.js";
import { classTemplates as Query_classTemplates } from "./resolvers/Query/classTemplates.js";
import { contractById as Query_contractById } from "./resolvers/Query/contractById.js";
import { contracts as Query_contracts } from "./resolvers/Query/contracts.js";
import { entitlementById as Query_entitlementById } from "./resolvers/Query/entitlementById.js";
import { entitlements as Query_entitlements } from "./resolvers/Query/entitlements.js";
import { gymById as Query_gymById } from "./resolvers/Query/gymById.js";
import { gyms as Query_gyms } from "./resolvers/Query/gyms.js";
import { memberById as Query_memberById } from "./resolvers/Query/memberById.js";
import { members as Query_members } from "./resolvers/Query/members.js";
import { productById as Query_productById } from "./resolvers/Query/productById.js";
import { products as Query_products } from "./resolvers/Query/products.js";
import { scheduledClassById as Query_scheduledClassById } from "./resolvers/Query/scheduledClassById.js";
import { scheduledClasses as Query_scheduledClasses } from "./resolvers/Query/scheduledClasses.js";
import { search as Query_search } from "./resolvers/Query/search.js";
import { staff as Query_staff } from "./resolvers/Query/staff.js";
import { staffById as Query_staffById } from "./resolvers/Query/staffById.js";
import { tenancy as Query_tenancy } from "./resolvers/Query/tenancy.js";
import { createClassTemplate as Mutation_createClassTemplate } from "./resolvers/Mutation/createClassTemplate.js";
import { createEntitlement as Mutation_createEntitlement } from "./resolvers/Mutation/createEntitlement.js";
import { createGym as Mutation_createGym } from "./resolvers/Mutation/createGym.js";
import { createMember as Mutation_createMember } from "./resolvers/Mutation/createMember.js";
import { createProduct as Mutation_createProduct } from "./resolvers/Mutation/createProduct.js";
import { createScheduledClass as Mutation_createScheduledClass } from "./resolvers/Mutation/createScheduledClass.js";
import { createStaff as Mutation_createStaff } from "./resolvers/Mutation/createStaff.js";
import { createTenancy as Mutation_createTenancy } from "./resolvers/Mutation/createTenancy.js";
import { deleteClassTemplate as Mutation_deleteClassTemplate } from "./resolvers/Mutation/deleteClassTemplate.js";
import { deleteGym as Mutation_deleteGym } from "./resolvers/Mutation/deleteGym.js";
import { deleteMember as Mutation_deleteMember } from "./resolvers/Mutation/deleteMember.js";
import { deleteScheduledClass as Mutation_deleteScheduledClass } from "./resolvers/Mutation/deleteScheduledClass.js";
import { deleteStaff as Mutation_deleteStaff } from "./resolvers/Mutation/deleteStaff.js";
import { memberAccessToken as Mutation_memberAccessToken } from "./resolvers/Mutation/memberAccessToken.js";
import { setInitialPassword as Mutation_setInitialPassword } from "./resolvers/Mutation/setInitialPassword.js";
import { updateClassTemplate as Mutation_updateClassTemplate } from "./resolvers/Mutation/updateClassTemplate.js";
import { updateGym as Mutation_updateGym } from "./resolvers/Mutation/updateGym.js";
import { updateMember as Mutation_updateMember } from "./resolvers/Mutation/updateMember.js";
import { updateProduct as Mutation_updateProduct } from "./resolvers/Mutation/updateProduct.js";
import { updateScheduledClass as Mutation_updateScheduledClass } from "./resolvers/Mutation/updateScheduledClass.js";
import { updateStaff as Mutation_updateStaff } from "./resolvers/Mutation/updateStaff.js";
import { updateTenancy as Mutation_updateTenancy } from "./resolvers/Mutation/updateTenancy.js";
import { Booking } from "./resolvers/Booking.js";
import { CheckIn } from "./resolvers/CheckIn.js";
import { ClassTemplate } from "./resolvers/ClassTemplate.js";
import { Entitlement } from "./resolvers/Entitlement.js";
import { Gym } from "./resolvers/Gym.js";
import { GymAddress } from "./resolvers/GymAddress.js";
import { Member } from "./resolvers/Member.js";
import { Price } from "./resolvers/Price.js";
import { Product } from "./resolvers/Product.js";
import { ScheduledClass } from "./resolvers/ScheduledClass.js";
import { Staff } from "./resolvers/Staff.js";
import { Tenancy } from "./resolvers/Tenancy.js";
import { UserTenancyAgreement } from "./resolvers/UserTenancyAgreement.js";
import { DateOnly } from "./resolvers/DateOnly.js";
import { Json } from "./resolvers/Json.js";
import { DateTimeResolver } from "graphql-scalars";
export const resolvers: Resolvers = {
  Query: {
    bookings: Query_bookings,
    classTemplateById: Query_classTemplateById,
    classTemplates: Query_classTemplates,
    contractById: Query_contractById,
    contracts: Query_contracts,
    entitlementById: Query_entitlementById,
    entitlements: Query_entitlements,
    gymById: Query_gymById,
    gyms: Query_gyms,
    memberById: Query_memberById,
    members: Query_members,
    productById: Query_productById,
    products: Query_products,
    scheduledClassById: Query_scheduledClassById,
    scheduledClasses: Query_scheduledClasses,
    search: Query_search,
    staff: Query_staff,
    staffById: Query_staffById,
    tenancy: Query_tenancy,
  },
  Mutation: {
    createClassTemplate: Mutation_createClassTemplate,
    createEntitlement: Mutation_createEntitlement,
    createGym: Mutation_createGym,
    createMember: Mutation_createMember,
    createProduct: Mutation_createProduct,
    createScheduledClass: Mutation_createScheduledClass,
    createStaff: Mutation_createStaff,
    createTenancy: Mutation_createTenancy,
    deleteClassTemplate: Mutation_deleteClassTemplate,
    deleteGym: Mutation_deleteGym,
    deleteMember: Mutation_deleteMember,
    deleteScheduledClass: Mutation_deleteScheduledClass,
    deleteStaff: Mutation_deleteStaff,
    memberAccessToken: Mutation_memberAccessToken,
    setInitialPassword: Mutation_setInitialPassword,
    updateClassTemplate: Mutation_updateClassTemplate,
    updateGym: Mutation_updateGym,
    updateMember: Mutation_updateMember,
    updateProduct: Mutation_updateProduct,
    updateScheduledClass: Mutation_updateScheduledClass,
    updateStaff: Mutation_updateStaff,
    updateTenancy: Mutation_updateTenancy,
  },

  Booking: Booking,
  CheckIn: CheckIn,
  ClassTemplate: ClassTemplate,
  Entitlement: Entitlement,
  Gym: Gym,
  GymAddress: GymAddress,
  Member: Member,
  Price: Price,
  Product: Product,
  ScheduledClass: ScheduledClass,
  Staff: Staff,
  Tenancy: Tenancy,
  UserTenancyAgreement: UserTenancyAgreement,
  DateOnly: DateOnly,
  Json: Json,
  DateTime: DateTimeResolver,
};
