"use client";

import Link from "next/link";
import { X } from "lucide-react";

type AboutDemoDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function AboutDemoDrawer({ open, onClose }: AboutDemoDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur">
      <div className="h-full w-full max-w-md overflow-y-auto bg-white/95 p-6 shadow-xl dark:bg-slate-950/95">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            About this demo
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-500 hover:text-slate-700 dark:text-slate-300"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
        <div className="mt-4 space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">Simulated vs. real</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Integrations are mocked to keep the demo fast.</li>
              <li>Data resets to a seeded workspace for walkthroughs.</li>
              <li>No real recruiter systems are connected.</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">Stack</p>
            <p className="mt-2">Next.js App Router, Prisma ORM, SQLite (local) / Postgres (prod).</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">Repo</p>
            <Link
              href="https://github.com/Bmowville/flow"
              className="mt-2 inline-flex text-indigo-600"
            >
              github.com/Bmowville/flow
            </Link>
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">Try this</p>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Set a display name and complete the quick tour.</li>
              <li>Switch to Recruiting Ops for pipeline insights.</li>
              <li>Load sample data to see Momentum + Focus in action.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
