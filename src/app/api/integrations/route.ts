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

    const integrations = await prisma.integration.findMany({
      where: { workspaceId: user.currentWorkspaceId },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(integrations);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
