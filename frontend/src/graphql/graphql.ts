/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Json: { input: any; output: any; }
};

export enum AgreementStatus {
  Expired = 'EXPIRED',
  PendingSignature = 'PENDING_SIGNATURE',
  Revoked = 'REVOKED',
  Signed = 'SIGNED'
}

export enum AgreementType {
  PrivacyPolicy = 'PRIVACY_POLICY',
  TermsOfService = 'TERMS_OF_SERVICE',
  Waiver = 'WAIVER'
}

export type Booking = {
  __typename?: 'Booking';
  bookedAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
};

export type CheckIn = {
  __typename?: 'CheckIn';
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type Class = {
  __typename?: 'Class';
  bookings?: Maybe<Array<Booking>>;
  capacity: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  gym?: Maybe<Gym>;
  id: Scalars['String']['output'];
  instructor?: Maybe<User>;
  name: Scalars['String']['output'];
  scheduleDateTime: Scalars['DateTime']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ClassCreateInput = {
  capacity: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  gymId: Scalars['ID']['input'];
  instructorId?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  scheduleDateTime: Scalars['String']['input'];
};

export type ClassUpdateInput = {
  capacity?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  gymId?: InputMaybe<Scalars['ID']['input']>;
  instructorId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  scheduleDateTime?: InputMaybe<Scalars['String']['input']>;
};

export type Gym = {
  __typename?: 'Gym';
  address?: Maybe<Scalars['Json']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  legalDocsUrl?: Maybe<Scalars['String']['output']>;
  legalEntityName?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GymAddress = {
  __typename?: 'GymAddress';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street1?: Maybe<Scalars['String']['output']>;
  zip?: Maybe<Scalars['String']['output']>;
};

export type GymAddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street1?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type GymCreateInput = {
  address: GymAddressInput;
  legalDocsUrl?: InputMaybe<Scalars['String']['input']>;
  legalEntityName?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type GymUpdateInput = {
  address?: InputMaybe<GymAddressInput>;
  legalDocsUrl?: InputMaybe<Scalars['String']['input']>;
  legalEntityName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type InvitationToken = {
  __typename?: 'InvitationToken';
  createdAt: Scalars['DateTime']['output'];
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type MemberCreateInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isSuperUser?: InputMaybe<Scalars['Boolean']['input']>;
  lastName: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};

export type MemberUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isSuperUser?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};

export type MembershipNft = {
  __typename?: 'MembershipNFT';
  createdAt: Scalars['DateTime']['output'];
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isCurrentlyRented: Scalars['Boolean']['output'];
  renterUserId?: Maybe<Scalars['ID']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createClass: Class;
  createGym: Gym;
  createMember: User;
  createStaff: User;
  createTenancy: Tenancy;
  deleteClass: Scalars['Boolean']['output'];
  deleteGym: Scalars['Boolean']['output'];
  deleteMember: Scalars['Boolean']['output'];
  deleteStaff: Scalars['Boolean']['output'];
  updateClass: Class;
  updateGym: Gym;
  updateMember: User;
  updateStaff: User;
  updateTenancy: Tenancy;
};


export type MutationCreateClassArgs = {
  data: ClassCreateInput;
};


export type MutationCreateGymArgs = {
  data: GymCreateInput;
};


export type MutationCreateMemberArgs = {
  data: MemberCreateInput;
};


export type MutationCreateStaffArgs = {
  data: StaffCreateInput;
};


export type MutationCreateTenancyArgs = {
  data: TenancyCreateInput;
};


export type MutationDeleteClassArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteGymArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMemberArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteStaffArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateClassArgs = {
  data: ClassUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateGymArgs = {
  data: GymUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateMemberArgs = {
  data: MemberUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateStaffArgs = {
  data: StaffUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateTenancyArgs = {
  data: TenancyUpdateInput;
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  classById: Class;
  classes: Array<Class>;
  contractById: UserTenancyAgreement;
  contracts: Array<UserTenancyAgreement>;
  gymById?: Maybe<Gym>;
  gyms: Array<Gym>;
  memberById: User;
  members: Array<User>;
  membershipById: MembershipNft;
  memberships: Array<MembershipNft>;
  staff: Array<User>;
  staffById: User;
  tenancy: Tenancy;
};


export type QueryClassByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryContractByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGymByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMemberByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMembershipByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStaffByIdArgs = {
  id: Scalars['ID']['input'];
};

export type StaffCreateInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isSuperUser?: InputMaybe<Scalars['Boolean']['input']>;
  lastName: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};

export type StaffUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isSuperUser?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};

export type Tenancy = {
  __typename?: 'Tenancy';
  contactEmail: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  legalName?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TenancyCreateInput = {
  contactEmail: Scalars['String']['input'];
  legalName?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type TenancyUpdateInput = {
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  legalName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isSuperUser: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  walletAddress?: Maybe<Scalars['String']['output']>;
};

export enum UserAtGymRole {
  CleaningStaff = 'CLEANING_STAFF',
  FrontDeskStaff = 'FRONT_DESK_STAFF',
  Manager = 'MANAGER',
  RouteSetter = 'ROUTE_SETTER',
  Trainer = 'TRAINER'
}

export type UserGymAssociation = {
  __typename?: 'UserGymAssociation';
  assignedAt: Scalars['DateTime']['output'];
  gymId: Scalars['ID']['output'];
  isActiveAtGym: Scalars['Boolean']['output'];
  permissions?: Maybe<Scalars['Json']['output']>;
  roleAtGym: UserAtGymRole;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type UserTenancyAgreement = {
  __typename?: 'UserTenancyAgreement';
  createdAt: Scalars['DateTime']['output'];
  documentVersion?: Maybe<Scalars['String']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  signedAt?: Maybe<Scalars['DateTime']['output']>;
  status: AgreementStatus;
  type: AgreementType;
  updatedAt: Scalars['DateTime']['output'];
};

export type ClassOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type ClassOptionsQuery = { __typename?: 'Query', staff: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string }>, gyms: Array<{ __typename?: 'Gym', id: string, name: string, legalEntityName?: string | null }> };

export type CreateClassMutationVariables = Exact<{
  data: ClassCreateInput;
}>;


export type CreateClassMutation = { __typename?: 'Mutation', createClass: { __typename?: 'Class', id: string, name: string } };

export type GetClassByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetClassByIdQuery = { __typename?: 'Query', classById: { __typename?: 'Class', capacity: number, description?: string | null, name: string, scheduleDateTime: any, gym?: { __typename?: 'Gym', id: string, name: string } | null, instructor?: { __typename?: 'User', id: string, name?: string | null } | null } };

export type UpdateClassMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: ClassUpdateInput;
}>;


export type UpdateClassMutation = { __typename?: 'Mutation', updateClass: { __typename?: 'Class', id: string, name: string } };

export type CreateGymMutationVariables = Exact<{
  data: GymCreateInput;
}>;


export type CreateGymMutation = { __typename?: 'Mutation', createGym: { __typename?: 'Gym', id: string, name: string } };

export type GetGymOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGymOptionsQuery = { __typename?: 'Query', gyms: Array<{ __typename?: 'Gym', id: string, name: string }> };

export type GetGymByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetGymByIdQuery = { __typename?: 'Query', gymById?: { __typename?: 'Gym', name: string, address?: any | null, legalDocsUrl?: string | null, legalEntityName?: string | null } | null };

export type UpdateGymMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: GymUpdateInput;
}>;


export type UpdateGymMutation = { __typename?: 'Mutation', updateGym: { __typename?: 'Gym', id: string, name: string } };

export type CreateMemberMutationVariables = Exact<{
  data: MemberCreateInput;
}>;


export type CreateMemberMutation = { __typename?: 'Mutation', createMember: { __typename?: 'User', id: string, firstName: string } };

export type GetMemberByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetMemberByIdQuery = { __typename?: 'Query', memberById: { __typename?: 'User', createdAt: any, email: string, firstName: string, id: string, isActive: boolean, lastName: string, walletAddress?: string | null, updatedAt: any, phoneNumber?: string | null } };

export type UpdateMemberMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: MemberUpdateInput;
}>;


export type UpdateMemberMutation = { __typename?: 'Mutation', updateMember: { __typename?: 'User', id: string, firstName: string } };

export type CreateStaffMutationVariables = Exact<{
  data: StaffCreateInput;
}>;


export type CreateStaffMutation = { __typename?: 'Mutation', createStaff: { __typename?: 'User', id: string, firstName: string } };

export type GetStaffByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetStaffByIdQuery = { __typename?: 'Query', staffById: { __typename?: 'User', createdAt: any, email: string, firstName: string, id: string, isActive: boolean, lastName: string, walletAddress?: string | null, updatedAt: any, phoneNumber?: string | null } };

export type UpdateStaffMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: StaffUpdateInput;
}>;


export type UpdateStaffMutation = { __typename?: 'Mutation', updateStaff: { __typename?: 'User', id: string, firstName: string } };

export type GetTenancyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTenancyQuery = { __typename?: 'Query', tenancy: { __typename?: 'Tenancy', id: string, contactEmail: string, legalName?: string | null, name: string } };

export type CreateTenancyMutationVariables = Exact<{
  data: TenancyCreateInput;
}>;


export type CreateTenancyMutation = { __typename?: 'Mutation', createTenancy: { __typename?: 'Tenancy', id: string } };

export type GetClassesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClassesQuery = { __typename?: 'Query', classes: Array<{ __typename?: 'Class', id: string, description?: string | null, name: string, capacity: number, scheduleDateTime: any, instructor?: { __typename?: 'User', id: string, name?: string | null } | null, gym?: { __typename?: 'Gym', id: string, name: string } | null }> };

export type GetGymsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGymsQuery = { __typename?: 'Query', gyms: Array<{ __typename?: 'Gym', id: string, address?: any | null, name: string, legalDocsUrl?: string | null, updatedAt: any }> };

export type GetMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMembersQuery = { __typename?: 'Query', members: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, updatedAt: any, isActive: boolean }> };

export type GetContractsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetContractsQuery = { __typename?: 'Query', contracts: Array<{ __typename?: 'UserTenancyAgreement', id: string }> };

export type GetMembershipsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMembershipsQuery = { __typename?: 'Query', memberships: Array<{ __typename?: 'MembershipNFT', id: string }> };

export type GetStaffQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStaffQuery = { __typename?: 'Query', staff: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, updatedAt: any, isActive: boolean }> };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const ClassOptionsDocument = new TypedDocumentString(`
    query ClassOptions {
  staff {
    id
    firstName
    lastName
  }
  gyms {
    id
    name
    legalEntityName
  }
}
    `) as unknown as TypedDocumentString<ClassOptionsQuery, ClassOptionsQueryVariables>;
export const CreateClassDocument = new TypedDocumentString(`
    mutation CreateClass($data: ClassCreateInput!) {
  createClass(data: $data) {
    id
    name
  }
}
    `) as unknown as TypedDocumentString<CreateClassMutation, CreateClassMutationVariables>;
export const GetClassByIdDocument = new TypedDocumentString(`
    query GetClassById($id: ID!) {
  classById(id: $id) {
    capacity
    description
    gym {
      id
      name
    }
    instructor {
      id
      name
    }
    name
    scheduleDateTime
  }
}
    `) as unknown as TypedDocumentString<GetClassByIdQuery, GetClassByIdQueryVariables>;
export const UpdateClassDocument = new TypedDocumentString(`
    mutation UpdateClass($id: ID!, $data: ClassUpdateInput!) {
  updateClass(id: $id, data: $data) {
    id
    name
  }
}
    `) as unknown as TypedDocumentString<UpdateClassMutation, UpdateClassMutationVariables>;
export const CreateGymDocument = new TypedDocumentString(`
    mutation CreateGym($data: GymCreateInput!) {
  createGym(data: $data) {
    id
    name
  }
}
    `) as unknown as TypedDocumentString<CreateGymMutation, CreateGymMutationVariables>;
export const GetGymOptionsDocument = new TypedDocumentString(`
    query GetGymOptions {
  gyms {
    id
    name
  }
}
    `) as unknown as TypedDocumentString<GetGymOptionsQuery, GetGymOptionsQueryVariables>;
export const GetGymByIdDocument = new TypedDocumentString(`
    query GetGymById($id: ID!) {
  gymById(id: $id) {
    name
    address
    legalDocsUrl
    legalEntityName
  }
}
    `) as unknown as TypedDocumentString<GetGymByIdQuery, GetGymByIdQueryVariables>;
export const UpdateGymDocument = new TypedDocumentString(`
    mutation UpdateGym($id: ID!, $data: GymUpdateInput!) {
  updateGym(id: $id, data: $data) {
    id
    name
  }
}
    `) as unknown as TypedDocumentString<UpdateGymMutation, UpdateGymMutationVariables>;
export const CreateMemberDocument = new TypedDocumentString(`
    mutation CreateMember($data: MemberCreateInput!) {
  createMember(data: $data) {
    id
    firstName
  }
}
    `) as unknown as TypedDocumentString<CreateMemberMutation, CreateMemberMutationVariables>;
export const GetMemberByIdDocument = new TypedDocumentString(`
    query GetMemberById($id: ID!) {
  memberById(id: $id) {
    createdAt
    email
    firstName
    id
    isActive
    lastName
    walletAddress
    updatedAt
    phoneNumber
  }
}
    `) as unknown as TypedDocumentString<GetMemberByIdQuery, GetMemberByIdQueryVariables>;
export const UpdateMemberDocument = new TypedDocumentString(`
    mutation UpdateMember($id: ID!, $data: MemberUpdateInput!) {
  updateMember(id: $id, data: $data) {
    id
    firstName
  }
}
    `) as unknown as TypedDocumentString<UpdateMemberMutation, UpdateMemberMutationVariables>;
export const CreateStaffDocument = new TypedDocumentString(`
    mutation CreateStaff($data: StaffCreateInput!) {
  createStaff(data: $data) {
    id
    firstName
  }
}
    `) as unknown as TypedDocumentString<CreateStaffMutation, CreateStaffMutationVariables>;
export const GetStaffByIdDocument = new TypedDocumentString(`
    query GetStaffById($id: ID!) {
  staffById(id: $id) {
    createdAt
    email
    firstName
    id
    isActive
    lastName
    walletAddress
    updatedAt
    phoneNumber
  }
}
    `) as unknown as TypedDocumentString<GetStaffByIdQuery, GetStaffByIdQueryVariables>;
export const UpdateStaffDocument = new TypedDocumentString(`
    mutation UpdateStaff($id: ID!, $data: StaffUpdateInput!) {
  updateStaff(id: $id, data: $data) {
    id
    firstName
  }
}
    `) as unknown as TypedDocumentString<UpdateStaffMutation, UpdateStaffMutationVariables>;
export const GetTenancyDocument = new TypedDocumentString(`
    query GetTenancy {
  tenancy {
    id
    contactEmail
    legalName
    name
  }
}
    `) as unknown as TypedDocumentString<GetTenancyQuery, GetTenancyQueryVariables>;
export const CreateTenancyDocument = new TypedDocumentString(`
    mutation CreateTenancy($data: TenancyCreateInput!) {
  createTenancy(data: $data) {
    id
  }
}
    `) as unknown as TypedDocumentString<CreateTenancyMutation, CreateTenancyMutationVariables>;
export const GetClassesDocument = new TypedDocumentString(`
    query GetClasses {
  classes {
    id
    description
    name
    capacity
    scheduleDateTime
    instructor {
      id
      name
    }
    gym {
      id
      name
    }
  }
}
    `) as unknown as TypedDocumentString<GetClassesQuery, GetClassesQueryVariables>;
export const GetGymsDocument = new TypedDocumentString(`
    query GetGyms {
  gyms {
    id
    address
    name
    legalDocsUrl
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<GetGymsQuery, GetGymsQueryVariables>;
export const GetMembersDocument = new TypedDocumentString(`
    query GetMembers {
  members {
    id
    firstName
    lastName
    updatedAt
    isActive
  }
}
    `) as unknown as TypedDocumentString<GetMembersQuery, GetMembersQueryVariables>;
export const GetContractsDocument = new TypedDocumentString(`
    query GetContracts {
  contracts {
    id
  }
}
    `) as unknown as TypedDocumentString<GetContractsQuery, GetContractsQueryVariables>;
export const GetMembershipsDocument = new TypedDocumentString(`
    query GetMemberships {
  memberships {
    id
  }
}
    `) as unknown as TypedDocumentString<GetMembershipsQuery, GetMembershipsQueryVariables>;
export const GetStaffDocument = new TypedDocumentString(`
    query GetStaff {
  staff {
    id
    firstName
    lastName
    updatedAt
    isActive
  }
}
    `) as unknown as TypedDocumentString<GetStaffQuery, GetStaffQueryVariables>;