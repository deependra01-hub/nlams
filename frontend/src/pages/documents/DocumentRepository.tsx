import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { EmptyState } from "../../components/common/EmptyState";
import { MetricCard } from "../../components/common/MetricCard";
import { DocumentList } from "../../components/documents/DocumentList";
import { useDocuments } from "../../hooks/useDocuments";
import { documentService } from "../../services/document.service";
import type { DocumentStatus } from "../../types/document.types";
import { FileText, FolderSearch, ShieldCheck, Upload } from "lucide-react";

export function DocumentRepository() {
  const navigate = useNavigate();
  const { documents, stats, setActiveDocumentId } = useDocuments();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<DocumentStatus | "all">("all");

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

  const openDocument = (documentId: string) => {
    setActiveDocumentId(documentId);
    navigate(`/documents/${documentId}`);
  };

  return (
    <div className="space-y-4">
      <AppCard
        title="Document repository"
        description="Versioned evidence for acquisition, compensation, and rehabilitation records."
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Documents"
            value={String(stats.totalDocuments)}
            detail="Records catalogued in the repository."
            icon={FileText}
          />
          <MetricCard
            label="Verified"
            value={String(stats.verifiedDocuments)}
            detail="Docs cleared for operational use."
            icon={ShieldCheck}
          />
          <MetricCard
            label="In review"
            value={String(stats.pendingReviewDocuments)}
            detail="Awaiting reviewer sign-off."
            icon={FolderSearch}
          />
          <MetricCard
            label="Versions"
            value={String(stats.totalVersions)}
            detail="Historical revisions stored locally."
            icon={Upload}
          />
        </div>
      </AppCard>

      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft lg:grid-cols-[1fr_auto] lg:items-end">
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

      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="primary">Versioned evidence</Badge>
        <Badge tone="neutral">Cross-linked records</Badge>
        <Badge tone="neutral">Reusable archive</Badge>
      </div>

      {filteredDocuments.length > 0 ? (
        <DocumentList documents={filteredDocuments} onOpen={openDocument} />
      ) : (
        <EmptyState
          title="No documents match the current filters"
          description="Try widening the search or reset the status to view the full repository."
          icon={FileText}
          actionLabel="Reset filters"
          onAction={() => {
            setQuery("");
            setStatus("all");
          }}
        />
      )}
    </div>
  );
}
