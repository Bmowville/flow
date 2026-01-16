import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth-server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await requireUserId();
    const body = await request.json();
    const completed = body.completed as boolean | undefined;

    const { id } = await params;

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task || task.userId !== userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const updated = await prisma.task.update({
      where: { id },
      data: { completed: completed ?? task.completed },
    });

    await prisma.activity.create({
      data: {
        title: updated.completed ? "Task completed" : "Task reopened",
        detail: `${updated.title} ${updated.completed ? "completed" : "reopened"}`,
        type: "task_status",
        userId,
        workspaceId: updated.workspaceId,
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await requireUserId();
    const { id } = await params;
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task || task.userId !== userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.task.delete({ where: { id } });

    await prisma.activity.create({
      data: {
        title: "Task deleted",
        detail: `${task.title} removed from focus list`,
        type: "task_deleted",
        userId,
        workspaceId: task.workspaceId,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
