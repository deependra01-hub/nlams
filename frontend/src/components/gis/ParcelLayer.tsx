import { CircleMarker, Popup } from "react-leaflet";
import type { GisFeature } from "../../types/gis.types";
import { layerColor, formatCoordinates } from "../../utils/mapUtils";

export function ParcelLayer({
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
          radius={10}
          pathOptions={{ color: layerColor("parcels"), fillColor: layerColor("parcels"), fillOpacity: 0.55 }}
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
