import { Eye } from "lucide-react";
import { Button } from "../common/Button";
import { ParcelStatus } from "./ParcelStatus";
import type { Parcel } from "../../types/parcel.types";
import { formatDate, formatCurrencyInCrore } from "../../utils/formatters";

export function ParcelTable({
  parcels,
  onOpen,
}: {
  parcels: Parcel[];
  onOpen: (parcelId: string) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-soft">
      <table className="min-w-full border-separate border-spacing-0">
        <thead className="bg-slate-50">
          <tr className="text-left text-xs uppercase tracking-[0.18em] text-slate-500">
            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Parcel</th>
            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Location</th>
            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Status</th>
            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Area</th>
            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Valuation</th>
            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Updated</th>
            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {parcels.map((parcel) => (
            <tr key={parcel.id} className="border-b border-slate-100 last:border-b-0">
              <td className="px-4 py-4">
                <div className="font-semibold text-slate-900">{parcel.surveyNo}</div>
                <div className="mt-1 text-xs text-slate-500">
                  {parcel.ownerName} · {parcel.khataNo}
                </div>
              </td>
              <td className="px-4 py-4 text-slate-700">
                {parcel.village}, {parcel.district}
              </td>
              <td className="px-4 py-4">
                <ParcelStatus parcel={parcel} />
              </td>
              <td className="px-4 py-4 text-slate-700">{parcel.areaHectare.toFixed(2)} ha</td>
              <td className="px-4 py-4 text-slate-700">{formatCurrencyInCrore(parcel.valuationLakh / 100)}</td>
              <td className="px-4 py-4 text-slate-700">{formatDate(parcel.lastUpdated)}</td>
              <td className="px-4 py-4">
                <Button variant="secondary" leadingIcon={Eye} onClick={() => onOpen(parcel.id)}>
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
