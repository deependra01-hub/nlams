import { Clock3, FileText } from "lucide-react";
import { AppCard } from "../common/AppCard";
import type { DocumentRecord } from "../../types/document.types";

export function DocumentVersionHistory({ document }: { document: DocumentRecord }) {
  return (
    <AppCard title="Version history" description="Track the major revisions stored for the active document.">
      <div className="space-y-3">
        {document.versions.map((version) => (
          <div key={version.id} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gov-700" />
                  <p className="font-semibold text-slate-900">Version {version.version}</p>
                </div>
                <p className="mt-1 text-sm text-slate-600">{version.notes}</p>
              </div>
              <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                {version.sizeKb} KB
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
              <Meta label="File" value={version.fileName} />
              <Meta label="Uploaded by" value={version.uploadedBy} />
              <Meta label="Uploaded" value={version.uploadedAt} />
            </div>
          </div>
        ))}

        <div className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-600">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <Clock3 className="h-4 w-4 text-gov-700" />
            Retention note
          </div>
          <p className="mt-2 leading-6">
            Document histories are retained in this demo so the team can see how evidence changes over
            time across the acquisition, compensation, and rehabilitation workflows.
          </p>
        </div>
      </div>
    </AppCard>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-slate-800">{value}</p>
    </div>
  );
}
