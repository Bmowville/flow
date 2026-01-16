"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { ToastStack, type Toast } from "@/components/toast";
import type {
  Activity,
  Automation,
  FocusBlock,
  Integration,
  PipelineRole,
  Task,
  Widget,
  WorkspaceSummary,
} from "@/lib/types";
import { filterByQuery } from "@/lib/filter";

const emptyState = {
  workspaces: [] as WorkspaceSummary[],
  currentWorkspaceId: null as string | null,
  widgets: [] as Widget[],
  tasks: [] as Task[],
  activity: [] as Activity[],
  integrations: [] as Integration[],
  pipelineRoles: [] as PipelineRole[],
  focusBlocks: [] as FocusBlock[],
  automations: [] as Automation[],
};

type DashboardState = typeof emptyState;

type AppShellContextValue = {
  state: DashboardState;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filteredTasks: Task[];
  filteredActivity: Activity[];
  handleWorkspaceSwitch: (workspaceId: string) => Promise<void>;
  handleCreateTask: (title: string, detail: string) => Promise<void>;
  handleToggleTask: (id: string, completed: boolean) => Promise<void>;
  handleDeleteTask: (id: string) => Promise<void>;
  handleToggleIntegration: (id: string) => Promise<void>;
  handleCreateAutomation: (title: string, description: string) => Promise<void>;
  handleToggleAutomation: (id: string) => Promise<void>;
  handleDeleteAutomation: (id: string) => Promise<void>;
  handleResetDemo: () => Promise<void>;
};

const AppShellContext = createContext<AppShellContextValue | null>(null);

export function useAppShell() {
  const ctx = useContext(AppShellContext);
  if (!ctx) {
    throw new Error("useAppShell must be used within AppShell");
  }
  return ctx;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [state, setState] = useState<DashboardState>(emptyState);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const pushToast = useCallback((title: string, type: Toast["type"] = "info") => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, title, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2800);
  }, []);

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
    if (status === "authenticated") {
      loadDashboard();
    }
  }, [loadDashboard, status]);

  const handleWorkspaceSwitch = async (workspaceId: string) => {
    await fetch("/api/workspaces/current", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workspaceId }),
    });
    pushToast("Workspace updated", "success");
    await loadDashboard();
  };

  const handleCreateTask = async (title: string, detail: string) => {
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, detail }),
    });
    pushToast("Task added", "success");
    await loadDashboard();
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    pushToast(completed ? "Task completed" : "Task reopened", "info");
    await loadDashboard();
  };

  const handleDeleteTask = async (id: string) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    pushToast("Task deleted", "warning");
    await loadDashboard();
  };

  const handleToggleIntegration = async (id: string) => {
    await fetch(`/api/integrations/${id}`, { method: "PATCH" });
    pushToast("Integration updated", "success");
    await loadDashboard();
  };

  const handleCreateAutomation = async (title: string, description: string) => {
    await fetch("/api/automations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    pushToast("Automation added", "success");
    await loadDashboard();
  };

  const handleToggleAutomation = async (id: string) => {
    await fetch(`/api/automations/${id}`, { method: "PATCH" });
    pushToast("Automation updated", "info");
    await loadDashboard();
  };

  const handleDeleteAutomation = async (id: string) => {
    await fetch(`/api/automations/${id}`, { method: "DELETE" });
    pushToast("Automation removed", "warning");
    await loadDashboard();
  };

  const handleResetDemo = async () => {
    await fetch("/api/reset", { method: "POST" });
    pushToast("Demo reset", "warning");
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

  const hasFilter = searchQuery.trim().length > 0;

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
    <AppShellContext.Provider
      value={{
        state,
        searchQuery,
        setSearchQuery,
        filteredTasks,
        filteredActivity,
        handleWorkspaceSwitch,
        handleCreateTask,
        handleToggleTask,
        handleDeleteTask,
        handleToggleIntegration,
        handleCreateAutomation,
        handleToggleAutomation,
        handleDeleteAutomation,
        handleResetDemo,
      }}
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 px-6 py-8 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
        <ToastStack toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <Header
            searchQuery={searchQuery}
            onSearchChange={(value) => {
              setSearchQuery(value);
              if (value.trim().length > 0) {
                pushToast("Search filter applied", "info");
              }
            }}
            userName={session?.user?.name ?? session?.user?.email}
          />
          {hasFilter && (
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-300">
              Filtering {filteredTasks.length} tasks and {filteredActivity.length} activity items
            </div>
          )}
          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <Sidebar
              workspaces={state.workspaces}
              currentWorkspaceId={state.currentWorkspaceId}
              activePath={pathname}
              onSwitch={handleWorkspaceSwitch}
            />
            <main className="flex flex-col gap-6">{children}</main>
          </div>
        </div>
      </div>
    </AppShellContext.Provider>
  );
}
