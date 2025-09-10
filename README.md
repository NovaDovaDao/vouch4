# Alé

<img width="602" alt="image" src="https://github.com/user-attachments/assets/9268eb34-8178-48d5-997a-96fc147a8041" />

## Commands

### Install

```bash
pnpm install:all
```

### Run

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Build & Production
```bash
# Build frontend
cd frontend && pnpm build

# Build backend
cd backend && pnpm build

# Run production backend
cd backend && pnpm start
```

### Code Quality
```bash
# Lint frontend
cd frontend && pnpm lint

# No linting command available for backend
```

### Database Operations
```bash
# Reset database and apply schema
cd backend && pnpm prisma:reset

# Seed database with initial data
cd backend && pnpm prisma:seed
cd backend && pnpm db:seed
```

### Code Generation
```bash
# Generate GraphQL typings (backend)
cd backend && pnpm codegen

# Generate GraphQL typings (frontend)
cd frontend && pnpm codegen
```

## Architecture Overview

This is a full-stack gym management application called "Alé" with a clear separation between frontend and backend:

### Backend (`/backend`)
- **Framework**: GraphQL Yoga server with Koa
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: better-auth with JWT tokens
- **Schema**: Complex multi-tenant gym management system with Users, Gyms, Classes, Memberships, Check-ins
- **Port**: 8080
- **Key Models**: 
  - Tenancy (gym ownership/LLC level)
  - Gym (physical locations)
  - User (consolidated member/staff model with category enum)
  - UserGymAssociation (per-gym roles and permissions)
  - MembershipNFT (blockchain-integrated memberships)
  - Class, Booking, CheckIn

### Frontend (`/frontend`)
- **Framework**: React 19 + TypeScript + Vite
- **UI**: Tailwind CSS + Radix UI components + shadcn/ui
- **State Management**: Zustand stores
- **Data Fetching**: TanStack Query with GraphQL
- **Authentication**: better-auth client integration
- **Port**: 1337 (proxies `/api` and `/graphql` to backend:8080)

### Key Architectural Patterns
- **Multi-tenant**: Tenancy → Gym → User associations with role-based permissions
- **GraphQL Code Generation**: Both frontend and backend use `@graphql-codegen/cli` for type safety
- **Monorepo Structure**: Frontend and backend in separate directories with individual package.json files
- **Feature-based Frontend**: Organized by domain (auth, gyms, members, staff, classes)
- **Schema-first GraphQL**: Backend uses schema.graphql with generated resolvers

### Database Schema Highlights
- **User Consolidation**: Single User model with category (MEMBER/STAFF) instead of separate Member/Staff models
- **Per-Gym Permissions**: UserGymAssociation table handles role-specific permissions per gym location
- **Blockchain Integration**: MembershipNFT model caches NFT membership data with rental capabilities
- **Multi-tenancy**: Clean separation between Tenancy (business entity) and Gym (physical location)

### Development Notes
- Both frontend and backend use pnpm as package manager
- Node.js v22.11.0 and pnpm v9.15.0 required
- Frontend uses Vite with React plugin and TailwindCSS v4
- Backend requires PostgreSQL database and various environment variables
- GraphQL schema is shared between frontend and backend via codegen
