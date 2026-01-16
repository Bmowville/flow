import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth-server";

export async function GET() {
  try {
    const userId = await requireUserId();
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { currentWorkspace: true },
    });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const memberships = await prisma.workspaceMember.findMany({
      where: { userId },
      include: { workspace: true },
      orderBy: { joinedAt: "asc" },
    });

    if (!user.currentWorkspaceId) {
      if (memberships.length === 0) {
        const workspace = await prisma.workspace.create({
          data: {
            name: "SignalBoard HQ",
            slug: `signalboard-${userId.slice(0, 6)}`,
            owner: user.email,
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
              ],
            },
            integrations: {
              create: [
                { name: "GitHub", status: "Connected", lastSyncedAt: new Date() },
                { name: "LinkedIn", status: "Needs review" },
                { name: "Google Calendar", status: "Connected", lastSyncedAt: new Date() },
              ],
            },
            tasks: {
              create: [
                {
                  title: "Polish resume narrative",
                  detail: "Align outcomes with recruiter feedback",
                  userId,
                },
              ],
            },
            activity: {
              create: [
                {
                  title: "Workspace created",
                  detail: "Demo workspace initialized",
                  type: "seed",
                  userId,
                },
              ],
            },
            members: {
              create: [{ userId, role: "Owner" }],
            },
          },
        });

        await prisma.user.update({
          where: { id: userId },
          data: { currentWorkspaceId: workspace.id },
        });
      } else {
        await prisma.user.update({
          where: { id: userId },
          data: { currentWorkspaceId: memberships[0].workspace.id },
        });
      }
    }

    const refreshedUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { currentWorkspaceId: true },
    });

    if (!refreshedUser?.currentWorkspaceId) {
      return NextResponse.json(
        { error: "No workspace selected" },
        { status: 400 }
      );
    }

    const workspaceId = refreshedUser.currentWorkspaceId;

    const [workspaces, widgets, tasks, activity, integrations] = await Promise.all([
      prisma.workspaceMember.findMany({
        where: { userId },
        include: { workspace: true },
        orderBy: { joinedAt: "asc" },
      }),
      prisma.widget.findMany({
        where: { workspaceId },
        orderBy: { position: "asc" },
      }),
      prisma.task.findMany({
        where: { workspaceId, userId },
        orderBy: { createdAt: "desc" },
      }),
      prisma.activity.findMany({
        where: { workspaceId, userId },
        orderBy: { createdAt: "desc" },
        take: 20,
      }),
      prisma.integration.findMany({
        where: { workspaceId },
        orderBy: { name: "asc" },
      }),
    ]);

    return NextResponse.json({
      currentWorkspaceId: workspaceId,
      workspaces: workspaces.map((membership) => ({
        id: membership.workspace.id,
        name: membership.workspace.name,
        role: membership.role,
      })),
      widgets,
      tasks,
      activity,
      integrations,
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
