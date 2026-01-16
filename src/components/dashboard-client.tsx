"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { ActivityTimeline } from "@/components/activity";
import { Header } from "@/components/header";
import { InsightStrip } from "@/components/insights";
import { IntegrationsPanel } from "@/components/integrations";
import { PriorityTasks } from "@/components/tasks";
import { WidgetGrid } from "@/components/widgets";
import { Sidebar } from "@/components/sidebar";
import type { Activity, Integration, Task, Widget, WorkspaceSummary } from "@/lib/types";
import { filterByQuery } from "@/lib/filter";

const emptyState = {
  workspaces: [] as WorkspaceSummary[],
  currentWorkspaceId: null as string | null,
  widgets: [] as Widget[],
  tasks: [] as Task[],
  activity: [] as Activity[],
  integrations: [] as Integration[],
};

type DashboardState = typeof emptyState;

export function DashboardClient() {
  const { data: session } = useSession();
  const [state, setState] = useState<DashboardState>(emptyState);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/dashboard");
      if (!response.ok) {
        throw new Error("Failed to load dashboard");
      }
      const data = await response.json();
      setState(data);
      setError(null);
    } catch {
      setError("Unable to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const handleWorkspaceSwitch = async (workspaceId: string) => {
    await fetch("/api/workspaces/current", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workspaceId }),
    });
    await loadDashboard();
  };

  const handleCreateTask = async (title: string, detail: string) => {
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, detail }),
    });
    await loadDashboard();
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    await loadDashboard();
  };

  const handleDeleteTask = async (id: string) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    await loadDashboard();
  };

  const handleToggleIntegration = async (id: string) => {
    await fetch(`/api/integrations/${id}`, { method: "PATCH" });
    await loadDashboard();
  };

  const filteredTasks = useMemo(
    () => filterByQuery(state.tasks, searchQuery, ["title", "detail"]),
    [searchQuery, state.tasks]
  );

  const filteredActivity = useMemo(
    () => filterByQuery(state.activity, searchQuery, ["title", "detail"]),
    [searchQuery, state.activity]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 px-6 py-12 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
        Loading SignalBoard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 px-6 py-12 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 px-6 py-8 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          userName={session?.user?.name ?? session?.user?.email}
        />
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <Sidebar
            workspaces={state.workspaces}
            currentWorkspaceId={state.currentWorkspaceId}
            onSwitch={handleWorkspaceSwitch}
          />
          <main className="flex flex-col gap-6">
            <InsightStrip />
            <WidgetGrid widgets={state.widgets} />
            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              <ActivityTimeline activity={filteredActivity} />
              <div className="flex flex-col gap-6">
                <IntegrationsPanel
                  integrations={state.integrations}
                  onToggle={handleToggleIntegration}
                />
                <PriorityTasks
                  tasks={filteredTasks}
                  onCreate={handleCreateTask}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
