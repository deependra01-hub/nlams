import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { MetricCard } from "../../components/common/MetricCard";
import { AcquisitionStage } from "../../components/acquisition/AcquisitionStage";
import { AcquisitionWorkflow } from "../../components/acquisition/AcquisitionWorkflow";
import { useAcquisition } from "../../hooks/useAcquisition";
import { acquisitionService } from "../../services/acquisition.service";
import type { AcquisitionStatus } from "../../types/acquisition.types";
import { AlertTriangle, CheckCircle2, FileText, MapPinned } from "lucide-react";

export function AcquisitionDashboard() {
  const navigate = useNavigate();
  const { cases, summary, setActiveCaseId } = useAcquisition();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<AcquisitionStatus | "all">("all");

  const filteredCases = useMemo(() => acquisitionService.listCases(status === "all" ? undefined : status, query), [query, status]);
  const selectedCase = filteredCases[0] ?? cases[0] ?? null;

  const openCase = (caseId: string) => {
    setActiveCaseId(caseId);
    navigate("/acquisition");
  };

  return (
    <div className="space-y-4">
      <AppCard title="Acquisition dashboard" description="Track surveys, hearings, awards, objections, and possession handoff.">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Cases" value={String(summary.totalCases)} detail="Tracked acquisition workflows." icon={FileText} />
          <MetricCard label="Active" value={String(summary.activeCases)} detail="Currently in motion." icon={MapPinned} />
          <MetricCard label="Blocked" value={String(summary.blockedCases)} detail="Awaiting record resolution." icon={AlertTriangle} />
          <MetricCard label="Completed" value={String(summary.completedCases)} detail="Closed acquisition cases." icon={CheckCircle2} />
        </div>
      </AppCard>

      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft lg:grid-cols-[1fr_auto] lg:items-end">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-900">Search cases</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search case, district, state, owner, or notice"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-gov-300 focus:bg-white"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {(["all", "planning", "in_progress", "blocked", "completed"] as const).map((item) => (
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
              {item === "all" ? "All statuses" : acquisitionService.getStatusLabel(item)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {selectedCase ? (
            <div className="space-y-4">
              <AcquisitionWorkflow acquisitionCase={selectedCase} />
              <div className="grid gap-4 xl:grid-cols-2">
                <AppCard title="Quick context" description="Linked project and parcel details for this case.">
                  <div className="space-y-3">
                    <ContextRow label="Project" value={selectedCase.projectId} />
                    <ContextRow label="Parcel" value={selectedCase.parcelId} />
                    <ContextRow label="Priority" value={selectedCase.priority} />
                    <ContextRow label="Stage" value={<AcquisitionStage stage={selectedCase.stage} />} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link to={`/documents`} className="inline-flex">
                      <Button variant="secondary">Open evidence</Button>
                    </Link>
                    <Button onClick={() => openCase(selectedCase.id)}>Keep selected</Button>
                  </div>
                </AppCard>

                <AppCard title="Case status" description="What the acquisition team is doing next.">
                  <div className="space-y-2">
                    <Badge tone="primary">{acquisitionService.getStatusLabel(selectedCase.status)}</Badge>
                    <p className="text-sm leading-6 text-slate-600">{selectedCase.summary}</p>
                    <p className="text-sm font-semibold text-slate-900">Notifications</p>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {selectedCase.notifications.map((item) => (
                        <li key={item} className="rounded-xl bg-slate-50 px-3 py-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AppCard>
              </div>
            </div>
          ) : (
            <EmptyState
              title="No acquisition cases match the current filters"
              description="Try a broader search or reset the status filter."
              icon={FileText}
              actionLabel="Reset filters"
              onAction={() => {
                setQuery("");
                setStatus("all");
              }}
            />
          )}
        </div>

        <AppCard title="Case list" description="Open a case to inspect the workflow.">
          <div className="space-y-3">
            {filteredCases.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => openCase(entry.id)}
                className={[
                  "w-full rounded-2xl border px-4 py-4 text-left transition",
                  selectedCase?.id === entry.id
                    ? "border-gov-300 bg-gov-50"
                    : "border-slate-200 bg-white hover:border-gov-200 hover:bg-gov-50",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{entry.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{entry.district}, {entry.state}</p>
                  </div>
                  <AcquisitionStage stage={entry.stage} />
                </div>
                <p className="mt-3 text-sm text-slate-600">{entry.summary}</p>
              </button>
            ))}
          </div>
        </AppCard>
      </div>
    </div>
  );
}

function ContextRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <div className="mt-1 text-sm font-semibold text-slate-800">{value}</div>
    </div>
  );
}
