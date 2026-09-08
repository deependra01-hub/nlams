import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { HeadsUpDialog } from "../../components/common/HeadsUpDialog";
import { MetricCard } from "../../components/common/MetricCard";
import { LayerSwitcher } from "../../components/gis/LayerSwitcher";
import { MapControls } from "../../components/gis/MapControls";
import { MapLegend } from "../../components/gis/MapLegend";
import { MapView } from "../../components/gis/MapView";
import { gisService } from "../../services/gis.service";
import type { GisFeature, GisLayerId } from "../../types/gis.types";
import { formatPercentage } from "../../utils/formatters";
import { MapPinned, Radar, ShieldAlert, SquareKanban } from "lucide-react";

const DEFAULT_LAYERS: Record<GisLayerId, boolean> = {
  projects: true,
  parcels: true,
  villages: true,
  boundaries: true,
};

export function GISExplorer() {
  const navigate = useNavigate();
  const features = gisService.getFeatures();
  const layers = gisService.getLayers();
  const stats = gisService.getStats();
  const [activeFeatureId, setActiveFeatureId] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState(gisService.getMapCenter());
  const [activeLayers, setActiveLayers] = useState<Record<GisLayerId, boolean>>(DEFAULT_LAYERS);

  const visibleFeatures = useMemo(
    () => features.filter((feature) => activeLayers[feature.layer]),
    [activeLayers, features],
  );
  const activeFeature = activeFeatureId ? gisService.getFeatureById(activeFeatureId) : null;
  const highRiskFeature = useMemo(
    () => [...visibleFeatures].sort((left, right) => right.risk - left.risk)[0] ?? null,
    [visibleFeatures],
  );
  const spotlightFeatures = visibleFeatures.slice(0, 3);

  const openLinkedPage = (feature: GisFeature) => {
    switch (feature.kind) {
      case "project":
        navigate("/projects");
        return;
      case "parcel":
        navigate("/parcels");
        return;
      case "village":
      case "boundary":
        navigate("/land-verification");
        return;
    }
  };

  const focusFeature = (feature: GisFeature) => {
    setActiveFeatureId(feature.id);
    setMapCenter({ lat: feature.lat, lng: feature.lng });
  };

  const handleMapSelect = (featureId: string) => {
    const feature = gisService.getFeatureById(featureId);
    if (!feature) {
      return;
    }

    focusFeature(feature);
  };

  const resetView = () => {
    setActiveFeatureId(null);
    setMapCenter(gisService.getMapCenter());
    setActiveLayers({ ...DEFAULT_LAYERS });
  };

  const focusHighRisk = () => {
    if (!highRiskFeature) {
      return;
    }

    focusFeature(highRiskFeature);
  };

  const toggleLayer = (layerId: string) => {
    setActiveLayers((current) => ({
      ...current,
      [layerId]: !current[layerId as GisLayerId],
    }));
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <AppCard title="GIS Explorer" description="Visible map first, detail second. Keep the spatial layer calm and click-through only.">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Features" value={String(stats.total)} detail="Spatial records" icon={Radar} />
            <MetricCard label="High risk" value={String(stats.highRisk)} detail="Needs review" icon={ShieldAlert} />
            <MetricCard label="Progress" value={formatPercentage(stats.averageProgress)} detail="Average across layers" icon={MapPinned} />
            <MetricCard label="Coverage" value={`${stats.projectCount}/${stats.parcelCount}`} detail="Projects / parcels" icon={SquareKanban} />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <MapControls onResetView={resetView} onFocusHighRisk={focusHighRisk} />
          </div>
        </AppCard>

        <div className="grid gap-4">
          <AppCard title="Layer stack" description="Toggle the overlays without losing the map canvas.">
            <LayerSwitcher layers={layers} activeLayers={activeLayers} onToggleLayer={toggleLayer} />
          </AppCard>
          <MapLegend />
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <MapView center={mapCenter} features={visibleFeatures} activeLayers={activeLayers} onSelectFeature={handleMapSelect} />

        <div className="grid gap-4">
          <AppCard title="Feature spotlight" description="A compact list of the current records on the map.">
            <div className="space-y-3">
              {spotlightFeatures.map((feature) => (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => focusFeature(feature)}
                  className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-left transition hover:border-gov-200 hover:bg-white"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{feature.subtitle}</p>
                      <p className="mt-2 font-semibold text-blue-950">{feature.label}</p>
                      <p className="mt-1 text-sm leading-6 text-blue-700/75">{feature.description}</p>
                    </div>
                    <Badge tone={feature.risk >= 70 ? "warning" : "success"}>{feature.risk}/100</Badge>
                  </div>
                </button>
              ))}
            </div>
          </AppCard>

          <AppCard title="Quick exits" description="Jump to the linked record when the map needs a deeper view.">
            <div className="grid gap-3">
              {visibleFeatures.slice(0, 3).map((feature) => (
                <div key={feature.id} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-blue-950">{feature.label}</p>
                      <p className="mt-1 text-sm leading-6 text-blue-700/75">
                        {feature.kind} in {feature.district}, {feature.state}
                      </p>
                    </div>
                    <Badge tone="neutral">{feature.status}</Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="secondary" onClick={() => focusFeature(feature)}>
                      Heads up
                    </Button>
                    <Button onClick={() => openLinkedPage(feature)}>Open</Button>
                  </div>
                </div>
              ))}
            </div>
          </AppCard>
        </div>
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
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{label}</p>
      <p className="mt-2 text-sm font-semibold text-blue-950">{value}</p>
    </div>
  );
}
