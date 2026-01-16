"use client";

import { Bell, CircleUserRound, LogOut, Sparkles } from "lucide-react";
import { signOut } from "next-auth/react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchBar } from "@/components/search";

type HeaderProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  userName?: string | null;
};

export function Header({ searchQuery, onSearchChange, userName }: HeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/80 px-6 py-4 shadow-sm backdrop-blur dark:bg-slate-950/60">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-white">
          <Sparkles size={18} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            SignalBoard
          </p>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
            Recruiter-ready productivity cockpit
          </h1>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/80 text-slate-700 shadow-sm transition hover:bg-white dark:bg-slate-900/70 dark:text-slate-200">
          <Bell size={16} />
        </button>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/signin" })}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm dark:bg-white dark:text-slate-900"
        >
          <CircleUserRound size={16} />
          {userName ?? "Account"}
          <LogOut size={14} />
        </button>
      </div>
    </header>
  );
}
