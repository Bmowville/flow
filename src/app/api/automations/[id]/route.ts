import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth-server";

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireUserId();
    const { id } = await params;
    const automation = await prisma.automation.findUnique({ where: { id } });

    if (!automation) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const nextStatus = automation.status === "Enabled" ? "Paused" : "Enabled";
    const updated = await prisma.automation.update({
      where: { id },
      data: { status: nextStatus },
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
    await requireUserId();
    const { id } = await params;
    await prisma.automation.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
