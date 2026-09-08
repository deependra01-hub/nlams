import type { ComponentType } from "react";

type MetricTone = "blue" | "violet" | "cyan" | "emerald" | "amber" | "rose";

const toneClasses: Record<
  MetricTone,
  {
    card: string;
    label: string;
    value: string;
    icon: string;
    detail: string;
  }
> = {
  blue: {
    card: "border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(242,248,255,0.94)_100%)]",
    label: "text-blue-700",
    value: "text-blue-950",
    icon: "bg-sky-50 text-gov-700 ring-sky-100",
    detail: "text-blue-700/70",
  },
  violet: {
    card: "border-violet-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(246,243,255,0.94)_100%)]",
    label: "text-violet-700",
    value: "text-violet-950",
    icon: "bg-violet-50 text-violet-700 ring-violet-100",
    detail: "text-violet-700/70",
  },
  cyan: {
    card: "border-cyan-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(240,252,255,0.94)_100%)]",
    label: "text-cyan-700",
    value: "text-cyan-950",
    icon: "bg-cyan-50 text-cyan-700 ring-cyan-100",
    detail: "text-cyan-700/70",
  },
  emerald: {
    card: "border-emerald-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(240,250,245,0.94)_100%)]",
    label: "text-emerald-700",
    value: "text-emerald-950",
    icon: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    detail: "text-emerald-700/70",
  },
  amber: {
    card: "border-amber-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,249,235,0.94)_100%)]",
    label: "text-amber-700",
    value: "text-amber-950",
    icon: "bg-amber-50 text-amber-700 ring-amber-100",
    detail: "text-amber-700/70",
  },
  rose: {
    card: "border-rose-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,242,246,0.94)_100%)]",
    label: "text-rose-700",
    value: "text-rose-950",
    icon: "bg-rose-50 text-rose-700 ring-rose-100",
    detail: "text-rose-700/70",
  },
};

export function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  delta,
  tone = "blue",
}: {
  label: string;
  value: string;
  detail?: string;
  delta?: string;
  icon: ComponentType<{ className?: string }>;
  tone?: MetricTone;
}) {
  const classes = toneClasses[tone];

  return (
    <article className={`rounded-[28px] border p-6 shadow-[0_10px_30px_rgba(15,29,47,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(15,29,47,0.08)] ${classes.card}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${classes.label}`}>{label}</p>
          <p className={`mt-3 text-[1.75rem] font-semibold tracking-tight ${classes.value}`}>{value}</p>
        </div>
        <div className={`rounded-2xl p-2.5 ring-1 ${classes.icon}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {detail || delta ? (
        <div className="mt-4 flex items-center justify-between gap-3 text-xs">
          <p className={`leading-5 ${classes.detail}`}>{detail}</p>
          {delta ? <p className="font-semibold text-emerald-700">{delta}</p> : null}
        </div>
      ) : null}
    </article>
  );
}
