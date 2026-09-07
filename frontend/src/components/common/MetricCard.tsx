import type { ComponentType } from "react";

export function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  delta,
}: {
  label: string;
  value: string;
  detail?: string;
  delta?: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <article className="rounded-[28px] border border-white/70 bg-white/92 p-5 shadow-[0_10px_30px_rgba(15,29,47,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(15,29,47,0.08)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
          <p className="mt-2 text-[1.65rem] font-semibold tracking-tight text-slate-950">{value}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-2.5 text-gov-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {detail || delta ? (
        <div className="mt-3 flex items-center justify-between gap-3 text-xs">
          <p className="leading-5 text-slate-500">{detail}</p>
          {delta ? <p className="font-semibold text-emerald-700">{delta}</p> : null}
        </div>
      ) : null}
    </article>
  );
}
