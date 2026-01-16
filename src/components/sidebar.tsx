import { Bolt, Briefcase, CalendarCheck2, LayoutGrid, LineChart, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorkspaceSummary } from "@/lib/types";

const navItems = [
  { label: "Overview", icon: LayoutGrid },
  { label: "Pipeline", icon: Briefcase },
  { label: "Momentum", icon: LineChart },
  { label: "Focus", icon: CalendarCheck2 },
  { label: "Automations", icon: Bolt },
  { label: "Settings", icon: Settings },
];

type SidebarProps = {
  workspaces: WorkspaceSummary[];
  currentWorkspaceId?: string | null;
  onSwitch: (workspaceId: string) => void;
  activeNav: string;
  onNavChange: (label: string) => void;
};

export function Sidebar({
  workspaces,
  currentWorkspaceId,
  onSwitch,
  activeNav,
  onNavChange,
}: SidebarProps) {
  return (
    <aside className="flex h-full flex-col gap-6 rounded-2xl border border-white/10 bg-white/80 p-5 shadow-sm dark:bg-slate-950/60">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Workspaces
        </p>
        <div className="mt-3 space-y-2">
          {workspaces.map((workspace) => (
            <button
              key={workspace.id}
              type="button"
              onClick={() => onSwitch(workspace.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/70 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-200 dark:bg-slate-900/70 dark:text-slate-200",
                workspace.id === currentWorkspaceId &&
                  "border-indigo-400/70 bg-indigo-500/10 text-indigo-700 dark:text-indigo-200"
              )}
            >
              <span>{workspace.name}</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                {workspace.role}
              </span>
            </button>
          ))}
        </div>
      </div>

      <nav className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Navigation
        </p>
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onNavChange(item.label)}
            className={cn(
              "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900/60",
              item.label === activeNav &&
                "bg-slate-900 text-white shadow-sm hover:bg-slate-900 hover:text-white dark:bg-white dark:text-slate-900"
            )}
          >
            <item.icon size={16} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
        <p className="text-sm font-semibold text-slate-800 dark:text-white">
          Portfolio-ready insight
        </p>
        <p className="mt-2">
          SignalBoard simulates AI-assisted prioritization, outreach sequencing, and
          focus scoring for high-velocity job searches.
        </p>
      </div>
    </aside>
  );
}
