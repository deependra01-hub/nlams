import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { HeadsUpDialog } from "../../components/common/HeadsUpDialog";
import { MetricCard } from "../../components/common/MetricCard";
import { reportService } from "../../services/report.service";
import { BarChart3, FileChartColumn, FileDown, ListChecks } from "lucide-react";

export function Reports() {
  const navigate = useNavigate();
  const reports = reportService.getReports();
  const metrics = reportService.getMetrics();
  const [activeReportId, setActiveReportId] = useState<string | null>(reports[0]?.id ?? null);
  const activeReport = reports.find((report) => report.id === activeReportId) ?? reports[0] ?? null;
  const launchReports = reports.slice(0, 4);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
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
            <MiniLine label="Reports" value={String(reports.length)} />
            <MiniLine label="Ready" value={String(reports.filter((report) => report.status === "ready").length)} />
            <MiniLine label="View" value="Launch cards only" />
          </div>
        </AppCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {launchReports.map((report) => (
          <article
            key={report.id}
            className="rounded-[28px] border border-slate-100 bg-white p-5 shadow-[0_12px_40px_rgba(15,29,47,0.05)]"
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
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => setActiveReportId(report.id)}>
                  Heads up
                </Button>
                <Button onClick={() => navigate("/reports/analytics")}>Open</Button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <HeadsUpDialog
        open={Boolean(activeReport)}
        title={activeReport?.title ?? ""}
        description={activeReport?.summary ?? ""}
        onClose={() => setActiveReportId(null)}
        primaryAction={activeReport ? <Button onClick={() => navigate("/reports/analytics")}>Open analytics</Button> : null}
      >
        {activeReport ? (
          <div className="grid gap-3 sm:grid-cols-3">
            <MiniLine label="Owner" value={activeReport.owner} />
            <MiniLine label="Format" value={activeReport.format} />
            <MiniLine label="Updated" value={activeReport.updatedAt} />
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
