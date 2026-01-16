# SignalBoard

SignalBoard is a recruiter-ready productivity cockpit that showcases a modern SaaS UI with mocked integrations, analytics widgets, and a guided onboarding flow. Built to stand out in a portfolio review, it demonstrates UI polish, Next.js App Router architecture, and testing discipline.

## Highlights
- Multi-tenant workspace UI with activity timeline and priority tasks
- Mocked integrations with status states and rich insights
- Theme toggle with persistent preference
- NextAuth demo sign-in with GitHub OAuth and credentials provider
- Prisma + SQLite schema and seed data for extension work
- Unit tests (Vitest) and E2E tests (Playwright)

## Quick Start
1. Install dependencies:
	- `npm install`
2. Start the dev server:
	- `npm run dev`
3. Open the app at `http://localhost:3000`.

## Environment
Create a `.env.local` file with the following values:

```
NEXTAUTH_SECRET=replace-with-a-secret
GITHUB_CLIENT_ID=replace-with-github-client-id
GITHUB_CLIENT_SECRET=replace-with-github-client-secret
```

Demo credentials:
- Email: `demo@signalboard.ai`
- Password: `signalboard`

## Database
SignalBoard includes a Prisma schema for future-backed features.

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
- `npm run prisma:generate` — generate Prisma client
- `npm run prisma:migrate` — create SQLite migration
- `npm run prisma:seed` — seed local data

## Screenshots
Add screenshots of the dashboard and sign-in flow here. (Placeholders — replace with real images.)

- Dashboard overview
- Activity timeline and widgets
- Authentication screen
