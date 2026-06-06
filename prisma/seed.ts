import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "ops@signalboard.local" },
    update: {},
    create: {
      email: "ops@signalboard.local",
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
      owner: "ops@signalboard.local",
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
            title: "Customer Signals",
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
      pipelineRoles: {
        create: [
          { title: "Billing QA rollout", company: "Northwind", stage: "Review", priority: "High" },
          { title: "Customer health sync", company: "Fabrikam", stage: "Active", priority: "Medium" },
          { title: "Usage reporting cleanup", company: "Contoso", stage: "Planned", priority: "Low" }
        ],
      },
      focusBlocks: {
        create: [
          {
            title: "Case study updates",
            startAt: new Date(Date.now() + 1000 * 60 * 60 * 2),
            endAt: new Date(Date.now() + 1000 * 60 * 60 * 3),
            notes: "Finalize case study copy",
            userId: user.id,
          },
          {
            title: "Incident review",
            startAt: new Date(Date.now() + 1000 * 60 * 60 * 5),
            endAt: new Date(Date.now() + 1000 * 60 * 60 * 6),
            notes: "System design review",
            userId: user.id,
          },
        ],
      },
      automations: {
        create: [
          {
            title: "Auto-followup reminders",
            description: "Create a reminder 48h after a stakeholder reply",
            status: "Enabled",
          },
          {
            title: "Weekly pipeline summary",
            description: "Send status digest every Friday 5pm",
            status: "Enabled",
          },
          {
            title: "Focus block guard",
            description: "Decline meetings during focus blocks",
            status: "Paused",
          },
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
            title: "Upcoming reviews",
            detail: "3 operating reviews scheduled this week",
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
            title: "Review workspace metrics",
            detail: "Align outcomes with stakeholder feedback",
            userId: user.id,
          },
          {
            title: "Record product walkthrough",
            detail: "Capture 90-second feature update",
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

  const operationsWorkspace = await prisma.workspace.findFirst({
    where: {
      OR: [{ slug: "operations-hub" }],
    },
  });

  if (operationsWorkspace) {
    await prisma.workspace.update({
      where: { id: operationsWorkspace.id },
      data: { name: "Operations Hub" },
    });
  } else {
    await prisma.workspace.create({
      data: {
      name: "Operations Hub",
      slug: "operations-hub",
      owner: "ops@signalboard.local",
      widgets: {
        create: [
          {
            title: "Pipeline Coverage",
            type: "pipeline",
            status: "healthy",
            value: "24 initiatives",
            description: "12 active, 8 warm, 4 planned",
            trend: "+6%",
            position: 1,
          },
        ],
      },
      integrations: {
        create: [{ name: "Greenhouse", status: "Connected", lastSyncedAt: new Date() }],
      },
      pipelineRoles: {
        create: [
          { title: "Data quality rollout", company: "Adventure Works", stage: "Review", priority: "High" },
        ],
      },
      automations: {
        create: [
          {
            title: "Auto-score account signals",
            description: "Tag account updates by urgency and owner",
            status: "Enabled",
          },
        ],
      },
      members: {
        create: [{ userId: user.id, role: "Admin" }],
      },
    },
    });
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
