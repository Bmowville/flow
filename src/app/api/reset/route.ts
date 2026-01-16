import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth-server";

export async function POST() {
  try {
    const userId = await requireUserId();
    const memberships = await prisma.workspaceMember.findMany({
      where: { userId },
      select: { workspaceId: true },
    });

    const workspaceIds = memberships.map((m) => m.workspaceId);

    await prisma.user.update({
      where: { id: userId },
      data: { currentWorkspaceId: null },
    });

    if (workspaceIds.length > 0) {
      await prisma.workspace.deleteMany({
        where: { id: { in: workspaceIds } },
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
