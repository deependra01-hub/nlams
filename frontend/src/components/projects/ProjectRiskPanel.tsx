import { AlertTriangle, ShieldCheck } from "lucide-react";
import { AppCard } from "../common/AppCard";
import { Badge } from "../common/Badge";
import type { Project } from "../../types/project.types";

export function ProjectRiskPanel({ project }: { project: Project }) {
  const isHighRisk = project.riskScore >= 70;

  return (
    <AppCard title="Risk Summary" description="Focused issues that need active review.">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Risk posture
            </p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              {isHighRisk ? "Elevated" : "Controlled"}
            </p>
          </div>
          <div className={["rounded-2xl p-3", isHighRisk ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"].join(" ")}>
            {isHighRisk ? <AlertTriangle className="h-6 w-6" /> : <ShieldCheck className="h-6 w-6" />}
          </div>
        </div>

        <div className="grid gap-3">
          {project.issues.map((issue) => (
            <div key={issue.id} className="rounded-2xl border border-slate-200 bg-white p-4">
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
              <p className="mt-2 text-sm text-slate-500">Responsible: {issue.owner}</p>
            </div>
          ))}
        </div>
      </div>
    </AppCard>
  );
}
