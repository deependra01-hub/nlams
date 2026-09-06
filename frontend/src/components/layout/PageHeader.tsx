import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
}: {
  title: string;
  description: string;
  breadcrumbs: Array<{ label: string; to?: string }>;
  actions?: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-soft lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbs} />
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </section>
  );
}
