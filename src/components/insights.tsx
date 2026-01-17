import { ShieldCheck, Target, Timer } from "lucide-react";

const insights = [
  {
    id: "insight-1",
    title: "Signal Score",
    value: "92",
    detail: "Recruiter-ready activity cadence",
    icon: ShieldCheck,
  },
  {
    id: "insight-2",
    title: "Focus Ratio",
    value: "78%",
    detail: "Protected deep-work blocks",
    icon: Timer,
  },
  {
    id: "insight-3",
    title: "Pipeline Coverage",
    value: "24 roles",
    detail: "12 active, 8 warm, 4 planned",
    icon: Target,
  },
];

type InsightStripProps = {
  lastUpdated?: Date;
};

export function InsightStrip({ lastUpdated }: InsightStripProps) {
  const updatedLabel = lastUpdated
    ? `Updated ${lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    : "Updated just now";

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {insights.map((insight) => {
        const Icon = insight.icon;
        return (
          <div
            key={insight.id}
            className="rounded-2xl border border-white/10 bg-white/80 p-4 shadow-sm dark:bg-slate-950/60"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {insight.title}
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                  {insight.value}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-500">
                <Icon size={18} />
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
              {insight.detail}
            </p>
            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
              {updatedLabel}
            </p>
          </div>
        );
      })}
    </section>
  );
}
