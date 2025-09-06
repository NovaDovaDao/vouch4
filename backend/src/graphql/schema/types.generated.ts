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
  K extends keyof T,
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
  member: User;
};

export type BookingsArgs = {
  gymId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type CheckIn = {
  __typename?: "CheckIn";
  id: Scalars["String"]["output"];
  member: User;
  timestamp: Scalars["DateTime"]["output"];
};

export type ClassTemplate = {
  __typename?: "ClassTemplate";
  capacity: Scalars["Int"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  gym: Gym;
  id: Scalars["ID"]["output"];
  instructor?: Maybe<User>;
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

export type MemberCreateInput = {
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  isSuperUser?: InputMaybe<Scalars["Boolean"]["input"]>;
  lastName: Scalars["String"]["input"];
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  walletAddress?: InputMaybe<Scalars["String"]["input"]>;
};

export type MemberUpdateInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  isSuperUser?: InputMaybe<Scalars["Boolean"]["input"]>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  walletAddress?: InputMaybe<Scalars["String"]["input"]>;
};

export type MembershipNFT = {
  __typename?: "MembershipNFT";
  expiresAt?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["ID"]["output"];
  isActive: Scalars["Boolean"]["output"];
  isCurrentlyRented: Scalars["Boolean"]["output"];
  renterUser?: Maybe<User>;
  user: User;
};

export type Mutation = {
  __typename?: "Mutation";
  createClassTemplate: ClassTemplate;
  createGym: Gym;
  createMember: User;
  createScheduledClass: ScheduledClass;
  createStaff: User;
  createTenancy: Tenancy;
  deleteClassTemplate: Scalars["Boolean"]["output"];
  deleteGym: Scalars["Boolean"]["output"];
  deleteMember: Scalars["Boolean"]["output"];
  deleteScheduledClass: Scalars["Boolean"]["output"];
  deleteStaff: Scalars["Boolean"]["output"];
  setInitialPassword: User;
  updateClassTemplate: ClassTemplate;
  updateGym: Gym;
  updateMember: User;
  updateScheduledClass: ScheduledClass;
  updateStaff: User;
  updateTenancy: Tenancy;
};

export type MutationcreateClassTemplateArgs = {
  data: ClassTemplateCreateInput;
};

export type MutationcreateGymArgs = {
  data: GymCreateInput;
};

export type MutationcreateMemberArgs = {
  data: MemberCreateInput;
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

export type Query = {
  __typename?: "Query";
  bookings: Array<Booking>;
  classTemplateById: ClassTemplate;
  classTemplates: Array<ClassTemplate>;
  contractById: UserTenancyAgreement;
  contracts: Array<UserTenancyAgreement>;
  gymById?: Maybe<Gym>;
  gyms: Array<Gym>;
  memberById: User;
  members: Array<User>;
  membershipById: MembershipNFT;
  memberships: Array<MembershipNFT>;
  scheduledClassById: ScheduledClass;
  scheduledClasses: Array<ScheduledClass>;
  staff: Array<User>;
  staffById: User;
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

export type QuerygymByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QuerymemberByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QuerymembershipByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryscheduledClassByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryscheduledClassesArgs = {
  args: ScheduledClassesArgs;
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
  instructor?: Maybe<User>;
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

export type User = {
  __typename?: "User";
  email: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  isActive: Scalars["Boolean"]["output"];
  isSuperUser: Scalars["Boolean"]["output"];
  lastName: Scalars["String"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  phoneNumber?: Maybe<Scalars["String"]["output"]>;
  walletAddress?: Maybe<Scalars["String"]["output"]>;
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
  BookingsArgs: BookingsArgs;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  CheckIn: ResolverTypeWrapper<CheckIn>;
  ClassTemplate: ResolverTypeWrapper<ClassTemplate>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  ClassTemplateCreateInput: ClassTemplateCreateInput;
  ClassTemplateUpdateInput: ClassTemplateUpdateInput;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]["output"]>;
  Gym: ResolverTypeWrapper<Gym>;
  GymAddress: ResolverTypeWrapper<GymAddress>;
  GymAddressInput: GymAddressInput;
  GymCreateInput: GymCreateInput;
  GymUpdateInput: GymUpdateInput;
  Json: ResolverTypeWrapper<Scalars["Json"]["output"]>;
  MemberCreateInput: MemberCreateInput;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  MemberUpdateInput: MemberUpdateInput;
  MembershipNFT: ResolverTypeWrapper<MembershipNFT>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ScheduledClass: ResolverTypeWrapper<ScheduledClass>;
  ScheduledClassCreateInput: ScheduledClassCreateInput;
  ScheduledClassUpdateInput: ScheduledClassUpdateInput;
  ScheduledClassesArgs: ScheduledClassesArgs;
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
  BookingsArgs: BookingsArgs;
  ID: Scalars["ID"]["output"];
  CheckIn: CheckIn;
  ClassTemplate: ClassTemplate;
  Int: Scalars["Int"]["output"];
  ClassTemplateCreateInput: ClassTemplateCreateInput;
  ClassTemplateUpdateInput: ClassTemplateUpdateInput;
  DateTime: Scalars["DateTime"]["output"];
  Gym: Gym;
  GymAddress: GymAddress;
  GymAddressInput: GymAddressInput;
  GymCreateInput: GymCreateInput;
  GymUpdateInput: GymUpdateInput;
  Json: Scalars["Json"]["output"];
  MemberCreateInput: MemberCreateInput;
  Boolean: Scalars["Boolean"]["output"];
  MemberUpdateInput: MemberUpdateInput;
  MembershipNFT: MembershipNFT;
  Mutation: {};
  Query: {};
  ScheduledClass: ScheduledClass;
  ScheduledClassCreateInput: ScheduledClassCreateInput;
  ScheduledClassUpdateInput: ScheduledClassUpdateInput;
  ScheduledClassesArgs: ScheduledClassesArgs;
  StaffCreateInput: StaffCreateInput;
  StaffUpdateInput: StaffUpdateInput;
  Tenancy: Tenancy;
  TenancyCreateInput: TenancyCreateInput;
  TenancyUpdateInput: TenancyUpdateInput;
  User: User;
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
  ParentType extends
    ResolversParentTypes["Booking"] = ResolversParentTypes["Booking"],
> = {
  bookedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  member?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckInResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CheckIn"] = ResolversParentTypes["CheckIn"],
> = {
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  member?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
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
  instructor?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  recurrence?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

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

export type MembershipNFTResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MembershipNFT"] = ResolversParentTypes["MembershipNFT"],
> = {
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
  renterUser?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
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
  createGym?: Resolver<
    ResolversTypes["Gym"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateGymArgs, "data">
  >;
  createMember?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateMemberArgs, "data">
  >;
  createScheduledClass?: Resolver<
    ResolversTypes["ScheduledClass"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateScheduledClassArgs, "input">
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
    ResolversTypes["User"],
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
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateMemberArgs, "id" | "input">
  >;
  updateScheduledClass?: Resolver<
    ResolversTypes["ScheduledClass"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateScheduledClassArgs, "id" | "input">
  >;
  updateStaff?: Resolver<
    ResolversTypes["User"],
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
  gymById?: Resolver<
    Maybe<ResolversTypes["Gym"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygymByIdArgs, "id">
  >;
  gyms?: Resolver<Array<ResolversTypes["Gym"]>, ParentType, ContextType>;
  memberById?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<QuerymemberByIdArgs, "id">
  >;
  members?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
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
  staff?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
  staffById?: Resolver<
    ResolversTypes["User"],
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
  instructor?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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

export type UserResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["User"] = ResolversParentTypes["User"],
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
  DateTime?: GraphQLScalarType;
  Gym?: GymResolvers<ContextType>;
  GymAddress?: GymAddressResolvers<ContextType>;
  Json?: GraphQLScalarType;
  MembershipNFT?: MembershipNFTResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ScheduledClass?: ScheduledClassResolvers<ContextType>;
  Tenancy?: TenancyResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserAtGymRole?: UserAtGymRoleResolvers;
  UserTenancyAgreement?: UserTenancyAgreementResolvers<ContextType>;
};
