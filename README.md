# SignalBoard

SignalBoard is a recruiter-ready productivity cockpit that showcases a modern SaaS UI with DB-backed workspaces, tasks, activity, and integrations. Built to stand out in a portfolio review, it demonstrates UI polish, Next.js App Router architecture, and testing discipline.

## Highlights
- Multi-tenant workspace UI with activity timeline and priority tasks
- Workspace switcher persisted per user (SQLite)
- Integrations connect/disconnect with `lastSyncedAt`
- Tasks CRUD with activity logging
- Theme toggle with persistent preference
- NextAuth demo sign-in with GitHub OAuth and credentials provider
- Prisma + SQLite schema and seed data for v1 functionality
- Unit tests (Vitest) and E2E tests (Playwright)

## Quick Start
1. Install dependencies:
	- `npm install`
2. Create `.env.local` from `.env.example` and fill secrets.
2. Start the dev server:
	- `npm run dev`
3. Open the app at `http://localhost:3000`.

## Environment
Create a `.env.local` file with the following values:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-a-secret
GITHUB_CLIENT_ID=replace-with-github-client-id
GITHUB_CLIENT_SECRET=replace-with-github-client-secret
```

Demo credentials:
- Email: `demo@signalboard.ai`
- Password: `signalboard`

## Database
SignalBoard uses Prisma + SQLite for tasks, activity, integrations, and workspace preferences locally. For production, use Postgres (Neon/Supabase).

```
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
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

## Deploy to Vercel
1. Create a Postgres database (Neon or Supabase) and copy the connection string.
2. In Vercel, set environment variables:
	- `DATABASE_URL` (Postgres)
	- `NEXTAUTH_URL` (your production URL)
	- `NEXTAUTH_SECRET`
	- `GITHUB_CLIENT_ID` + `GITHUB_CLIENT_SECRET` (optional)
3. Set `PRISMA_SCHEMA=prisma/postgres/schema.prisma` in Vercel env vars.
4. Deploy. Vercel will run `vercel-build` which executes Prisma generate + migrations.

## Local Run (SQLite)
```
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

## Screenshots

<img width="1000" height="503" alt="login" src="https://github.com/user-attachments/assets/7905c71e-c732-4342-9081-520ce5323c0d" />
<img width="1904" height="957" alt="screen" src="https://github.com/user-attachments/assets/8cf30223-0788-4229-a484-38d504d3d24a" />

Recommended sizes:
- Dashboard hero: 1600×900
- Widgets panel: 1200×900
- Sign-in screen: 1200×800

Suggested shots:
- Dashboard overview
- Activity timeline and widgets
- Authentication screen
