import { AppCard } from "../common/AppCard";
import type { AcquisitionCase } from "../../types/acquisition.types";

export function HearingPanel({ acquisitionCase }: { acquisitionCase: AcquisitionCase }) {
  return (
    <AppCard title="Hearing panel" description="Scheduled and completed hearing records.">
      <div className="space-y-3">
        {acquisitionCase.hearings.map((hearing) => (
          <div key={hearing.id} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{hearing.venue}</p>
                <p className="mt-1 text-sm text-slate-600">{hearing.remarks}</p>
              </div>
              <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                {hearing.outcome}
              </span>
            </div>
            <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
              <Meta label="Date" value={hearing.hearingDate} />
              <Meta label="Officer" value={hearing.officer} />
              <Meta label="Venue" value={hearing.venue} />
            </div>
          </div>
        ))}
      </div>
    </AppCard>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
