import { Upload } from "lucide-react";
import { AppCard } from "../common/AppCard";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import type { DocumentRecord } from "../../types/document.types";

export function DocumentUploader({ document }: { document: DocumentRecord }) {
  return (
    <AppCard title="Upload workspace" description="Phase placeholder for controlled document upload and versioning.">
      <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-gov-200 bg-gov-50 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-white p-3 text-gov-700 shadow-sm">
            <Upload className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">Add a new version for {document.referenceNo}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This demo keeps uploads local and descriptive. In the next backend phase, this area can
              wire into the real file storage and audit trail.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="neutral">PDF upload</Badge>
          <Badge tone="neutral">Audit trail</Badge>
          <Badge tone="neutral">Checksum ready</Badge>
        </div>

        <Button>Prepare upload</Button>
      </div>
    </AppCard>
  );
}
