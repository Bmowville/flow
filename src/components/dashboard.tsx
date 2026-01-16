import { ActivityTimeline } from "@/components/activity";
import { Header } from "@/components/header";
import { InsightStrip } from "@/components/insights";
import { IntegrationsPanel } from "@/components/integrations";
import { PriorityTasks } from "@/components/tasks";
import { WidgetGrid } from "@/components/widgets";
import { Sidebar } from "@/components/sidebar";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 px-6 py-8 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <Header />
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <Sidebar />
          <main className="flex flex-col gap-6">
            <InsightStrip />
            <WidgetGrid />
            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              <ActivityTimeline />
              <div className="flex flex-col gap-6">
                <IntegrationsPanel />
                <PriorityTasks />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
