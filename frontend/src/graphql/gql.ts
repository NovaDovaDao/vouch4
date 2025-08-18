/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query ClassOptions {\n    staff {\n      id\n      firstName\n      lastName\n    }\n    gyms {\n      id\n      name\n      legalEntityName\n    }\n  }\n": typeof types.ClassOptionsDocument,
    "\n  mutation CreateClass($data: ClassCreateInput!) {\n    createClass(data: $data) {\n      id\n      name\n    }\n  }\n": typeof types.CreateClassDocument,
    "\n  query GetClassById($id: ID!) {\n    classById(id: $id) {\n      capacity\n      description\n      gym {\n        id\n        name\n      }\n      instructor {\n        id\n        name\n      }\n      name\n      scheduleDateTime\n    }\n  }\n": typeof types.GetClassByIdDocument,
    "\n  mutation UpdateClass($id: ID!, $data: ClassUpdateInput!) {\n    updateClass(id: $id, data: $data) {\n      id\n      name\n    }\n  }\n": typeof types.UpdateClassDocument,
    "\n  mutation CreateGym($data: GymCreateInput!) {\n    createGym(data: $data) {\n      id\n      name\n    }\n  }\n": typeof types.CreateGymDocument,
    "\n  query GetGymOptions {\n    gyms {\n      id\n      name\n    }\n  }\n": typeof types.GetGymOptionsDocument,
    "\n  query GetGymById($id: ID!) {\n    gymById(id: $id) {\n      name\n      address\n      legalDocsUrl\n      legalEntityName\n    }\n  }\n": typeof types.GetGymByIdDocument,
    "\n  mutation UpdateGym($id: ID!, $data: GymUpdateInput!) {\n    updateGym(id: $id, data: $data) {\n      id\n      name\n    }\n  }\n": typeof types.UpdateGymDocument,
    "\n  mutation CreateStaff($data: StaffCreateInput!) {\n    createStaff(data: $data) {\n      id\n      firstName\n    }\n  }\n": typeof types.CreateStaffDocument,
    "\n  query GetStaffById($id: ID!) {\n    staffById(id: $id) {\n      createdAt\n      email\n      firstName\n      id\n      isActive\n      lastName\n      walletAddress\n      updatedAt\n      phoneNumber\n    }\n  }\n": typeof types.GetStaffByIdDocument,
    "\n  mutation UpdateStaff($id: ID!, $data: StaffUpdateInput!) {\n    updateStaff(id: $id, data: $data) {\n      id\n      firstName\n    }\n  }\n": typeof types.UpdateStaffDocument,
    "\n  query GetTenancy {\n    tenancy {\n      id\n      contactEmail\n      legalName\n      name\n    }\n  }\n": typeof types.GetTenancyDocument,
    "\n  mutation CreateTenancy($data: TenancyCreateInput!) {\n    createTenancy(data: $data) {\n      id\n    }\n  }\n": typeof types.CreateTenancyDocument,
    "\n  query GetClasses {\n    classes {\n      id\n      description\n      name\n      capacity\n      scheduleDateTime\n      instructor {\n        id\n        name\n      }\n      gym {\n        id\n        name\n      }\n    }\n  }\n": typeof types.GetClassesDocument,
    "\n  query GetGyms {\n    gyms {\n      id\n      address\n      name\n      legalDocsUrl\n      updatedAt\n    }\n  }\n": typeof types.GetGymsDocument,
    "\n  query GetContracts {\n    contracts {\n      id\n    }\n  }\n": typeof types.GetContractsDocument,
    "\n  query GetMemberships {\n    memberships {\n      id\n    }\n  }\n": typeof types.GetMembershipsDocument,
    "\n  query GetStaff {\n    staff {\n      id\n      firstName\n      lastName\n      updatedAt\n      isActive\n    }\n  }\n": typeof types.GetStaffDocument,
};
const documents: Documents = {
    "\n  query ClassOptions {\n    staff {\n      id\n      firstName\n      lastName\n    }\n    gyms {\n      id\n      name\n      legalEntityName\n    }\n  }\n": types.ClassOptionsDocument,
    "\n  mutation CreateClass($data: ClassCreateInput!) {\n    createClass(data: $data) {\n      id\n      name\n    }\n  }\n": types.CreateClassDocument,
    "\n  query GetClassById($id: ID!) {\n    classById(id: $id) {\n      capacity\n      description\n      gym {\n        id\n        name\n      }\n      instructor {\n        id\n        name\n      }\n      name\n      scheduleDateTime\n    }\n  }\n": types.GetClassByIdDocument,
    "\n  mutation UpdateClass($id: ID!, $data: ClassUpdateInput!) {\n    updateClass(id: $id, data: $data) {\n      id\n      name\n    }\n  }\n": types.UpdateClassDocument,
    "\n  mutation CreateGym($data: GymCreateInput!) {\n    createGym(data: $data) {\n      id\n      name\n    }\n  }\n": types.CreateGymDocument,
    "\n  query GetGymOptions {\n    gyms {\n      id\n      name\n    }\n  }\n": types.GetGymOptionsDocument,
    "\n  query GetGymById($id: ID!) {\n    gymById(id: $id) {\n      name\n      address\n      legalDocsUrl\n      legalEntityName\n    }\n  }\n": types.GetGymByIdDocument,
    "\n  mutation UpdateGym($id: ID!, $data: GymUpdateInput!) {\n    updateGym(id: $id, data: $data) {\n      id\n      name\n    }\n  }\n": types.UpdateGymDocument,
    "\n  mutation CreateStaff($data: StaffCreateInput!) {\n    createStaff(data: $data) {\n      id\n      firstName\n    }\n  }\n": types.CreateStaffDocument,
    "\n  query GetStaffById($id: ID!) {\n    staffById(id: $id) {\n      createdAt\n      email\n      firstName\n      id\n      isActive\n      lastName\n      walletAddress\n      updatedAt\n      phoneNumber\n    }\n  }\n": types.GetStaffByIdDocument,
    "\n  mutation UpdateStaff($id: ID!, $data: StaffUpdateInput!) {\n    updateStaff(id: $id, data: $data) {\n      id\n      firstName\n    }\n  }\n": types.UpdateStaffDocument,
    "\n  query GetTenancy {\n    tenancy {\n      id\n      contactEmail\n      legalName\n      name\n    }\n  }\n": types.GetTenancyDocument,
    "\n  mutation CreateTenancy($data: TenancyCreateInput!) {\n    createTenancy(data: $data) {\n      id\n    }\n  }\n": types.CreateTenancyDocument,
    "\n  query GetClasses {\n    classes {\n      id\n      description\n      name\n      capacity\n      scheduleDateTime\n      instructor {\n        id\n        name\n      }\n      gym {\n        id\n        name\n      }\n    }\n  }\n": types.GetClassesDocument,
    "\n  query GetGyms {\n    gyms {\n      id\n      address\n      name\n      legalDocsUrl\n      updatedAt\n    }\n  }\n": types.GetGymsDocument,
    "\n  query GetContracts {\n    contracts {\n      id\n    }\n  }\n": types.GetContractsDocument,
    "\n  query GetMemberships {\n    memberships {\n      id\n    }\n  }\n": types.GetMembershipsDocument,
    "\n  query GetStaff {\n    staff {\n      id\n      firstName\n      lastName\n      updatedAt\n      isActive\n    }\n  }\n": types.GetStaffDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ClassOptions {\n    staff {\n      id\n      firstName\n      lastName\n    }\n    gyms {\n      id\n      name\n      legalEntityName\n    }\n  }\n"): typeof import('./graphql').ClassOptionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateClass($data: ClassCreateInput!) {\n    createClass(data: $data) {\n      id\n      name\n    }\n  }\n"): typeof import('./graphql').CreateClassDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetClassById($id: ID!) {\n    classById(id: $id) {\n      capacity\n      description\n      gym {\n        id\n        name\n      }\n      instructor {\n        id\n        name\n      }\n      name\n      scheduleDateTime\n    }\n  }\n"): typeof import('./graphql').GetClassByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateClass($id: ID!, $data: ClassUpdateInput!) {\n    updateClass(id: $id, data: $data) {\n      id\n      name\n    }\n  }\n"): typeof import('./graphql').UpdateClassDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateGym($data: GymCreateInput!) {\n    createGym(data: $data) {\n      id\n      name\n    }\n  }\n"): typeof import('./graphql').CreateGymDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetGymOptions {\n    gyms {\n      id\n      name\n    }\n  }\n"): typeof import('./graphql').GetGymOptionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetGymById($id: ID!) {\n    gymById(id: $id) {\n      name\n      address\n      legalDocsUrl\n      legalEntityName\n    }\n  }\n"): typeof import('./graphql').GetGymByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateGym($id: ID!, $data: GymUpdateInput!) {\n    updateGym(id: $id, data: $data) {\n      id\n      name\n    }\n  }\n"): typeof import('./graphql').UpdateGymDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateStaff($data: StaffCreateInput!) {\n    createStaff(data: $data) {\n      id\n      firstName\n    }\n  }\n"): typeof import('./graphql').CreateStaffDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetStaffById($id: ID!) {\n    staffById(id: $id) {\n      createdAt\n      email\n      firstName\n      id\n      isActive\n      lastName\n      walletAddress\n      updatedAt\n      phoneNumber\n    }\n  }\n"): typeof import('./graphql').GetStaffByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateStaff($id: ID!, $data: StaffUpdateInput!) {\n    updateStaff(id: $id, data: $data) {\n      id\n      firstName\n    }\n  }\n"): typeof import('./graphql').UpdateStaffDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTenancy {\n    tenancy {\n      id\n      contactEmail\n      legalName\n      name\n    }\n  }\n"): typeof import('./graphql').GetTenancyDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTenancy($data: TenancyCreateInput!) {\n    createTenancy(data: $data) {\n      id\n    }\n  }\n"): typeof import('./graphql').CreateTenancyDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetClasses {\n    classes {\n      id\n      description\n      name\n      capacity\n      scheduleDateTime\n      instructor {\n        id\n        name\n      }\n      gym {\n        id\n        name\n      }\n    }\n  }\n"): typeof import('./graphql').GetClassesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetGyms {\n    gyms {\n      id\n      address\n      name\n      legalDocsUrl\n      updatedAt\n    }\n  }\n"): typeof import('./graphql').GetGymsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetContracts {\n    contracts {\n      id\n    }\n  }\n"): typeof import('./graphql').GetContractsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMemberships {\n    memberships {\n      id\n    }\n  }\n"): typeof import('./graphql').GetMembershipsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetStaff {\n    staff {\n      id\n      firstName\n      lastName\n      updatedAt\n      isActive\n    }\n  }\n"): typeof import('./graphql').GetStaffDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
