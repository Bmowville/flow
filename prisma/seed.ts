import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const workspace = await prisma.workspace.upsert({
    where: { slug: "signalboard" },
    update: {},
    create: {
      name: "SignalBoard HQ",
      slug: "signalboard",
      owner: "demo@signalboard.ai",
      widgets: {
        create: [
          { title: "GitHub Pulse", type: "github", status: "healthy", position: 1 },
          { title: "Calendar Focus", type: "calendar", status: "attention", position: 2 },
          { title: "Recruiter Outreach", type: "crm", status: "healthy", position: 3 },
          { title: "Launch Metrics", type: "analytics", status: "healthy", position: 4 }
        ],
      },
      activity: {
        create: [
          { title: "Synced GitHub activity", detail: "47 new commits across 6 repos" },
          { title: "Upcoming interviews", detail: "3 interviews scheduled this week" },
          { title: "Calendar optimized", detail: "Rebalanced deep-work blocks" },
          { title: "Recruiter follow-ups", detail: "12 follow-ups ready to send" }
        ],
      },
    },
  });

  await prisma.workspace.update({
    where: { id: workspace.id },
    data: {
      activity: {
        create: [
          { title: "Workspace snapshot", detail: "Dashboard personalized for hiring focus" },
        ],
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
