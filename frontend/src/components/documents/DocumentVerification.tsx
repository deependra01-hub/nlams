import { AppCard } from "../common/AppCard";
import { Badge } from "../common/Badge";
import type { DocumentRecord } from "../../types/document.types";
import { documentService } from "../../services/document.service";

export function DocumentVerification({ document }: { document: DocumentRecord }) {
  return (
    <AppCard title="Verification" description="Review status, reviewer, and sign-off history.">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={document.verification.status === "verified" ? "success" : document.verification.status === "rejected" ? "danger" : "warning"}>
            {documentService.getVerificationLabel(document.verification.status)}
          </Badge>
          <span className="text-sm text-slate-600">
            Reviewer: <strong className="font-semibold text-slate-900">{document.verification.reviewer}</strong>
          </span>
        </div>

        <p className="text-sm leading-6 text-slate-600">{document.verification.notes}</p>

        <div className="grid gap-3 sm:grid-cols-2">
          <Detail label="Last reviewed" value={document.verification.reviewedAt ?? "Pending"} />
          <Detail label="Owner department" value={document.ownerDepartment} />
        </div>
      </div>
    </AppCard>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
