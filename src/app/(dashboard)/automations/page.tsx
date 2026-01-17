"use client";

import { Bolt, PauseCircle, PlayCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { useAppShell } from "@/components/app-shell";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  Enabled: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  Paused: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
};

export default function AutomationsPage() {
  const {
    state,
    handleCreateAutomation,
    handleToggleAutomation,
    handleDeleteAutomation,
  } = useAppShell();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) return;
    handleCreateAutomation(title.trim(), description.trim());
    setTitle("");
    setDescription("");
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-white/10 bg-white/80 p-6 shadow-sm dark:bg-slate-950/60">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Automations
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              Build lightweight workflow helpers
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
              Toggle and add automation rules for follow-ups, calendar protection, and status digests.
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
            <Bolt size={20} />
          </div>
        </div>
        <form className="mt-6 grid gap-3 md:grid-cols-[1fr_1.3fr_auto]" onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Automation name"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Description"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white"
          >
            Add automation
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/80 p-6 shadow-sm dark:bg-slate-950/60">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Active automations
          </h3>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            {state.automations.length} rules
          </p>
        </div>
        <div className="mt-4 space-y-3">
          {state.automations.map((automation) => (
            <div
              key={automation.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/70 px-4 py-3 text-sm text-slate-700 shadow-sm dark:bg-slate-900/70 dark:text-slate-200"
            >
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{automation.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {automation.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleAutomation(automation.id)}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
                    statusStyles[automation.status] ?? "bg-slate-200/70 text-slate-600"
                  )}
                >
                  {automation.status === "Enabled" ? <PauseCircle size={12} /> : <PlayCircle size={12} />}
                  {automation.status}
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteAutomation(automation.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-red-500"
                  aria-label="Delete automation"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {state.automations.length === 0 && (
            <div className="text-sm text-slate-500 dark:text-slate-300">
              <p>
                No automations yet. Rules help recruiters stay consistent with outreach and follow-ups.
              </p>
              <button
                type="button"
                onClick={() =>
                  handleCreateAutomation(
                    "Auto-followup reminders",
                    "Create a reminder 48h after a recruiter reply"
                  )
                }
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-4 py-2 text-xs font-semibold text-white"
              >
                Create sample automation
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
