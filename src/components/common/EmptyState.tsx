import type { ComponentType } from "react";
import { Button } from "./Button";

export function EmptyState({
  title,
  description,
  icon: Icon,
  actionLabel,
}: {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  actionLabel?: string;
}) {
  return (
    <div className="nlams-muted-panel flex flex-col items-center gap-3 px-6 py-8 text-center">
      <div className="rounded-full bg-gov-50 p-3 text-gov-700">
        <Icon className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="max-w-sm text-sm text-slate-600">{description}</p>
      </div>
      {actionLabel ? <Button>{actionLabel}</Button> : null}
    </div>
  );
}
