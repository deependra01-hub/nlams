import { AppCard } from "../common/AppCard";
import { Badge } from "../common/Badge";
import { ParcelStatus } from "./ParcelStatus";
import type { Parcel } from "../../types/parcel.types";
import { formatCurrencyInCrore, formatDate } from "../../utils/formatters";

export function ParcelDetails({ parcel }: { parcel: Parcel }) {
  return (
    <AppCard title="Parcel profile" description="Survey, valuation, and operational context.">
      <div className="grid gap-4 md:grid-cols-2">
        <Info label="Survey number" value={parcel.surveyNo} />
        <Info label="Khata number" value={parcel.khataNo} />
        <Info label="Land use" value={parcel.landUse} />
        <Info label="Area" value={`${parcel.areaHectare.toFixed(2)} ha`} />
        <Info label="Valuation" value={formatCurrencyInCrore(parcel.valuationLakh / 100)} />
        <Info label="Last updated" value={formatDate(parcel.lastUpdated)} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <ParcelStatus parcel={parcel} />
        <Badge tone="neutral">{parcel.state}</Badge>
        <Badge tone="neutral">{parcel.district}</Badge>
      </div>

      <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
        {parcel.remarks}
      </p>
    </AppCard>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
