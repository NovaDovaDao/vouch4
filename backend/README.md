# Alé Backend

This is the backend for the Alé application. It is a GraphQL server built with Yoga, written in TypeScript. It provides the API for the frontend client, handling business logic through GraphQL queries and mutations, and authentication via RESTful endpoints.

## Features

*   **GraphQL API:** Core business logic is exposed through a GraphQL API.
*   **Authentication:** User authentication and management are handled by `better-auth`, providing RESTful endpoints for registration, login, and other auth-related operations.
*   **Database:** PostgreSQL is used as the database, with Prisma as the ORM for database access and management.
*   **Email Service:** Emails are sent using the Resend SDK.
*   **Code Generation:** GraphQL typings and resolvers are automatically generated using `graphql-codegen`.

## Technologies Used

*   **Server:** GraphQL Yoga
*   **Authentication:** better-auth
*   **Database:** PostgreSQL
*   **ORM:** Prisma
*   **Language:** TypeScript
*   **Package Manager:** pnpm
*   **Email:** Resend
*   **Code Generation:** GraphQL Code Generator

## Getting Started

### Prerequisites

*   Node.js (v22.11.0 or higher)
*   pnpm (v9.15.0 or higher)
*   PostgreSQL

### Installation

1.  Clone the repository.
2.  Install the dependencies:

    ```bash
    pnpm install
    ```

3.  Set up your environment variables by creating a `.env` file in the `backend` directory. See the [Environment Variables](#environment-variables) section for more details.

4.  Apply the database schema:

    ```bash
    pnpm prisma:reset
    ```

5.  Seed the database with initial data:

    ```bash
    pnpm prisma:seed
    ```

### Running the App

To start the development server with hot-reloading, run:

```bash
pnpm dev
```

To build the project and start the production server, run:

```bash
pnpm build
pnpm start
```

## Environment Variables

The following environment variables are required for the application to run. Create a `.env` file in the `backend` directory and add the following variables:

| Variable              | Description                                                                  | Example                                                                |
| --------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `SUPER_ADMIN_EMAIL`   | The email for the super admin user.                                          | `admin@example.com`                                                    |
| `SUPER_ADMIN_PASSWORD`| The password for the super admin user.                                       | `supersecretpassword`                                                  |
| `RESEND_API_KEY`      | Your API key for Resend.                                                     | `re_xxxxxxxx_xxxxxxxx`                                                 |
| `SENDER_EMAIL`        | The email address to send emails from.                                       | `onboarding@example.com`                                               |
| `TRUSTED_ORIGINS`     | Comma-separated list of trusted origins for CORS.                            | `http://localhost:1337`                                                |
| `PORT`                | The port for the server to listen on.                                        | `8080`                                                                 |
| `JWT_SECRET_KEY`      | The secret key for signing JWTs.                                             | `super-secret`                                                         |
| `DATABASE_URL`        | The connection string for your PostgreSQL database.                          | `postgresql://user:password@localhost:5432/mydatabase`                 |

## API Endpoints

### Authentication (REST)

The authentication endpoints are provided by `better-auth`. These are standard RESTful endpoints for user registration, login, password reset, etc.

### Business Logic (GraphQL)

The core business logic is exposed through a GraphQL API. The schema is defined in `src/graphql/schema/schema.graphql`. The server provides queries and mutations for interacting with the application's data.

## Available Scripts

*   `pnpm build`: Compiles the TypeScript code to JavaScript.
*   `pnpm dev`: Starts the development server with hot-reloading.
*   `pnpm start`: Starts the production server.
*   `pnpm prisma:seed`: Seeds the database with initial data.
*   `pnpm prisma:reset`: Resets the database and applies the schema.
*   `pnpm codegen`: Generates GraphQL typings and resolvers.

## Project Structure

```
backend/
├── src/
│   ├── auth.ts           # Authentication setup
│   ├── db.ts             # Database connection
│   ├── email.ts          # Email service
│   ├── jwt.ts            # JWT utilities
│   ├── main.ts           # Server entry point
│   ├── server.ts         # GraphQL server setup
│   ├── graphql/          # GraphQL related files
│   │   └── schema/
│   │       ├── schema.graphql
│   │       └── resolvers/
│   └── prisma/           # Prisma schema and migrations
│       ├── schema.prisma
│       └── seed.ts
├── .env                  # Environment variables
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```
