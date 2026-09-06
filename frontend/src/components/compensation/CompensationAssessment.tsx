import { AppCard } from "../common/AppCard";
import { Badge } from "../common/Badge";
import type { CompensationCase } from "../../types/compensation.types";
import { formatCurrencyInCrore } from "../../utils/formatters";

export function CompensationAssessment({ compensationCase }: { compensationCase: CompensationCase }) {
  return (
    <AppCard title="Assessment breakdown" description="Award, solatium, and interest calculation.">
      <div className="space-y-4">
        <div className="grid gap-3 md:grid-cols-3">
          <Stat label="Award" value={formatCurrencyInCrore(compensationCase.awardAmountLakh / 100)} />
          <Stat label="Solatium" value={formatCurrencyInCrore(compensationCase.solatiumLakh / 100)} />
          <Stat label="Interest" value={formatCurrencyInCrore(compensationCase.interestLakh / 100)} />
        </div>

        <div className="rounded-2xl bg-gov-50 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gov-700">Total payout</p>
          <p className="mt-2 text-3xl font-semibold text-gov-900">
            {formatCurrencyInCrore(compensationCase.totalAmountLakh / 100)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge tone={compensationCase.status === "disbursed" ? "success" : "warning"}>
            {compensationCase.status}
          </Badge>
          <Badge tone={compensationCase.bankStatus === "verified" ? "success" : "danger"}>
            bank {compensationCase.bankStatus}
          </Badge>
          <Badge tone="neutral">{compensationCase.paymentMode}</Badge>
        </div>
      </div>
    </AppCard>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}
