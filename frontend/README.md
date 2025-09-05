# Alé Frontend

The frontend application for Alé, a gym management system built with React, TypeScript, and Vite.

## Features

- **Modern React**: Built with React 19 and TypeScript
- **UI Components**: shadcn/ui components with Tailwind CSS v4
- **State Management**: Zustand for global state
- **Data Fetching**: TanStack Query for server state management
- **Authentication**: better-auth integration
- **GraphQL**: Type-safe GraphQL queries with code generation
- **Routing**: React Router v7

## Prerequisites

- Node.js v22.11.0 or higher
- pnpm v9.15.0 or higher
- Backend server running on port 8080

## Getting Started

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. The application will be available at `http://localhost:1337`

3. API requests are automatically proxied to the backend server at `http://localhost:8080`

### GraphQL Code Generation

Generate TypeScript types from GraphQL schema:
```bash
pnpm codegen
```

This should be run whenever the GraphQL schema changes in the backend.

## Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Run ESLint
- `pnpm codegen` - Generate GraphQL types

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── common/         # Shared application components
├── features/           # Feature-based modules
│   ├── auth/          # Authentication
│   ├── gyms/          # Gym management
│   ├── members/       # Member management
│   ├── staff/         # Staff management
│   └── classes/       # Class scheduling
├── pages/             # Page components
├── layouts/           # Layout components
├── hooks/             # Custom React hooks
├── stores/            # Zustand stores
├── lib/               # Utility functions
└── graphql/           # Generated GraphQL types
```

## Key Technologies

- **React 19** - Modern React with concurrent features
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **TanStack Query** - Server state management
- **React Router v7** - Client-side routing
- **Zustand** - Lightweight state management
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
