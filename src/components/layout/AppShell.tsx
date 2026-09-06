import { Outlet } from "react-router-dom";

export function AppShell() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f5f7fb_0%,#eef3f9_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 py-4 md:px-6 lg:px-8">
        <header className="mb-4 nlams-surface-elevated px-5 py-4 backdrop-blur">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gov-700">
                NLAMS
              </p>
              <h1 className="text-xl font-semibold text-ink-900">
                National Land Acquisition & Management System
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Phase 2 foundation: semantic design system and reusable UI primitives.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-right">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                Build Status
              </p>
              <p className="text-sm font-semibold text-slate-900">Design System Ready</p>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
