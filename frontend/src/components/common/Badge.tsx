import type { HTMLAttributes } from "react";

type BadgeTone = "primary" | "success" | "warning" | "danger" | "neutral";

const badgeClasses: Record<BadgeTone, string> = {
  primary: "border-gov-200 bg-gov-50 text-gov-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  danger: "border-red-200 bg-red-50 text-red-800",
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
};

export function Badge({
  tone = "neutral",
  className = "",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
        badgeClasses[tone],
        className,
      ].join(" ")}
      {...props}
    />
  );
}
