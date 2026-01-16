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

    const automations = await prisma.automation.findMany({
      where: { workspaceId: user.currentWorkspaceId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(automations);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await requireUserId();
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { currentWorkspaceId: true },
    });

    if (!user?.currentWorkspaceId) {
      return NextResponse.json({ error: "No workspace" }, { status: 400 });
    }

    const body = await request.json();
    const title = body.title as string | undefined;
    const description = body.description as string | undefined;

    if (!title || !description) {
      return NextResponse.json(
        { error: "title and description are required" },
        { status: 400 }
      );
    }

    const automation = await prisma.automation.create({
      data: {
        title,
        description,
        status: "Enabled",
        workspaceId: user.currentWorkspaceId,
      },
    });

    return NextResponse.json(automation, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
