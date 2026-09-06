import type { PropsWithChildren } from "react";

export function MobileNavigation({
  open,
  onClose,
  children,
}: PropsWithChildren<{ open: boolean; onClose?: () => void }>) {
  return (
    <div
      className={[
        "fixed inset-0 z-50 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
      aria-hidden={!open}
    >
      <div
        className={[
          "absolute inset-0 bg-slate-950/40 transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        className={[
          "absolute left-0 top-0 h-full w-[min(88vw,20rem)] overflow-y-auto bg-white shadow-[0_20px_60px_rgba(15,29,47,0.22)] transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
