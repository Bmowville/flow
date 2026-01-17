"use client";

import { useEffect, useMemo, useState } from "react";
import { Command } from "lucide-react";
import { cn } from "@/lib/utils";

export type CommandPaletteItem = {
  id: string;
  label: string;
  onSelect: () => void;
  keywords?: string[];
};

type CommandPaletteProps = {
  open: boolean;
  items: CommandPaletteItem[];
  onClose: () => void;
};

export function CommandPalette({ open, items, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) => {
      const haystack = [item.label, ...(item.keywords ?? [])].join(" ").toLowerCase();
      return haystack.includes(normalized);
    });
  }, [items, query]);

  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
      if (event.key === "Enter") {
        event.preventDefault();
        const selected = filtered[activeIndex];
        if (selected) {
          selected.onSelect();
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, activeIndex, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/60 px-4 py-20 backdrop-blur">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/90 p-4 shadow-xl dark:bg-slate-950/90">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/80 px-3 py-2 text-sm text-slate-600 shadow-sm dark:bg-slate-900/70 dark:text-slate-200">
          <Command size={16} />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search commands"
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
          />
          <span className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-400 dark:border-slate-700">
            Esc
          </span>
        </div>
        <div className="mt-3 max-h-64 space-y-1 overflow-y-auto">
          {filtered.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                item.onSelect();
                onClose();
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900/60",
                index === activeIndex &&
                  "bg-slate-100 text-slate-900 dark:bg-slate-900/80 dark:text-white"
              )}
            >
              {item.label}
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
              No matching commands.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
