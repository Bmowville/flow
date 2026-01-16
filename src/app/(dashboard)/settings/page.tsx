"use client";

import { RefreshCcw, Settings as SettingsIcon } from "lucide-react";
import { useAppShell } from "@/components/app-shell";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { state, handleWorkspaceSwitch, handleResetDemo } = useAppShell();

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-white/10 bg-white/80 p-6 shadow-sm dark:bg-slate-950/60">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Settings
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              Customize your SignalBoard workspace
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
              Manage workspaces, integrations, and reset demo data when you want a fresh walkthrough.
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/10 text-slate-700 dark:bg-white/10 dark:text-white">
            <SettingsIcon size={20} />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/80 p-6 shadow-sm dark:bg-slate-950/60">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Workspace access
        </h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
          Switch which workspace fuels your dashboards and data sets.
        </p>
        <div className="mt-4 space-y-3">
          {state.workspaces.map((workspace) => (
            <button
              key={workspace.id}
              type="button"
              onClick={() => handleWorkspaceSwitch(workspace.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/70 px-4 py-3 text-sm text-slate-700 shadow-sm dark:bg-slate-900/70 dark:text-slate-200",
                workspace.id === state.currentWorkspaceId &&
                  "border-indigo-400/70 bg-indigo-500/10 text-indigo-700 dark:text-indigo-200"
              )}
            >
              <span className="font-semibold">{workspace.name}</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                {workspace.role}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/80 p-6 shadow-sm dark:bg-slate-950/60">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Integrations</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
              Review which systems are currently connected.
            </p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            {state.integrations.length} connected
          </span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {state.integrations.map((integration) => (
            <div
              key={integration.id}
              className="rounded-2xl border border-white/10 bg-white/70 px-4 py-3 text-sm text-slate-700 shadow-sm dark:bg-slate-900/70 dark:text-slate-200"
            >
              <p className="font-semibold text-slate-900 dark:text-white">{integration.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{integration.status}</p>
            </div>
          ))}
          {state.integrations.length === 0 && (
            <p className="text-sm text-slate-500 dark:text-slate-300">
              No integrations connected yet.
            </p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/80 p-6 shadow-sm dark:bg-slate-950/60">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Reset demo data
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
              Restore the original sample workspace for fresh walkthroughs.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleResetDemo()}
            className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-xs font-semibold text-white"
          >
            <RefreshCcw size={14} />
            Reset demo
          </button>
        </div>
      </section>
    </div>
  );
}
