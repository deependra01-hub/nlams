import { Download, FileText, ScanSearch } from "lucide-react";
import { AppCard } from "../common/AppCard";
import { Badge } from "../common/Badge";
import type { DocumentRecord } from "../../types/document.types";
import { documentService } from "../../services/document.service";

export function DocumentViewer({ document }: { document: DocumentRecord }) {
  const relatedProject = documentService.getRelatedProject(document);
  const relatedParcel = documentService.getRelatedParcel(document);
  const relatedCompensation = documentService.getRelatedCompensation(document);
  const relatedFamily = documentService.getRelatedFamily(document);

  return (
    <AppCard title="Document viewer" description="Key metadata and linked records for the selected document.">
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-white p-3 text-gov-700 shadow-sm">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {documentService.getTypeLabel(document.type)}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">{document.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{document.summary}</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <InfoBox label="Reference" value={document.referenceNo} />
            <InfoBox label="Pages" value={String(document.pageCount)} />
            <InfoBox label="File size" value={`${document.fileSizeKb} KB`} />
            <InfoBox label="Source" value={document.source} />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {document.tags.map((tag) => (
              <Badge key={tag} tone="neutral">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <ScanSearch className="h-4 w-4 text-gov-700" />
              Linked records
            </div>
            <div className="mt-3 space-y-3 text-sm text-slate-600">
              <InfoLine label="Project" value={relatedProject?.name ?? "Not linked"} />
              <InfoLine label="Parcel" value={relatedParcel?.surveyNo ?? "Not linked"} />
              <InfoLine label="Compensation case" value={relatedCompensation?.id ?? "Not linked"} />
              <InfoLine label="R&R family" value={relatedFamily?.headName ?? "Not linked"} />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-gov-50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-gov-900">
              <Download className="h-4 w-4" />
              Export notes
            </div>
            <p className="mt-2 text-sm leading-6 text-gov-800">
              This phase uses local mock data, so the viewer focuses on traceability, review notes, and
              the records this file is tied to.
            </p>
          </div>
        </div>
      </div>
    </AppCard>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl bg-slate-50 px-3 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="text-right font-semibold text-slate-800">{value}</p>
    </div>
  );
}
