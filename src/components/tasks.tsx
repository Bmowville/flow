import { CheckCircle2 } from "lucide-react";
import { tasks } from "@/lib/mock-data";

export function PriorityTasks() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/80 p-5 shadow-sm dark:bg-slate-950/60">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Priority tasks
        </h2>
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Today
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/70 p-3 text-sm text-slate-700 shadow-sm dark:bg-slate-900/70 dark:text-slate-200"
          >
            <CheckCircle2 size={18} className="text-emerald-500" />
            <div>
              <p className="font-semibold">{task.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {task.detail}
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-400">
                {task.due}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
