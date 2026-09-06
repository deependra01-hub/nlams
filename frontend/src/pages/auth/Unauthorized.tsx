import { ArrowLeft, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

export function Unauthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f5f7fb_0%,#eef3f9_100%)] px-4">
      <div className="w-full max-w-lg rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-panel">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900">Access restricted</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Your signed-in role does not have access to this route yet. Switch to a permitted demo
          account or return to the dashboard shell.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-gov-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gov-800 focus:outline-none focus:ring-2 focus:ring-gov-500 focus:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-gov-500 focus:ring-offset-2"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
