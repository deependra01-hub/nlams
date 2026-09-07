import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { HeadsUpDialog } from "../../components/common/HeadsUpDialog";
import { MetricCard } from "../../components/common/MetricCard";
import { useParcels } from "../../hooks/useParcels";
import { parcelService } from "../../services/parcel.service";
import { formatCurrencyInCrore, formatPercentage } from "../../utils/formatters";
import { Landmark, MapPinned, ShieldAlert, Workflow } from "lucide-react";

export function ParcelList() {
  const navigate = useNavigate();
  const { parcels, stats, setActiveParcelId } = useParcels();
  const [activeParcelId, setActiveParcelIdLocal] = useState<string | null>(parcels[0]?.id ?? null);

  const activeParcel = activeParcelId ? parcelService.getParcelById(activeParcelId) : null;

  const openParcel = (parcelId: string) => {
    setActiveParcelId(parcelId);
    navigate(`/parcels/${parcelId}`);
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <AppCard title="Parcels" description="A quiet registry view. Open a parcel when you need more detail.">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Parcels" value={String(stats.totalParcels)} detail="Current registry" icon={Workflow} />
            <MetricCard label="Verified" value={String(stats.verifiedParcels)} detail="Approved parcels" icon={Landmark} />
            <MetricCard label="Area" value={`${stats.totalAreaHectare.toFixed(2)} ha`} detail="Combined footprint" icon={MapPinned} />
            <MetricCard label="Objections" value={String(stats.objectionCount)} detail="Items to review" icon={ShieldAlert} />
          </div>
        </AppCard>

        <AppCard title="Snapshot" description="Only the essentials.">
          <div className="grid gap-3">
            <MiniLine label="Average valuation" value={formatCurrencyInCrore(stats.averageValuationLakh / 100)} />
            <MiniLine label="Verified ratio" value={formatPercentage(Math.round((stats.verifiedParcels / stats.totalParcels) * 100))} />
            <MiniLine label="Registry health" value="Phase-ready" />
          </div>
        </AppCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {parcels.map((parcel) => (
          <article key={parcel.id} className="rounded-[28px] border border-slate-100 bg-white p-5 shadow-[0_12px_40px_rgba(15,29,47,0.05)]">
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
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => setActiveParcelIdLocal(parcel.id)}>
                  Heads up
                </Button>
                <Button onClick={() => openParcel(parcel.id)}>Open</Button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <HeadsUpDialog
        open={Boolean(activeParcel)}
        title={activeParcel?.ownerName ?? ""}
        description={activeParcel?.remarks ?? ""}
        onClose={() => setActiveParcelIdLocal(null)}
        primaryAction={activeParcel ? <Button onClick={() => openParcel(activeParcel.id)}>Open parcel page</Button> : null}
      >
        {activeParcel ? (
          <div className="grid gap-3 sm:grid-cols-3">
            <MiniLine label="Valuation" value={formatCurrencyInCrore(activeParcel.valuationLakh / 100)} />
            <MiniLine label="Mutation" value={activeParcel.mutationStatus} />
            <MiniLine label="Status" value={activeParcel.status} />
          </div>
        ) : null}
      </HeadsUpDialog>
    </div>
  );
}

function MiniLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
