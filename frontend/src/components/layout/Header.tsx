import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";

export function Header({
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
    <section className="flex flex-col gap-4 rounded-[28px] border border-white/70 bg-white/88 px-5 py-4 shadow-[0_12px_40px_rgba(15,29,47,0.06)] backdrop-blur-xl lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbs} />
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-blue-950">{title}</h2>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-blue-700/75">{description}</p>
        </div>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </section>
  );
}
