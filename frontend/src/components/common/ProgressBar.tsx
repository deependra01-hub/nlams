export function ProgressBar({
  value,
  label,
  tone = "primary",
}: {
  value: number;
  label: string;
  tone?: "primary" | "success" | "warning" | "danger";
}) {
  const toneClass = {
    primary: "bg-gov-700",
    success: "bg-emerald-600",
    warning: "bg-amber-600",
    danger: "bg-red-600",
  }[tone];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-semibold text-slate-900">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div className={`h-full rounded-full ${toneClass}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
