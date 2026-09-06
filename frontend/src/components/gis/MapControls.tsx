import { Focus, RotateCcw } from "lucide-react";
import { Button } from "../common/Button";

export function MapControls({
  onResetView,
  onFocusHighRisk,
}: {
  onResetView: () => void;
  onFocusHighRisk: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" leadingIcon={RotateCcw} onClick={onResetView}>
        Reset view
      </Button>
      <Button variant="ghost" leadingIcon={Focus} onClick={onFocusHighRisk}>
        Focus high risk
      </Button>
    </div>
  );
}
