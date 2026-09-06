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
    <div className="space-y-4">
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
              status === item ? "border-gov-300 bg-gov-50 text-gov-800" : "border-slate-200 bg-white text-slate-600",
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
              priority === item ? "border-gov-300 bg-gov-50 text-gov-800" : "border-slate-200 bg-white text-slate-600",
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
            className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-gov-200 hover:bg-gov-50"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-slate-900">{item.subject}</p>
                <p className="mt-1 text-sm text-slate-600">{item.summary}</p>
              </div>
              <Badge tone={item.priority === "critical" ? "danger" : item.priority === "high" ? "warning" : "neutral"}>
                {item.priority}
              </Badge>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
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
    <div className="rounded-2xl bg-slate-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
