"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";

type SignInFormProps = {
  showGitHub: boolean;
};

export function SignInForm({ showGitHub }: SignInFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      callbackUrl: "/",
    });
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl border border-white/10 bg-white/80 p-6 shadow-lg dark:bg-slate-950/70">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Welcome to SignalBoard
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
          Authenticate to explore the dashboard.
        </p>
      </div>

      {showGitHub && (
        <button
          type="button"
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:border-slate-700 dark:bg-white dark:text-slate-900"
        >
          <Github size={16} />
          Continue with GitHub
        </button>
      )}

      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        Seeded account
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      <form className="space-y-4" onSubmit={handleCredentialSignIn}>
        <div>
          <label
            htmlFor="sample-email"
            className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
          >
            Email
          </label>
          <input
            id="sample-email"
            name="email"
            type="email"
            defaultValue="ops@signalboard.local"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
        <div>
          <label
            htmlFor="sample-password"
            className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
          >
            Password
          </label>
          <input
            id="sample-password"
            name="password"
            type="password"
            defaultValue="signalboard"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
        <button
          type="submit"
          className={cn(
            "w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500",
            isLoading && "opacity-70"
          )}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Enter workspace"}
        </button>
      </form>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        Seeded access uses <strong>ops@signalboard.local</strong> / <strong>signalboard</strong>.
      </p>
    </div>
  );
}
