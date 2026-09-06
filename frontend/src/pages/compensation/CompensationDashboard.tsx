import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { MetricCard } from "../../components/common/MetricCard";
import { CompensationAssessment } from "../../components/compensation/CompensationAssessment";
import { CompensationTable } from "../../components/compensation/CompensationTable";
import { CompensationVerification } from "../../components/compensation/CompensationVerification";
import { PaymentStatus } from "../../components/compensation/PaymentStatus";
import { useCompensation } from "../../hooks/useCompensation";
import { compensationService } from "../../services/compensation.service";
import { formatCurrencyInCrore, formatPercentage } from "../../utils/formatters";
import { DollarSign, FileText, ShieldAlert, Wallet } from "lucide-react";

export function CompensationDashboard() {
  const navigate = useNavigate();
  const { cases, summary, setActiveCaseId } = useCompensation();
  const [selectedCaseId, setSelectedCaseId] = useState(cases[0]?.id ?? null);

  const selectedCase = useMemo(
    () => compensationService.getCaseById(selectedCaseId ?? "") ?? cases[0] ?? null,
    [cases, selectedCaseId],
  );

  const openCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setActiveCaseId(caseId);
  };

  const payments = compensationService.getPayments();

  return (
    <div className="space-y-4">
      <AppCard
        title="Compensation dashboard"
        description="Review compensation cases, audit flags, and payment readiness from one place."
      >
        <div className="mb-4 flex flex-wrap justify-end gap-2">
          <Button variant="secondary" onClick={() => navigate("/compensation/payments")}>
            Open payments
          </Button>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Cases" value={String(summary.totalCases)} detail="Tracked in the current queue." icon={FileText} />
          <MetricCard label="Approved" value={String(summary.approvedCases)} detail="Cases ready for payment." icon={ShieldAlert} />
          <MetricCard label="Disbursed" value={String(summary.disbursedCases)} detail="Successfully paid cases." icon={Wallet} />
          <MetricCard label="Payout total" value={formatCurrencyInCrore(summary.totalPayoutLakh / 100)} detail="Combined award value." icon={DollarSign} />
        </div>
      </AppCard>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <AppCard title="Current queue" description="Open the case review workflow.">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge tone="primary">Demo phase</Badge>
            <Badge tone="neutral">{formatPercentage(Math.round((summary.approvedCases / summary.totalCases) * 100))} approved</Badge>
          </div>

          {cases.length > 0 ? (
            <CompensationTable cases={cases} onOpen={openCase} />
          ) : (
            <EmptyState
              title="No compensation cases yet"
              description="Add data to the compensation queue to begin the workflow."
              icon={FileText}
            />
          )}
        </AppCard>

        {selectedCase ? (
          <div className="grid gap-4">
            <CompensationAssessment compensationCase={selectedCase} />
            <CompensationVerification compensationCase={selectedCase} />
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <AppCard title="Payment queue" description="Recent payouts and approvals.">
          <div className="space-y-3">
            {payments.map((payment) => (
              <div key={payment.id} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{payment.beneficiary}</p>
                    <p className="mt-1 text-sm text-slate-500">{payment.remarks}</p>
                  </div>
                  <PaymentStatus status={payment.status} />
                </div>
                <div className="mt-3 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                  <Row label="Amount" value={formatCurrencyInCrore(payment.amountLakh / 100)} />
                  <Row label="Due date" value={payment.dueDate} />
                  <Row label="Mode" value={payment.mode.replaceAll("_", " ")} />
                  <Row label="Verifier" value={payment.verifiedBy} />
                </div>
              </div>
            ))}
          </div>
        </AppCard>

        <AppCard title="Operational actions" description="Jump to the related records.">
          <div className="grid gap-3">
            <Link
              to="/compensation/payments"
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-gov-300 hover:bg-gov-50"
            >
              <p className="font-semibold text-slate-900">Open payments</p>
              <p className="mt-1 text-sm text-slate-600">Review the disbursement queue and payment status.</p>
            </Link>
            <Link
              to="/parcels"
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-gov-300 hover:bg-gov-50"
            >
              <p className="font-semibold text-slate-900">Open parcel registry</p>
              <p className="mt-1 text-sm text-slate-600">Link compensation records back to parcel verification.</p>
            </Link>
            <Link
              to="/projects"
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-gov-300 hover:bg-gov-50"
            >
              <p className="font-semibold text-slate-900">Open project portfolio</p>
              <p className="mt-1 text-sm text-slate-600">Review the project that owns the selected payout.</p>
            </Link>
          </div>
        </AppCard>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
