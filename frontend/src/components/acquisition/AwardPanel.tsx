import { AppCard } from "../common/AppCard";
import type { AcquisitionCase } from "../../types/acquisition.types";

export function AwardPanel({ acquisitionCase }: { acquisitionCase: AcquisitionCase }) {
  return (
    <AppCard title="Award panel" description="Award notice and approval snapshot.">
      {acquisitionCase.award ? (
        <div className="space-y-3">
          <Detail label="Award no" value={acquisitionCase.award.awardNo} />
          <Detail label="Award date" value={acquisitionCase.award.awardDate} />
          <Detail label="Amount" value={`${acquisitionCase.award.amountLakh} lakh`} />
          <Detail label="Approved by" value={acquisitionCase.award.approvedBy} />
          <p className="text-sm leading-6 text-slate-600">{acquisitionCase.award.remarks}</p>
        </div>
      ) : (
        <p className="text-sm text-slate-600">No award has been issued for this case yet.</p>
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
