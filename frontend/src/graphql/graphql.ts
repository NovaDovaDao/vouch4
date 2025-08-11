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
  gymId: Scalars['ID']['output'];
  id: Scalars['String']['output'];
  instructorId?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  scheduleDateTime: Scalars['DateTime']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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

export type GymCreateInput = {
  address: Scalars['Json']['input'];
  legalDocsUrl?: InputMaybe<Scalars['String']['input']>;
  legalEntityName?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  tenancyId: Scalars['String']['input'];
};

export type GymUpdateInput = {
  address?: InputMaybe<Scalars['Json']['input']>;
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
  createGym: Gym;
  createTenancy: Tenancy;
  createUser: User;
  deleteGym?: Maybe<Gym>;
  deleteTenancy?: Maybe<Tenancy>;
  deleteUser?: Maybe<User>;
  updateGym: Gym;
  updateTenancy: Tenancy;
  updateUser: User;
};


export type MutationCreateGymArgs = {
  data: GymCreateInput;
};


export type MutationCreateTenancyArgs = {
  data: TenancyCreateInput;
};


export type MutationCreateUserArgs = {
  category: UserCategory;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};


export type MutationDeleteGymArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTenancyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateGymArgs = {
  data: GymUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateTenancyArgs = {
  data: TenancyUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
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
  category: UserCategory;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isSuperUser: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  passwordHash?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  profilePicUrl?: Maybe<Scalars['String']['output']>;
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

export enum UserCategory {
  Member = 'MEMBER',
  Staff = 'STAFF'
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

export type UserUpdateInput = {
  category?: InputMaybe<UserCategory>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isSuperUser?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePicUrl?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};

export type GetTenancyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTenancyQuery = { __typename?: 'Query', tenancy: { __typename?: 'Tenancy', id: string, contactEmail: string, legalName?: string | null, name: string } };

export type GetClassesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClassesQuery = { __typename?: 'Query', classes: Array<{ __typename?: 'Class', id: string, description?: string | null, name: string, capacity: number, scheduleDateTime: any, instructorId?: string | null }> };

export type GetGymsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGymsQuery = { __typename?: 'Query', gyms: Array<{ __typename?: 'Gym', id: string, address?: any | null, name: string, legalDocsUrl?: string | null, updatedAt: any }> };

export type GetMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMembersQuery = { __typename?: 'Query', members: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, email: string, isActive: boolean, updatedAt: any }> };

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
export const GetClassesDocument = new TypedDocumentString(`
    query GetClasses {
  classes {
    id
    description
    name
    capacity
    scheduleDateTime
    instructorId
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
    email
    isActive
    updatedAt
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