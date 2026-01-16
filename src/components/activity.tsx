import { formatRelativeTime } from "@/lib/utils";
import type { Activity } from "@/lib/types";

type ActivityTimelineProps = {
  activity: Activity[];
};

export function ActivityTimeline({ activity }: ActivityTimelineProps) {
  const toLabel = (value: string) => value.replace(/_/g, " ");
  return (
    <section className="rounded-2xl border border-white/10 bg-white/80 p-5 shadow-sm dark:bg-slate-950/60">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Activity timeline
        </h2>
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Live
        </span>
      </div>
      <div className="mt-4 space-y-4">
        {activity.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                  {item.title}
                </p>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-900 dark:text-slate-300">
                  {toLabel(item.type)}
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                {item.detail}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-400">
                {formatRelativeTime(new Date(item.createdAt))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
