# Vision Preparation Evening Coaching

A full-stack coaching/education platform monorepo.

## Project structure

```
artifacts/
  api-server/       — Express + TypeScript REST API (port 8080)
  vision-prep/      — React 19 + Vite frontend (port 20697)
  mockup-sandbox/   — UI component design sandbox
lib/
  db/               — Drizzle ORM schema + migrations (PostgreSQL)
  api-spec/         — OpenAPI specification (openapi.yaml)
  api-zod/          — Auto-generated Zod schemas from OpenAPI spec
  api-client-react/ — Auto-generated React Query hooks
```

## How to run

Both services start automatically via their configured workflows:

| Workflow | Command | Port |
|---|---|---|
| `artifacts/vision-prep: web` | `pnpm --filter @workspace/vision-prep run dev` | 20697 |
| `artifacts/api-server: API Server` | `pnpm --filter @workspace/api-server run dev` | 8080 |

The frontend Vite dev server proxies `/api` requests to `http://localhost:8080`, so there is no CORS setup needed in development.

## Required secrets

| Secret | Purpose |
|---|---|
| `JWT_SECRET` | Signs and verifies authentication JWTs |

## Database

Uses Replit's built-in PostgreSQL. `DATABASE_URL` is provided automatically by the runtime.

To push schema changes: `pnpm --filter @workspace/db run push`

## Tech stack

- **Backend:** Node.js, Express 5, TypeScript, Drizzle ORM, Pino logging
- **Frontend:** React 19, Vite, Tailwind CSS v4, Radix UI, Framer Motion, GSAP, Three.js, Wouter, TanStack Query
- **Monorepo:** pnpm workspaces

## User preferences

<!-- Add user preferences here -->
