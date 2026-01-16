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

    if (!user?.currentWorkspaceId) {
      return NextResponse.json(
        { error: "No workspace selected" },
        { status: 400 }
      );
    }

    const workspaceId = user.currentWorkspaceId;

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
