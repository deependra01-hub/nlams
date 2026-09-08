import { X } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "./Button";

export function HeadsUpDialog({
  open,
  title,
  description,
  onClose,
  children,
  primaryAction,
}: {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  children?: ReactNode;
  primaryAction?: ReactNode;
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 py-6 backdrop-blur-sm"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-2xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_28px_80px_rgba(15,29,47,0.18)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">Heads up</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-blue-950">{title}</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-blue-700/75">{description}</p>
          </div>
          <Button variant="ghost" className="shrink-0" onClick={onClose} leadingIcon={X} aria-label="Close dialog">
            Close
          </Button>
        </div>

        <div className="mt-6">{children}</div>

        {primaryAction ? <div className="mt-6 flex justify-end">{primaryAction}</div> : null}
      </div>
    </div>
  );
}
