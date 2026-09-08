import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { EmptyState } from "../../components/common/EmptyState";
import { MetricCard } from "../../components/common/MetricCard";
import { grievanceService } from "../../services/grievance.service";
import type { GrievancePriority, GrievanceStatus } from "../../types/grievance.types";
import { AlertTriangle, CheckCircle2, ListTodo, Siren } from "lucide-react";

export function GrievanceList() {
  const navigate = useNavigate();
  const grievances = grievanceService.getGrievances();
  const summary = grievanceService.getSummary();
  const [status, setStatus] = useState<GrievanceStatus | "all">("all");
  const [priority, setPriority] = useState<GrievancePriority | "all">("all");

  const filtered = useMemo(
    () =>
      grievances.filter((item) => {
        const statusMatches = status === "all" || item.status === status;
        const priorityMatches = priority === "all" || item.priority === priority;
        return statusMatches && priorityMatches;
      }),
    [grievances, priority, status],
  );

  return (
    <div className="space-y-7">
      <AppCard title="Grievances" description="Track complaints, reviews, and closure states.">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Total" value={String(summary.total)} detail="All logged grievances." icon={ListTodo} />
          <MetricCard label="Open" value={String(summary.open)} detail="New items awaiting review." icon={Siren} />
          <MetricCard label="Investigating" value={String(summary.investigating)} detail="Currently under review." icon={AlertTriangle} />
          <MetricCard label="Resolved" value={String(summary.resolved)} detail="Closed or resolved items." icon={CheckCircle2} />
        </div>
      </AppCard>

      <div className="flex flex-wrap gap-2">
        {(["all", "new", "investigating", "resolved", "closed"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setStatus(item)}
            className={[
              "rounded-full border px-3 py-2 text-sm font-semibold transition",
              status === item
                ? "border-gov-300 bg-gov-50 text-gov-800"
                : "border-sky-100 bg-white/90 text-slate-600 hover:border-gov-200 hover:bg-gov-50",
            ].join(" ")}
          >
            {item === "all" ? "All statuses" : grievanceService.getStatusLabel(item)}
          </button>
        ))}
        {(["all", "low", "medium", "high", "critical"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setPriority(item)}
            className={[
              "rounded-full border px-3 py-2 text-sm font-semibold transition",
              priority === item
                ? "border-gov-300 bg-gov-50 text-gov-800"
                : "border-sky-100 bg-white/90 text-slate-600 hover:border-gov-200 hover:bg-gov-50",
            ].join(" ")}
          >
            {item === "all" ? "All priorities" : item}
          </button>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => navigate(`/grievances/${item.id}`)}
            className="rounded-[28px] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.94)_100%)] p-6 text-left shadow-[0_12px_40px_rgba(15,29,47,0.05)] transition hover:-translate-y-0.5 hover:border-gov-200 hover:bg-white"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-slate-950">{item.subject}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>
              </div>
              <Badge tone={item.priority === "critical" ? "danger" : item.priority === "high" ? "warning" : "neutral"}>
                {item.priority}
              </Badge>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Info label="Complainant" value={item.complainant} />
              <Info label="Status" value={grievanceService.getStatusLabel(item.status)} />
              <Info label="Assigned to" value={item.assignedTo} />
              <Info label="Opened" value={item.openedAt} />
            </div>
          </button>
        ))}
        {filtered.length === 0 ? (
          <EmptyState
            title="No grievances match the current filters"
            description="Change the status or priority filter to view more items."
            icon={ListTodo}
          />
        ) : null}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-sky-100 bg-white/90 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{label}</p>
      <p className="mt-2 text-sm font-semibold text-blue-950">{value}</p>
    </div>
  );
}
