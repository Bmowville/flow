import { PlugZap } from "lucide-react";
import { integrations } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  Connected: "bg-emerald-500/10 text-emerald-500",
  "Needs review": "bg-amber-500/10 text-amber-500",
  Queued: "bg-slate-200/70 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

export function IntegrationsPanel() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/80 p-5 shadow-sm dark:bg-slate-950/60">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Integrations
        </h2>
        <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-slate-900">
          <PlugZap size={14} />
          Add
        </button>
      </div>
      <div className="mt-4 space-y-3">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/70 px-3 py-2 text-sm text-slate-700 shadow-sm dark:bg-slate-900/70 dark:text-slate-200"
          >
            <div>
              <p className="font-semibold">{integration.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {integration.detail}
              </p>
            </div>
            <span
              className={cn(
                "rounded-full px-2 py-1 text-xs font-semibold",
                statusStyles[integration.status]
              )}
            >
              {integration.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
