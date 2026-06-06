# SignalBoard Architecture

SignalBoard is a Next.js App Router application backed by Prisma. Local development uses SQLite, while Vercel production is configured for Postgres.

## Runtime Boundaries

| Layer | Responsibility | Key paths |
| --- | --- | --- |
| App routes | Dashboard pages, sign-in flow, settings, and workspace views | `src/app/` |
| API routes | Authenticated dashboard data, tasks, integrations, seeding, reset, and health checks | `src/app/api/` |
| Shared UI | Dashboard panels, activity, tasks, integrations, command palette, layout shell | `src/components/` |
| Shared logic | Auth helpers, Prisma client, filters, utilities, types | `src/lib/` |
| Data model | Workspace, membership, widgets, activity, tasks, integrations, pipeline roles, focus blocks, automations | `prisma/` |

## Data Model

The workspace is the main ownership boundary. Most records belong to a workspace and are deleted when the workspace is removed.

Core relationships:
- `User` belongs to workspaces through `WorkspaceMember`.
- `User.currentWorkspaceId` stores the selected workspace.
- `Widget`, `Activity`, `Task`, `Integration`, `PipelineRole`, `FocusBlock`, and `Automation` belong to `Workspace`.
- User-owned records such as `Task`, `Activity`, and `FocusBlock` also reference `User`.

## Local and Production Schemas

The project keeps two Prisma schemas because SQLite and Postgres use different datasource providers:
- Local: `prisma/schema.prisma`
- Production: `prisma/postgres/schema.prisma`

Model definitions should remain identical across both files. CI runs:

```bash
npm run validate:schema
```

This check prevents the local SQLite schema and production schema from drifting as the app evolves.

## Seed Data Lifecycle

Sample data can be created three ways:
- `npm run db:seed` seeds local development data.
- First dashboard load creates sample workspaces if the authenticated user has none.
- `POST /api/seed` adds missing sample tasks, activity, focus blocks, and pipeline roles by mode.

The reset endpoint rebuilds the sample state for the signed-in user. This keeps the public deployment easy to return to a known state after testing.

## Validation Coverage

CI currently verifies:
- Prisma schema parity between local and production schemas
- Prisma client generation against the production schema
- ESLint
- TypeScript type checking
- Vitest unit tests
- Next.js production build

Playwright coverage is available locally through:

```bash
npm run test:e2e
```