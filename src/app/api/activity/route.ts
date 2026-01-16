import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth-server";

export async function GET() {
  try {
    const userId = await requireUserId();
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { currentWorkspaceId: true },
    });

    if (!user?.currentWorkspaceId) {
      return NextResponse.json([], { status: 200 });
    }

    const activity = await prisma.activity.findMany({
      where: { workspaceId: user.currentWorkspaceId, userId },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return NextResponse.json(activity);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
