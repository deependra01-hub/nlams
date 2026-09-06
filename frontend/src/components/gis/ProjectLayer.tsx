import { CircleMarker, Popup } from "react-leaflet";
import type { GisFeature } from "../../types/gis.types";
import { formatCoordinates, layerColor } from "../../utils/mapUtils";

export function ProjectLayer({
  features,
  onSelect,
}: {
  features: GisFeature[];
  onSelect: (featureId: string) => void;
}) {
  return (
    <>
      {features.map((feature) => (
        <CircleMarker
          key={feature.id}
          center={[feature.lat, feature.lng]}
          radius={12}
          pathOptions={{ color: layerColor("projects"), fillColor: layerColor("projects"), fillOpacity: 0.55 }}
          eventHandlers={{ click: () => onSelect(feature.id) }}
        >
          <Popup>
            <div className="space-y-1">
              <p className="font-semibold text-slate-900">{feature.label}</p>
              <p className="text-sm text-slate-600">{feature.subtitle}</p>
              <p className="text-xs text-slate-500">{formatCoordinates(feature)}</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </>
  );
}
