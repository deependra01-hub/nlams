import { AppCard } from "../common/AppCard";
import { Badge } from "../common/Badge";
import type { RRFamily } from "../../types/rr.types";

export function FamilyDetails({ family }: { family: RRFamily }) {
  return (
    <AppCard title="Family details" description="Household profile and rehabilitation context.">
      <div className="grid gap-4 md:grid-cols-2">
        <Info label="Head of family" value={family.headName} />
        <Info label="Members" value={String(family.members)} />
        <Info label="Livelihood" value={family.livelihoodSource} />
        <Info label="Housing option" value={family.housingOption} />
        <Info label="Counsellor" value={family.counsellor} />
        <Info label="Last visit" value={family.lastVisit} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="primary">{family.displacementType}</Badge>
        <Badge tone={family.status === "completed" ? "success" : family.status === "not_started" ? "neutral" : "warning"}>
          {family.status.replaceAll("_", " ")}
        </Badge>
      </div>
    </AppCard>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
