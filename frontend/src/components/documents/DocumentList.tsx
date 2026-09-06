import { ArrowRight, FileText, Link2 } from "lucide-react";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { documentService } from "../../services/document.service";
import type { DocumentRecord } from "../../types/document.types";
import { DocumentStatus } from "./DocumentStatus";

export function DocumentList({
  documents,
  onOpen,
}: {
  documents: DocumentRecord[];
  onOpen: (documentId: string) => void;
}) {
  return (
    <div className="grid gap-4">
      {documents.map((document) => (
        <article
          key={document.id}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-panel"
        >
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="neutral">{documentService.getTypeLabel(document.type)}</Badge>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {document.referenceNo}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{document.title}</h3>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">{document.summary}</p>
              </div>
              <DocumentStatus
                status={document.status}
                verificationStatus={document.verification.status}
              />
            </div>

            <div className="grid min-w-[250px] gap-2 rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-600">
              <MetaRow label="Owner" value={document.ownerDepartment} />
              <MetaRow label="File" value={`${document.fileName} · ${document.fileSizeKb} KB`} />
              <MetaRow label="Versions" value={String(document.versionCount)} />
              <MetaRow label="Updated" value={document.lastReviewedAt ?? document.uploadedAt} />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {document.tags.map((tag) => (
                <Badge key={tag} tone="neutral">
                  {tag}
                </Badge>
              ))}
            </div>
            <Button variant="secondary" leadingIcon={ArrowRight} onClick={() => onOpen(document.id)}>
              Open document
            </Button>
          </div>
        </article>
      ))}

      {documents.length === 0 ? (
        <div className="nlams-muted-panel flex flex-col items-center gap-3 px-6 py-8 text-center">
          <div className="rounded-full bg-gov-50 p-3 text-gov-700">
            <FileText className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-slate-900">No documents match the current filters</h3>
            <p className="max-w-sm text-sm text-slate-600">
              Try widening the search or switch to a different document status.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <Link2 className="mt-0.5 h-4 w-4 text-gov-700" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
        <p className="mt-1 font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
