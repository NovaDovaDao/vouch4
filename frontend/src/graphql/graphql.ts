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
  member: User;
};

export type BookingsArgs = {
  gymId?: InputMaybe<Scalars['ID']['input']>;
};

export type CheckIn = {
  __typename?: 'CheckIn';
  id: Scalars['String']['output'];
  member: User;
  timestamp: Scalars['DateTime']['output'];
};

export type ClassTemplate = {
  __typename?: 'ClassTemplate';
  capacity: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  gym: Gym;
  id: Scalars['ID']['output'];
  instructor?: Maybe<User>;
  name: Scalars['String']['output'];
  recurrence: Scalars['String']['output'];
};

export type ClassTemplateCreateInput = {
  capacity: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  gymId: Scalars['ID']['input'];
  instructorId?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  recurrence: Scalars['String']['input'];
};

export type ClassTemplateUpdateInput = {
  capacity?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  gymId?: InputMaybe<Scalars['ID']['input']>;
  instructorId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  recurrence?: InputMaybe<Scalars['String']['input']>;
};

export type Gym = {
  __typename?: 'Gym';
  address?: Maybe<Scalars['Json']['output']>;
  id: Scalars['ID']['output'];
  legalDocsUrl?: Maybe<Scalars['String']['output']>;
  legalEntityName?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
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
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isCurrentlyRented: Scalars['Boolean']['output'];
  renterUser?: Maybe<User>;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createClassTemplate: ClassTemplate;
  createGym: Gym;
  createMember: User;
  createScheduledClass: ScheduledClass;
  createStaff: User;
  createTenancy: Tenancy;
  deleteClassTemplate: Scalars['Boolean']['output'];
  deleteGym: Scalars['Boolean']['output'];
  deleteMember: Scalars['Boolean']['output'];
  deleteScheduledClass: Scalars['Boolean']['output'];
  deleteStaff: Scalars['Boolean']['output'];
  setInitialPassword: User;
  updateClassTemplate: ClassTemplate;
  updateGym: Gym;
  updateMember: User;
  updateScheduledClass: ScheduledClass;
  updateStaff: User;
  updateTenancy: Tenancy;
};


export type MutationCreateClassTemplateArgs = {
  data: ClassTemplateCreateInput;
};


export type MutationCreateGymArgs = {
  data: GymCreateInput;
};


export type MutationCreateMemberArgs = {
  data: MemberCreateInput;
};


export type MutationCreateScheduledClassArgs = {
  input: ScheduledClassCreateInput;
};


export type MutationCreateStaffArgs = {
  data: StaffCreateInput;
};


export type MutationCreateTenancyArgs = {
  data: TenancyCreateInput;
};


export type MutationDeleteClassTemplateArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteGymArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMemberArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteScheduledClassArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteStaffArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSetInitialPasswordArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationUpdateClassTemplateArgs = {
  id: Scalars['ID']['input'];
  input: ClassTemplateUpdateInput;
};


export type MutationUpdateGymArgs = {
  data: GymUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateMemberArgs = {
  id: Scalars['ID']['input'];
  input: MemberUpdateInput;
};


export type MutationUpdateScheduledClassArgs = {
  id: Scalars['ID']['input'];
  input: ScheduledClassUpdateInput;
};


export type MutationUpdateStaffArgs = {
  id: Scalars['ID']['input'];
  input: StaffUpdateInput;
};


export type MutationUpdateTenancyArgs = {
  id: Scalars['ID']['input'];
  input: TenancyUpdateInput;
};

export type Query = {
  __typename?: 'Query';
  bookings: Array<Booking>;
  classTemplateById: ClassTemplate;
  classTemplates: Array<ClassTemplate>;
  contractById: UserTenancyAgreement;
  contracts: Array<UserTenancyAgreement>;
  gymById?: Maybe<Gym>;
  gyms: Array<Gym>;
  memberById: User;
  members: Array<User>;
  membershipById: MembershipNft;
  memberships: Array<MembershipNft>;
  scheduledClassById: ScheduledClass;
  scheduledClasses: Array<ScheduledClass>;
  staff: Array<User>;
  staffById: User;
  tenancy: Tenancy;
};


export type QueryBookingsArgs = {
  input?: InputMaybe<BookingsArgs>;
};


export type QueryClassTemplateByIdArgs = {
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


export type QueryScheduledClassByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryScheduledClassesArgs = {
  args: ScheduledClassesArgs;
};


export type QueryStaffByIdArgs = {
  id: Scalars['ID']['input'];
};

export type ScheduledClass = {
  __typename?: 'ScheduledClass';
  bookings: Array<Booking>;
  description?: Maybe<Scalars['String']['output']>;
  endTime: Scalars['DateTime']['output'];
  gym: Gym;
  id: Scalars['ID']['output'];
  instructor?: Maybe<User>;
  name: Scalars['String']['output'];
  startTime: Scalars['DateTime']['output'];
};

export type ScheduledClassCreateInput = {
  classTemplateId: Scalars['ID']['input'];
  endTime: Scalars['DateTime']['input'];
  startTime: Scalars['DateTime']['input'];
};

export type ScheduledClassUpdateInput = {
  classTemplateId?: InputMaybe<Scalars['ID']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ScheduledClassesArgs = {
  classTemplateId?: InputMaybe<Scalars['ID']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  gymId?: InputMaybe<Scalars['ID']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
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
  id: Scalars['ID']['output'];
  legalName?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
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
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isSuperUser: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  walletAddress?: Maybe<Scalars['String']['output']>;
};

export enum UserAtGymRole {
  CleaningStaff = 'CLEANING_STAFF',
  FrontDeskStaff = 'FRONT_DESK_STAFF',
  Manager = 'MANAGER',
  RouteSetter = 'ROUTE_SETTER',
  Trainer = 'TRAINER'
}

export type UserTenancyAgreement = {
  __typename?: 'UserTenancyAgreement';
  documentVersion?: Maybe<Scalars['String']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  signedAt?: Maybe<Scalars['DateTime']['output']>;
  status: AgreementStatus;
  type: AgreementType;
};

export type SetInitialPasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SetInitialPasswordMutation = { __typename?: 'Mutation', setInitialPassword: { __typename?: 'User', id: string } };

export type ClassTemplateOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type ClassTemplateOptionsQuery = { __typename?: 'Query', staff: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string }>, gyms: Array<{ __typename?: 'Gym', id: string, name: string, legalEntityName?: string | null }> };

export type CreateClassTemplateMutationVariables = Exact<{
  data: ClassTemplateCreateInput;
}>;


export type CreateClassTemplateMutation = { __typename?: 'Mutation', createClassTemplate: { __typename?: 'ClassTemplate', id: string, name: string } };

export type GetScheduledClassByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetScheduledClassByIdQuery = { __typename?: 'Query', scheduledClassById: { __typename?: 'ScheduledClass', name: string, description?: string | null, startTime: any, endTime: any, instructor?: { __typename?: 'User', name?: string | null } | null, bookings: Array<{ __typename?: 'Booking', id: string, member: { __typename?: 'User', id: string, name?: string | null, isActive: boolean } }>, gym: { __typename?: 'Gym', id: string, name: string } } };

export type DeleteScheduledClassMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteScheduledClassMutation = { __typename?: 'Mutation', deleteScheduledClass: boolean };

export type GetClassTemplateByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetClassTemplateByIdQuery = { __typename?: 'Query', classTemplateById: { __typename?: 'ClassTemplate', name: string, description?: string | null, capacity: number, recurrence: string, gym: { __typename?: 'Gym', id: string, name: string }, instructor?: { __typename?: 'User', id: string, name?: string | null } | null } };

export type UpdateClassTemplateMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: ClassTemplateUpdateInput;
}>;


export type UpdateClassTemplateMutation = { __typename?: 'Mutation', updateClassTemplate: { __typename?: 'ClassTemplate', id: string, name: string } };

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


export type GetMemberByIdQuery = { __typename?: 'Query', memberById: { __typename?: 'User', email: string, firstName: string, id: string, isActive: boolean, lastName: string, walletAddress?: string | null, phoneNumber?: string | null } };

export type UpdateMemberMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: MemberUpdateInput;
}>;


export type UpdateMemberMutation = { __typename?: 'Mutation', updateMember: { __typename?: 'User', id: string, firstName: string } };

export type CreateStaffMutationVariables = Exact<{
  data: StaffCreateInput;
}>;


export type CreateStaffMutation = { __typename?: 'Mutation', createStaff: { __typename?: 'User', id: string, firstName: string } };

export type GetStaffByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetStaffByIdQuery = { __typename?: 'Query', staffById: { __typename?: 'User', email: string, firstName: string, id: string, isActive: boolean, lastName: string, walletAddress?: string | null, phoneNumber?: string | null } };

export type UpdateStaffMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: StaffUpdateInput;
}>;


export type UpdateStaffMutation = { __typename?: 'Mutation', updateStaff: { __typename?: 'User', id: string, firstName: string } };

export type GetTenancyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTenancyQuery = { __typename?: 'Query', tenancy: { __typename?: 'Tenancy', id: string, contactEmail: string, legalName?: string | null, name: string } };

export type CreateTenancyMutationVariables = Exact<{
  data: TenancyCreateInput;
}>;


export type CreateTenancyMutation = { __typename?: 'Mutation', createTenancy: { __typename?: 'Tenancy', id: string } };

export type GetScheduledClassesQueryVariables = Exact<{
  args: ScheduledClassesArgs;
}>;


export type GetScheduledClassesQuery = { __typename?: 'Query', scheduledClasses: Array<{ __typename?: 'ScheduledClass', id: string, name: string, startTime: any, endTime: any, gym: { __typename?: 'Gym', name: string }, instructor?: { __typename?: 'User', name?: string | null } | null, bookings: Array<{ __typename?: 'Booking', id: string }> }> };

export type GetClassTemplatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClassTemplatesQuery = { __typename?: 'Query', classTemplates: Array<{ __typename?: 'ClassTemplate', id: string, name: string, capacity: number, description?: string | null, recurrence: string, gym: { __typename?: 'Gym', id: string, name: string }, instructor?: { __typename?: 'User', id: string, name?: string | null } | null }> };

export type GetGymsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGymsQuery = { __typename?: 'Query', gyms: Array<{ __typename?: 'Gym', id: string, address?: any | null, name: string, legalDocsUrl?: string | null, legalEntityName?: string | null }> };

export type GetMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMembersQuery = { __typename?: 'Query', members: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, email: string, isActive: boolean, phoneNumber?: string | null }> };

export type GetContractsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetContractsQuery = { __typename?: 'Query', contracts: Array<{ __typename?: 'UserTenancyAgreement', id: string }> };

export type GetMembershipsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMembershipsQuery = { __typename?: 'Query', memberships: Array<{ __typename?: 'MembershipNFT', id: string, expiresAt?: any | null, isActive: boolean, isCurrentlyRented: boolean, renterUser?: { __typename?: 'User', id: string } | null, user: { __typename?: 'User', id: string } }> };

export type GetStaffQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStaffQuery = { __typename?: 'Query', staff: Array<{ __typename?: 'User', id: string, email: string, phoneNumber?: string | null, firstName: string, lastName: string, isActive: boolean }> };

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

export const SetInitialPasswordDocument = new TypedDocumentString(`
    mutation SetInitialPassword($token: String!, $password: String!) {
  setInitialPassword(token: $token, password: $password) {
    id
  }
}
    `) as unknown as TypedDocumentString<SetInitialPasswordMutation, SetInitialPasswordMutationVariables>;
export const ClassTemplateOptionsDocument = new TypedDocumentString(`
    query ClassTemplateOptions {
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
    `) as unknown as TypedDocumentString<ClassTemplateOptionsQuery, ClassTemplateOptionsQueryVariables>;
export const CreateClassTemplateDocument = new TypedDocumentString(`
    mutation CreateClassTemplate($data: ClassTemplateCreateInput!) {
  createClassTemplate(data: $data) {
    id
    name
  }
}
    `) as unknown as TypedDocumentString<CreateClassTemplateMutation, CreateClassTemplateMutationVariables>;
export const GetScheduledClassByIdDocument = new TypedDocumentString(`
    query GetScheduledClassById($id: ID!) {
  scheduledClassById(id: $id) {
    name
    description
    startTime
    endTime
    instructor {
      name
    }
    bookings {
      id
      member {
        id
        name
        isActive
      }
    }
    gym {
      id
      name
    }
  }
}
    `) as unknown as TypedDocumentString<GetScheduledClassByIdQuery, GetScheduledClassByIdQueryVariables>;
export const DeleteScheduledClassDocument = new TypedDocumentString(`
    mutation DeleteScheduledClass($id: ID!) {
  deleteScheduledClass(id: $id)
}
    `) as unknown as TypedDocumentString<DeleteScheduledClassMutation, DeleteScheduledClassMutationVariables>;
export const GetClassTemplateByIdDocument = new TypedDocumentString(`
    query GetClassTemplateById($id: ID!) {
  classTemplateById(id: $id) {
    name
    description
    capacity
    gym {
      id
      name
    }
    instructor {
      id
      name
    }
    recurrence
  }
}
    `) as unknown as TypedDocumentString<GetClassTemplateByIdQuery, GetClassTemplateByIdQueryVariables>;
export const UpdateClassTemplateDocument = new TypedDocumentString(`
    mutation UpdateClassTemplate($id: ID!, $input: ClassTemplateUpdateInput!) {
  updateClassTemplate(id: $id, input: $input) {
    id
    name
  }
}
    `) as unknown as TypedDocumentString<UpdateClassTemplateMutation, UpdateClassTemplateMutationVariables>;
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
    email
    firstName
    id
    isActive
    lastName
    walletAddress
    phoneNumber
  }
}
    `) as unknown as TypedDocumentString<GetMemberByIdQuery, GetMemberByIdQueryVariables>;
export const UpdateMemberDocument = new TypedDocumentString(`
    mutation UpdateMember($id: ID!, $input: MemberUpdateInput!) {
  updateMember(id: $id, input: $input) {
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
    email
    firstName
    id
    isActive
    lastName
    walletAddress
    phoneNumber
  }
}
    `) as unknown as TypedDocumentString<GetStaffByIdQuery, GetStaffByIdQueryVariables>;
export const UpdateStaffDocument = new TypedDocumentString(`
    mutation UpdateStaff($id: ID!, $input: StaffUpdateInput!) {
  updateStaff(id: $id, input: $input) {
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
export const GetScheduledClassesDocument = new TypedDocumentString(`
    query GetScheduledClasses($args: ScheduledClassesArgs!) {
  scheduledClasses(args: $args) {
    id
    name
    startTime
    endTime
    gym {
      name
    }
    instructor {
      name
    }
    bookings {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<GetScheduledClassesQuery, GetScheduledClassesQueryVariables>;
export const GetClassTemplatesDocument = new TypedDocumentString(`
    query GetClassTemplates {
  classTemplates {
    id
    name
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
    recurrence
  }
}
    `) as unknown as TypedDocumentString<GetClassTemplatesQuery, GetClassTemplatesQueryVariables>;
export const GetGymsDocument = new TypedDocumentString(`
    query GetGyms {
  gyms {
    id
    address
    name
    legalDocsUrl
    legalEntityName
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
    phoneNumber
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
    expiresAt
    isActive
    isCurrentlyRented
    renterUser {
      id
    }
    user {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<GetMembershipsQuery, GetMembershipsQueryVariables>;
export const GetStaffDocument = new TypedDocumentString(`
    query GetStaff {
  staff {
    id
    email
    phoneNumber
    firstName
    lastName
    isActive
  }
}
    `) as unknown as TypedDocumentString<GetStaffQuery, GetStaffQueryVariables>;