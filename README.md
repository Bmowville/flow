# SignalBoard

SignalBoard is a recruiter-ready productivity cockpit that showcases a modern SaaS UI with DB-backed workspaces, tasks, activity, and integrations. Built to stand out in a portfolio review, it demonstrates UI polish, Next.js App Router architecture, and testing discipline.

**Tech Stack:** Next.js App Router, TypeScript, Prisma, SQLite (local) / Postgres (prod), NextAuth, Tailwind, Vitest, Playwright  
**Live Demo (production):** https://flow-azure-beta.vercel.app

## Highlights
- Multi-tenant workspace UI with activity timeline and priority tasks
- Workspace switcher persisted per user
- Integrations connect/disconnect with `lastSyncedAt`
- Tasks CRUD with activity logging
- Theme toggle with persistent preference
- Credentials sign-in is the default; GitHub OAuth appears only if configured
- Prisma schema + seed data for v1 functionality
- Unit tests (Vitest) and E2E tests (Playwright)

## Quick Start (Local)
1) Install dependencies:
- `npm install`

2) Create `.env.local` from `.env.example` and fill secrets.

3) Initialize SQLite and seed:
- `npm run db:generate:local`
- `npm run db:migrate:local`
- `npm run db:seed`

4) Start the dev server:
- `npm run dev`

5) Open:
- `http://localhost:3000`

## Environment
Create a `.env.local` file with:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-a-long-random-secret
DATABASE_URL="file:./dev.db"
```

Keep `NEXTAUTH_SECRET` stable between restarts (changing it will invalidate existing sessions and require clearing auth cookies).

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
1. Create a Postgres database (Neon recommended) and copy the connection string.
2. Import this repo into Vercel.
3. Set the required environment variables in Vercel:
	- `DATABASE_URL` (Postgres)
	- `NEXTAUTH_URL` (your Vercel production URL)
	- `NEXTAUTH_SECRET` (long random string)
	- `PRISMA_SCHEMA=prisma/postgres/schema.prisma`
	- `GITHUB_CLIENT_ID` + `GITHUB_CLIENT_SECRET` (optional)
4. Deploy. Vercel runs `vercel-build`, which executes `npm run db:generate && npm run db:deploy && next build`.
5. First login auto-seeds demo data if the database is empty.

Prisma production verification:
- `vercel-build` runs `prisma migrate deploy --schema prisma/postgres/schema.prisma` via `npm run db:deploy`.
- `DATABASE_URL` in Vercel must start with `postgresql://` or `postgres://`.

## Demo Login
- Go to https://flow-azure-beta.vercel.app/signin
- Use the demo credentials shown on the sign-in page.

## Production Note
`NEXTAUTH_URL` must match the production domain exactly.

## Health Check
`/api/health` is publicly accessible and returns JSON confirming DB connectivity.

## Deployment Protection (Vercel)
If Vercel Deployment Protection (Vercel Authentication) is enabled, public requests to `/api/health` may be blocked. To allow public health checks:
1. Vercel Project → Settings → Deployment Protection.
2. Disable “Vercel Authentication” for Production (or create a Shareable Link if keeping protection on).
3. Redeploy after changing protection, then verify `/api/health` is publicly reachable.

## Resetting Demo Data
Use the Settings page reset action (POST `/api/reset`) to rebuild both demo workspaces.

## Personalization
SignalBoard stores a demo display name in localStorage. The first-run prompt lets you set it, and the Settings → Reset demo action clears it so the onboarding prompt appears again.

## Demo tour + personalization
The Overview page includes a skippable quick tour. Restart it from Settings → Demo controls, and use “Clear personalization” to return to the default demo user.

## What to try in 2 minutes
1. Sign in and set a display name.
2. Switch between “SignalBoard HQ” and “Recruiting Ops”.
3. Open Pipeline or Momentum and load sample data if needed.
4. Toggle integrations or add a task to see activity update.

## Architecture
- Next.js App Router + TypeScript UI
- Prisma ORM with Postgres in production, SQLite locally
- NextAuth credentials for demo authentication
- Vitest + Playwright for tests

## Troubleshooting
- **OAuth/session cookie loops:** Ensure `NEXTAUTH_URL` exactly matches the deployed URL (no trailing slash) and redeploy after changing it.
- **Invalid session/CSRF errors:** Set a strong `NEXTAUTH_SECRET`, then clear cookies for the domain and try again.
- **Preview deployments:** If preview URLs are used, set `NEXTAUTH_URL` to the preview URL or use a separate Vercel Environment Variable for Preview.

## Screenshots

![Login](https://github.com/user-attachments/assets/7905c71e-c732-4342-9081-520ce5323c0d)
![Dashboard](https://github.com/user-attachments/assets/8cf30223-0788-4229-a484-38d504d3d24a)
