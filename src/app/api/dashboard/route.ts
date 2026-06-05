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

    let memberships = await prisma.workspaceMember.findMany({
      where: { userId },
      include: { workspace: true },
      orderBy: { joinedAt: "asc" },
    });

    const legacyOperationsMembership = memberships.find(
      (membership) =>
        membership.workspace.name === "Recruiting Ops" ||
        membership.workspace.slug.startsWith("recruiting-ops")
    );

    if (legacyOperationsMembership) {
      await prisma.workspace.update({
        where: { id: legacyOperationsMembership.workspace.id },
        data: { name: "Operations Hub" },
      });

      memberships = memberships.map((membership) =>
        membership.workspace.id === legacyOperationsMembership.workspace.id
          ? { ...membership, workspace: { ...membership.workspace, name: "Operations Hub" } }
          : membership
      );
    }

    if (memberships.length === 1) {
      const hasOperationsHub = memberships.some(
        (membership) => membership.workspace.name === "Operations Hub"
      );

      if (!hasOperationsHub) {
        await prisma.workspace.create({
          data: {
            name: "Operations Hub",
            slug: `operations-hub-${userId.slice(0, 6)}`,
            owner: user.email,
            widgets: {
              create: [
                {
                  title: "Pipeline Coverage",
                  type: "pipeline",
                  status: "healthy",
                  value: "24 roles",
                  description: "12 active, 8 warm, 4 planned",
                  trend: "+6%",
                  position: 1,
                },
              ],
            },
            integrations: {
              create: [
                { name: "Greenhouse", status: "Connected", lastSyncedAt: new Date() },
              ],
            },
            pipelineRoles: {
              create: [
                {
                  title: "Staff Frontend",
                  company: "Adventure Works",
                  stage: "Screen",
                  priority: "High",
                },
                {
                  title: "Senior Frontend Engineer",
                  company: "Northwind",
                  stage: "Applied",
                  priority: "High",
                },
                {
                  title: "Product Engineer",
                  company: "Fabrikam",
                  stage: "Onsite",
                  priority: "Medium",
                },
                {
                  title: "Growth Engineer",
                  company: "Litware",
                  stage: "Applied",
                  priority: "Low",
                },
                {
                  title: "Design Systems Lead",
                  company: "Contoso",
                  stage: "Offer",
                  priority: "High",
                },
                {
                  title: "Fullstack Engineer",
                  company: "Tailspin",
                  stage: "Screen",
                  priority: "Medium",
                },
              ],
            },
            automations: {
              create: [
                {
                  title: "Auto-score inbound roles",
                  description: "Tag inbound roles by match score",
                  status: "Enabled",
                },
              ],
            },
            members: {
              create: [{ userId, role: "Admin" }],
            },
          },
        });

        memberships = await prisma.workspaceMember.findMany({
          where: { userId },
          include: { workspace: true },
          orderBy: { joinedAt: "asc" },
        });
      }
    }

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
                  title: "Client Outreach",
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
                  detail: "Align outcomes with stakeholder feedback",
                  userId,
                },
                {
                  title: "Send stakeholder follow-up",
                  detail: "Reply with updated project link",
                  userId,
                },
                {
                  title: "Draft outreach cadence",
                  detail: "Prepare a 3-touch outreach sequence",
                  userId,
                },
              ],
            },
            focusBlocks: {
              create: [
                {
                  title: "Interview prep deep work",
                  startAt: new Date(Date.now() + 1000 * 60 * 60 * 2),
                  endAt: new Date(Date.now() + 1000 * 60 * 60 * 3),
                  notes: "Review system design prompts",
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
                {
                  title: "Project link viewed",
                  detail: "2 contacts opened the project link this morning",
                  type: "project",
                  userId,
                },
                {
                  title: "Outreach follow-up",
                  detail: "3 follow-ups scheduled for this afternoon",
                  type: "outreach",
                  userId,
                },
              ],
            },
            members: {
              create: [{ userId, role: "Owner" }],
            },
          },
        });

        await prisma.workspace.create({
          data: {
            name: "Operations Hub",
            slug: `operations-hub-${userId.slice(0, 6)}`,
            owner: user.email,
            widgets: {
              create: [
                {
                  title: "Pipeline Coverage",
                  type: "pipeline",
                  status: "healthy",
                  value: "24 roles",
                  description: "12 active, 8 warm, 4 planned",
                  trend: "+6%",
                  position: 1,
                },
              ],
            },
            integrations: {
              create: [
                { name: "Greenhouse", status: "Connected", lastSyncedAt: new Date() },
              ],
            },
            pipelineRoles: {
              create: [
                {
                  title: "Staff Frontend",
                  company: "Adventure Works",
                  stage: "Screen",
                  priority: "High",
                },
                {
                  title: "Senior Frontend Engineer",
                  company: "Northwind",
                  stage: "Applied",
                  priority: "High",
                },
                {
                  title: "Product Engineer",
                  company: "Fabrikam",
                  stage: "Onsite",
                  priority: "Medium",
                },
                {
                  title: "Growth Engineer",
                  company: "Litware",
                  stage: "Applied",
                  priority: "Low",
                },
                {
                  title: "Design Systems Lead",
                  company: "Contoso",
                  stage: "Offer",
                  priority: "High",
                },
                {
                  title: "Fullstack Engineer",
                  company: "Tailspin",
                  stage: "Screen",
                  priority: "Medium",
                },
              ],
            },
            automations: {
              create: [
                {
                  title: "Auto-score inbound roles",
                  description: "Tag inbound roles by match score",
                  status: "Enabled",
                },
              ],
            },
            members: {
              create: [{ userId, role: "Admin" }],
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

    const [workspaces, widgets, tasks, activity, integrations, pipelineRoles, focusBlocks, automations] = await Promise.all([
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
      prisma.pipelineRole.findMany({
        where: { workspaceId },
        orderBy: { createdAt: "desc" },
      }),
      prisma.focusBlock.findMany({
        where: { workspaceId, userId },
        orderBy: { startAt: "asc" },
      }),
      prisma.automation.findMany({
        where: { workspaceId },
        orderBy: { createdAt: "desc" },
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
      pipelineRoles,
      focusBlocks,
      automations,
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
