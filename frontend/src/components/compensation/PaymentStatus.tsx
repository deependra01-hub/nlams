import { Badge } from "../common/Badge";
import type { CompensationStatus } from "../../types/compensation.types";

const toneMap: Record<CompensationStatus, "primary" | "warning" | "success" | "neutral"> = {
  draft: "neutral",
  review: "warning",
  approved: "primary",
  disbursed: "success",
};

export function PaymentStatus({ status }: { status: CompensationStatus }) {
  const labelMap: Record<CompensationStatus, string> = {
    draft: "Draft",
    review: "In review",
    approved: "Approved",
    disbursed: "Disbursed",
  };

  return <Badge tone={toneMap[status]}>{labelMap[status]}</Badge>;
}
