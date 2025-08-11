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
    "\n  query GetTenancy {\n    tenancy {\n      id\n      contactEmail\n      legalName\n      name\n    }\n  }\n": typeof types.GetTenancyDocument,
    "\n  query GetClasses {\n    classes {\n      id\n      description\n      name\n      capacity\n      scheduleDateTime\n      instructorId\n    }\n  }\n": typeof types.GetClassesDocument,
    "\n  query GetGyms {\n    gyms {\n      id\n      address\n      name\n      legalDocsUrl\n      updatedAt\n    }\n  }\n": typeof types.GetGymsDocument,
    "\n  query GetMembers {\n    members {\n      id\n      firstName\n      lastName\n      email\n      isActive\n      updatedAt\n    }\n  }\n": typeof types.GetMembersDocument,
    "\n  query GetContracts {\n    contracts {\n      id\n    }\n  }\n": typeof types.GetContractsDocument,
    "\n  query GetMemberships {\n    memberships {\n      id\n    }\n  }\n": typeof types.GetMembershipsDocument,
    "\n  query GetStaff {\n    staff {\n      id\n      firstName\n      lastName\n      updatedAt\n      isActive\n    }\n  }\n": typeof types.GetStaffDocument,
};
const documents: Documents = {
    "\n  query GetTenancy {\n    tenancy {\n      id\n      contactEmail\n      legalName\n      name\n    }\n  }\n": types.GetTenancyDocument,
    "\n  query GetClasses {\n    classes {\n      id\n      description\n      name\n      capacity\n      scheduleDateTime\n      instructorId\n    }\n  }\n": types.GetClassesDocument,
    "\n  query GetGyms {\n    gyms {\n      id\n      address\n      name\n      legalDocsUrl\n      updatedAt\n    }\n  }\n": types.GetGymsDocument,
    "\n  query GetMembers {\n    members {\n      id\n      firstName\n      lastName\n      email\n      isActive\n      updatedAt\n    }\n  }\n": types.GetMembersDocument,
    "\n  query GetContracts {\n    contracts {\n      id\n    }\n  }\n": types.GetContractsDocument,
    "\n  query GetMemberships {\n    memberships {\n      id\n    }\n  }\n": types.GetMembershipsDocument,
    "\n  query GetStaff {\n    staff {\n      id\n      firstName\n      lastName\n      updatedAt\n      isActive\n    }\n  }\n": types.GetStaffDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTenancy {\n    tenancy {\n      id\n      contactEmail\n      legalName\n      name\n    }\n  }\n"): typeof import('./graphql').GetTenancyDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetClasses {\n    classes {\n      id\n      description\n      name\n      capacity\n      scheduleDateTime\n      instructorId\n    }\n  }\n"): typeof import('./graphql').GetClassesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetGyms {\n    gyms {\n      id\n      address\n      name\n      legalDocsUrl\n      updatedAt\n    }\n  }\n"): typeof import('./graphql').GetGymsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMembers {\n    members {\n      id\n      firstName\n      lastName\n      email\n      isActive\n      updatedAt\n    }\n  }\n"): typeof import('./graphql').GetMembersDocument;
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
