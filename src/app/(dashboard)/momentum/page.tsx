"use client";

import { Flame, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { ActivityTimeline } from "@/components/activity";
import { useAppShell } from "@/components/app-shell";

export default function MomentumPage() {
  const { state, filteredActivity, filteredTasks } = useAppShell();

  const completedCount = useMemo(
    () => state.tasks.filter((task) => task.completed).length,
    [state.tasks]
  );

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-white/10 bg-white/80 p-6 shadow-sm dark:bg-slate-950/60">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Momentum
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              Keep the outreach cadence climbing
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
              Track your activity streak, completed tasks, and recruiting touchpoints.
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
            <Flame size={20} />
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/70 p-4 dark:bg-slate-900/70">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Completed tasks
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
              {completedCount}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
              {state.tasks.length} total tasks this week
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/70 p-4 dark:bg-slate-900/70">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Activity signals
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
              {state.activity.length}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
              Logged events for this workspace
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/70 p-4 dark:bg-slate-900/70">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Pipeline lift
            </p>
            <p className="mt-3 inline-flex items-center gap-2 text-2xl font-semibold text-slate-900 dark:text-white">
              <TrendingUp size={18} />
              {state.pipelineRoles.length}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
              Roles progressing across stages
            </p>
          </div>
        </div>
      </section>

      <ActivityTimeline activity={filteredActivity} />

      <section className="rounded-2xl border border-white/10 bg-white/80 p-6 text-sm text-slate-600 shadow-sm dark:bg-slate-950/60 dark:text-slate-300">
        <p className="font-semibold text-slate-900 dark:text-white">Next momentum plays</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          {filteredTasks.slice(0, 3).map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
          {filteredTasks.length === 0 && <li>Clear the search filter to see tasks.</li>}
        </ul>
      </section>
    </div>
  );
}
