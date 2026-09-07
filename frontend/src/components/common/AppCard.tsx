import type { PropsWithChildren } from "react";

export function AppCard({
  title,
  description,
  children,
}: PropsWithChildren<{ title: string; description?: string }>) {
  return (
    <section className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_14px_50px_rgba(15,29,47,0.06)] backdrop-blur-xl">
      <div className="mb-5">
        <h2 className="text-[1.02rem] font-semibold tracking-tight text-slate-950">{title}</h2>
        {description ? <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
