# SignalBoard

SignalBoard is a recruiter-ready productivity cockpit that showcases a modern SaaS UI with DB-backed workspaces, tasks, activity, and integrations. Built to stand out in a portfolio review, it demonstrates UI polish, Next.js App Router architecture, and testing discipline.

**Tech Stack:** Next.js App Router, TypeScript, Prisma, SQLite (local) / Postgres (prod), NextAuth, Tailwind, Vitest, Playwright  
**Live Demo:** _Add URL after deploy_

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
- `npm run db:generate`
- `npm run db:migrate`
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

# Optional (enables GitHub OAuth button)
# GITHUB_CLIENT_ID=replace-with-github-client-id
# GITHUB_CLIENT_SECRET=replace-with-github-client-secret
