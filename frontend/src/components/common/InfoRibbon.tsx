import type { ComponentType, ReactNode } from "react";
import { Sparkles, X } from "lucide-react";
import { Button } from "./Button";

type RibbonItem = {
  label: string;
  value: string;
};

type InfoRibbonProps = {
  title: string;
  description: string;
  items: RibbonItem[];
  icon?: ComponentType<{ className?: string }>;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
  children?: ReactNode;
};

export function InfoRibbon({
  title,
  description,
  items,
  icon: Icon = Sparkles,
  action,
  onDismiss,
  children,
}: InfoRibbonProps) {
  return (
    <section className="rounded-[28px] border border-sky-100 bg-[linear-gradient(135deg,rgba(245,248,255,0.98)_0%,rgba(236,243,255,0.95)_52%,rgba(247,250,255,0.98)_100%)] px-5 py-4 shadow-[0_12px_40px_rgba(15,29,47,0.05)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-white/85 p-3 text-violet-700 shadow-sm">
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">Ribbon update</p>
            <h3 className="mt-1 text-lg font-semibold tracking-tight text-blue-950">{title}</h3>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-blue-700/75">{description}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {action ? (
            <Button variant="secondary" className="border-violet-200 bg-white text-violet-800" onClick={action.onClick}>
              {action.label}
            </Button>
          ) : null}
          {onDismiss ? (
            <button
              type="button"
              onClick={onDismiss}
              className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/90 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-violet-200 hover:text-violet-800"
              aria-label={`Dismiss ${title}`}
            >
              <X className="h-4 w-4" />
              Dismiss
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-3 py-2 text-sm shadow-sm"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{item.label}</span>
            <span className="font-semibold text-blue-950">{item.value}</span>
          </div>
        ))}
      </div>

      {children ? <div className="mt-4">{children}</div> : null}
    </section>
  );
}
