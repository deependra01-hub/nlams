import { useEffect } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { LandVerificationPanel } from "../../components/land/LandVerificationPanel";
import { OwnershipPanel } from "../../components/land/OwnershipPanel";
import { ParcelDetails as ParcelDetailsCard } from "../../components/land/ParcelDetails";
import { useParcels } from "../../hooks/useParcels";

export function ParcelDetails() {
  const { parcelId } = useParams();
  const { getParcelById, setActiveParcelId, activeParcel } = useParcels();
  const parcel = parcelId ? getParcelById(parcelId) : activeParcel;

  useEffect(() => {
    if (parcelId) {
      setActiveParcelId(parcelId);
    }
  }, [parcelId, setActiveParcelId]);

  if (!parcel) {
    return <Navigate to="/parcels" replace />;
  }

  return (
    <div className="space-y-7">
      <AppCard title="Parcel detail" description="Land registry, ownership, and verification context.">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{parcel.linkedProjectCode}</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">{parcel.surveyNo}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/parcels"
              className="inline-flex items-center justify-center gap-2 rounded-control border border-sky-100 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-gov-200 hover:bg-gov-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gov-500 focus-visible:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to parcels
            </Link>
            <Link
              to="/land-verification"
              className="inline-flex items-center justify-center gap-2 rounded-control bg-gov-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gov-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gov-500 focus-visible:ring-offset-2"
            >
              <ShieldCheck className="h-4 w-4" />
              Open verification
            </Link>
          </div>
        </div>
      </AppCard>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <ParcelDetailsCard parcel={parcel} />
        <OwnershipPanel parcel={parcel} />
      </div>

      <LandVerificationPanel parcel={parcel} />
    </div>
  );
}
