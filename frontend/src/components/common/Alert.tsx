import type { HTMLAttributes } from "react";

type AlertTone = "info" | "success" | "warning" | "danger";

const alertClasses: Record<AlertTone, string> = {
  info: "border-gov-200 bg-gov-50 text-gov-900",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  danger: "border-red-200 bg-red-50 text-red-900",
};

export function Alert({
  tone = "info",
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { tone?: AlertTone }) {
  return (
    <div
      role="status"
      className={[
        "nlams-surface px-4 py-3 text-sm leading-6",
        alertClasses[tone],
        className,
      ].join(" ")}
      {...props}
    />
  );
}
