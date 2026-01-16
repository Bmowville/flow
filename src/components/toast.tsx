"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type Toast = {
  id: string;
  title: string;
  type?: "success" | "info" | "warning";
};

const styles = {
  success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-100",
  info: "border-slate-500/40 bg-slate-500/10 text-slate-100",
  warning: "border-amber-500/40 bg-amber-500/10 text-amber-100",
};

export function ToastStack({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  return (
    <div className="fixed right-6 top-6 z-50 flex w-[280px] flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "flex items-start justify-between rounded-xl border px-3 py-2 text-sm shadow-lg backdrop-blur",
            styles[toast.type ?? "info"]
          )}
        >
          <span>{toast.title}</span>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="text-current/80 hover:text-current"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
