"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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
    displayName,
    onboardingComplete,
    saveDisplayName,
    tourCompleted,
    tourDismissed,
    completeTour,
    dismissTour,
    demoLoaded,
    handleLoadSampleData,
    handleToggleIntegration,
    handleCreateTask,
    handleToggleTask,
    handleDeleteTask,
  } = useAppShell();

  const [draftName, setDraftName] = useState("");

  const lastUpdated = useMemo(() => new Date(), []);

  return (
    <>
      <section className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-300">
          Welcome, <span className="text-slate-900 dark:text-white">{displayName}</span>
        </p>
        {!tourCompleted && !tourDismissed && (
          <div className="rounded-2xl border border-white/10 bg-white/80 p-4 text-sm text-slate-600 shadow-sm dark:bg-slate-950/60 dark:text-slate-300">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-900 dark:text-white">Quick tour</p>
              <button
                type="button"
                onClick={() => dismissTour()}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Skip
              </button>
            </div>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Set your display name for a personalized walkthrough.</li>
              <li>Switch to “Recruiting Ops” to see pipeline insights.</li>
              <li>
                Add a priority task or visit the
                <Link href="/pipeline" className="ml-1 font-semibold text-indigo-600">
                  Pipeline
                </Link>
                .
              </li>
              <li>
                Open
                <Link href="/focus" className="ml-1 font-semibold text-indigo-600">
                  Focus
                </Link>
                to review deep-work blocks.
              </li>
            </ul>
            <button
              type="button"
              onClick={() => completeTour()}
              className="mt-3 inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-slate-900"
            >
              Mark tour complete
            </button>
          </div>
        )}
        {!demoLoaded && (
          <button
            type="button"
            onClick={() => handleLoadSampleData()}
            className="inline-flex w-fit items-center justify-center rounded-full bg-indigo-500 px-4 py-2 text-xs font-semibold text-white"
          >
            Start demo (load sample data)
          </button>
        )}
        {!onboardingComplete && (
          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4 text-sm text-slate-700 shadow-sm dark:border-indigo-400/30 dark:bg-indigo-500/10 dark:text-slate-200">
            <p className="font-semibold text-slate-900 dark:text-white">
              What should we call you?
            </p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                value={draftName}
                onChange={(event) => setDraftName(event.target.value)}
                placeholder="Your display name"
                className="w-full rounded-xl border border-white/30 bg-white/80 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-300 focus:outline-none dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
              />
              <button
                type="button"
                onClick={() => saveDisplayName(draftName)}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 dark:bg-white dark:text-slate-900"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </section>
      <InsightStrip lastUpdated={lastUpdated} />
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
