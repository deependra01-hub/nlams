import { AppCard } from "../common/AppCard";
import type { AcquisitionCase } from "../../types/acquisition.types";

export function PossessionPanel({ acquisitionCase }: { acquisitionCase: AcquisitionCase }) {
  return (
    <AppCard title="Possession panel" description="Handover readiness and schedule.">
      {acquisitionCase.possession ? (
        <div className="space-y-3">
          <Detail label="Status" value={acquisitionCase.possession.status} />
          <Detail label="Handover officer" value={acquisitionCase.possession.handoverOfficer} />
          <Detail label="Possession date" value={acquisitionCase.possession.possessionDate ?? "Pending"} />
          <p className="text-sm leading-6 text-slate-600">{acquisitionCase.possession.notes}</p>
        </div>
      ) : (
        <p className="text-sm text-slate-600">Possession has not been scheduled yet for this case.</p>
      )}
    </AppCard>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
