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

    const tasks = await prisma.task.findMany({
      where: { workspaceId: user.currentWorkspaceId, userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks);
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
    const detail = body.detail as string | undefined;

    if (!title || !detail) {
      return NextResponse.json(
        { error: "title and detail are required" },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        detail,
        userId,
        workspaceId: user.currentWorkspaceId,
      },
    });

    await prisma.activity.create({
      data: {
        title: "Task created",
        detail: `${title} added to focus list`,
        type: "task_created",
        userId,
        workspaceId: user.currentWorkspaceId,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
