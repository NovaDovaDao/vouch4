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
    "\n  mutation SetInitialPassword($token: String!, $password: String!) {\n    setInitialPassword(token: $token, password: $password) {\n      ... on Person {\n        id\n      }\n    }\n  }\n": typeof types.SetInitialPasswordDocument,
    "\n  query ClassTemplateOptions {\n    staff {\n      id\n      firstName\n      lastName\n    }\n    gyms {\n      id\n      name\n      legalEntityName\n    }\n  }\n": typeof types.ClassTemplateOptionsDocument,
    "\n  mutation CreateClassTemplate($data: ClassTemplateCreateInput!) {\n    createClassTemplate(data: $data) {\n      id\n      name\n    }\n  }\n": typeof types.CreateClassTemplateDocument,
    "\n  query GetScheduledClassById($id: ID!) {\n    scheduledClassById(id: $id) {\n      name\n      description\n      startTime\n      endTime\n      instructor {\n        name\n      }\n      bookings {\n        id\n        member {\n          id\n          name\n          isActive\n        }\n      }\n      gym {\n        id\n        name\n      }\n    }\n  }\n": typeof types.GetScheduledClassByIdDocument,
    "\n  mutation DeleteScheduledClass($id: ID!) {\n    deleteScheduledClass(id: $id)\n  }\n": typeof types.DeleteScheduledClassDocument,
    "\n  query GetClassTemplateById($id: ID!) {\n    classTemplateById(id: $id) {\n      name\n      description\n      capacity\n      gym {\n        id\n        name\n      }\n      instructor {\n        id\n        name\n      }\n      recurrence\n    }\n  }\n": typeof types.GetClassTemplateByIdDocument,
    "\n  mutation UpdateClassTemplate($id: ID!, $input: ClassTemplateUpdateInput!) {\n    updateClassTemplate(id: $id, input: $input) {\n      id\n      name\n    }\n  }\n": typeof types.UpdateClassTemplateDocument,
    "\n  query GetProducts {\n    products {\n      id\n      name\n      price {\n        amount\n        currency\n      }\n      description\n    }\n  }\n": typeof types.GetProductsDocument,
    "\n  mutation CreateEntitlement($input: CreateEntitlementInput!) {\n    createEntitlement(input: $input) {\n      id\n    }\n  }\n": typeof types.CreateEntitlementDocument,
    "\n  mutation CreateGym($data: GymCreateInput!) {\n    createGym(data: $data) {\n      id\n      name\n    }\n  }\n": typeof types.CreateGymDocument,
    "\n  query GetGymOptions1 {\n    gyms {\n      id\n      name\n    }\n  }\n": typeof types.GetGymOptions1Document,
    "\n  query GetGymById($id: ID!) {\n    gymById(id: $id) {\n      name\n      address\n      legalDocsUrl\n      legalEntityName\n    }\n  }\n": typeof types.GetGymByIdDocument,
    "\n  mutation UpdateGym($id: ID!, $data: GymUpdateInput!) {\n    updateGym(id: $id, data: $data) {\n      id\n      name\n    }\n  }\n": typeof types.UpdateGymDocument,
    "\n  mutation CreateMember($data: MemberCreateInput!) {\n    createMember(data: $data) {\n      id\n      firstName\n    }\n  }\n": typeof types.CreateMemberDocument,
    "\n  query GetMemberById($id: ID!) {\n    memberById(id: $id) {\n      email\n      firstName\n      id\n      isActive\n      lastName\n      walletAddress\n      phoneNumber\n    }\n  }\n": typeof types.GetMemberByIdDocument,
    "\n  mutation UpdateMember($id: ID!, $input: MemberUpdateInput!) {\n    updateMember(id: $id, input: $input) {\n      id\n      firstName\n    }\n  }\n": typeof types.UpdateMemberDocument,
    "\n  query GetProductById($id: ID!) {\n    productById(id: $id) {\n      name\n      description\n      price {\n        amount\n        currency\n      }\n    }\n  }\n": typeof types.GetProductByIdDocument,
    "\n  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {\n    updateProduct(id: $id, input: $input) {\n      id\n      name\n    }\n  }\n": typeof types.UpdateProductDocument,
    "\n  query Search($input: SearchInput!) {\n    search(input: $input) {\n      ... on Person {\n        __typename\n        id\n        personName: name\n      }\n      ... on Gym {\n        __typename\n        id\n        gymName: name\n      }\n      ... on ClassTemplate {\n        __typename\n        id\n        className: name\n      }\n    }\n  }\n": typeof types.SearchDocument,
    "\n  mutation CreateStaff($data: StaffCreateInput!) {\n    createStaff(data: $data) {\n      id\n      firstName\n    }\n  }\n": typeof types.CreateStaffDocument,
    "\n  query GetStaffById($id: ID!) {\n    staffById(id: $id) {\n      email\n      firstName\n      id\n      isActive\n      lastName\n      walletAddress\n      phoneNumber\n    }\n  }\n": typeof types.GetStaffByIdDocument,
    "\n  mutation UpdateStaff($id: ID!, $input: StaffUpdateInput!) {\n    updateStaff(id: $id, input: $input) {\n      id\n      firstName\n    }\n  }\n": typeof types.UpdateStaffDocument,
    "\n  query GetTenancy {\n    tenancy {\n      id\n      contactEmail\n      legalName\n      name\n    }\n  }\n": typeof types.GetTenancyDocument,
    "\n  mutation CreateTenancy($data: TenancyCreateInput!) {\n    createTenancy(data: $data) {\n      id\n    }\n  }\n": typeof types.CreateTenancyDocument,
    "\n  query GetGymOptions3 {\n    gyms {\n      id\n      name\n    }\n  }\n": typeof types.GetGymOptions3Document,
    "\n  query GetScheduledClasses($args: ScheduledClassesArgs!) {\n    scheduledClasses(args: $args) {\n      id\n      name\n      startTime\n      endTime\n      gym {\n        name\n      }\n      instructor {\n        name\n      }\n      bookings {\n        id\n      }\n    }\n  }\n": typeof types.GetScheduledClassesDocument,
    "\n  query GetClassTemplates {\n    classTemplates {\n      id\n      name\n      capacity\n      description\n      gym {\n        id\n        name\n      }\n      instructor {\n        id\n        name\n      }\n      recurrence\n    }\n  }\n": typeof types.GetClassTemplatesDocument,
    "\n  query GetGyms1 {\n    gyms {\n      id\n      address\n      name\n      legalDocsUrl\n      legalEntityName\n    }\n  }\n": typeof types.GetGyms1Document,
    "\n  query GetMemberByIdForDetails($id: ID!) {\n    memberById(id: $id) {\n      id\n      firstName\n      lastName\n      email\n      isActive\n      phoneNumber\n\n      entitlements {\n        id\n        product {\n          id\n          name\n        }\n        validFrom\n        expiresAt\n        usesLeft\n      }\n    }\n  }\n": typeof types.GetMemberByIdForDetailsDocument,
    "\n  query GetMembers1 {\n    members {\n      id\n      firstName\n      lastName\n      email\n      isActive\n      phoneNumber\n    }\n  }\n": typeof types.GetMembers1Document,
    "\n  query GetContracts {\n    contracts {\n      id\n    }\n  }\n": typeof types.GetContractsDocument,
    "\n  query GetStaff {\n    staff {\n      id\n      firstName\n      lastName\n      isActive\n      roles\n    }\n  }\n": typeof types.GetStaffDocument,
};
const documents: Documents = {
    "\n  mutation SetInitialPassword($token: String!, $password: String!) {\n    setInitialPassword(token: $token, password: $password) {\n      ... on Person {\n        id\n      }\n    }\n  }\n": types.SetInitialPasswordDocument,
    "\n  query ClassTemplateOptions {\n    staff {\n      id\n      firstName\n      lastName\n    }\n    gyms {\n      id\n      name\n      legalEntityName\n    }\n  }\n": types.ClassTemplateOptionsDocument,
    "\n  mutation CreateClassTemplate($data: ClassTemplateCreateInput!) {\n    createClassTemplate(data: $data) {\n      id\n      name\n    }\n  }\n": types.CreateClassTemplateDocument,
    "\n  query GetScheduledClassById($id: ID!) {\n    scheduledClassById(id: $id) {\n      name\n      description\n      startTime\n      endTime\n      instructor {\n        name\n      }\n      bookings {\n        id\n        member {\n          id\n          name\n          isActive\n        }\n      }\n      gym {\n        id\n        name\n      }\n    }\n  }\n": types.GetScheduledClassByIdDocument,
    "\n  mutation DeleteScheduledClass($id: ID!) {\n    deleteScheduledClass(id: $id)\n  }\n": types.DeleteScheduledClassDocument,
    "\n  query GetClassTemplateById($id: ID!) {\n    classTemplateById(id: $id) {\n      name\n      description\n      capacity\n      gym {\n        id\n        name\n      }\n      instructor {\n        id\n        name\n      }\n      recurrence\n    }\n  }\n": types.GetClassTemplateByIdDocument,
    "\n  mutation UpdateClassTemplate($id: ID!, $input: ClassTemplateUpdateInput!) {\n    updateClassTemplate(id: $id, input: $input) {\n      id\n      name\n    }\n  }\n": types.UpdateClassTemplateDocument,
    "\n  query GetProducts {\n    products {\n      id\n      name\n      price {\n        amount\n        currency\n      }\n      description\n    }\n  }\n": types.GetProductsDocument,
    "\n  mutation CreateEntitlement($input: CreateEntitlementInput!) {\n    createEntitlement(input: $input) {\n      id\n    }\n  }\n": types.CreateEntitlementDocument,
    "\n  mutation CreateGym($data: GymCreateInput!) {\n    createGym(data: $data) {\n      id\n      name\n    }\n  }\n": types.CreateGymDocument,
    "\n  query GetGymOptions1 {\n    gyms {\n      id\n      name\n    }\n  }\n": types.GetGymOptions1Document,
    "\n  query GetGymById($id: ID!) {\n    gymById(id: $id) {\n      name\n      address\n      legalDocsUrl\n      legalEntityName\n    }\n  }\n": types.GetGymByIdDocument,
    "\n  mutation UpdateGym($id: ID!, $data: GymUpdateInput!) {\n    updateGym(id: $id, data: $data) {\n      id\n      name\n    }\n  }\n": types.UpdateGymDocument,
    "\n  mutation CreateMember($data: MemberCreateInput!) {\n    createMember(data: $data) {\n      id\n      firstName\n    }\n  }\n": types.CreateMemberDocument,
    "\n  query GetMemberById($id: ID!) {\n    memberById(id: $id) {\n      email\n      firstName\n      id\n      isActive\n      lastName\n      walletAddress\n      phoneNumber\n    }\n  }\n": types.GetMemberByIdDocument,
    "\n  mutation UpdateMember($id: ID!, $input: MemberUpdateInput!) {\n    updateMember(id: $id, input: $input) {\n      id\n      firstName\n    }\n  }\n": types.UpdateMemberDocument,
    "\n  query GetProductById($id: ID!) {\n    productById(id: $id) {\n      name\n      description\n      price {\n        amount\n        currency\n      }\n    }\n  }\n": types.GetProductByIdDocument,
    "\n  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {\n    updateProduct(id: $id, input: $input) {\n      id\n      name\n    }\n  }\n": types.UpdateProductDocument,
    "\n  query Search($input: SearchInput!) {\n    search(input: $input) {\n      ... on Person {\n        __typename\n        id\n        personName: name\n      }\n      ... on Gym {\n        __typename\n        id\n        gymName: name\n      }\n      ... on ClassTemplate {\n        __typename\n        id\n        className: name\n      }\n    }\n  }\n": types.SearchDocument,
    "\n  mutation CreateStaff($data: StaffCreateInput!) {\n    createStaff(data: $data) {\n      id\n      firstName\n    }\n  }\n": types.CreateStaffDocument,
    "\n  query GetStaffById($id: ID!) {\n    staffById(id: $id) {\n      email\n      firstName\n      id\n      isActive\n      lastName\n      walletAddress\n      phoneNumber\n    }\n  }\n": types.GetStaffByIdDocument,
    "\n  mutation UpdateStaff($id: ID!, $input: StaffUpdateInput!) {\n    updateStaff(id: $id, input: $input) {\n      id\n      firstName\n    }\n  }\n": types.UpdateStaffDocument,
    "\n  query GetTenancy {\n    tenancy {\n      id\n      contactEmail\n      legalName\n      name\n    }\n  }\n": types.GetTenancyDocument,
    "\n  mutation CreateTenancy($data: TenancyCreateInput!) {\n    createTenancy(data: $data) {\n      id\n    }\n  }\n": types.CreateTenancyDocument,
    "\n  query GetGymOptions3 {\n    gyms {\n      id\n      name\n    }\n  }\n": types.GetGymOptions3Document,
    "\n  query GetScheduledClasses($args: ScheduledClassesArgs!) {\n    scheduledClasses(args: $args) {\n      id\n      name\n      startTime\n      endTime\n      gym {\n        name\n      }\n      instructor {\n        name\n      }\n      bookings {\n        id\n      }\n    }\n  }\n": types.GetScheduledClassesDocument,
    "\n  query GetClassTemplates {\n    classTemplates {\n      id\n      name\n      capacity\n      description\n      gym {\n        id\n        name\n      }\n      instructor {\n        id\n        name\n      }\n      recurrence\n    }\n  }\n": types.GetClassTemplatesDocument,
    "\n  query GetGyms1 {\n    gyms {\n      id\n      address\n      name\n      legalDocsUrl\n      legalEntityName\n    }\n  }\n": types.GetGyms1Document,
    "\n  query GetMemberByIdForDetails($id: ID!) {\n    memberById(id: $id) {\n      id\n      firstName\n      lastName\n      email\n      isActive\n      phoneNumber\n\n      entitlements {\n        id\n        product {\n          id\n          name\n        }\n        validFrom\n        expiresAt\n        usesLeft\n      }\n    }\n  }\n": types.GetMemberByIdForDetailsDocument,
    "\n  query GetMembers1 {\n    members {\n      id\n      firstName\n      lastName\n      email\n      isActive\n      phoneNumber\n    }\n  }\n": types.GetMembers1Document,
    "\n  query GetContracts {\n    contracts {\n      id\n    }\n  }\n": types.GetContractsDocument,
    "\n  query GetStaff {\n    staff {\n      id\n      firstName\n      lastName\n      isActive\n      roles\n    }\n  }\n": types.GetStaffDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SetInitialPassword($token: String!, $password: String!) {\n    setInitialPassword(token: $token, password: $password) {\n      ... on Person {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').SetInitialPasswordDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ClassTemplateOptions {\n    staff {\n      id\n      firstName\n      lastName\n    }\n    gyms {\n      id\n      name\n      legalEntityName\n    }\n  }\n"): typeof import('./graphql').ClassTemplateOptionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateClassTemplate($data: ClassTemplateCreateInput!) {\n    createClassTemplate(data: $data) {\n      id\n      name\n    }\n  }\n"): typeof import('./graphql').CreateClassTemplateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetScheduledClassById($id: ID!) {\n    scheduledClassById(id: $id) {\n      name\n      description\n      startTime\n      endTime\n      instructor {\n        name\n      }\n      bookings {\n        id\n        member {\n          id\n          name\n          isActive\n        }\n      }\n      gym {\n        id\n        name\n      }\n    }\n  }\n"): typeof import('./graphql').GetScheduledClassByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteScheduledClass($id: ID!) {\n    deleteScheduledClass(id: $id)\n  }\n"): typeof import('./graphql').DeleteScheduledClassDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetClassTemplateById($id: ID!) {\n    classTemplateById(id: $id) {\n      name\n      description\n      capacity\n      gym {\n        id\n        name\n      }\n      instructor {\n        id\n        name\n      }\n      recurrence\n    }\n  }\n"): typeof import('./graphql').GetClassTemplateByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateClassTemplate($id: ID!, $input: ClassTemplateUpdateInput!) {\n    updateClassTemplate(id: $id, input: $input) {\n      id\n      name\n    }\n  }\n"): typeof import('./graphql').UpdateClassTemplateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProducts {\n    products {\n      id\n      name\n      price {\n        amount\n        currency\n      }\n      description\n    }\n  }\n"): typeof import('./graphql').GetProductsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateEntitlement($input: CreateEntitlementInput!) {\n    createEntitlement(input: $input) {\n      id\n    }\n  }\n"): typeof import('./graphql').CreateEntitlementDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateGym($data: GymCreateInput!) {\n    createGym(data: $data) {\n      id\n      name\n    }\n  }\n"): typeof import('./graphql').CreateGymDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetGymOptions1 {\n    gyms {\n      id\n      name\n    }\n  }\n"): typeof import('./graphql').GetGymOptions1Document;
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
export function graphql(source: "\n  mutation CreateMember($data: MemberCreateInput!) {\n    createMember(data: $data) {\n      id\n      firstName\n    }\n  }\n"): typeof import('./graphql').CreateMemberDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMemberById($id: ID!) {\n    memberById(id: $id) {\n      email\n      firstName\n      id\n      isActive\n      lastName\n      walletAddress\n      phoneNumber\n    }\n  }\n"): typeof import('./graphql').GetMemberByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateMember($id: ID!, $input: MemberUpdateInput!) {\n    updateMember(id: $id, input: $input) {\n      id\n      firstName\n    }\n  }\n"): typeof import('./graphql').UpdateMemberDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProductById($id: ID!) {\n    productById(id: $id) {\n      name\n      description\n      price {\n        amount\n        currency\n      }\n    }\n  }\n"): typeof import('./graphql').GetProductByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {\n    updateProduct(id: $id, input: $input) {\n      id\n      name\n    }\n  }\n"): typeof import('./graphql').UpdateProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Search($input: SearchInput!) {\n    search(input: $input) {\n      ... on Person {\n        __typename\n        id\n        personName: name\n      }\n      ... on Gym {\n        __typename\n        id\n        gymName: name\n      }\n      ... on ClassTemplate {\n        __typename\n        id\n        className: name\n      }\n    }\n  }\n"): typeof import('./graphql').SearchDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateStaff($data: StaffCreateInput!) {\n    createStaff(data: $data) {\n      id\n      firstName\n    }\n  }\n"): typeof import('./graphql').CreateStaffDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetStaffById($id: ID!) {\n    staffById(id: $id) {\n      email\n      firstName\n      id\n      isActive\n      lastName\n      walletAddress\n      phoneNumber\n    }\n  }\n"): typeof import('./graphql').GetStaffByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateStaff($id: ID!, $input: StaffUpdateInput!) {\n    updateStaff(id: $id, input: $input) {\n      id\n      firstName\n    }\n  }\n"): typeof import('./graphql').UpdateStaffDocument;
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
export function graphql(source: "\n  query GetGymOptions3 {\n    gyms {\n      id\n      name\n    }\n  }\n"): typeof import('./graphql').GetGymOptions3Document;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetScheduledClasses($args: ScheduledClassesArgs!) {\n    scheduledClasses(args: $args) {\n      id\n      name\n      startTime\n      endTime\n      gym {\n        name\n      }\n      instructor {\n        name\n      }\n      bookings {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').GetScheduledClassesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetClassTemplates {\n    classTemplates {\n      id\n      name\n      capacity\n      description\n      gym {\n        id\n        name\n      }\n      instructor {\n        id\n        name\n      }\n      recurrence\n    }\n  }\n"): typeof import('./graphql').GetClassTemplatesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetGyms1 {\n    gyms {\n      id\n      address\n      name\n      legalDocsUrl\n      legalEntityName\n    }\n  }\n"): typeof import('./graphql').GetGyms1Document;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMemberByIdForDetails($id: ID!) {\n    memberById(id: $id) {\n      id\n      firstName\n      lastName\n      email\n      isActive\n      phoneNumber\n\n      entitlements {\n        id\n        product {\n          id\n          name\n        }\n        validFrom\n        expiresAt\n        usesLeft\n      }\n    }\n  }\n"): typeof import('./graphql').GetMemberByIdForDetailsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMembers1 {\n    members {\n      id\n      firstName\n      lastName\n      email\n      isActive\n      phoneNumber\n    }\n  }\n"): typeof import('./graphql').GetMembers1Document;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetContracts {\n    contracts {\n      id\n    }\n  }\n"): typeof import('./graphql').GetContractsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetStaff {\n    staff {\n      id\n      firstName\n      lastName\n      isActive\n      roles\n    }\n  }\n"): typeof import('./graphql').GetStaffDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
