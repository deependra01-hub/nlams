import { ProgressBar } from "../common/ProgressBar";
import { AppCard } from "../common/AppCard";
import type { RRFamily } from "../../types/rr.types";

const progressMap: Record<RRFamily["status"], number> = {
  not_started: 12,
  in_progress: 54,
  partially_completed: 78,
  completed: 100,
};

export function RRProgress({ family }: { family: RRFamily }) {
  return (
    <AppCard title="R&R progress" description="Current completion stage for the selected family.">
      <div className="space-y-4">
        <ProgressBar
          label="Rehabilitation progress"
          value={progressMap[family.status]}
          tone={family.status === "completed" ? "success" : family.status === "not_started" ? "warning" : "primary"}
        />
        <p className="text-sm leading-6 text-slate-600">{family.remarks}</p>
      </div>
    </AppCard>
  );
}
