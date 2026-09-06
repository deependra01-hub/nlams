import { AppCard } from "../common/AppCard";
import type { AcquisitionCase } from "../../types/acquisition.types";

export function ObjectionPanel({ acquisitionCase }: { acquisitionCase: AcquisitionCase }) {
  return (
    <AppCard title="Objection panel" description="Open and resolved objections.">
      <div className="space-y-3">
        {acquisitionCase.objections.map((objection) => (
          <div key={objection.id} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{objection.category}</p>
                <p className="mt-1 text-sm text-slate-600">{objection.notes}</p>
              </div>
              <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                {objection.status}
              </span>
            </div>
            <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
              <Meta label="Raised by" value={objection.raisedBy} />
              <Meta label="Raised at" value={objection.raisedAt} />
              <Meta label="Category" value={objection.category} />
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
