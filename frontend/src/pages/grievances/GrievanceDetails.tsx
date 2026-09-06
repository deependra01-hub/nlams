import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { grievanceService } from "../../services/grievance.service";

export function GrievanceDetails() {
  const { grievanceId } = useParams();
  const grievance = useMemo(() => (grievanceId ? grievanceService.getGrievanceById(grievanceId) : null), [grievanceId]);

  if (!grievanceId) {
    return <Navigate to="/grievances" replace />;
  }

  if (!grievance) {
    return (
      <AppCard title="Grievance not found" description="The requested grievance is missing from the demo set.">
        <Link to="/grievances" className="inline-flex">
          <Button variant="secondary">Back to grievances</Button>
        </Link>
      </AppCard>
    );
  }

  return (
    <div className="space-y-4">
      <AppCard title={grievance.subject} description={grievance.summary}>
        <div className="flex flex-wrap gap-2">
          <Badge tone="neutral">{grievance.status}</Badge>
          <Badge tone={grievance.priority === "critical" ? "danger" : grievance.priority === "high" ? "warning" : "neutral"}>
            {grievance.priority}
          </Badge>
          <Badge tone="neutral">{grievance.category}</Badge>
        </div>
      </AppCard>

      <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <AppCard title="Case profile" description="Key routing and ownership details.">
          <div className="space-y-3">
            <Info label="Complainant" value={grievance.complainant} />
            <Info label="District" value={grievance.district} />
            <Info label="Assigned to" value={grievance.assignedTo} />
            <Info label="Project" value={grievance.projectId} />
          </div>
        </AppCard>

        <AppCard title="Updates" description="Chronological actions and notes.">
          <div className="space-y-3">
            {grievance.updates.map((update) => (
              <div key={update.id} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{update.author}</p>
                    <p className="mt-1 text-sm text-slate-600">{update.note}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.16em] text-slate-500">{update.date}</span>
                </div>
              </div>
            ))}
          </div>
        </AppCard>
      </div>

      <Link to="/grievances" className="inline-flex">
        <Button variant="secondary">Back to grievances</Button>
      </Link>
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
