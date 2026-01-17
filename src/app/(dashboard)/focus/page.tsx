"use client";

import { CalendarCheck2, Clock4 } from "lucide-react";
import { useAppShell } from "@/components/app-shell";
import { PriorityTasks } from "@/components/tasks";

export default function FocusPage() {
  const {
    state,
    filteredTasks,
    handleAddFocusBlock,
    handleCreateTask,
    handleToggleTask,
    handleDeleteTask,
  } = useAppShell();

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-white/10 bg-white/80 p-6 shadow-sm dark:bg-slate-950/60">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Focus blocks
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              Protect deep-work sessions
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
              Keep high-intent work sessions prioritized and reschedule conflicts early.
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
            <CalendarCheck2 size={20} />
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {state.focusBlocks.map((block) => (
            <div
              key={block.id}
              className="rounded-2xl border border-white/10 bg-white/70 p-4 shadow-sm dark:bg-slate-900/70"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-900 dark:text-white">{block.title}</p>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                  <Clock4 size={12} />
                  Focus
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {new Date(block.startAt).toLocaleString()} – {new Date(block.endAt).toLocaleString()}
              </p>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                {block.notes}
              </p>
            </div>
          ))}
          {state.focusBlocks.length === 0 && (
            <div className="text-sm text-slate-500 dark:text-slate-300">
              <p>
                No focus blocks scheduled yet. Protecting deep work keeps outreach and prep on track.
              </p>
              <button
                type="button"
                onClick={() => handleAddFocusBlock()}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white"
              >
                Add focus block
              </button>
            </div>
          )}
        </div>
      </section>

      <PriorityTasks
        tasks={filteredTasks}
        onCreate={handleCreateTask}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
