import { CheckCircle2, CircleDashed, ShieldAlert } from "lucide-react";
import { AppCard } from "../common/AppCard";
import { Badge } from "../common/Badge";
import type { Parcel } from "../../types/parcel.types";

const CHECKLIST = [
  "Field measurement reconciled with revenue map",
  "Owner identity verified against record copy",
  "Mutation status checked",
  "Objections reviewed or escalated",
];

export function LandVerificationPanel({ parcel }: { parcel: Parcel }) {
  return (
    <AppCard title="Verification checklist" description="Track the parcel review before award.">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={parcel.verificationStatus === "approved" ? "success" : "warning"}>
            {parcel.verificationStatus}
          </Badge>
          <Badge tone={parcel.issues.length > 0 ? "danger" : "success"}>
            {parcel.issues.length} issue{parcel.issues.length === 1 ? "" : "s"}
          </Badge>
        </div>

        <div className="space-y-3">
          {CHECKLIST.map((item, index) => {
            const Icon = index === 0 ? CheckCircle2 : index === CHECKLIST.length - 1 ? ShieldAlert : CircleDashed;
            return (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <Icon className="mt-0.5 h-5 w-5 text-gov-700" />
                <p className="text-sm leading-6 text-slate-700">{item}</p>
              </div>
            );
          })}
        </div>
      </div>
    </AppCard>
  );
}
