import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "hidden max-w-md flex-1 items-center gap-2 rounded-full border border-white/20 bg-white/70 px-4 py-2 text-sm text-slate-500 shadow-sm md:flex dark:bg-slate-900/70 dark:text-slate-300",
        className
      )}
    >
      <Search size={16} />
      <span>Search workspaces, alerts, and teammates...</span>
    </div>
  );
}
