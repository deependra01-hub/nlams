import type { PropsWithChildren } from "react";

export function AppCard({
  title,
  description,
  children,
}: PropsWithChildren<{ title: string; description?: string }>) {
  return (
    <section className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-[0_18px_60px_rgba(15,29,47,0.06)]">
      <div className="mb-4">
        <h2 className="text-[1.02rem] font-semibold tracking-tight text-slate-900">{title}</h2>
        {description ? <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
