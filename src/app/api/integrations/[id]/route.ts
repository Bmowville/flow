import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth-server";

export async function PATCH(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireUserId();
    const integration = await prisma.integration.findUnique({
      where: { id: params.id },
    });

    if (!integration) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const nextStatus =
      integration.status === "Connected" ? "Disconnected" : "Connected";

    const updated = await prisma.integration.update({
      where: { id: params.id },
      data: {
        status: nextStatus,
        lastSyncedAt: nextStatus === "Connected" ? new Date() : null,
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
