import { Badge } from "../common/Badge";
import type { Parcel } from "../../types/parcel.types";
import type { ComponentProps } from "react";

const statusTone: Record<Parcel["status"], ComponentProps<typeof Badge>["tone"]> = {
  mapped: "neutral",
  under_review: "warning",
  objection: "danger",
  verified: "success",
  ready_for_award: "primary",
};

export function ParcelStatus({ parcel }: { parcel: Parcel }) {
  return <Badge tone={statusTone[parcel.status]}>{parcel.status.replaceAll("_", " ")}</Badge>;
}
