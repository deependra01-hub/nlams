import { AppCard } from "../common/AppCard";
import { Badge } from "../common/Badge";
import type { RRMilestone } from "../../types/rr.types";

const toneMap: Record<RRMilestone["status"], "primary" | "success" | "warning"> = {
  done: "success",
  current: "primary",
  upcoming: "warning",
};

export function RRPlan({ milestones }: { milestones: RRMilestone[] }) {
  return (
    <AppCard title="R&R plan" description="Milestones for the rehabilitation workflow.">
      <div className="space-y-3">
        {milestones.map((milestone) => (
          <div key={milestone.label} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-sm font-semibold text-slate-800">{milestone.label}</p>
            <Badge tone={toneMap[milestone.status]}>{milestone.status}</Badge>
          </div>
        ))}
      </div>
    </AppCard>
  );
}
