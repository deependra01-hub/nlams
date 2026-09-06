import { AppCard } from "../common/AppCard";
import { Badge } from "../common/Badge";
import type { RRFamily } from "../../types/rr.types";

export function DisplacementPanel({ family }: { family: RRFamily }) {
  return (
    <AppCard title="Displacement profile" description="Type of displacement and support status.">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">{family.displacementType}</Badge>
          <Badge tone={family.status === "completed" ? "success" : "warning"}>
            {family.status.replaceAll("_", " ")}
          </Badge>
        </div>

        <div className="rounded-2xl bg-slate-50 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Rehabilitation benefit
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            {family.rehabilitationBenefitLakh.toLocaleString("en-IN")} lakh
          </p>
        </div>

        <p className="text-sm leading-6 text-slate-600">{family.remarks}</p>
      </div>
    </AppCard>
  );
}
