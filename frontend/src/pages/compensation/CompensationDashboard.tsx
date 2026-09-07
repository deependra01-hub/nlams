import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { HeadsUpDialog } from "../../components/common/HeadsUpDialog";
import { MetricCard } from "../../components/common/MetricCard";
import { useCompensation } from "../../hooks/useCompensation";
import { compensationService } from "../../services/compensation.service";
import { formatCurrencyInCrore } from "../../utils/formatters";
import { DollarSign, FileText, ShieldAlert, Wallet } from "lucide-react";

export function CompensationDashboard() {
  const navigate = useNavigate();
  const { cases, summary, setActiveCaseId } = useCompensation();
  const [activeCaseId, setActiveCaseIdLocal] = useState<string | null>(cases[0]?.id ?? null);

  const activeCase = activeCaseId ? compensationService.getCaseById(activeCaseId) : null;
  const payments = compensationService.getPayments();

  const openCase = (caseId: string) => {
    setActiveCaseId(caseId);
    navigate("/compensation/payments");
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <AppCard title="Compensation" description="A light review surface for awards and payouts.">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Cases" value={String(summary.totalCases)} detail="Current queue" icon={FileText} />
            <MetricCard label="Approved" value={String(summary.approvedCases)} detail="Ready for payment" icon={ShieldAlert} />
            <MetricCard label="Disbursed" value={String(summary.disbursedCases)} detail="Paid and closed" icon={Wallet} />
            <MetricCard label="Payout" value={formatCurrencyInCrore(summary.totalPayoutLakh / 100)} detail="Total award value" icon={DollarSign} />
          </div>
        </AppCard>

        <AppCard title="Immediate view" description="Short signals only.">
          <div className="grid gap-3">
            <MiniLine label="Audit flags" value={String(summary.auditFlags)} />
            <MiniLine label="Pending payout" value={formatCurrencyInCrore(summary.pendingPayoutLakh / 100)} />
            <MiniLine label="Open cases" value={String(cases.filter((item) => item.status !== "disbursed").length)} />
          </div>
        </AppCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {cases.map((item) => (
          <article key={item.id} className="rounded-[28px] border border-slate-100 bg-white p-5 shadow-[0_12px_40px_rgba(15,29,47,0.05)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.parcelId}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">{item.ownerName}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.auditFlag}</p>
              </div>
              <Badge tone={item.status === "approved" ? "success" : item.status === "disbursed" ? "primary" : "warning"}>
                {compensationService.getStatusLabel(item.status)}
              </Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="neutral">
                {item.district}, {item.state}
              </Badge>
              <Badge tone="neutral">{formatCurrencyInCrore(item.totalAmountLakh / 100)}</Badge>
            </div>
            <div className="mt-5 flex flex-wrap justify-between gap-3">
              <p className="text-sm text-slate-500">Updated {item.lastUpdated}</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => setActiveCaseIdLocal(item.id)}>
                  Heads up
                </Button>
                <Button onClick={() => openCase(item.id)}>Open</Button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <AppCard title="Payment queue" description="Just the current list, no full ledger surface.">
          <div className="space-y-3">
            {payments.slice(0, 3).map((payment) => (
              <div key={payment.id} className="rounded-2xl bg-slate-50 px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{payment.beneficiary}</p>
                    <p className="mt-1 text-sm text-slate-600">{payment.remarks}</p>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <Button variant="secondary" onClick={() => navigate("/compensation/payments")}>
              Open payments
            </Button>
          </div>
        </AppCard>

        <AppCard title="Related paths" description="One click to the next step.">
          <div className="grid gap-3">
            <Link to="/parcels" className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 transition hover:border-gov-200 hover:bg-white">
              <p className="font-semibold text-slate-900">Parcel registry</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">Back to the parcel record supporting the case.</p>
            </Link>
            <Link to="/projects" className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 transition hover:border-gov-200 hover:bg-white">
              <p className="font-semibold text-slate-900">Project portfolio</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">Return to the owning project.</p>
            </Link>
          </div>
        </AppCard>
      </section>

      <HeadsUpDialog
        open={Boolean(activeCase)}
        title={activeCase?.ownerName ?? ""}
        description={activeCase?.auditFlag ?? ""}
        onClose={() => setActiveCaseIdLocal(null)}
        primaryAction={activeCase ? <Button onClick={() => openCase(activeCase.id)}>Open case</Button> : null}
      >
        {activeCase ? (
          <div className="grid gap-3 sm:grid-cols-3">
            <MiniLine label="Total" value={formatCurrencyInCrore(activeCase.totalAmountLakh / 100)} />
            <MiniLine label="Mode" value={activeCase.paymentMode.replaceAll("_", " ")} />
            <MiniLine label="Review" value={activeCase.reviewOwner} />
          </div>
        ) : null}
      </HeadsUpDialog>
    </div>
  );
}

function MiniLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
