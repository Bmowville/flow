import { SignInForm } from "@/components/signin-form";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 px-6 py-16 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
            SignalBoard authentication
          </h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
            Recruiter-ready analytics with a demo workspace. Use GitHub OAuth or demo
            credentials to explore the dashboard.
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
