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
    <article className="nlams-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
        </div>
        <div className="rounded-xl bg-gov-50 p-2 text-gov-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {detail || delta ? (
        <div className="mt-3 flex items-center justify-between gap-3 text-xs">
          <p className="text-slate-500">{detail}</p>
          {delta ? <p className="font-semibold text-emerald-700">{delta}</p> : null}
        </div>
      ) : null}
    </article>
  );
}
