import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@signalboard.ai" },
    update: {},
    create: {
      email: "demo@signalboard.ai",
      name: "Avery Morgan",
      image: "",
    },
  });

  const workspace = await prisma.workspace.upsert({
    where: { slug: "signalboard" },
    update: {},
    create: {
      name: "SignalBoard HQ",
      slug: "signalboard",
      owner: "demo@signalboard.ai",
      widgets: {
        create: [
          {
            title: "GitHub Pulse",
            type: "github",
            status: "healthy",
            value: "47 commits",
            description: "8 repos updated in the last 24h",
            trend: "+18%",
            position: 1,
          },
          {
            title: "Calendar Focus",
            type: "calendar",
            status: "attention",
            value: "21h deep work",
            description: "3 blocks need rescheduling",
            trend: "-6%",
            position: 2,
          },
          {
            title: "Recruiter Outreach",
            type: "crm",
            status: "healthy",
            value: "12 follow-ups",
            description: "2 high-priority messages due",
            trend: "+9%",
            position: 3,
          },
          {
            title: "Launch Metrics",
            type: "analytics",
            status: "healthy",
            value: "$18.4k ARR",
            description: "+4 paid teams this week",
            trend: "+12%",
            position: 4,
          }
        ],
      },
      integrations: {
        create: [
          { name: "GitHub", status: "Connected", lastSyncedAt: new Date() },
          { name: "LinkedIn", status: "Needs review" },
          { name: "Google Calendar", status: "Connected", lastSyncedAt: new Date() },
          { name: "Notion", status: "Queued" }
        ],
      },
      activity: {
        create: [
          {
            title: "Synced GitHub activity",
            detail: "47 new commits across 6 repos",
            type: "sync",
            userId: user.id,
          },
          {
            title: "Upcoming interviews",
            detail: "3 interviews scheduled this week",
            type: "calendar",
            userId: user.id,
          },
        ],
      },
      members: {
        create: [{ userId: user.id, role: "Owner" }],
      },
      tasks: {
        create: [
          {
            title: "Polish resume narrative",
            detail: "Align outcomes with recruiter feedback",
            userId: user.id,
          },
          {
            title: "Record product walkthrough",
            detail: "Capture 90-second demo clip",
            userId: user.id,
          },
        ],
      },
    },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { currentWorkspaceId: workspace.id },
  });

  await prisma.workspace.upsert({
    where: { slug: "recruiting-ops" },
    update: {},
    create: {
      name: "Recruiting Ops",
      slug: "recruiting-ops",
      owner: "demo@signalboard.ai",
      widgets: {
        create: [
          {
            title: "Pipeline Coverage",
            type: "pipeline",
            status: "healthy",
            value: "24 roles",
            description: "12 active, 8 warm, 4 planned",
            trend: "+6%",
            position: 1,
          },
        ],
      },
      integrations: {
        create: [{ name: "Greenhouse", status: "Connected", lastSyncedAt: new Date() }],
      },
      members: {
        create: [{ userId: user.id, role: "Admin" }],
      },
    },
  });
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
