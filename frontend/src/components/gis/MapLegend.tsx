import { Compass } from "lucide-react";
import { Badge } from "../common/Badge";

const LEGEND = [
  { label: "Projects", tone: "primary" as const },
  { label: "Parcels", tone: "success" as const },
  { label: "Villages", tone: "warning" as const },
  { label: "Boundaries", tone: "neutral" as const },
];

export function MapLegend() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
      <div className="mb-3 flex items-center gap-2">
        <Compass className="h-4 w-4 text-gov-700" />
        <h3 className="text-sm font-semibold text-slate-900">Legend</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {LEGEND.map((item) => (
          <Badge key={item.label} tone={item.tone}>
            {item.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
