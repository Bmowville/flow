"use client";

import { CheckCircle2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Task } from "@/lib/types";

type PriorityTasksProps = {
  tasks: Task[];
  onCreate: (title: string, detail: string) => void;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
};

export function PriorityTasks({ tasks, onCreate, onToggle, onDelete }: PriorityTasksProps) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !detail.trim()) return;
    onCreate(title.trim(), detail.trim());
    setTitle("");
    setDetail("");
  };

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
      <form className="mt-4 space-y-2" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="New task title"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
        <input
          value={detail}
          onChange={(event) => setDetail(event.target.value)}
          placeholder="Short detail"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white"
        >
          <Plus size={14} />
          Add task
        </button>
      </form>
      <div className="mt-4 space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/70 p-3 text-sm text-slate-700 shadow-sm dark:bg-slate-900/70 dark:text-slate-200"
          >
            <button
              type="button"
              onClick={() => onToggle(task.id, !task.completed)}
              className="mt-1 text-emerald-500"
            >
              <CheckCircle2 size={18} />
            </button>
            <div className="flex-1">
              <p
                className={
                  task.completed
                    ? "font-semibold text-slate-400 line-through"
                    : "font-semibold"
                }
              >
                {task.title}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {task.detail}
              </p>
              {task.dueAt && (
                <p className="mt-1 text-xs font-semibold text-slate-400">
                  {new Date(task.dueAt).toLocaleString()}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              className="text-slate-400 hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
