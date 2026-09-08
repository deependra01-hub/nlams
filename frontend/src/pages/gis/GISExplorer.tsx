import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { InfoRibbon } from "../../components/common/InfoRibbon";
import { MetricCard } from "../../components/common/MetricCard";
import { LayerSwitcher } from "../../components/gis/LayerSwitcher";
import { MapControls } from "../../components/gis/MapControls";
import { MapLegend } from "../../components/gis/MapLegend";
import { MapView } from "../../components/gis/MapView";
import { useAuth } from "../../context/AuthContext";
import { gisService } from "../../services/gis.service";
import { useFilterStore } from "../../store/filter.store";
import type { GisFeature, GisLayerId } from "../../types/gis.types";
import { formatPercentage } from "../../utils/formatters";
import { getScopeTarget, matchesScope, matchesSearch } from "../../utils/globalFilters";
import { MapPinned, Radar, ShieldAlert, SquareKanban } from "lucide-react";

const DEFAULT_LAYERS: Record<GisLayerId, boolean> = {
  projects: true,
  parcels: true,
  villages: true,
  boundaries: true,
};

export function GISExplorer() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const features = gisService.getFeatures();
  const { searchText, geographicScope } = useFilterStore();
  const scopeTarget = getScopeTarget(geographicScope, user?.role);
  const [mapCenter, setMapCenter] = useState(gisService.getMapCenter());
  const [activeLayers, setActiveLayers] = useState<Record<GisLayerId, boolean>>(DEFAULT_LAYERS);
  const scopedFeatures = useMemo(
    () =>
      features.filter((feature) =>
        matchesScope(feature, geographicScope, user?.role) &&
        matchesSearch(
          [
            feature.id,
            feature.kind,
            feature.label,
            feature.subtitle,
            feature.description,
            feature.district,
            feature.state,
            feature.status,
            feature.layer,
          ],
          searchText,
        ),
      ),
    [features, geographicScope, searchText, user?.role],
  );
  const layers = useMemo(
    () =>
      gisService.getLayers().map((layer) => ({
        ...layer,
        count: scopedFeatures.filter((feature) => feature.layer === layer.id).length,
      })),
    [scopedFeatures],
  );
  const stats = useMemo(() => getGisStats(scopedFeatures), [scopedFeatures]);

  const visibleFeatures = useMemo(
    () => scopedFeatures.filter((feature) => activeLayers[feature.layer]),
    [activeLayers, scopedFeatures],
  );
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
      <InfoRibbon
        title="GIS ribbon"
        description="Feature counts, risk, and coverage stay in a slim ribbon so the live map remains the focus."
        items={[
          { label: "Features", value: String(stats.total) },
          { label: "High risk", value: String(stats.highRisk) },
          { label: "Progress", value: formatPercentage(stats.averageProgress) },
          { label: "Scope", value: scopeTarget.label },
        ]}
      />

      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <AppCard title="GIS Explorer" description="Visible map first, detail second. Keep the spatial layer calm and click-through only.">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Features" value={String(stats.total)} detail={`Visible in ${scopeTarget.label}`} icon={Radar} />
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
                className="w-full rounded-[28px] border border-sky-100 bg-white/90 px-4 py-4 text-left transition hover:border-gov-200 hover:bg-gov-50"
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
              {spotlightFeatures.length === 0 ? (
                <p className="rounded-2xl border border-sky-100 bg-white/90 px-4 py-4 text-sm font-semibold text-blue-700">
                  No map features match the header search and scope.
                </p>
              ) : null}
            </div>
          </AppCard>

          <AppCard title="Quick exits" description="Jump to the linked record when the map needs a deeper view.">
            <div className="grid gap-3">
              {visibleFeatures.slice(0, 3).map((feature) => (
                <div key={feature.id} className="rounded-[28px] border border-sky-100 bg-white/90 px-4 py-4">
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
                    <Button onClick={() => openLinkedPage(feature)}>Open</Button>
                  </div>
                </div>
              ))}
            </div>
          </AppCard>
        </div>
      </section>
    </div>
  );
}

function getGisStats(features: GisFeature[]) {
  const total = features.length;

  return {
    total,
    highRisk: features.filter((feature) => feature.risk >= 70).length,
    averageProgress: total === 0 ? 0 : Math.round(features.reduce((sum, feature) => sum + feature.progress, 0) / total),
    projectCount: features.filter((feature) => feature.kind === "project").length,
    parcelCount: features.filter((feature) => feature.kind === "parcel").length,
  };
}
