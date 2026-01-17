import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth-server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const mode = typeof body.mode === "string" ? body.mode : "full";
    const userId = await requireUserId();
    const memberships = await prisma.workspaceMember.findMany({
      where: { userId },
      include: { workspace: true },
    });

    if (memberships.length === 0) {
      return NextResponse.json({ error: "No workspaces" }, { status: 400 });
    }

    const primaryWorkspace =
      memberships.find((membership) => membership.workspace.name === "SignalBoard HQ") ??
      memberships[0];
    const recruitingWorkspace = memberships.find(
      (membership) => membership.workspace.name === "Recruiting Ops"
    );

    const now = new Date();
    const focusStart = new Date(now.getTime() + 1000 * 60 * 60 * 2);
    const focusEnd = new Date(now.getTime() + 1000 * 60 * 60 * 3);

    const [taskCount, activityCount, focusCount] = await Promise.all([
      prisma.task.count({ where: { workspaceId: primaryWorkspace.workspace.id, userId } }),
      prisma.activity.count({ where: { workspaceId: primaryWorkspace.workspace.id, userId } }),
      prisma.focusBlock.count({ where: { workspaceId: primaryWorkspace.workspace.id, userId } }),
    ]);

    const shouldSeedTasks = mode === "full" || mode === "tasks";
    const shouldSeedActivity = mode === "full" || mode === "activity";
    const shouldSeedFocus = mode === "full" || mode === "focus";
    const shouldSeedPipeline = mode === "full" || mode === "pipeline" || mode === "pipeline-single";

    if (shouldSeedTasks && taskCount < 3) {
      await prisma.task.createMany({
        data: [
          {
            title: "Send recruiter follow-up",
            detail: "Reply to Acme Talent with updated portfolio link",
            completed: true,
            userId,
            workspaceId: primaryWorkspace.workspace.id,
          },
          {
            title: "Draft outreach cadence",
            detail: "Prepare a 3-touch outreach sequence",
            completed: false,
            userId,
            workspaceId: primaryWorkspace.workspace.id,
          },
          {
            title: "Update case study metrics",
            detail: "Add impact numbers to the SignalBoard case study",
            completed: false,
            userId,
            workspaceId: primaryWorkspace.workspace.id,
          },
        ],
      });
    }

    if (shouldSeedActivity && activityCount < 3) {
      await prisma.activity.createMany({
        data: [
          {
            title: "Portfolio viewed",
            detail: "2 recruiters opened your portfolio this morning",
            type: "portfolio",
            userId,
            workspaceId: primaryWorkspace.workspace.id,
            createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 2),
          },
          {
            title: "Outreach follow-up",
            detail: "3 follow-ups scheduled for this afternoon",
            type: "outreach",
            userId,
            workspaceId: primaryWorkspace.workspace.id,
            createdAt: new Date(now.getTime() - 1000 * 60 * 30),
          },
          {
            title: "Focus block scheduled",
            detail: "Deep work block added for tomorrow",
            type: "focus",
            userId,
            workspaceId: primaryWorkspace.workspace.id,
            createdAt: new Date(now.getTime() - 1000 * 60 * 15),
          },
        ],
      });
    }

    if (shouldSeedFocus && focusCount === 0) {
      await prisma.focusBlock.create({
        data: {
          title: "Interview prep deep work",
          startAt: focusStart,
          endAt: focusEnd,
          notes: "Review system design prompts",
          userId,
          workspaceId: primaryWorkspace.workspace.id,
        },
      });
    }

    if (recruitingWorkspace && shouldSeedPipeline) {
      const pipelineCount = await prisma.pipelineRole.count({
        where: { workspaceId: recruitingWorkspace.workspace.id },
      });

      if (mode === "pipeline-single" && pipelineCount < 6) {
        await prisma.pipelineRole.create({
          data: {
            title: "Senior Frontend Engineer",
            company: "Northwind",
            stage: "Screen",
            priority: "High",
            workspaceId: recruitingWorkspace.workspace.id,
          },
        });
      } else if (pipelineCount < 2) {
        await prisma.pipelineRole.createMany({
          data: [
            {
              title: "Senior Frontend Engineer",
              company: "Northwind",
              stage: "Screen",
              priority: "High",
              workspaceId: recruitingWorkspace.workspace.id,
            },
            {
              title: "Product Engineer",
              company: "Fabrikam",
              stage: "Onsite",
              priority: "Medium",
              workspaceId: recruitingWorkspace.workspace.id,
            },
          ],
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
