import { ArrowUpRight, CheckCircle2, AlertTriangle } from "lucide-react";
import { widgets } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusMap = {
  healthy: {
    label: "Healthy",
    icon: CheckCircle2,
    className: "text-emerald-500 bg-emerald-500/10",
  },
  attention: {
    label: "Attention",
    icon: AlertTriangle,
    className: "text-amber-500 bg-amber-500/10",
  },
};

export function WidgetGrid() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {widgets.map((widget) => {
        const status = statusMap[widget.status as keyof typeof statusMap];
        const StatusIcon = status.icon;
        return (
          <article
            key={widget.id}
            className="rounded-2xl border border-white/10 bg-white/80 p-5 shadow-sm transition hover:shadow-md dark:bg-slate-950/60"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {widget.title}
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                  {widget.value}
                </p>
              </div>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
                  status.className
                )}
              >
                <StatusIcon size={14} />
                {status.label}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
              {widget.description}
            </p>
            <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span>Momentum</span>
              <span className="flex items-center gap-1 text-emerald-500">
                {widget.trend}
                <ArrowUpRight size={14} />
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}
