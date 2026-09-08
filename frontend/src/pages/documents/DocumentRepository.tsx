import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { InfoRibbon } from "../../components/common/InfoRibbon";
import { MetricCard } from "../../components/common/MetricCard";
import { useAuth } from "../../context/AuthContext";
import { useDocuments } from "../../hooks/useDocuments";
import { documentService } from "../../services/document.service";
import { useFilterStore } from "../../store/filter.store";
import type { DocumentStatus } from "../../types/document.types";
import { getScopeTarget, matchesScope, matchesSearch } from "../../utils/globalFilters";
import { FileText, FolderSearch, ShieldCheck, Upload } from "lucide-react";

export function DocumentRepository() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { documents, stats, setActiveDocumentId } = useDocuments();
  const { searchText, geographicScope } = useFilterStore();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<DocumentStatus | "all">("all");
  const scopeTarget = getScopeTarget(geographicScope, user?.role);

  const filteredDocuments = useMemo(
    () =>
      documents.filter((document) => {
        const relatedProject = documentService.getRelatedProject(document);
        const relatedParcel = documentService.getRelatedParcel(document);
        const scopeRecord = {
          state: relatedProject?.state ?? relatedParcel?.state,
          district: relatedProject?.district ?? relatedParcel?.district,
        };
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
            relatedProject?.name,
            relatedParcel?.surveyNo,
            relatedParcel?.ownerName,
            ...document.tags,
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);
        const globalMatches =
          matchesScope(scopeRecord, geographicScope, user?.role) &&
          matchesSearch(
            [
              document.id,
              document.title,
              document.referenceNo,
              document.fileName,
              document.source,
              document.summary,
              document.ownerDepartment,
              document.type,
              document.status,
              relatedProject?.name,
              relatedProject?.state,
              relatedProject?.district,
              relatedParcel?.surveyNo,
              relatedParcel?.ownerName,
              relatedParcel?.state,
              relatedParcel?.district,
              ...document.tags,
            ],
            searchText,
          );
        return statusMatches && queryMatches && globalMatches;
      }),
    [documents, geographicScope, query, searchText, status, user?.role],
  );
  const launchDocuments = filteredDocuments.slice(0, 4);

  const openDocument = (documentId: string) => {
    setActiveDocumentId(documentId);
    navigate(`/documents/${documentId}`);
  };

  return (
    <div className="space-y-7">
      <InfoRibbon
        title="Document ribbon"
        description="Document counts, reviews, and version history are carried in a compact ribbon so the search view remains calm."
        items={[
          { label: "Documents", value: String(stats.totalDocuments) },
          { label: "Visible", value: String(filteredDocuments.length) },
          { label: "Verified", value: String(stats.verifiedDocuments) },
          { label: "Scope", value: scopeTarget.label },
        ]}
      />

      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
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
            <MiniLine label="Page search" value={query.trim() || "All records"} />
            <MiniLine label="Header search" value={searchText.trim() || "All records"} />
            <MiniLine label="Status" value={status === "all" ? "All statuses" : documentService.getStatusLabel(status)} />
          </div>
        </AppCard>
      </section>

      <div className="grid gap-3 rounded-[28px] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.94)_100%)] p-5 shadow-[0_12px_40px_rgba(15,29,47,0.05)] lg:grid-cols-[1fr_auto] lg:items-end">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-950">Search documents</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title, reference, file, source, or tag"
            className="w-full rounded-2xl border border-sky-100 bg-white/90 px-4 py-3 text-sm outline-none transition focus:border-gov-300 focus:bg-white"
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
                  : "border-sky-100 bg-white/90 text-slate-600 hover:border-gov-200 hover:bg-gov-50",
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
            className="rounded-[28px] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.94)_100%)] p-6 shadow-[0_12px_40px_rgba(15,29,47,0.05)]"
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
              <Button onClick={() => openDocument(document.id)}>Open</Button>
            </div>
          </article>
        ))}
        {launchDocuments.length === 0 ? (
          <EmptyState
            title="No documents match the current filters"
            description="Try a different header search, page search, status, or geographic scope."
            icon={FolderSearch}
          />
        ) : null}
      </section>
    </div>
  );
}

function MiniLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-sky-100 bg-white/90 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{label}</p>
      <p className="mt-2 text-sm font-semibold text-blue-950">{value}</p>
    </div>
  );
}
