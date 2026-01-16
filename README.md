# SignalBoard

SignalBoard is a recruiter-ready productivity cockpit that showcases a modern SaaS UI with DB-backed workspaces, tasks, activity, and integrations. Built to stand out in a portfolio review, it demonstrates UI polish, Next.js App Router architecture, and testing discipline.

**Tech Stack:** Next.js App Router, TypeScript, Prisma, SQLite (local) / Postgres (prod), NextAuth, Tailwind, Vitest, Playwright.

**Live Demo:** _Add URL after deploy_

## Highlights
- Multi-tenant workspace UI with activity timeline and priority tasks
- Workspace switcher persisted per user (SQLite)
- Integrations connect/disconnect with `lastSyncedAt`
- Tasks CRUD with activity logging
- Theme toggle with persistent preference
- Credentials sign-in is the default; GitHub OAuth appears only if configured
- Prisma + SQLite schema and seed data for v1 functionality
- Unit tests (Vitest) and E2E tests (Playwright)

## Quick Start (Local)
1. Install dependencies:
	- `npm install`
2. Create `.env.local` from `.env.example` and fill secrets.
3. Initialize SQLite and seed:
	- `npm run db:generate`
	- `npm run db:migrate`
	- `npm run db:seed`
4. Start the dev server:
	- `npm run dev`
5. Open the app at `http://localhost:3000`.

## Environment
Create a `.env.local` file with the following values:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-a-secret
DATABASE_URL="file:./dev.db"
GITHUB_CLIENT_ID=replace-with-github-client-id
GITHUB_CLIENT_SECRET=replace-with-github-client-secret
```

Demo credentials:
- Email: `demo@signalboard.ai`
- Password: `signalboard`

Optional:
- `GITHUB_CLIENT_ID` + `GITHUB_CLIENT_SECRET` (enables GitHub OAuth)

## Database
SignalBoard uses Prisma + SQLite for local development. Production should use Postgres (Neon/Supabase).

```
npm run db:generate
npm run db:migrate
npm run db:seed
```

## Tests
```
npm run test
npm run test:e2e
```

## Scripts
- `npm run dev` — start development server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — lint code
- `npm run db:generate` — generate Prisma client
- `npm run db:migrate` — create SQLite migration
- `npm run db:deploy` — run migrations in production
- `npm run db:seed` — seed local data

## Deploy to Vercel (Postgres)
1. Create a Postgres database (Neon or Supabase) and copy the connection string.
2. In Vercel, set environment variables:
	- `DATABASE_URL` (Postgres)
	- `NEXTAUTH_URL` (your production URL)
	- `NEXTAUTH_SECRET`
	- `GITHUB_CLIENT_ID` + `GITHUB_CLIENT_SECRET` (optional)
3. If your deployment uses the Postgres Prisma schema file, set `PRISMA_SCHEMA=prisma/postgres/schema.prisma`.
4. Deploy. Vercel runs `vercel-build` which executes `npm run db:generate && npm run db:deploy && next build`.
5. First login will auto-seed demo data if the database is empty.

## Health Check
`/api/health` verifies DB connectivity.

## Screenshots

![Login](https://github.com/user-attachments/assets/7905c71e-c732-4342-9081-520ce5323c0d)
![Dashboard](https://github.com/user-attachments/assets/8cf30223-0788-4229-a484-38d504d3d24a)


