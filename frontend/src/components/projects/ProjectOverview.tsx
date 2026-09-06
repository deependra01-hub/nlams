import { Building2, CalendarDays, Landmark, MapPinned, Wallet } from "lucide-react";
import { AppCard } from "../common/AppCard";
import { Badge } from "../common/Badge";
import { MetricCard } from "../common/MetricCard";
import type { Project } from "../../types/project.types";
import { formatCurrencyInCrore, formatDate, formatPercentage } from "../../utils/formatters";
import { projectService } from "../../services/project.service";

const statusTone: Record<Project["status"], "primary" | "success" | "warning" | "neutral"> = {
  planning: "neutral",
  survey: "warning",
  acquisition: "primary",
  award: "success",
  possession: "success",
};

export function ProjectOverview({ project }: { project: Project }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
      <AppCard title="Project Overview" description={project.description}>
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={statusTone[project.status]}>
              {projectService.getStatusLabel(project.status)}
            </Badge>
            <Badge tone="neutral">{project.code}</Badge>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard
              label="Progress"
              value={formatPercentage(project.progress)}
              detail="Tracked against the current phase plan."
              icon={Building2}
            />
            <MetricCard
              label="Risk"
              value={`${project.riskScore}/100`}
              detail="Higher values require closer monitoring."
              icon={Landmark}
            />
            <MetricCard
              label="Budget"
              value={formatCurrencyInCrore(project.budgetCrore)}
              detail="Estimated capital envelope."
              icon={Wallet}
            />
            <MetricCard
              label="Target date"
              value={formatDate(project.targetDate)}
              detail="Planned handoff milestone."
              icon={CalendarDays}
            />
          </div>

          <div className="grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2">
            <InfoRow label="State" value={project.state} />
            <InfoRow label="District" value={project.district} />
            <InfoRow label="Agency" value={project.agency} />
            <InfoRow label="Parcels" value={String(project.parcels)} />
            <InfoRow label="Affected families" value={String(project.affectedFamilies)} />
            <InfoRow label="Start date" value={formatDate(project.startDate)} />
          </div>
        </div>
      </AppCard>

      <AppCard title="Phase Health" description="A fast summary of operational load and review pressure.">
        <div className="space-y-4">
          <div className="rounded-2xl bg-gov-50 px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gov-700">
                  Current project load
                </p>
                <p className="mt-2 text-3xl font-semibold text-gov-900">
                  {formatPercentage(project.progress)}
                </p>
              </div>
              <MapPinned className="h-10 w-10 text-gov-700" />
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The project is on track for the current stage, with review pressure concentrated in
              the objection and compensation workstreams.
            </p>
          </div>

          <div className="space-y-3">
            {project.issues.map((issue) => (
              <div key={issue.id} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-900">{issue.title}</p>
                  <Badge
                    tone={
                      issue.severity === "critical"
                        ? "danger"
                        : issue.severity === "high"
                          ? "warning"
                          : issue.severity === "medium"
                            ? "neutral"
                            : "success"
                    }
                  >
                    {issue.severity}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-slate-500">Owner: {issue.owner}</p>
              </div>
            ))}
          </div>
        </div>
      </AppCard>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white px-3 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
