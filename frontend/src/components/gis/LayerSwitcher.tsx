import { Layers3 } from "lucide-react";
import { Badge } from "../common/Badge";
import type { GisLayerSummary } from "../../types/gis.types";

export function LayerSwitcher({
  layers,
  activeLayers,
  onToggleLayer,
}: {
  layers: GisLayerSummary[];
  activeLayers: Record<string, boolean>;
  onToggleLayer: (layerId: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
      <div className="mb-3 flex items-center gap-2">
        <Layers3 className="h-4 w-4 text-gov-700" />
        <h3 className="text-sm font-semibold text-slate-900">Layers</h3>
      </div>
      <div className="space-y-2">
        {layers.map((layer) => {
          const active = activeLayers[layer.id];
          return (
            <button
              key={layer.id}
              type="button"
              onClick={() => onToggleLayer(layer.id)}
              className={[
                "flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left transition",
                active ? "border-gov-300 bg-gov-50" : "border-slate-200 bg-white hover:bg-slate-50",
              ].join(" ")}
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">{layer.label}</p>
                <p className="mt-1 text-xs text-slate-500">{layer.description}</p>
              </div>
              <Badge tone={active ? "primary" : "neutral"}>{layer.count}</Badge>
            </button>
          );
        })}
      </div>
    </div>
  );
}
