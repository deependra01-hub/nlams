import { Link, useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { InfoRibbon } from "../../components/common/InfoRibbon";
import { MetricCard } from "../../components/common/MetricCard";
import { useAuth } from "../../context/AuthContext";
import { useCompensation } from "../../hooks/useCompensation";
import { compensationService } from "../../services/compensation.service";
import { useFilterStore } from "../../store/filter.store";
import type { CompensationCase } from "../../types/compensation.types";
import { formatCurrencyInCrore } from "../../utils/formatters";
import { getScopeTarget, matchesScope, matchesSearch } from "../../utils/globalFilters";
import { DollarSign, FileText, ShieldAlert, Wallet } from "lucide-react";

export function CompensationDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cases, summary, setActiveCaseId } = useCompensation();
  const { searchText, geographicScope } = useFilterStore();
  const payments = compensationService.getPayments();
  const scopeTarget = getScopeTarget(geographicScope, user?.role);
  const filteredCases = cases.filter((item) =>
    matchesScope(item, geographicScope, user?.role) &&
    matchesSearch(
      [
        item.id,
        item.parcelId,
        item.projectId,
        item.ownerName,
        item.village,
        item.district,
        item.state,
        item.status,
        item.reviewOwner,
        item.paymentMode,
        item.bankStatus,
        item.auditFlag,
      ],
      searchText,
    ),
  );
  const filteredSummary = getCompensationSummary(filteredCases);
  const visibleCaseIds = new Set(filteredCases.map((item) => item.parcelId));
  const filteredPayments = payments.filter((payment) => visibleCaseIds.has(payment.parcelId));

  const openCase = (caseId: string) => {
    setActiveCaseId(caseId);
    navigate("/compensation/payments");
  };

  return (
    <div className="space-y-7">
      <InfoRibbon
        title="Compensation ribbon"
        description="Cases, approvals, disbursements, and the current payout envelope are shown as a quiet inline ribbon."
        items={[
          { label: "Cases", value: String(summary.totalCases) },
          { label: "Visible", value: String(filteredSummary.totalCases) },
          { label: "Payout", value: formatCurrencyInCrore(filteredSummary.totalPayoutLakh / 100) },
          { label: "Scope", value: scopeTarget.label },
        ]}
      />

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <AppCard title="Compensation" description="A light review surface for awards and payouts.">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Cases" value={String(filteredSummary.totalCases)} detail={`Visible in ${scopeTarget.label}`} icon={FileText} />
            <MetricCard label="Approved" value={String(filteredSummary.approvedCases)} detail="Ready for payment" icon={ShieldAlert} />
            <MetricCard label="Disbursed" value={String(filteredSummary.disbursedCases)} detail="Paid and closed" icon={Wallet} />
            <MetricCard label="Payout" value={formatCurrencyInCrore(filteredSummary.totalPayoutLakh / 100)} detail="Filtered award value" icon={DollarSign} />
          </div>
        </AppCard>

        <AppCard title="Immediate view" description="Short signals only.">
          <div className="grid gap-3">
            <MiniLine label="Audit flags" value={String(filteredSummary.auditFlags)} />
            <MiniLine label="Pending payout" value={formatCurrencyInCrore(filteredSummary.pendingPayoutLakh / 100)} />
            <MiniLine label="Header search" value={searchText.trim() || "All cases"} />
          </div>
        </AppCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {filteredCases.map((item) => (
          <article key={item.id} className="rounded-[28px] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(245,249,255,0.94)_100%)] p-6 shadow-[0_12px_40px_rgba(15,29,47,0.05)]">
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
              <Button onClick={() => openCase(item.id)}>Open</Button>
            </div>
          </article>
        ))}
        {filteredCases.length === 0 ? (
          <EmptyState
            title="No compensation cases match the header filters"
            description="Try a broader search term or change the geographic scope."
            icon={FileText}
          />
        ) : null}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <AppCard title="Payment queue" description="Just the current list, no full ledger surface.">
          <div className="space-y-3">
            {filteredPayments.slice(0, 3).map((payment) => (
            <div key={payment.id} className="rounded-2xl border border-sky-100 bg-white/90 px-4 py-4">
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
            {filteredPayments.length === 0 ? (
              <p className="rounded-2xl border border-sky-100 bg-white/90 px-4 py-4 text-sm font-semibold text-blue-700">
                No payments match the current case filters.
              </p>
            ) : null}
          </div>
          <div className="mt-5">
            <Button variant="secondary" onClick={() => navigate("/compensation/payments")}>
              Open payments
            </Button>
          </div>
        </AppCard>

        <AppCard title="Related paths" description="One click to the next step.">
          <div className="grid gap-3">
            <Link to="/parcels" className="rounded-2xl border border-sky-100 bg-white/90 px-4 py-4 transition hover:border-violet-200 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(245,248,255,0.98))]">
              <p className="font-semibold text-slate-900">Parcel registry</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">Back to the parcel record supporting the case.</p>
            </Link>
            <Link to="/projects" className="rounded-2xl border border-sky-100 bg-white/90 px-4 py-4 transition hover:border-violet-200 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(245,248,255,0.98))]">
              <p className="font-semibold text-slate-900">Project portfolio</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">Return to the owning project.</p>
            </Link>
          </div>
        </AppCard>
      </section>

    </div>
  );
}

function getCompensationSummary(cases: CompensationCase[]) {
  return {
    totalCases: cases.length,
    approvedCases: cases.filter((entry) => entry.status === "approved").length,
    disbursedCases: cases.filter((entry) => entry.status === "disbursed").length,
    totalPayoutLakh: cases.reduce((sum, entry) => sum + entry.totalAmountLakh, 0),
    pendingPayoutLakh: cases.filter((entry) => entry.status !== "disbursed").reduce((sum, entry) => sum + entry.totalAmountLakh, 0),
    auditFlags: cases.filter((entry) => entry.auditFlag).length,
  };
}

function MiniLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-sky-100 bg-white/90 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{label}</p>
      <p className="mt-2 text-sm font-semibold text-blue-950">{value}</p>
    </div>
  );
}
