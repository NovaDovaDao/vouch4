import {
  type GraphQLResolveInfo,
  GraphQLScalarType,
  type GraphQLScalarTypeConfig,
} from "graphql";
import type {
  Booking as BookingModel,
  CheckIn as CheckInModel,
  ClassTemplate as ClassTemplateModel,
  Gym as GymModel,
  User as UserModel,
  Entitlement as EntitlementModel,
  Product as ProductModel,
  ScheduledClass as ScheduledClassModel,
  Tenancy as TenancyModel,
  UserTenancyAgreement as UserTenancyAgreementModel,
} from "../../prisma/generated/client.js";
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = undefined | T;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type EnumResolverSignature<T, AllowedValues = any> = {
  [key in keyof T]?: AllowedValues;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateOnly: { input: any; output: any };
  DateTime: { input: Date | string; output: Date | string };
  Json: { input: any; output: any };
};

export type AgreementStatus =
  | "EXPIRED"
  | "PENDING_SIGNATURE"
  | "REVOKED"
  | "SIGNED";

export type AgreementType = "PRIVACY_POLICY" | "TERMS_OF_SERVICE" | "WAIVER";

export type Booking = {
  __typename?: "Booking";
  bookedAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  member: Member;
};

export type BookingsArgs = {
  gymId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type CheckIn = {
  __typename?: "CheckIn";
  id: Scalars["String"]["output"];
  member: Member;
  timestamp: Scalars["DateTime"]["output"];
};

export type ClassTemplate = {
  __typename?: "ClassTemplate";
  capacity: Scalars["Int"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  gym: Gym;
  id: Scalars["ID"]["output"];
  instructor?: Maybe<Staff>;
  name: Scalars["String"]["output"];
  recurrence: Scalars["String"]["output"];
};

export type ClassTemplateCreateInput = {
  capacity: Scalars["Int"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  gymId: Scalars["ID"]["input"];
  instructorId?: InputMaybe<Scalars["ID"]["input"]>;
  name: Scalars["String"]["input"];
  recurrence: Scalars["String"]["input"];
};

export type ClassTemplateUpdateInput = {
  capacity?: InputMaybe<Scalars["Int"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  gymId?: InputMaybe<Scalars["ID"]["input"]>;
  instructorId?: InputMaybe<Scalars["ID"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  recurrence?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateEntitlementInput = {
  expiresAt?: InputMaybe<Scalars["DateOnly"]["input"]>;
  ownerId: Scalars["ID"]["input"];
  productId: Scalars["ID"]["input"];
  usesLeft?: InputMaybe<Scalars["Int"]["input"]>;
  validFrom?: InputMaybe<Scalars["DateOnly"]["input"]>;
};

export type CreateProductInput = {
  active?: InputMaybe<Scalars["Boolean"]["input"]>;
  contractAddress?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  isNft?: InputMaybe<Scalars["Boolean"]["input"]>;
  name: Scalars["String"]["input"];
  rules: Scalars["Json"]["input"];
};

export type Entitlement = {
  __typename?: "Entitlement";
  expiresAt?: Maybe<Scalars["DateOnly"]["output"]>;
  id: Scalars["ID"]["output"];
  isRented: Scalars["Boolean"]["output"];
  owner: Member;
  product: Product;
  renter?: Maybe<Member>;
  tokenId?: Maybe<Scalars["String"]["output"]>;
  usesLeft?: Maybe<Scalars["Int"]["output"]>;
  validFrom: Scalars["DateOnly"]["output"];
};

export type Gym = {
  __typename?: "Gym";
  address?: Maybe<Scalars["Json"]["output"]>;
  id: Scalars["ID"]["output"];
  legalDocsUrl?: Maybe<Scalars["String"]["output"]>;
  legalEntityName?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
};

export type GymAddress = {
  __typename?: "GymAddress";
  city?: Maybe<Scalars["String"]["output"]>;
  country?: Maybe<Scalars["String"]["output"]>;
  state?: Maybe<Scalars["String"]["output"]>;
  street1?: Maybe<Scalars["String"]["output"]>;
  zip?: Maybe<Scalars["String"]["output"]>;
};

export type GymAddressInput = {
  city?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  state?: InputMaybe<Scalars["String"]["input"]>;
  street1?: InputMaybe<Scalars["String"]["input"]>;
  zip?: InputMaybe<Scalars["String"]["input"]>;
};

export type GymCreateInput = {
  address: GymAddressInput;
  legalDocsUrl?: InputMaybe<Scalars["String"]["input"]>;
  legalEntityName?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
};

export type GymUpdateInput = {
  address?: InputMaybe<GymAddressInput>;
  legalDocsUrl?: InputMaybe<Scalars["String"]["input"]>;
  legalEntityName?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type Member = Person & {
  __typename?: "Member";
  checkins?: Maybe<Array<CheckIn>>;
  email: Scalars["String"]["output"];
  entitlements: Array<Entitlement>;
  firstName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  isActive: Scalars["Boolean"]["output"];
  lastName: Scalars["String"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  phoneNumber?: Maybe<Scalars["String"]["output"]>;
  walletAddress?: Maybe<Scalars["String"]["output"]>;
};

export type MemberCreateInput = {
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  lastName: Scalars["String"]["input"];
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  walletAddress?: InputMaybe<Scalars["String"]["input"]>;
};

export type MemberUpdateInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  walletAddress?: InputMaybe<Scalars["String"]["input"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createClassTemplate: ClassTemplate;
  createEntitlement: Entitlement;
  createGym: Gym;
  createMember: Member;
  createProduct: Product;
  createScheduledClass: ScheduledClass;
  createStaff: Staff;
  createTenancy: Tenancy;
  deleteClassTemplate: Scalars["Boolean"]["output"];
  deleteGym: Scalars["Boolean"]["output"];
  deleteMember: Scalars["Boolean"]["output"];
  deleteScheduledClass: Scalars["Boolean"]["output"];
  deleteStaff: Scalars["Boolean"]["output"];
  setInitialPassword: StaffOrMember;
  updateClassTemplate: ClassTemplate;
  updateGym: Gym;
  updateMember: Member;
  updateProduct: Product;
  updateScheduledClass: ScheduledClass;
  updateStaff: Staff;
  updateTenancy: Tenancy;
};

export type MutationcreateClassTemplateArgs = {
  data: ClassTemplateCreateInput;
};

export type MutationcreateEntitlementArgs = {
  input: CreateEntitlementInput;
};

export type MutationcreateGymArgs = {
  data: GymCreateInput;
};

export type MutationcreateMemberArgs = {
  data: MemberCreateInput;
};

export type MutationcreateProductArgs = {
  input: CreateProductInput;
};

export type MutationcreateScheduledClassArgs = {
  input: ScheduledClassCreateInput;
};

export type MutationcreateStaffArgs = {
  data: StaffCreateInput;
};

export type MutationcreateTenancyArgs = {
  data: TenancyCreateInput;
};

export type MutationdeleteClassTemplateArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationdeleteGymArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationdeleteMemberArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationdeleteScheduledClassArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationdeleteStaffArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationsetInitialPasswordArgs = {
  password: Scalars["String"]["input"];
  token: Scalars["String"]["input"];
};

export type MutationupdateClassTemplateArgs = {
  id: Scalars["ID"]["input"];
  input: ClassTemplateUpdateInput;
};

export type MutationupdateGymArgs = {
  data: GymUpdateInput;
  id: Scalars["ID"]["input"];
};

export type MutationupdateMemberArgs = {
  id: Scalars["ID"]["input"];
  input: MemberUpdateInput;
};

export type MutationupdateProductArgs = {
  id: Scalars["ID"]["input"];
  input: UpdateProductInput;
};

export type MutationupdateScheduledClassArgs = {
  id: Scalars["ID"]["input"];
  input: ScheduledClassUpdateInput;
};

export type MutationupdateStaffArgs = {
  id: Scalars["ID"]["input"];
  input: StaffUpdateInput;
};

export type MutationupdateTenancyArgs = {
  id: Scalars["ID"]["input"];
  input: TenancyUpdateInput;
};

export type Person = {
  email: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  isActive: Scalars["Boolean"]["output"];
  lastName: Scalars["String"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  phoneNumber?: Maybe<Scalars["String"]["output"]>;
  walletAddress?: Maybe<Scalars["String"]["output"]>;
};

export type Price = {
  __typename?: "Price";
  amount?: Maybe<Scalars["String"]["output"]>;
  currency?: Maybe<Scalars["String"]["output"]>;
};

export type Product = {
  __typename?: "Product";
  active: Scalars["Boolean"]["output"];
  contractAddress?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  entitlements: Array<Entitlement>;
  id: Scalars["ID"]["output"];
  isNft: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  price?: Maybe<Price>;
  rules: Scalars["Json"]["output"];
};

export type Query = {
  __typename?: "Query";
  bookings: Array<Booking>;
  classTemplateById: ClassTemplate;
  classTemplates: Array<ClassTemplate>;
  contractById: UserTenancyAgreement;
  contracts: Array<UserTenancyAgreement>;
  entitlementById?: Maybe<Entitlement>;
  entitlements: Array<Entitlement>;
  gymById?: Maybe<Gym>;
  gyms: Array<Gym>;
  memberById: Member;
  members: Array<Member>;
  productById?: Maybe<Product>;
  products: Array<Product>;
  scheduledClassById: ScheduledClass;
  scheduledClasses: Array<ScheduledClass>;
  search: Array<SearchResult>;
  staff: Array<Staff>;
  staffById: Staff;
  tenancy: Tenancy;
};

export type QuerybookingsArgs = {
  input?: InputMaybe<BookingsArgs>;
};

export type QueryclassTemplateByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QuerycontractByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryentitlementByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryentitlementsArgs = {
  memberId: Scalars["ID"]["input"];
};

export type QuerygymByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QuerymemberByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryproductByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryscheduledClassByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryscheduledClassesArgs = {
  args: ScheduledClassesArgs;
};

export type QuerysearchArgs = {
  input: SearchInput;
};

export type QuerystaffByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type ScheduledClass = {
  __typename?: "ScheduledClass";
  bookings: Array<Booking>;
  description?: Maybe<Scalars["String"]["output"]>;
  endTime: Scalars["DateTime"]["output"];
  gym: Gym;
  id: Scalars["ID"]["output"];
  instructor?: Maybe<Staff>;
  name: Scalars["String"]["output"];
  startTime: Scalars["DateTime"]["output"];
};

export type ScheduledClassCreateInput = {
  classTemplateId: Scalars["ID"]["input"];
  endTime: Scalars["DateTime"]["input"];
  startTime: Scalars["DateTime"]["input"];
};

export type ScheduledClassUpdateInput = {
  classTemplateId?: InputMaybe<Scalars["ID"]["input"]>;
  endTime?: InputMaybe<Scalars["DateTime"]["input"]>;
  startTime?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type ScheduledClassesArgs = {
  classTemplateId?: InputMaybe<Scalars["ID"]["input"]>;
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  gymId?: InputMaybe<Scalars["ID"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type SearchInput = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  query: Scalars["String"]["input"];
};

export type SearchResult =
  | ClassTemplate
  | Gym
  | Member
  | ScheduledClass
  | Staff;

export type Staff = Person & {
  __typename?: "Staff";
  email: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  isActive: Scalars["Boolean"]["output"];
  isSuperUser: Scalars["Boolean"]["output"];
  lastName: Scalars["String"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  phoneNumber?: Maybe<Scalars["String"]["output"]>;
  roles?: Maybe<Array<UserAtGymRole>>;
  walletAddress?: Maybe<Scalars["String"]["output"]>;
};

export type StaffCreateInput = {
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  isSuperUser?: InputMaybe<Scalars["Boolean"]["input"]>;
  lastName: Scalars["String"]["input"];
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  walletAddress?: InputMaybe<Scalars["String"]["input"]>;
};

export type StaffOrMember = Member | Staff;

export type StaffUpdateInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  isSuperUser?: InputMaybe<Scalars["Boolean"]["input"]>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  walletAddress?: InputMaybe<Scalars["String"]["input"]>;
};

export type Tenancy = {
  __typename?: "Tenancy";
  contactEmail: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  legalName?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
};

export type TenancyCreateInput = {
  contactEmail: Scalars["String"]["input"];
  legalName?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
};

export type TenancyUpdateInput = {
  contactEmail?: InputMaybe<Scalars["String"]["input"]>;
  legalName?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateProductInput = {
  active?: InputMaybe<Scalars["Boolean"]["input"]>;
  contractAddress?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  isNft?: InputMaybe<Scalars["Boolean"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  rules?: InputMaybe<Scalars["Json"]["input"]>;
};

export type UserAtGymRole =
  | "CLEANING_STAFF"
  | "FRONT_DESK_STAFF"
  | "MANAGER"
  | "ROUTE_SETTER"
  | "TRAINER";

export type UserTenancyAgreement = {
  __typename?: "UserTenancyAgreement";
  documentVersion?: Maybe<Scalars["String"]["output"]>;
  expiresAt?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["ID"]["output"];
  signedAt?: Maybe<Scalars["DateTime"]["output"]>;
  status: AgreementStatus;
  type: AgreementType;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  SearchResult:
    | (ClassTemplateModel & { __typename: "ClassTemplate" })
    | (GymModel & { __typename: "Gym" })
    | (UserModel & { __typename: "Member" })
    | (ScheduledClassModel & { __typename: "ScheduledClass" })
    | (UserModel & { __typename: "Staff" });
  StaffOrMember:
    | (UserModel & { __typename: "Member" })
    | (UserModel & { __typename: "Staff" });
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AgreementStatus: ResolverTypeWrapper<
    "PENDING_SIGNATURE" | "SIGNED" | "EXPIRED" | "REVOKED"
  >;
  AgreementType: ResolverTypeWrapper<
    "WAIVER" | "TERMS_OF_SERVICE" | "PRIVACY_POLICY"
  >;
  Booking: ResolverTypeWrapper<BookingModel>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  BookingsArgs: BookingsArgs;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  CheckIn: ResolverTypeWrapper<CheckInModel>;
  ClassTemplate: ResolverTypeWrapper<ClassTemplateModel>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  ClassTemplateCreateInput: ClassTemplateCreateInput;
  ClassTemplateUpdateInput: ClassTemplateUpdateInput;
  CreateEntitlementInput: CreateEntitlementInput;
  CreateProductInput: CreateProductInput;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  DateOnly: ResolverTypeWrapper<Scalars["DateOnly"]["output"]>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]["output"]>;
  Entitlement: ResolverTypeWrapper<EntitlementModel>;
  Gym: ResolverTypeWrapper<GymModel>;
  GymAddress: ResolverTypeWrapper<GymAddress>;
  GymAddressInput: GymAddressInput;
  GymCreateInput: GymCreateInput;
  GymUpdateInput: GymUpdateInput;
  Json: ResolverTypeWrapper<Scalars["Json"]["output"]>;
  Member: ResolverTypeWrapper<UserModel>;
  MemberCreateInput: MemberCreateInput;
  MemberUpdateInput: MemberUpdateInput;
  Mutation: ResolverTypeWrapper<{}>;
  Person: ResolverTypeWrapper<UserModel>;
  Price: ResolverTypeWrapper<Price>;
  Product: ResolverTypeWrapper<ProductModel>;
  Query: ResolverTypeWrapper<{}>;
  ScheduledClass: ResolverTypeWrapper<ScheduledClassModel>;
  ScheduledClassCreateInput: ScheduledClassCreateInput;
  ScheduledClassUpdateInput: ScheduledClassUpdateInput;
  ScheduledClassesArgs: ScheduledClassesArgs;
  SearchInput: SearchInput;
  SearchResult: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["SearchResult"]
  >;
  Staff: ResolverTypeWrapper<UserModel>;
  StaffCreateInput: StaffCreateInput;
  StaffOrMember: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["StaffOrMember"]
  >;
  StaffUpdateInput: StaffUpdateInput;
  Tenancy: ResolverTypeWrapper<TenancyModel>;
  TenancyCreateInput: TenancyCreateInput;
  TenancyUpdateInput: TenancyUpdateInput;
  UpdateProductInput: UpdateProductInput;
  UserAtGymRole: ResolverTypeWrapper<
    | "MANAGER"
    | "TRAINER"
    | "ROUTE_SETTER"
    | "FRONT_DESK_STAFF"
    | "CLEANING_STAFF"
  >;
  UserTenancyAgreement: ResolverTypeWrapper<UserTenancyAgreementModel>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Booking: BookingModel;
  String: Scalars["String"]["output"];
  BookingsArgs: BookingsArgs;
  ID: Scalars["ID"]["output"];
  CheckIn: CheckInModel;
  ClassTemplate: ClassTemplateModel;
  Int: Scalars["Int"]["output"];
  ClassTemplateCreateInput: ClassTemplateCreateInput;
  ClassTemplateUpdateInput: ClassTemplateUpdateInput;
  CreateEntitlementInput: CreateEntitlementInput;
  CreateProductInput: CreateProductInput;
  Boolean: Scalars["Boolean"]["output"];
  DateOnly: Scalars["DateOnly"]["output"];
  DateTime: Scalars["DateTime"]["output"];
  Entitlement: EntitlementModel;
  Gym: GymModel;
  GymAddress: GymAddress;
  GymAddressInput: GymAddressInput;
  GymCreateInput: GymCreateInput;
  GymUpdateInput: GymUpdateInput;
  Json: Scalars["Json"]["output"];
  Member: UserModel;
  MemberCreateInput: MemberCreateInput;
  MemberUpdateInput: MemberUpdateInput;
  Mutation: {};
  Person: UserModel;
  Price: Price;
  Product: ProductModel;
  Query: {};
  ScheduledClass: ScheduledClassModel;
  ScheduledClassCreateInput: ScheduledClassCreateInput;
  ScheduledClassUpdateInput: ScheduledClassUpdateInput;
  ScheduledClassesArgs: ScheduledClassesArgs;
  SearchInput: SearchInput;
  SearchResult: ResolversUnionTypes<ResolversParentTypes>["SearchResult"];
  Staff: UserModel;
  StaffCreateInput: StaffCreateInput;
  StaffOrMember: ResolversUnionTypes<ResolversParentTypes>["StaffOrMember"];
  StaffUpdateInput: StaffUpdateInput;
  Tenancy: TenancyModel;
  TenancyCreateInput: TenancyCreateInput;
  TenancyUpdateInput: TenancyUpdateInput;
  UpdateProductInput: UpdateProductInput;
  UserTenancyAgreement: UserTenancyAgreementModel;
};

export type AgreementStatusResolvers = EnumResolverSignature<
  { EXPIRED?: any; PENDING_SIGNATURE?: any; REVOKED?: any; SIGNED?: any },
  ResolversTypes["AgreementStatus"]
>;

export type AgreementTypeResolvers = EnumResolverSignature<
  { PRIVACY_POLICY?: any; TERMS_OF_SERVICE?: any; WAIVER?: any },
  ResolversTypes["AgreementType"]
>;

export type BookingResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Booking"] = ResolversParentTypes["Booking"],
> = {
  bookedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  member?: Resolver<ResolversTypes["Member"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckInResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CheckIn"] = ResolversParentTypes["CheckIn"],
> = {
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  member?: Resolver<ResolversTypes["Member"], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassTemplateResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassTemplate"] = ResolversParentTypes["ClassTemplate"],
> = {
  capacity?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  gym?: Resolver<ResolversTypes["Gym"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  instructor?: Resolver<
    Maybe<ResolversTypes["Staff"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  recurrence?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateOnlyScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateOnly"], any> {
  name: "DateOnly";
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type EntitlementResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Entitlement"] = ResolversParentTypes["Entitlement"],
> = {
  expiresAt?: Resolver<
    Maybe<ResolversTypes["DateOnly"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  isRented?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes["Member"], ParentType, ContextType>;
  product?: Resolver<ResolversTypes["Product"], ParentType, ContextType>;
  renter?: Resolver<Maybe<ResolversTypes["Member"]>, ParentType, ContextType>;
  tokenId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  usesLeft?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  validFrom?: Resolver<ResolversTypes["DateOnly"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GymResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Gym"] = ResolversParentTypes["Gym"],
> = {
  address?: Resolver<Maybe<ResolversTypes["Json"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  legalDocsUrl?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  legalEntityName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GymAddressResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["GymAddress"] = ResolversParentTypes["GymAddress"],
> = {
  city?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  street1?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Json"], any> {
  name: "Json";
}

export type MemberResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Member"] = ResolversParentTypes["Member"],
> = {
  checkins?: Resolver<
    Maybe<Array<ResolversTypes["CheckIn"]>>,
    ParentType,
    ContextType
  >;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  entitlements?: Resolver<
    Array<ResolversTypes["Entitlement"]>,
    ParentType,
    ContextType
  >;
  firstName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  phoneNumber?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  walletAddress?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  createClassTemplate?: Resolver<
    ResolversTypes["ClassTemplate"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateClassTemplateArgs, "data">
  >;
  createEntitlement?: Resolver<
    ResolversTypes["Entitlement"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateEntitlementArgs, "input">
  >;
  createGym?: Resolver<
    ResolversTypes["Gym"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateGymArgs, "data">
  >;
  createMember?: Resolver<
    ResolversTypes["Member"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateMemberArgs, "data">
  >;
  createProduct?: Resolver<
    ResolversTypes["Product"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateProductArgs, "input">
  >;
  createScheduledClass?: Resolver<
    ResolversTypes["ScheduledClass"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateScheduledClassArgs, "input">
  >;
  createStaff?: Resolver<
    ResolversTypes["Staff"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateStaffArgs, "data">
  >;
  createTenancy?: Resolver<
    ResolversTypes["Tenancy"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateTenancyArgs, "data">
  >;
  deleteClassTemplate?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationdeleteClassTemplateArgs, "id">
  >;
  deleteGym?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationdeleteGymArgs, "id">
  >;
  deleteMember?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationdeleteMemberArgs, "id">
  >;
  deleteScheduledClass?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationdeleteScheduledClassArgs, "id">
  >;
  deleteStaff?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationdeleteStaffArgs, "id">
  >;
  setInitialPassword?: Resolver<
    ResolversTypes["StaffOrMember"],
    ParentType,
    ContextType,
    RequireFields<MutationsetInitialPasswordArgs, "password" | "token">
  >;
  updateClassTemplate?: Resolver<
    ResolversTypes["ClassTemplate"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateClassTemplateArgs, "id" | "input">
  >;
  updateGym?: Resolver<
    ResolversTypes["Gym"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateGymArgs, "data" | "id">
  >;
  updateMember?: Resolver<
    ResolversTypes["Member"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateMemberArgs, "id" | "input">
  >;
  updateProduct?: Resolver<
    ResolversTypes["Product"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateProductArgs, "id" | "input">
  >;
  updateScheduledClass?: Resolver<
    ResolversTypes["ScheduledClass"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateScheduledClassArgs, "id" | "input">
  >;
  updateStaff?: Resolver<
    ResolversTypes["Staff"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateStaffArgs, "id" | "input">
  >;
  updateTenancy?: Resolver<
    ResolversTypes["Tenancy"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateTenancyArgs, "id" | "input">
  >;
};

export type PersonResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Person"] = ResolversParentTypes["Person"],
> = {
  __resolveType?: TypeResolveFn<"Member" | "Staff", ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  phoneNumber?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  walletAddress?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
};

export type PriceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Price"] = ResolversParentTypes["Price"],
> = {
  amount?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Product"] = ResolversParentTypes["Product"],
> = {
  active?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  contractAddress?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  entitlements?: Resolver<
    Array<ResolversTypes["Entitlement"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  isNft?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes["Price"]>, ParentType, ContextType>;
  rules?: Resolver<ResolversTypes["Json"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  bookings?: Resolver<
    Array<ResolversTypes["Booking"]>,
    ParentType,
    ContextType,
    Partial<QuerybookingsArgs>
  >;
  classTemplateById?: Resolver<
    ResolversTypes["ClassTemplate"],
    ParentType,
    ContextType,
    RequireFields<QueryclassTemplateByIdArgs, "id">
  >;
  classTemplates?: Resolver<
    Array<ResolversTypes["ClassTemplate"]>,
    ParentType,
    ContextType
  >;
  contractById?: Resolver<
    ResolversTypes["UserTenancyAgreement"],
    ParentType,
    ContextType,
    RequireFields<QuerycontractByIdArgs, "id">
  >;
  contracts?: Resolver<
    Array<ResolversTypes["UserTenancyAgreement"]>,
    ParentType,
    ContextType
  >;
  entitlementById?: Resolver<
    Maybe<ResolversTypes["Entitlement"]>,
    ParentType,
    ContextType,
    RequireFields<QueryentitlementByIdArgs, "id">
  >;
  entitlements?: Resolver<
    Array<ResolversTypes["Entitlement"]>,
    ParentType,
    ContextType,
    RequireFields<QueryentitlementsArgs, "memberId">
  >;
  gymById?: Resolver<
    Maybe<ResolversTypes["Gym"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygymByIdArgs, "id">
  >;
  gyms?: Resolver<Array<ResolversTypes["Gym"]>, ParentType, ContextType>;
  memberById?: Resolver<
    ResolversTypes["Member"],
    ParentType,
    ContextType,
    RequireFields<QuerymemberByIdArgs, "id">
  >;
  members?: Resolver<Array<ResolversTypes["Member"]>, ParentType, ContextType>;
  productById?: Resolver<
    Maybe<ResolversTypes["Product"]>,
    ParentType,
    ContextType,
    RequireFields<QueryproductByIdArgs, "id">
  >;
  products?: Resolver<
    Array<ResolversTypes["Product"]>,
    ParentType,
    ContextType
  >;
  scheduledClassById?: Resolver<
    ResolversTypes["ScheduledClass"],
    ParentType,
    ContextType,
    RequireFields<QueryscheduledClassByIdArgs, "id">
  >;
  scheduledClasses?: Resolver<
    Array<ResolversTypes["ScheduledClass"]>,
    ParentType,
    ContextType,
    RequireFields<QueryscheduledClassesArgs, "args">
  >;
  search?: Resolver<
    Array<ResolversTypes["SearchResult"]>,
    ParentType,
    ContextType,
    RequireFields<QuerysearchArgs, "input">
  >;
  staff?: Resolver<Array<ResolversTypes["Staff"]>, ParentType, ContextType>;
  staffById?: Resolver<
    ResolversTypes["Staff"],
    ParentType,
    ContextType,
    RequireFields<QuerystaffByIdArgs, "id">
  >;
  tenancy?: Resolver<ResolversTypes["Tenancy"], ParentType, ContextType>;
};

export type ScheduledClassResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ScheduledClass"] = ResolversParentTypes["ScheduledClass"],
> = {
  bookings?: Resolver<
    Array<ResolversTypes["Booking"]>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  endTime?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  gym?: Resolver<ResolversTypes["Gym"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  instructor?: Resolver<
    Maybe<ResolversTypes["Staff"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SearchResult"] = ResolversParentTypes["SearchResult"],
> = {
  __resolveType?: TypeResolveFn<
    "ClassTemplate" | "Gym" | "Member" | "ScheduledClass" | "Staff",
    ParentType,
    ContextType
  >;
};

export type StaffResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Staff"] = ResolversParentTypes["Staff"],
> = {
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  isSuperUser?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  phoneNumber?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  roles?: Resolver<
    Maybe<Array<ResolversTypes["UserAtGymRole"]>>,
    ParentType,
    ContextType
  >;
  walletAddress?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StaffOrMemberResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["StaffOrMember"] = ResolversParentTypes["StaffOrMember"],
> = {
  __resolveType?: TypeResolveFn<"Member" | "Staff", ParentType, ContextType>;
};

export type TenancyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Tenancy"] = ResolversParentTypes["Tenancy"],
> = {
  contactEmail?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  legalName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAtGymRoleResolvers = EnumResolverSignature<
  {
    CLEANING_STAFF?: any;
    FRONT_DESK_STAFF?: any;
    MANAGER?: any;
    ROUTE_SETTER?: any;
    TRAINER?: any;
  },
  ResolversTypes["UserAtGymRole"]
>;

export type UserTenancyAgreementResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["UserTenancyAgreement"] = ResolversParentTypes["UserTenancyAgreement"],
> = {
  documentVersion?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  expiresAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  signedAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  status?: Resolver<ResolversTypes["AgreementStatus"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["AgreementType"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AgreementStatus?: AgreementStatusResolvers;
  AgreementType?: AgreementTypeResolvers;
  Booking?: BookingResolvers<ContextType>;
  CheckIn?: CheckInResolvers<ContextType>;
  ClassTemplate?: ClassTemplateResolvers<ContextType>;
  DateOnly?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Entitlement?: EntitlementResolvers<ContextType>;
  Gym?: GymResolvers<ContextType>;
  GymAddress?: GymAddressResolvers<ContextType>;
  Json?: GraphQLScalarType;
  Member?: MemberResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Person?: PersonResolvers<ContextType>;
  Price?: PriceResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ScheduledClass?: ScheduledClassResolvers<ContextType>;
  SearchResult?: SearchResultResolvers<ContextType>;
  Staff?: StaffResolvers<ContextType>;
  StaffOrMember?: StaffOrMemberResolvers<ContextType>;
  Tenancy?: TenancyResolvers<ContextType>;
  UserAtGymRole?: UserAtGymRoleResolvers;
  UserTenancyAgreement?: UserTenancyAgreementResolvers<ContextType>;
};
