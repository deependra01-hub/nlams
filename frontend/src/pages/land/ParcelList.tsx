import { useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { InfoRibbon } from "../../components/common/InfoRibbon";
import { MetricCard } from "../../components/common/MetricCard";
import { useAuth } from "../../context/AuthContext";
import { useParcels } from "../../hooks/useParcels";
import { useFilterStore } from "../../store/filter.store";
import type { Parcel } from "../../types/parcel.types";
import { formatCurrencyInCrore, formatPercentage } from "../../utils/formatters";
import { getScopeTarget, matchesScope, matchesSearch } from "../../utils/globalFilters";
import { Landmark, MapPinned, ShieldAlert, Workflow } from "lucide-react";

export function ParcelList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { parcels, stats, setActiveParcelId } = useParcels();
  const { searchText, geographicScope } = useFilterStore();
  const scopeTarget = getScopeTarget(geographicScope, user?.role);
  const filteredParcels = parcels.filter((parcel) =>
    matchesScope(parcel, geographicScope, user?.role) &&
    matchesSearch(
      [
        parcel.id,
        parcel.surveyNo,
        parcel.khataNo,
        parcel.village,
        parcel.district,
        parcel.state,
        parcel.ownerName,
        parcel.fatherName,
        parcel.landUse,
        parcel.possessionType,
        parcel.status,
        parcel.verificationStatus,
        parcel.mutationStatus,
        parcel.linkedProjectCode,
        parcel.remarks,
        ...parcel.issues.map((issue) => issue.title),
      ],
      searchText,
    ),
  );
  const filteredStats = getParcelStats(filteredParcels);

  const openParcel = (parcelId: string) => {
    setActiveParcelId(parcelId);
    navigate(`/parcels/${parcelId}`);
  };

  return (
    <div className="space-y-7">
      <InfoRibbon
        title="Parcel ribbon"
        description="Registry health, verified count, and valuation details are exposed inline so the section stays airy."
        items={[
          { label: "Parcels", value: String(stats.totalParcels) },
          { label: "Visible", value: String(filteredParcels.length) },
          { label: "Area", value: `${filteredStats.totalAreaHectare.toFixed(2)} ha` },
          { label: "Scope", value: scopeTarget.label },
        ]}
      />

      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <AppCard title="Parcels" description="A quiet registry view. Open a parcel when you need more detail.">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Parcels" value={String(filteredStats.totalParcels)} detail={`Visible in ${scopeTarget.label}`} icon={Workflow} />
            <MetricCard label="Verified" value={String(filteredStats.verifiedParcels)} detail="Approved parcels" icon={Landmark} />
            <MetricCard label="Area" value={`${filteredStats.totalAreaHectare.toFixed(2)} ha`} detail="Filtered footprint" icon={MapPinned} />
            <MetricCard label="Objections" value={String(filteredStats.objectionCount)} detail="Items to review" icon={ShieldAlert} />
          </div>
        </AppCard>

        <AppCard title="Snapshot" description="Only the essentials.">
          <div className="grid gap-3">
            <MiniLine label="Average valuation" value={formatCurrencyInCrore(filteredStats.averageValuationLakh / 100)} />
            <MiniLine label="Verified ratio" value={formatPercentage(filteredStats.verifiedRatio)} />
            <MiniLine label="Header search" value={searchText.trim() || "All parcels"} />
          </div>
        </AppCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {filteredParcels.map((parcel) => (
        <article key={parcel.id} className="rounded-[28px] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.94)_100%)] p-6 shadow-[0_12px_40px_rgba(15,29,47,0.05)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{parcel.surveyNo}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">{parcel.ownerName}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{parcel.remarks}</p>
              </div>
              <Badge tone={parcel.status === "verified" ? "success" : parcel.status === "objection" ? "warning" : "neutral"}>
                {parcel.status}
              </Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="neutral">
                {parcel.village}, {parcel.district}
              </Badge>
              <Badge tone="neutral">{parcel.landUse}</Badge>
              <Badge tone="neutral">{parcel.possessionType}</Badge>
            </div>
            <div className="mt-5 flex flex-wrap justify-between gap-3">
              <p className="text-sm text-slate-500">{parcel.linkedProjectCode}</p>
              <Button onClick={() => openParcel(parcel.id)}>Open</Button>
            </div>
          </article>
        ))}
        {filteredParcels.length === 0 ? (
          <EmptyState
            title="No parcels match the header filters"
            description="Try a different search term or return the geographic scope to National."
            icon={MapPinned}
          />
        ) : null}
      </section>
    </div>
  );
}

function getParcelStats(parcels: Parcel[]) {
  const totalParcels = parcels.length;
  const verifiedParcels = parcels.filter((parcel) => parcel.verificationStatus === "approved").length;

  return {
    totalParcels,
    verifiedParcels,
    objectionCount: parcels.filter((parcel) => parcel.status === "objection").length,
    totalAreaHectare: parcels.reduce((sum, parcel) => sum + parcel.areaHectare, 0),
    averageValuationLakh:
      totalParcels === 0 ? 0 : Math.round(parcels.reduce((sum, parcel) => sum + parcel.valuationLakh, 0) / totalParcels),
    verifiedRatio: totalParcels === 0 ? 0 : Math.round((verifiedParcels / totalParcels) * 100),
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
