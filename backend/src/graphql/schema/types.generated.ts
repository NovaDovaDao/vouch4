import {
  type GraphQLResolveInfo,
  GraphQLScalarType,
  type GraphQLScalarTypeConfig,
} from "graphql";
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
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
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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
};

export type CheckIn = {
  __typename?: "CheckIn";
  id: Scalars["String"]["output"];
  timestamp: Scalars["DateTime"]["output"];
};

export type Class = {
  __typename?: "Class";
  bookings?: Maybe<Array<Booking>>;
  capacity: Scalars["Int"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  gym?: Maybe<Gym>;
  id: Scalars["String"]["output"];
  instructor?: Maybe<User>;
  name: Scalars["String"]["output"];
  scheduleDateTime: Scalars["DateTime"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ClassCreateInput = {
  capacity: Scalars["Int"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  gymId: Scalars["ID"]["input"];
  instructorId?: InputMaybe<Scalars["ID"]["input"]>;
  name: Scalars["String"]["input"];
  scheduleDateTime: Scalars["String"]["input"];
};

export type ClassUpdateInput = {
  capacity?: InputMaybe<Scalars["Int"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  gymId?: InputMaybe<Scalars["ID"]["input"]>;
  instructorId?: InputMaybe<Scalars["ID"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  scheduleDateTime?: InputMaybe<Scalars["String"]["input"]>;
};

export type Gym = {
  __typename?: "Gym";
  address?: Maybe<Scalars["Json"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  legalDocsUrl?: Maybe<Scalars["String"]["output"]>;
  legalEntityName?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
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

export type InvitationToken = {
  __typename?: "InvitationToken";
  createdAt: Scalars["DateTime"]["output"];
  expiresAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  token: Scalars["String"]["output"];
  userId: Scalars["ID"]["output"];
};

export type MembershipNFT = {
  __typename?: "MembershipNFT";
  createdAt: Scalars["DateTime"]["output"];
  expiresAt?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["ID"]["output"];
  isActive: Scalars["Boolean"]["output"];
  isCurrentlyRented: Scalars["Boolean"]["output"];
  renterUserId?: Maybe<Scalars["ID"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
  userId: Scalars["ID"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  createClass: Class;
  createGym: Gym;
  createStaff: User;
  createTenancy: Tenancy;
  deleteClass: Scalars["Boolean"]["output"];
  deleteGym: Scalars["Boolean"]["output"];
  deleteStaff: Scalars["Boolean"]["output"];
  updateClass: Class;
  updateGym: Gym;
  updateStaff: User;
  updateTenancy: Tenancy;
};

export type MutationcreateClassArgs = {
  data: ClassCreateInput;
};

export type MutationcreateGymArgs = {
  data: GymCreateInput;
};

export type MutationcreateStaffArgs = {
  data: StaffCreateInput;
};

export type MutationcreateTenancyArgs = {
  data: TenancyCreateInput;
};

export type MutationdeleteClassArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationdeleteGymArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationdeleteStaffArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationupdateClassArgs = {
  data: ClassUpdateInput;
  id: Scalars["ID"]["input"];
};

export type MutationupdateGymArgs = {
  data: GymUpdateInput;
  id: Scalars["ID"]["input"];
};

export type MutationupdateStaffArgs = {
  data: StaffUpdateInput;
  id: Scalars["ID"]["input"];
};

export type MutationupdateTenancyArgs = {
  data: TenancyUpdateInput;
  id: Scalars["ID"]["input"];
};

export type Query = {
  __typename?: "Query";
  classById: Class;
  classes: Array<Class>;
  contractById: UserTenancyAgreement;
  contracts: Array<UserTenancyAgreement>;
  gymById?: Maybe<Gym>;
  gyms: Array<Gym>;
  membershipById: MembershipNFT;
  memberships: Array<MembershipNFT>;
  staff: Array<User>;
  staffById: User;
  tenancy: Tenancy;
};

export type QueryclassByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QuerycontractByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QuerygymByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QuerymembershipByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QuerystaffByIdArgs = {
  id: Scalars["ID"]["input"];
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
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  legalName?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
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

export type User = {
  __typename?: "User";
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  isActive: Scalars["Boolean"]["output"];
  isSuperUser: Scalars["Boolean"]["output"];
  lastName: Scalars["String"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  phoneNumber?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
  walletAddress?: Maybe<Scalars["String"]["output"]>;
};

export type UserAtGymRole =
  | "CLEANING_STAFF"
  | "FRONT_DESK_STAFF"
  | "MANAGER"
  | "ROUTE_SETTER"
  | "TRAINER";

export type UserGymAssociation = {
  __typename?: "UserGymAssociation";
  assignedAt: Scalars["DateTime"]["output"];
  gymId: Scalars["ID"]["output"];
  isActiveAtGym: Scalars["Boolean"]["output"];
  permissions?: Maybe<Scalars["Json"]["output"]>;
  roleAtGym: UserAtGymRole;
  updatedAt: Scalars["DateTime"]["output"];
  userId: Scalars["ID"]["output"];
};

export type UserTenancyAgreement = {
  __typename?: "UserTenancyAgreement";
  createdAt: Scalars["DateTime"]["output"];
  documentVersion?: Maybe<Scalars["String"]["output"]>;
  expiresAt?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["ID"]["output"];
  signedAt?: Maybe<Scalars["DateTime"]["output"]>;
  status: AgreementStatus;
  type: AgreementType;
  updatedAt: Scalars["DateTime"]["output"];
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
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
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
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AgreementStatus: ResolverTypeWrapper<
    "PENDING_SIGNATURE" | "SIGNED" | "EXPIRED" | "REVOKED"
  >;
  AgreementType: ResolverTypeWrapper<
    "WAIVER" | "TERMS_OF_SERVICE" | "PRIVACY_POLICY"
  >;
  Booking: ResolverTypeWrapper<Booking>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  CheckIn: ResolverTypeWrapper<CheckIn>;
  Class: ResolverTypeWrapper<Class>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  ClassCreateInput: ClassCreateInput;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  ClassUpdateInput: ClassUpdateInput;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]["output"]>;
  Gym: ResolverTypeWrapper<Gym>;
  GymAddress: ResolverTypeWrapper<GymAddress>;
  GymAddressInput: GymAddressInput;
  GymCreateInput: GymCreateInput;
  GymUpdateInput: GymUpdateInput;
  InvitationToken: ResolverTypeWrapper<InvitationToken>;
  Json: ResolverTypeWrapper<Scalars["Json"]["output"]>;
  MembershipNFT: ResolverTypeWrapper<MembershipNFT>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  StaffCreateInput: StaffCreateInput;
  StaffUpdateInput: StaffUpdateInput;
  Tenancy: ResolverTypeWrapper<Tenancy>;
  TenancyCreateInput: TenancyCreateInput;
  TenancyUpdateInput: TenancyUpdateInput;
  User: ResolverTypeWrapper<User>;
  UserAtGymRole: ResolverTypeWrapper<
    | "MANAGER"
    | "TRAINER"
    | "ROUTE_SETTER"
    | "FRONT_DESK_STAFF"
    | "CLEANING_STAFF"
  >;
  UserGymAssociation: ResolverTypeWrapper<
    Omit<UserGymAssociation, "roleAtGym"> & {
      roleAtGym: ResolversTypes["UserAtGymRole"];
    }
  >;
  UserTenancyAgreement: ResolverTypeWrapper<
    Omit<UserTenancyAgreement, "status" | "type"> & {
      status: ResolversTypes["AgreementStatus"];
      type: ResolversTypes["AgreementType"];
    }
  >;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Booking: Booking;
  String: Scalars["String"]["output"];
  CheckIn: CheckIn;
  Class: Class;
  Int: Scalars["Int"]["output"];
  ClassCreateInput: ClassCreateInput;
  ID: Scalars["ID"]["output"];
  ClassUpdateInput: ClassUpdateInput;
  DateTime: Scalars["DateTime"]["output"];
  Gym: Gym;
  GymAddress: GymAddress;
  GymAddressInput: GymAddressInput;
  GymCreateInput: GymCreateInput;
  GymUpdateInput: GymUpdateInput;
  InvitationToken: InvitationToken;
  Json: Scalars["Json"]["output"];
  MembershipNFT: MembershipNFT;
  Boolean: Scalars["Boolean"]["output"];
  Mutation: {};
  Query: {};
  StaffCreateInput: StaffCreateInput;
  StaffUpdateInput: StaffUpdateInput;
  Tenancy: Tenancy;
  TenancyCreateInput: TenancyCreateInput;
  TenancyUpdateInput: TenancyUpdateInput;
  User: User;
  UserGymAssociation: UserGymAssociation;
  UserTenancyAgreement: UserTenancyAgreement;
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
  ParentType extends ResolversParentTypes["Booking"] = ResolversParentTypes["Booking"]
> = {
  bookedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckInResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CheckIn"] = ResolversParentTypes["CheckIn"]
> = {
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Class"] = ResolversParentTypes["Class"]
> = {
  bookings?: Resolver<
    Maybe<Array<ResolversTypes["Booking"]>>,
    ParentType,
    ContextType
  >;
  capacity?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  createdAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  gym?: Resolver<Maybe<ResolversTypes["Gym"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  instructor?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  scheduleDateTime?: Resolver<
    ResolversTypes["DateTime"],
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type GymResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Gym"] = ResolversParentTypes["Gym"]
> = {
  address?: Resolver<Maybe<ResolversTypes["Json"]>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
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
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GymAddressResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["GymAddress"] = ResolversParentTypes["GymAddress"]
> = {
  city?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  street1?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvitationTokenResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["InvitationToken"] = ResolversParentTypes["InvitationToken"]
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  expiresAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Json"], any> {
  name: "Json";
}

export type MembershipNFTResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MembershipNFT"] = ResolversParentTypes["MembershipNFT"]
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  expiresAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  isCurrentlyRented?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  renterUserId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  createClass?: Resolver<
    ResolversTypes["Class"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateClassArgs, "data">
  >;
  createGym?: Resolver<
    ResolversTypes["Gym"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateGymArgs, "data">
  >;
  createStaff?: Resolver<
    ResolversTypes["User"],
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
  deleteClass?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationdeleteClassArgs, "id">
  >;
  deleteGym?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationdeleteGymArgs, "id">
  >;
  deleteStaff?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationdeleteStaffArgs, "id">
  >;
  updateClass?: Resolver<
    ResolversTypes["Class"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateClassArgs, "data" | "id">
  >;
  updateGym?: Resolver<
    ResolversTypes["Gym"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateGymArgs, "data" | "id">
  >;
  updateStaff?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateStaffArgs, "data" | "id">
  >;
  updateTenancy?: Resolver<
    ResolversTypes["Tenancy"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateTenancyArgs, "data" | "id">
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  classById?: Resolver<
    ResolversTypes["Class"],
    ParentType,
    ContextType,
    RequireFields<QueryclassByIdArgs, "id">
  >;
  classes?: Resolver<Array<ResolversTypes["Class"]>, ParentType, ContextType>;
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
  gymById?: Resolver<
    Maybe<ResolversTypes["Gym"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygymByIdArgs, "id">
  >;
  gyms?: Resolver<Array<ResolversTypes["Gym"]>, ParentType, ContextType>;
  membershipById?: Resolver<
    ResolversTypes["MembershipNFT"],
    ParentType,
    ContextType,
    RequireFields<QuerymembershipByIdArgs, "id">
  >;
  memberships?: Resolver<
    Array<ResolversTypes["MembershipNFT"]>,
    ParentType,
    ContextType
  >;
  staff?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
  staffById?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<QuerystaffByIdArgs, "id">
  >;
  tenancy?: Resolver<ResolversTypes["Tenancy"], ParentType, ContextType>;
};

export type TenancyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Tenancy"] = ResolversParentTypes["Tenancy"]
> = {
  contactEmail?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  legalName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
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
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  walletAddress?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
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

export type UserGymAssociationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserGymAssociation"] = ResolversParentTypes["UserGymAssociation"]
> = {
  assignedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  gymId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  isActiveAtGym?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  permissions?: Resolver<
    Maybe<ResolversTypes["Json"]>,
    ParentType,
    ContextType
  >;
  roleAtGym?: Resolver<
    ResolversTypes["UserAtGymRole"],
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserTenancyAgreementResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserTenancyAgreement"] = ResolversParentTypes["UserTenancyAgreement"]
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
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
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AgreementStatus?: AgreementStatusResolvers;
  AgreementType?: AgreementTypeResolvers;
  Booking?: BookingResolvers<ContextType>;
  CheckIn?: CheckInResolvers<ContextType>;
  Class?: ClassResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Gym?: GymResolvers<ContextType>;
  GymAddress?: GymAddressResolvers<ContextType>;
  InvitationToken?: InvitationTokenResolvers<ContextType>;
  Json?: GraphQLScalarType;
  MembershipNFT?: MembershipNFTResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tenancy?: TenancyResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserAtGymRole?: UserAtGymRoleResolvers;
  UserGymAssociation?: UserGymAssociationResolvers<ContextType>;
  UserTenancyAgreement?: UserTenancyAgreementResolvers<ContextType>;
};
