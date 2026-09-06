import { useEffect, useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { DocumentUploader } from "../../components/documents/DocumentUploader";
import { DocumentVerification } from "../../components/documents/DocumentVerification";
import { DocumentViewer } from "../../components/documents/DocumentViewer";
import { DocumentVersionHistory } from "../../components/documents/DocumentVersionHistory";
import { useDocuments } from "../../hooks/useDocuments";
import { documentService } from "../../services/document.service";

export function DocumentDetails() {
  const { documentId } = useParams();
  const { getDocumentById, setActiveDocumentId } = useDocuments();

  const document = useMemo(() => (documentId ? getDocumentById(documentId) : null), [documentId, getDocumentById]);

  useEffect(() => {
    if (document) {
      setActiveDocumentId(document.id);
    }
  }, [document, setActiveDocumentId]);

  if (!documentId) {
    return <Navigate to="/documents" replace />;
  }

  if (!document) {
    return (
      <AppCard title="Document not found" description="The requested record is missing from the local demo data.">
        <div className="space-y-3">
          <p className="text-sm text-slate-600">
            Return to the repository to choose another document or update the demo source data.
          </p>
          <Link to="/documents" className="inline-flex">
            <Button variant="secondary">Back to repository</Button>
          </Link>
        </div>
      </AppCard>
    );
  }

  const relatedProject = documentService.getRelatedProject(document);
  const relatedParcel = documentService.getRelatedParcel(document);

  return (
    <div className="space-y-4">
      <AppCard
        title={document.title}
        description="Detailed document review with version history and linked operational records."
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="neutral">{documentService.getTypeLabel(document.type)}</Badge>
            <Badge tone={document.status === "verified" ? "success" : document.status === "rejected" ? "danger" : "warning"}>
              {documentService.getStatusLabel(document.status)}
            </Badge>
          </div>
          <Link to="/documents" className="inline-flex">
            <Button variant="secondary">Back to repository</Button>
          </Link>
        </div>
      </AppCard>

      <DocumentViewer document={document} />

      <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <DocumentVersionHistory document={document} />
        <div className="grid gap-4">
          <DocumentVerification document={document} />
          <DocumentUploader document={document} />
        </div>
      </div>

      <AppCard title="Cross references" description="How this record connects to the rest of the acquisition workflow.">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <CrossLink label="Project" value={relatedProject?.name ?? "Not linked"} href={relatedProject ? `/projects/${relatedProject.id}` : undefined} />
          <CrossLink
            label="Parcel"
            value={relatedParcel?.surveyNo ?? "Not linked"}
            href={relatedParcel ? `/parcels/${relatedParcel.id}` : undefined}
          />
          <CrossLink
            label="Compensation"
            value={document.linkedTo.compensationCaseId ?? "Not linked"}
            href={document.linkedTo.compensationCaseId ? "/compensation" : undefined}
          />
          <CrossLink
            label="R&R family"
            value={document.linkedTo.familyId ?? "Not linked"}
            href={document.linkedTo.familyId ? "/rr/families" : undefined}
          />
        </div>
      </AppCard>
    </div>
  );
}

function CrossLink({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-gov-300 hover:bg-gov-50">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <Link to={href} className="block">
      {content}
    </Link>
  );
}
