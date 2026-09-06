import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { EmptyState } from "../../components/common/EmptyState";
import { PaymentStatus } from "../../components/compensation/PaymentStatus";
import { compensationService } from "../../services/compensation.service";
import { formatCurrencyInCrore } from "../../utils/formatters";
import { ReceiptText } from "lucide-react";

export function Payments() {
  const payments = compensationService.getPayments();

  return (
    <div className="space-y-4">
      <AppCard
        title="Payments"
        description="Disbursement queue, status, and verifier notes for the compensation phase."
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">Payment operations</Badge>
          <Badge tone="neutral">Local demo data</Badge>
        </div>
      </AppCard>

      {payments.length > 0 ? (
        <div className="grid gap-4">
          {payments.map((payment) => (
            <div key={payment.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {payment.parcelId}
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-900">{payment.beneficiary}</h2>
                  <p className="mt-2 text-sm text-slate-600">{payment.remarks}</p>
                </div>
                <PaymentStatus status={payment.status} />
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-4">
                <Info label="Amount" value={formatCurrencyInCrore(payment.amountLakh / 100)} />
                <Info label="Mode" value={payment.mode.replaceAll("_", " ")} />
                <Info label="Due date" value={payment.dueDate} />
                <Info label="Verifier" value={payment.verifiedBy} />
              </div>

              {payment.paidDate ? (
                <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                  Paid on {payment.paidDate}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No payments available"
          description="Create compensation cases to populate the payment queue."
          icon={ReceiptText}
        />
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
