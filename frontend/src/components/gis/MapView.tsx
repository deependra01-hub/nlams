import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { BoundaryLayer } from "./BoundaryLayer";
import { ParcelLayer } from "./ParcelLayer";
import { ProjectLayer } from "./ProjectLayer";
import { VillageLayer } from "./VillageLayer";
import type { GisFeature, GisLayerId } from "../../types/gis.types";

export function MapView({
  center,
  features,
  activeLayers,
  onSelectFeature,
}: {
  center: { lat: number; lng: number };
  features: GisFeature[];
  activeLayers: Record<GisLayerId, boolean>;
  onSelectFeature: (featureId: string) => void;
}) {
  const projectFeatures = features.filter((feature) => feature.layer === "projects");
  const parcelFeatures = features.filter((feature) => feature.layer === "parcels");
  const villageFeatures = features.filter((feature) => feature.layer === "villages");
  const boundaryFeatures = features.filter((feature) => feature.layer === "boundaries");

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-panel">
      <MapContainer
        key={`${center.lat.toFixed(4)}-${center.lng.toFixed(4)}`}
        center={[center.lat, center.lng]}
        zoom={5}
        scrollWheelZoom
        className="h-[560px] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {activeLayers.projects ? (
          <ProjectLayer features={projectFeatures} onSelect={onSelectFeature} />
        ) : null}
        {activeLayers.parcels ? (
          <ParcelLayer features={parcelFeatures} onSelect={onSelectFeature} />
        ) : null}
        {activeLayers.villages ? (
          <VillageLayer features={villageFeatures} onSelect={onSelectFeature} />
        ) : null}
        {activeLayers.boundaries ? (
          <BoundaryLayer features={boundaryFeatures} onSelect={onSelectFeature} />
        ) : null}
      </MapContainer>
    </div>
  );
}
