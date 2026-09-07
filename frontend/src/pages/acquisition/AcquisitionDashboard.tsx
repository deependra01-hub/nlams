import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { HeadsUpDialog } from "../../components/common/HeadsUpDialog";
import { MetricCard } from "../../components/common/MetricCard";
import { useAcquisition } from "../../hooks/useAcquisition";
import { acquisitionService } from "../../services/acquisition.service";
import { AlertTriangle, CheckCircle2, FileText, MapPinned } from "lucide-react";

export function AcquisitionDashboard() {
  const navigate = useNavigate();
  const { cases, summary, setActiveCaseId } = useAcquisition();
  const [activeCaseId, setActiveCaseIdLocal] = useState<string | null>(cases[0]?.id ?? null);
  const activeCase = activeCaseId ? acquisitionService.getCaseById(activeCaseId) : null;
  const launchCases = cases.slice(0, 4);

  const openCase = (caseId: string) => {
    setActiveCaseId(caseId);
    navigate("/acquisition");
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <AppCard title="Acquisition" description="A quiet launchpad for case review. Open a case only when needed.">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Cases" value={String(summary.totalCases)} detail="Tracked workflows" icon={FileText} />
            <MetricCard label="Active" value={String(summary.activeCases)} detail="In motion" icon={MapPinned} />
            <MetricCard label="Blocked" value={String(summary.blockedCases)} detail="Needs resolution" icon={AlertTriangle} />
            <MetricCard label="Completed" value={String(summary.completedCases)} detail="Closed cases" icon={CheckCircle2} />
          </div>
        </AppCard>

        <AppCard title="Signal" description="Only the smallest status summary stays visible.">
          <div className="grid gap-3">
            <MiniLine label="Pending hearings" value={String(summary.pendingHearings)} />
            <MiniLine label="Pending possessions" value={String(summary.pendingPossessions)} />
            <MiniLine label="Case focus" value="Heads up cards only" />
          </div>
        </AppCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {launchCases.map((entry) => (
          <article
            key={entry.id}
            className="rounded-[28px] border border-slate-100 bg-white p-5 shadow-[0_12px_40px_rgba(15,29,47,0.05)]"
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
              <Badge tone="neutral">{entry.stage}</Badge>
              <Badge tone="neutral">{entry.priority} priority</Badge>
              <Badge tone="neutral">{entry.progress}%</Badge>
            </div>
            <div className="mt-5 flex flex-wrap justify-between gap-3">
              <p className="text-sm text-slate-500">Updated {entry.lastUpdated}</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => setActiveCaseIdLocal(entry.id)}>
                  Heads up
                </Button>
                <Button onClick={() => openCase(entry.id)}>Open</Button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <HeadsUpDialog
        open={Boolean(activeCase)}
        title={activeCase?.title ?? ""}
        description={activeCase?.summary ?? ""}
        onClose={() => setActiveCaseIdLocal(null)}
        primaryAction={activeCase ? <Button onClick={() => openCase(activeCase.id)}>Open case</Button> : null}
      >
        {activeCase ? (
          <div className="grid gap-3 sm:grid-cols-3">
            <MiniLine label="Project" value={activeCase.projectId} />
            <MiniLine label="Parcel" value={activeCase.parcelId} />
            <MiniLine label="Stage" value={activeCase.stage} />
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
