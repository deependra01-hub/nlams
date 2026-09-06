import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";

const rows = [
  { label: "Acquisition velocity", value: "78%", detail: "Ahead of the baseline by two points." },
  { label: "Compensation backlog", value: "12 items", detail: "Primarily bank verification related." },
  { label: "RR completion", value: "64%", detail: "House-site and livelihood packages pending." },
  { label: "Audit exceptions", value: "3", detail: "Needs follow-up on source sync." },
];

export function Analytics() {
  return (
    <AppCard title="Analytics" description="A concise performance view for the current NLAMS demo data.">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {rows.map((row) => (
          <div key={row.label} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{row.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{row.value}</p>
            <p className="mt-1 text-sm text-slate-600">{row.detail}</p>
            <Badge tone="neutral" className="mt-3">
              Demo trend
            </Badge>
          </div>
        ))}
      </div>
    </AppCard>
  );
}
