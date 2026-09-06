import { AppCard } from "../common/AppCard";
import { Badge } from "../common/Badge";
import type { Parcel } from "../../types/parcel.types";

export function OwnershipPanel({ parcel }: { parcel: Parcel }) {
  return (
    <AppCard title="Ownership" description="Basic ownership and mutation status.">
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Info label="Owner" value={parcel.ownerName} />
          <Info label="Father / guardian" value={parcel.fatherName} />
          <Info label="Possession type" value={parcel.possessionType} />
          <Info label="Mutation status" value={parcel.mutationStatus} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="neutral">{parcel.linkedProjectCode}</Badge>
          <Badge tone={parcel.verificationStatus === "approved" ? "success" : "warning"}>
            {parcel.verificationStatus}
          </Badge>
        </div>
      </div>
    </AppCard>
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
