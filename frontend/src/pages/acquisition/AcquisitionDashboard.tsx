import { useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { InfoRibbon } from "../../components/common/InfoRibbon";
import { MetricCard } from "../../components/common/MetricCard";
import { useAuth } from "../../context/AuthContext";
import { useAcquisition } from "../../hooks/useAcquisition";
import { acquisitionService } from "../../services/acquisition.service";
import { useFilterStore } from "../../store/filter.store";
import { getScopeTarget, matchesScope, matchesSearch } from "../../utils/globalFilters";
import { AlertTriangle, CheckCircle2, FileText, MapPinned } from "lucide-react";

export function AcquisitionDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cases, summary, setActiveCaseId } = useAcquisition();
  const { searchText, geographicScope } = useFilterStore();
  const scopeTarget = getScopeTarget(geographicScope, user?.role);
  const filteredCases = cases.filter((entry) =>
    matchesScope(entry, geographicScope, user?.role) &&
    matchesSearch(
      [
        entry.id,
        entry.projectId,
        entry.parcelId,
        entry.title,
        entry.district,
        entry.state,
        entry.stage,
        entry.status,
        entry.priority,
        entry.owner,
        entry.summary,
        ...entry.notifications,
      ],
      searchText,
    ),
  );
  const filteredSummary = {
    totalCases: filteredCases.length,
    activeCases: filteredCases.filter((entry) => entry.status === "in_progress").length,
    blockedCases: filteredCases.filter((entry) => entry.status === "blocked").length,
    completedCases: filteredCases.filter((entry) => entry.status === "completed").length,
    pendingHearings: filteredCases.filter((entry) => entry.stage === "hearing").length,
    pendingPossessions: filteredCases.filter((entry) => entry.stage === "possession").length,
  };
  const launchCases = filteredCases.slice(0, 4);

  const openCase = (caseId: string) => {
    setActiveCaseId(caseId);
    navigate("/acquisition");
  };

  return (
    <div className="space-y-7">
      <InfoRibbon
        title="Acquisition ribbon"
        description="Case counts, active work, and pending handoffs are kept in a compact ribbon so the section stays easy to scan."
        items={[
          { label: "Cases", value: String(summary.totalCases) },
          { label: "Visible", value: String(filteredCases.length) },
          { label: "Blocked", value: String(filteredSummary.blockedCases) },
          { label: "Scope", value: scopeTarget.label },
        ]}
      />

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <AppCard title="Acquisition" description="A quiet launchpad for case review. Open a case only when needed.">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Cases" value={String(filteredSummary.totalCases)} detail={`Visible in ${scopeTarget.label}`} icon={FileText} />
            <MetricCard label="Active" value={String(filteredSummary.activeCases)} detail="In motion" icon={MapPinned} />
            <MetricCard label="Blocked" value={String(filteredSummary.blockedCases)} detail="Needs resolution" icon={AlertTriangle} />
            <MetricCard label="Completed" value={String(filteredSummary.completedCases)} detail="Closed cases" icon={CheckCircle2} />
          </div>
        </AppCard>

        <AppCard title="Signal" description="Only the smallest status summary stays visible.">
          <div className="grid gap-3">
            <MiniLine label="Pending hearings" value={String(filteredSummary.pendingHearings)} />
            <MiniLine label="Pending possessions" value={String(filteredSummary.pendingPossessions)} />
            <MiniLine label="Header search" value={searchText.trim() || "All cases"} />
          </div>
        </AppCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {launchCases.map((entry) => (
          <article
            key={entry.id}
            className="rounded-[28px] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.94)_100%)] p-6 shadow-[0_12px_40px_rgba(15,29,47,0.05)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{entry.title}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">{entry.district}, {entry.state}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{entry.summary}</p>
              </div>
              <Badge tone={entry.status === "completed" ? "success" : entry.status === "blocked" ? "warning" : "neutral"}>
                {acquisitionService.getStatusLabel(entry.status)}
              </Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="primary">{entry.stage}</Badge>
              <Badge tone="neutral">{entry.priority} priority</Badge>
              <Badge tone="neutral">{entry.progress}%</Badge>
            </div>
            <div className="mt-5 flex flex-wrap justify-between gap-3">
              <p className="text-sm text-slate-500">Updated {entry.lastUpdated}</p>
              <Button onClick={() => openCase(entry.id)}>Open</Button>
            </div>
          </article>
        ))}
        {launchCases.length === 0 ? (
          <EmptyState
            title="No acquisition cases match the header filters"
            description="Try a broader search term or change the geographic scope."
            icon={FileText}
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
