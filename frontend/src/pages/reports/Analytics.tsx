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
          <div
            key={row.label}
            className="rounded-[28px] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.94)_100%)] px-5 py-5 shadow-[0_12px_40px_rgba(15,29,47,0.05)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{row.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">{row.value}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{row.detail}</p>
            <Badge tone="neutral" className="mt-3">
              Demo trend
            </Badge>
          </div>
        ))}
      </div>
    </AppCard>
  );
}
