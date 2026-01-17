"use client";

import { Briefcase, Target } from "lucide-react";
import { useMemo } from "react";
import { useAppShell } from "@/components/app-shell";
import { cn } from "@/lib/utils";

const stageStyles: Record<string, string> = {
  Applied: "bg-slate-200/70 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  Screen: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300",
  Onsite: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
  Offer: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
};

const priorityStyles: Record<string, string> = {
  High: "bg-rose-500/10 text-rose-600 dark:text-rose-300",
  Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
  Low: "bg-slate-200/70 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

export default function PipelinePage() {
  const { state } = useAppShell();

  const stageSummary = useMemo(() => {
    return state.pipelineRoles.reduce<Record<string, number>>((acc, role) => {
      acc[role.stage] = (acc[role.stage] ?? 0) + 1;
      return acc;
    }, {});
  }, [state.pipelineRoles]);

  const prioritySummary = useMemo(() => {
    return state.pipelineRoles.reduce<Record<string, number>>((acc, role) => {
      acc[role.priority] = (acc[role.priority] ?? 0) + 1;
      return acc;
    }, {});
  }, [state.pipelineRoles]);

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-white/10 bg-white/80 p-6 shadow-sm dark:bg-slate-950/60">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Pipeline health
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              Role cadence & opportunity mix
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
              Monitor active roles, stages, and priority alignment for the current workspace.
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
            <Briefcase size={20} />
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/70 p-4 dark:bg-slate-900/70">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Stages
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(stageSummary).map(([stage, count]) => (
                <span
                  key={stage}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    stageStyles[stage] ?? "bg-slate-200/70 text-slate-600"
                  )}
                >
                  {stage} · {count}
                </span>
              ))}
              {Object.keys(stageSummary).length === 0 && (
                <span className="text-sm text-slate-500 dark:text-slate-300">
                  No pipeline roles yet.
                </span>
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/70 p-4 dark:bg-slate-900/70">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Priority mix
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(prioritySummary).map(([priority, count]) => (
                <span
                  key={priority}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    priorityStyles[priority] ?? "bg-slate-200/70 text-slate-600"
                  )}
                >
                  {priority} · {count}
                </span>
              ))}
              {Object.keys(prioritySummary).length === 0 && (
                <span className="text-sm text-slate-500 dark:text-slate-300">
                  Priorities update after roles are added.
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/80 p-6 shadow-sm dark:bg-slate-950/60">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Active roles
          </h3>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-slate-900">
            <Target size={14} />
            {state.pipelineRoles.length} tracked roles
          </div>
        </div>
        <div className="mt-4 space-y-3">
          {state.pipelineRoles.map((role) => (
            <div
              key={role.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/70 px-4 py-3 text-sm text-slate-700 shadow-sm dark:bg-slate-900/70 dark:text-slate-200"
            >
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{role.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{role.company}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    stageStyles[role.stage] ?? "bg-slate-200/70 text-slate-600"
                  )}
                >
                  {role.stage}
                </span>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    priorityStyles[role.priority] ?? "bg-slate-200/70 text-slate-600"
                  )}
                >
                  {role.priority} priority
                </span>
              </div>
            </div>
          ))}
          {state.pipelineRoles.length === 0 && (
            <p className="text-sm text-slate-500 dark:text-slate-300">
              No roles tracked yet. Add your next target role to start building momentum.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
