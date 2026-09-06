import { Link } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { MetricCard } from "../../components/common/MetricCard";
import { reportService } from "../../services/report.service";
import { BarChart3, FileChartColumn, FileDown, ListChecks } from "lucide-react";

export function Reports() {
  const reports = reportService.getReports();
  const metrics = reportService.getMetrics();

  return (
    <div className="space-y-4">
      <AppCard title="Reports" description="Operational summaries and export-ready work products.">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
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

      <div className="grid gap-4 xl:grid-cols-2">
        {reports.map((report) => (
          <article key={report.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{report.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{report.summary}</p>
              </div>
              <Badge tone={report.status === "ready" ? "success" : report.status === "scheduled" ? "warning" : "neutral"}>
                {report.status}
              </Badge>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Info label="Category" value={report.category} />
              <Info label="Owner" value={report.owner} />
              <Info label="Format" value={report.format} />
              <Info label="Updated" value={report.updatedAt} />
            </div>
          </article>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Link to="/reports/analytics" className="inline-flex">
          <Button>Open analytics</Button>
        </Link>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
