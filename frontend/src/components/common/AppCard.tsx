import type { PropsWithChildren } from "react";

export function AppCard({
  title,
  description,
  children,
}: PropsWithChildren<{ title: string; description?: string }>) {
  return (
    <section className="rounded-[32px] border border-sky-100/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(244,249,255,0.92)_100%)] p-6 shadow-[0_14px_50px_rgba(15,29,47,0.06)] backdrop-blur-xl">
      <div className="mb-5">
        <h2 className="text-[1.02rem] font-semibold tracking-tight text-blue-950">{title}</h2>
        {description ? <p className="mt-1 max-w-3xl text-sm leading-6 text-blue-700/75">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
