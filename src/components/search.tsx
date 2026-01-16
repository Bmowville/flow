"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function SearchBar({ value, onChange, className }: SearchBarProps) {
  return (
    <div
      className={cn(
        "hidden max-w-md flex-1 items-center gap-2 rounded-full border border-white/20 bg-white/70 px-4 py-2 text-sm text-slate-500 shadow-sm md:flex dark:bg-slate-900/70 dark:text-slate-300",
        className
      )}
    >
      <Search size={16} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search tasks and activity..."
        className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
      />
    </div>
  );
}
