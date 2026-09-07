import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { HeadsUpDialog } from "../../components/common/HeadsUpDialog";
import { MetricCard } from "../../components/common/MetricCard";
import { useDocuments } from "../../hooks/useDocuments";
import { documentService } from "../../services/document.service";
import type { DocumentStatus } from "../../types/document.types";
import { FileText, FolderSearch, ShieldCheck, Upload } from "lucide-react";

export function DocumentRepository() {
  const navigate = useNavigate();
  const { documents, stats, setActiveDocumentId } = useDocuments();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<DocumentStatus | "all">("all");
  const [activeDocumentId, setActiveDocumentIdLocal] = useState<string | null>(documents[0]?.id ?? null);

  const filteredDocuments = useMemo(
    () =>
      documents.filter((document) => {
        const statusMatches = status === "all" || document.status === status;
        const normalizedQuery = query.trim().toLowerCase();
        const queryMatches =
          normalizedQuery.length === 0 ||
          [
            document.title,
            document.referenceNo,
            document.fileName,
            document.source,
            document.summary,
            ...document.tags,
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);
        return statusMatches && queryMatches;
      }),
    [documents, query, status],
  );
  const activeDocument = activeDocumentId ? documentService.getDocumentById(activeDocumentId) : null;
  const launchDocuments = filteredDocuments.slice(0, 4);

  const openDocument = (documentId: string) => {
    setActiveDocumentId(documentId);
    navigate(`/documents/${documentId}`);
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <AppCard title="Document repository" description="A quiet evidence shelf. Open records only when you need them.">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Documents" value={String(stats.totalDocuments)} detail="Catalogued records" icon={FileText} />
            <MetricCard label="Verified" value={String(stats.verifiedDocuments)} detail="Cleared for use" icon={ShieldCheck} />
            <MetricCard label="In review" value={String(stats.pendingReviewDocuments)} detail="Awaiting review" icon={FolderSearch} />
            <MetricCard label="Versions" value={String(stats.totalVersions)} detail="Revision trail" icon={Upload} />
          </div>
        </AppCard>

        <AppCard title="Focus" description="Only a few quick signals stay on the surface.">
          <div className="grid gap-3">
            <MiniLine label="Filtered" value={String(filteredDocuments.length)} />
            <MiniLine label="Search" value={query.trim() || "All records"} />
            <MiniLine label="Status" value={status === "all" ? "All statuses" : documentService.getStatusLabel(status)} />
          </div>
        </AppCard>
      </section>

      <div className="grid gap-3 rounded-[28px] border border-slate-100 bg-white p-4 shadow-[0_12px_40px_rgba(15,29,47,0.05)] lg:grid-cols-[1fr_auto] lg:items-end">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-900">Search documents</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title, reference, file, source, or tag"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-gov-300 focus:bg-white"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {(["all", "draft", "under_review", "verified", "rejected", "archived"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStatus(item)}
              className={[
                "rounded-full border px-3 py-2 text-sm font-semibold transition",
                status === item
                  ? "border-gov-300 bg-gov-50 text-gov-800"
                  : "border-slate-200 bg-white text-slate-600 hover:border-gov-200 hover:bg-gov-50",
              ].join(" ")}
            >
              {item === "all" ? "All statuses" : documentService.getStatusLabel(item)}
            </button>
          ))}
        </div>
      </div>

      <section className="grid gap-4 xl:grid-cols-2">
        {launchDocuments.map((document) => (
          <article
            key={document.id}
            className="rounded-[28px] border border-slate-100 bg-white p-5 shadow-[0_12px_40px_rgba(15,29,47,0.05)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{document.referenceNo}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">{document.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{document.summary}</p>
              </div>
              <Badge tone={document.status === "verified" ? "success" : document.status === "under_review" ? "warning" : "neutral"}>
                {documentService.getStatusLabel(document.status)}
              </Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="neutral">{document.type}</Badge>
              <Badge tone="neutral">{document.ownerDepartment}</Badge>
              <Badge tone="neutral">{document.versionCount} versions</Badge>
            </div>
            <div className="mt-5 flex flex-wrap justify-between gap-3">
              <p className="text-sm text-slate-500">{document.uploadedAt}</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => setActiveDocumentIdLocal(document.id)}>
                  Heads up
                </Button>
                <Button onClick={() => openDocument(document.id)}>Open</Button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <HeadsUpDialog
        open={Boolean(activeDocument)}
        title={activeDocument?.title ?? ""}
        description={activeDocument?.summary ?? ""}
        onClose={() => setActiveDocumentIdLocal(null)}
        primaryAction={activeDocument ? <Button onClick={() => openDocument(activeDocument.id)}>Open document</Button> : null}
      >
        {activeDocument ? (
          <div className="grid gap-3 sm:grid-cols-3">
            <MiniLine label="Reference" value={activeDocument.referenceNo} />
            <MiniLine label="File" value={activeDocument.fileName} />
            <MiniLine label="Review" value={activeDocument.verification.status} />
          </div>
        ) : null}
      </HeadsUpDialog>
    </div>
  );
}

function MiniLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
