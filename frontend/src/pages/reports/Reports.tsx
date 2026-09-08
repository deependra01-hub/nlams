import { useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { InfoRibbon } from "../../components/common/InfoRibbon";
import { MetricCard } from "../../components/common/MetricCard";
import { useAuth } from "../../context/AuthContext";
import { reportService } from "../../services/report.service";
import { useFilterStore } from "../../store/filter.store";
import { getScopeTarget, matchesSearch } from "../../utils/globalFilters";
import { BarChart3, FileChartColumn, FileDown, ListChecks } from "lucide-react";

export function Reports() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { searchText, geographicScope } = useFilterStore();
  const reports = reportService.getReports();
  const metrics = reportService.getMetrics();
  const scopeTarget = getScopeTarget(geographicScope, user?.role);
  const filteredReports = reports.filter((report) =>
    matchesSearch([report.id, report.title, report.category, report.owner, report.format, report.status, report.summary], searchText),
  );
  const launchReports = filteredReports.slice(0, 4);

  return (
    <div className="space-y-7">
      <InfoRibbon
        title="Reports ribbon"
        description="The report counts stay inline so users can scan readiness without opening a separate info surface."
        items={[
          { label: "Reports", value: String(reports.length) },
          { label: "Visible", value: String(filteredReports.length) },
          { label: "Ready", value: String(filteredReports.filter((report) => report.status === "ready").length) },
          { label: "Scope", value: scopeTarget.label },
        ]}
      />

      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <AppCard title="Reports" description="Summary reports stay light until you open one.">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric, index) => (
              <MetricCard
                key={metric.label}
                label={metric.label}
                value={metric.value}
                detail={metric.detail}
                icon={[BarChart3, FileChartColumn, ListChecks, FileDown][index]}
              />
            ))}
          </div>
        </AppCard>

        <AppCard title="Focus" description="A short list of the current report surface.">
          <div className="grid gap-3">
            <MiniLine label="Reports" value={String(filteredReports.length)} />
            <MiniLine label="Ready" value={String(filteredReports.filter((report) => report.status === "ready").length)} />
            <MiniLine label="Header search" value={searchText.trim() || "All reports"} />
          </div>
        </AppCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {launchReports.map((report) => (
          <article
            key={report.id}
            className="rounded-[28px] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.94)_100%)] p-6 shadow-[0_12px_40px_rgba(15,29,47,0.05)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{report.category}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">{report.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{report.summary}</p>
              </div>
              <Badge tone={report.status === "ready" ? "success" : report.status === "scheduled" ? "warning" : "neutral"}>
                {report.status}
              </Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="neutral">{report.owner}</Badge>
              <Badge tone="neutral">{report.format}</Badge>
            </div>
            <div className="mt-5 flex flex-wrap justify-between gap-3">
              <p className="text-sm text-slate-500">{report.updatedAt}</p>
              <Button onClick={() => navigate("/reports/analytics")}>Open</Button>
            </div>
          </article>
        ))}
        {launchReports.length === 0 ? (
          <EmptyState
            title="No reports match the header search"
            description="Try a broader report title, owner, format, or category."
            icon={FileChartColumn}
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
