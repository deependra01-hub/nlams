import { ArrowRight } from "lucide-react";
import { Button } from "../common/Button";
import { PaymentStatus } from "./PaymentStatus";
import type { CompensationCase } from "../../types/compensation.types";
import { formatCurrencyInCrore, formatDate } from "../../utils/formatters";

export function CompensationTable({
  cases,
  onOpen,
}: {
  cases: CompensationCase[];
  onOpen: (caseId: string) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-soft">
      <table className="min-w-full border-separate border-spacing-0">
        <thead className="bg-slate-50">
          <tr className="text-left text-xs uppercase tracking-[0.18em] text-slate-500">
            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Beneficiary</th>
            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Parcel</th>
            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Status</th>
            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Total</th>
            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Updated</th>
            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {cases.map((entry) => (
            <tr key={entry.id} className="border-b border-slate-100 last:border-b-0">
              <td className="px-4 py-4">
                <div className="font-semibold text-slate-900">{entry.ownerName}</div>
                <div className="mt-1 text-xs text-slate-500">
                  {entry.village}, {entry.district}
                </div>
              </td>
              <td className="px-4 py-4 text-slate-700">{entry.parcelId}</td>
              <td className="px-4 py-4">
                <PaymentStatus status={entry.status} />
              </td>
              <td className="px-4 py-4 text-slate-700">{formatCurrencyInCrore(entry.totalAmountLakh / 100)}</td>
              <td className="px-4 py-4 text-slate-700">{formatDate(entry.lastUpdated)}</td>
              <td className="px-4 py-4">
                <Button variant="secondary" leadingIcon={ArrowRight} onClick={() => onOpen(entry.id)}>
                  Open
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
