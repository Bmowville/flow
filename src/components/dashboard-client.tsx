"use client";

import { ActivityTimeline } from "@/components/activity";
import { InsightStrip } from "@/components/insights";
import { IntegrationsPanel } from "@/components/integrations";
import { PriorityTasks } from "@/components/tasks";
import { WidgetGrid } from "@/components/widgets";
import { useAppShell } from "@/components/app-shell";

export function DashboardClient() {
  const {
    state,
    filteredTasks,
    filteredActivity,
    handleToggleIntegration,
    handleCreateTask,
    handleToggleTask,
    handleDeleteTask,
  } = useAppShell();

  return (
    <>
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
    </>
  );
}
