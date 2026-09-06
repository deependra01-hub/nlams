import { CheckCircle2, Circle, Clock3 } from "lucide-react";
import { AppCard } from "../common/AppCard";
import { Badge } from "../common/Badge";
import type { Project } from "../../types/project.types";
import { formatDate } from "../../utils/formatters";

const milestoneTone = {
  done: "success",
  current: "warning",
  upcoming: "neutral",
} as const;

export function ProjectTimeline({ project }: { project: Project }) {
  return (
    <AppCard title="Delivery Timeline" description="Key milestones for the current project phase.">
      <div className="space-y-4">
        {project.milestones.map((milestone, index) => {
          const Icon = milestone.status === "done" ? CheckCircle2 : milestone.status === "current" ? Clock3 : Circle;
          return (
            <div key={milestone.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-slate-50 p-2 text-gov-700">
                  <Icon className="h-4 w-4" />
                </div>
                {index < project.milestones.length - 1 ? (
                  <div className="mt-2 h-full w-px bg-slate-200" />
                ) : null}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-slate-900">{milestone.title}</p>
                  <Badge tone={milestoneTone[milestone.status]}>{milestone.status}</Badge>
                </div>
                <p className="mt-1 text-sm text-slate-500">{formatDate(milestone.date)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </AppCard>
  );
}
