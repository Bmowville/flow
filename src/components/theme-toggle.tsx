"use client";

import { Moon, Sun } from "lucide-react";
import { useThemeMode } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { mode, toggle } = useThemeMode();
  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-white dark:bg-slate-900/70 dark:text-slate-200",
        className
      )}
      aria-label="Toggle theme"
    >
      {mode === "dark" ? <Sun size={14} /> : <Moon size={14} />}
      {mode === "dark" ? "Light" : "Dark"}
    </button>
  );
}
