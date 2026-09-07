import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { HeadsUpDialog } from "../../components/common/HeadsUpDialog";
import { MetricCard } from "../../components/common/MetricCard";
import { gisService } from "../../services/gis.service";
import type { GisFeature } from "../../types/gis.types";
import { formatPercentage } from "../../utils/formatters";
import { MapPinned, Radar, ShieldAlert, SquareKanban } from "lucide-react";

export function GISExplorer() {
  const navigate = useNavigate();
  const features = gisService.getFeatures();
  const stats = gisService.getStats();
  const [activeFeatureId, setActiveFeatureId] = useState<string | null>(features[0]?.id ?? null);

  const activeFeature = useMemo(
    () => gisService.getFeatureById(activeFeatureId ?? ""),
    [activeFeatureId],
  );

  const launchers = features.slice(0, 4);

  const openLinkedPage = (feature: GisFeature) => {
    switch (feature.kind) {
      case "project":
        navigate("/projects");
        return;
      case "parcel":
        navigate("/parcels");
        return;
      case "village":
        navigate("/land-verification");
        return;
      case "boundary":
        navigate("/land-verification");
        return;
    }
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <AppCard title="GIS Explorer" description="A minimal spatial gateway. Open a record only when you need to inspect it.">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Features" value={String(stats.total)} detail="Spatial records" icon={Radar} />
            <MetricCard label="High risk" value={String(stats.highRisk)} detail="Needs review" icon={ShieldAlert} />
            <MetricCard label="Progress" value={formatPercentage(stats.averageProgress)} detail="Average across layers" icon={MapPinned} />
            <MetricCard label="Coverage" value={`${stats.projectCount}/${stats.parcelCount}`} detail="Projects / parcels" icon={SquareKanban} />
          </div>
        </AppCard>

        <AppCard title="Layers" description="The map layers stay quiet here; the detail is one click away.">
          <div className="grid gap-3">
            {gisService.getLayers().slice(0, 4).map((layer) => (
              <div key={layer.id} className="rounded-2xl bg-slate-50 px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{layer.label}</p>
                    <p className="mt-1 text-sm text-slate-600">{layer.description}</p>
                  </div>
                  <Badge tone="neutral">{layer.count}</Badge>
                </div>
              </div>
            ))}
          </div>
        </AppCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {launchers.map((feature) => (
          <article
            key={feature.id}
            className="rounded-[28px] border border-slate-100 bg-white p-5 shadow-[0_12px_40px_rgba(15,29,47,0.05)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{feature.subtitle}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">{feature.label}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{feature.description}</p>
              </div>
              <Badge tone={feature.risk >= 70 ? "warning" : "success"}>{feature.risk}/100</Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="neutral">{feature.kind}</Badge>
              <Badge tone="neutral">{feature.status}</Badge>
              <Badge tone="neutral">{feature.district}</Badge>
            </div>
            <div className="mt-5 flex flex-wrap justify-between gap-3">
              <p className="text-sm text-slate-500">{feature.state}</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => setActiveFeatureId(feature.id)}>
                  Heads up
                </Button>
                <Button onClick={() => openLinkedPage(feature)}>Open</Button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <HeadsUpDialog
        open={Boolean(activeFeature)}
        title={activeFeature?.label ?? ""}
        description={activeFeature?.description ?? ""}
        onClose={() => setActiveFeatureId(null)}
        primaryAction={activeFeature ? <Button onClick={() => openLinkedPage(activeFeature)}>Open linked page</Button> : null}
      >
        {activeFeature ? (
          <div className="grid gap-3 sm:grid-cols-3">
            <MiniLine label="Coordinates" value={`${activeFeature.lat.toFixed(3)}, ${activeFeature.lng.toFixed(3)}`} />
            <MiniLine label="Progress" value={formatPercentage(activeFeature.progress)} />
            <MiniLine label="Risk" value={`${activeFeature.risk}/100`} />
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
