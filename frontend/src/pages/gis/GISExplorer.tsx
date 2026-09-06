import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { MetricCard } from "../../components/common/MetricCard";
import { LayerSwitcher } from "../../components/gis/LayerSwitcher";
import { MapControls } from "../../components/gis/MapControls";
import { MapLegend } from "../../components/gis/MapLegend";
import { MapView } from "../../components/gis/MapView";
import { gisService } from "../../services/gis.service";
import { parcelService } from "../../services/parcel.service";
import { projectService } from "../../services/project.service";
import type { GisFeature, GisLayerId } from "../../types/gis.types";
import { formatCoordinates, riskTone } from "../../utils/mapUtils";
import { formatPercentage } from "../../utils/formatters";
import { MapPinned, Radar, ShieldAlert, SquareKanban } from "lucide-react";

export function GISExplorer() {
  const features = gisService.getFeatures();
  const layers = gisService.getLayers();
  const stats = gisService.getStats();
  const center = gisService.getMapCenter();
  const [activeLayers, setActiveLayers] = useState<Record<GisLayerId, boolean>>({
    projects: true,
    parcels: true,
    villages: true,
    boundaries: true,
  });
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(features[0]?.id ?? null);

  const selectedFeature = useMemo(
    () => gisService.getFeatureById(selectedFeatureId ?? ""),
    [selectedFeatureId],
  );

  const visibleFeatures = features.filter((feature) => activeLayers[feature.layer]);

  const focusHighRisk = () => {
    const highRiskFeature = visibleFeatures.find((feature) => feature.risk >= 70);
    if (highRiskFeature) {
      setSelectedFeatureId(highRiskFeature.id);
    }
  };

  const toggleLayer = (layerId: string) => {
    setActiveLayers((current) => ({
      ...current,
      [layerId]: !current[layerId as GisLayerId],
    }));
  };

  const handleSelectFeature = (featureId: string) => {
    setSelectedFeatureId(featureId);
  };

  return (
    <div className="space-y-4">
      <AppCard
        title="GIS Explorer"
        description="Spatial operations workspace for projects, parcels, villages, and route boundaries."
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Spatial features" value={String(stats.total)} detail="Tracked across active layers." icon={Radar} />
          <MetricCard
            label="High-risk items"
            value={String(stats.highRisk)}
            detail="Items with elevated spatial risk."
            icon={ShieldAlert}
          />
          <MetricCard
            label="Average progress"
            value={formatPercentage(stats.averageProgress)}
            detail="Average progress across GIS records."
            icon={MapPinned}
          />
          <MetricCard
            label="Projects / parcels"
            value={`${stats.projectCount} / ${stats.parcelCount}`}
            detail="Operationally relevant spatial objects."
            icon={SquareKanban}
          />
        </div>
      </AppCard>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <MapControls onResetView={() => setSelectedFeatureId(features[0]?.id ?? null)} onFocusHighRisk={focusHighRisk} />
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => setActiveLayers({ projects: true, parcels: true, villages: true, boundaries: true })}>
                Show all
              </Button>
              <Button variant="ghost" onClick={() => setActiveLayers({ projects: true, parcels: true, villages: false, boundaries: false })}>
                Focus ops
              </Button>
            </div>
          </div>

          <MapView
            center={center}
            features={features}
            activeLayers={activeLayers}
            onSelectFeature={handleSelectFeature}
          />

          <div className="grid gap-3 md:grid-cols-2">
            <LayerSwitcher layers={layers} activeLayers={activeLayers} onToggleLayer={toggleLayer} />
            <MapLegend />
          </div>
        </div>

        <div className="space-y-4">
          <AppCard title="Selection" description="Details for the currently selected spatial record.">
            {selectedFeature ? (
              <SelectionCard feature={selectedFeature} />
            ) : (
              <div className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-600">
                No feature is selected. Choose a point on the map or a row from the list.
              </div>
            )}
          </AppCard>

          <AppCard title="Featured records" description="Quick access to the demo spatial dataset.">
            <div className="space-y-3">
              {visibleFeatures.slice(0, 4).map((feature) => (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => setSelectedFeatureId(feature.id)}
                  className={[
                    "w-full rounded-2xl border px-4 py-3 text-left transition",
                    selectedFeatureId === feature.id
                      ? "border-gov-300 bg-gov-50"
                      : "border-slate-200 bg-white hover:bg-slate-50",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{feature.label}</p>
                      <p className="text-sm text-slate-500">{feature.subtitle}</p>
                    </div>
                    <Badge tone={riskTone(feature.risk)}>{feature.risk}/100</Badge>
                  </div>
                </button>
              ))}
            </div>
          </AppCard>
        </div>
      </div>

      <AppCard title="Spatial crosswalk" description="Link the GIS layer back into the operational pages.">
        <div className="grid gap-3 md:grid-cols-3">
          <CrossLink
            label="Projects"
            description="Open the portfolio view for the selected corridor."
            to="/projects"
          />
          <CrossLink
            label="Parcels"
            description="Review the parcel registry and verification workflow."
            to="/parcels"
          />
          <CrossLink
            label="Land verification"
            description="Move straight into the parcel approval workflow."
            to="/land-verification"
          />
        </div>
      </AppCard>
    </div>
  );
}

function SelectionCard({ feature }: { feature: GisFeature }) {
  const parcel = parcelService.getParcelById(feature.id);
  const project = projectService.getProjectById(feature.id);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={riskTone(feature.risk)}>{feature.status}</Badge>
        <Badge tone="neutral">{feature.kind}</Badge>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-slate-900">{feature.label}</h3>
        <p className="mt-1 text-sm text-slate-600">{feature.description}</p>
      </div>

      <div className="grid gap-3 rounded-2xl bg-slate-50 p-4">
        <InfoRow label="District" value={`${feature.district}, ${feature.state}`} />
        <InfoRow label="Coordinates" value={formatCoordinates(feature)} />
        <InfoRow label="Risk score" value={`${feature.risk}/100`} />
        <InfoRow label="Progress" value={formatPercentage(feature.progress)} />
      </div>

      {parcel ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Parcel match</p>
          <p className="mt-2 font-semibold text-slate-900">{parcel.surveyNo}</p>
          <p className="mt-1 text-sm text-slate-600">{parcel.ownerName}</p>
        </div>
      ) : null}

      {project ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Project match</p>
          <p className="mt-2 font-semibold text-slate-900">{project.name}</p>
          <p className="mt-1 text-sm text-slate-600">{project.code}</p>
        </div>
      ) : null}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function CrossLink({
  label,
  description,
  to,
}: {
  label: string;
  description: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-gov-300 hover:bg-gov-50"
    >
      <p className="font-semibold text-slate-900">{label}</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
    </Link>
  );
}
