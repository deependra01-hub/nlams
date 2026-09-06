import { useState } from "react";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { LandVerificationPanel } from "../../components/land/LandVerificationPanel";
import { ParcelForm } from "../../components/land/ParcelForm";
import { OwnershipPanel } from "../../components/land/OwnershipPanel";
import { ParcelDetails as ParcelDetailsCard } from "../../components/land/ParcelDetails";
import { useParcels } from "../../hooks/useParcels";
import { Parcel } from "../../types/parcel.types";

export function LandVerification() {
  const { parcels, activeParcel, setActiveParcelId } = useParcels();
  const [selected, setSelected] = useState<Parcel | null>(activeParcel ?? parcels[0] ?? null);

  const handleSelect = (parcel: Parcel) => {
    setSelected(parcel);
    setActiveParcelId(parcel.id);
  };

  if (!selected) {
    return null;
  }

  return (
    <div className="space-y-4">
      <AppCard
        title="Land verification"
        description="A focused workspace for review, approval, and correction of parcel records."
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="primary">Verification workflow</Badge>
          <Badge tone="neutral">Demo phase</Badge>
        </div>
      </AppCard>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <AppCard title="Select parcel" description="Choose a parcel to review in the workflow.">
          <div className="space-y-3">
            {parcels.map((parcel) => (
              <button
                key={parcel.id}
                type="button"
                onClick={() => handleSelect(parcel)}
                className={[
                  "w-full rounded-2xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gov-500 focus-visible:ring-offset-2",
                  selected.id === parcel.id
                    ? "border-gov-300 bg-gov-50"
                    : "border-slate-200 bg-white hover:bg-slate-50",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{parcel.surveyNo}</p>
                    <p className="text-sm text-slate-500">
                      {parcel.ownerName} · {parcel.village}, {parcel.district}
                    </p>
                  </div>
                  <Badge tone={parcel.verificationStatus === "approved" ? "success" : "warning"}>
                    {parcel.verificationStatus}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </AppCard>

        <div className="grid gap-4">
          <ParcelDetailsCard parcel={selected} />
          <OwnershipPanel parcel={selected} />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_0.95fr]">
        <AppCard title="Verification decision" description="Capture the local review outcome.">
          <ParcelForm />
        </AppCard>
        <LandVerificationPanel parcel={selected} />
      </div>

      <div className="flex justify-end">
        <Button variant="secondary" onClick={() => handleSelect(selected)}>
          Refresh selected parcel
        </Button>
      </div>
    </div>
  );
}
