import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { EmptyState } from "../../components/common/EmptyState";
import { MetricCard } from "../../components/common/MetricCard";
import { ParcelTable } from "../../components/land/ParcelTable";
import { Input } from "../../components/common/Input";
import { Select } from "../../components/common/Select";
import { useParcels } from "../../hooks/useParcels";
import type { ParcelStatus } from "../../types/parcel.types";
import { formatCurrencyInCrore, formatPercentage } from "../../utils/formatters";
import { Landmark, MapPinned, ShieldAlert, Workflow } from "lucide-react";

export function ParcelList() {
  const navigate = useNavigate();
  const { parcels, stats, setActiveParcelId } = useParcels();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ParcelStatus | "all">("all");

  const filteredParcels = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return parcels.filter((parcel) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [parcel.surveyNo, parcel.khataNo, parcel.ownerName, parcel.village, parcel.district, parcel.linkedProjectCode]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesStatus = status === "all" || parcel.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [parcels, query, status]);

  const openParcel = (parcelId: string) => {
    setActiveParcelId(parcelId);
    navigate(`/parcels/${parcelId}`);
  };

  return (
    <div className="space-y-4">
      <AppCard
        title="Parcel registry"
        description="Land records, verification state, and valuation context for the phase."
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Parcels" value={String(stats.totalParcels)} detail="Tracked in the current registry." icon={Workflow} />
          <MetricCard
            label="Verified parcels"
            value={String(stats.verifiedParcels)}
            detail="Approved for downstream steps."
            icon={Landmark}
          />
          <MetricCard
            label="Area"
            value={`${stats.totalAreaHectare.toFixed(2)} ha`}
            detail="Combined parcel footprint."
            icon={MapPinned}
          />
          <MetricCard
            label="Objections"
            value={String(stats.objectionCount)}
            detail="Parcels with active objections."
            icon={ShieldAlert}
          />
        </div>
      </AppCard>

      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft lg:grid-cols-[1.4fr_0.8fr_auto] lg:items-end">
        <Input
          id="parcel-search"
          label="Search parcels"
          placeholder="Search survey number, owner, village, or project code"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Select
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value as ParcelStatus | "all")}
        >
          <option value="all">All parcels</option>
          <option value="mapped">Mapped</option>
          <option value="under_review">Under review</option>
          <option value="objection">Objection</option>
          <option value="verified">Verified</option>
          <option value="ready_for_award">Ready for award</option>
        </Select>
        <div className="flex lg:justify-end">
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setStatus("all");
            }}
            className="rounded-control border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gov-500 focus-visible:ring-offset-2"
          >
            Reset
          </button>
        </div>
      </div>

      {filteredParcels.length > 0 ? (
        <ParcelTable parcels={filteredParcels} onOpen={openParcel} />
      ) : (
        <EmptyState
          title="No parcels match the current filters"
          description="Try a broader search or reset the selected status."
          icon={Workflow}
          actionLabel="Reset filters"
          onAction={() => {
            setQuery("");
            setStatus("all");
          }}
        />
      )}

      <div className="grid gap-4 xl:grid-cols-3">
        <Summary label="Average valuation" value={formatCurrencyInCrore(stats.averageValuationLakh / 100)} />
        <Summary label="Verified ratio" value={formatPercentage(Math.round((stats.verifiedParcels / stats.totalParcels) * 100))} />
        <Summary label="Registry health" value="Phase-ready" />
      </div>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}
