import { Badge } from "../common/Badge";
import { acquisitionService } from "../../services/acquisition.service";
import type { AcquisitionStage as AcquisitionStageType } from "../../types/acquisition.types";

const toneByStage: Record<AcquisitionStageType, "primary" | "success" | "warning" | "neutral"> = {
  survey: "neutral",
  hearing: "warning",
  award: "primary",
  disbursement: "success",
  possession: "success",
};

export function AcquisitionStage({ stage }: { stage: AcquisitionStageType }) {
  return <Badge tone={toneByStage[stage]}>{acquisitionService.getStageLabel(stage)}</Badge>;
}
