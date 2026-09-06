import { CheckCircle2, ShieldAlert } from "lucide-react";
import { AppCard } from "../common/AppCard";
import { Badge } from "../common/Badge";
import type { CompensationCase } from "../../types/compensation.types";

const CHECKS = [
  "Bank account verified",
  "Award amount reconciled",
  "Review officer sign-off",
  "Payment queue scheduled",
];

export function CompensationVerification({ compensationCase }: { compensationCase: CompensationCase }) {
  return (
    <AppCard title="Verification checklist" description="Confirm the payout is ready to move forward.">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge tone={compensationCase.bankStatus === "verified" ? "success" : "warning"}>
            {compensationCase.bankStatus}
          </Badge>
          <Badge tone={compensationCase.auditFlag ? "primary" : "neutral"}>audit flag</Badge>
        </div>

        <div className="space-y-3">
          {CHECKS.map((item, index) => {
            const Icon = index === 0 ? CheckCircle2 : ShieldAlert;
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
