import { ShieldCheck, LogIn } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { Role } from "../../types/domain";

const ROLE_LABELS: Record<Role, string> = {
  central_admin: "Central Administrator",
  state_officer: "State Officer",
  district_officer: "District Officer",
  project_agency_officer: "Project Agency Officer",
  field_officer: "Field Officer",
  reviewer: "Reviewer",
};

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginAs, demoUsers } = useAuth();

  const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";

  const handleLogin = (role: Role) => {
    loginAs(role);
    navigate(from, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f5f7fb_0%,#eef3f9_100%)] px-4 py-12">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-panel">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="bg-[linear-gradient(180deg,#174ea6_0%,#0f2f63_100%)] p-8 text-white lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">NLAMS Access</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight">Sign in to the operations shell</h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-sky-50/90">
              This phase uses demo accounts so the team can review the navigation, guard flow, and
              layout without setting up external identity providers yet.
            </p>

            <div className="mt-8 grid gap-3">
              <FeatureRow title="Role-aware entry" description="Only authorized roles can access the guarded shell." />
              <FeatureRow title="Demo persistence" description="The chosen user is stored locally for repeatable walkthroughs." />
              <FeatureRow title="Fast review loop" description="Login, route guards, and unauthorized states are all in one place." />
            </div>
          </section>

          <section className="p-8 lg:p-10">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-gov-50 p-3 text-gov-700">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Demo access</p>
                <h2 className="text-2xl font-semibold text-slate-900">Choose a role</h2>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {demoUsers.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleLogin(user.role)}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left transition hover:border-gov-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gov-500 focus-visible:ring-offset-2"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{user.name}</p>
                    <p className="text-sm text-slate-500">{ROLE_LABELS[user.role]}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gov-700">
                    <LogIn className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    Enter
                  </div>
                </button>
              ))}
            </div>

            <p className="mt-6 text-xs leading-5 text-slate-500">
              If you refresh after signing in, the selected demo account stays active through local storage.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

function FeatureRow({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
      <p className="font-semibold text-white">{title}</p>
      <p className="mt-1 text-sm leading-6 text-sky-50/85">{description}</p>
    </div>
  );
}
