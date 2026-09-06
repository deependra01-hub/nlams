import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { MetricCard } from "../../components/common/MetricCard";
import { aiService } from "../../services/ai.service";
import type { AIInsight } from "../../types/ai.types";
import { AlertTriangle, Brain, CircleGauge, LineChart, Sparkles } from "lucide-react";

export function AIIntelligence() {
  const insights = aiService.getInsights();
  const history = aiService.getHistory();
  const summary = aiService.getSummary();
  const [activeId, setActiveId] = useState(insights[0]?.id ?? null);
  const activeInsight = useMemo(
    () => insights.find((insight) => insight.id === activeId) ?? insights[0] ?? null,
    [activeId, insights],
  );

  return (
    <div className="space-y-4">
      <AppCard title="AI intelligence" description="Risk scoring and next-action suggestions across the workflow.">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Scans" value={String(summary.totalScans)} detail="All analyzed records." icon={Brain} />
          <MetricCard label="Average risk" value={`${summary.averageScore}/100`} detail="Portfolio-wide score." icon={CircleGauge} />
          <MetricCard label="Critical" value={String(summary.criticalRisks)} detail="Urgent reviews needed." icon={AlertTriangle} />
          <MetricCard label="Actions" value={String(summary.recommendedActions)} detail="Suggested next steps." icon={Sparkles} />
        </div>
      </AppCard>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <AppCard title="Risk queue" description="Open an entity to review its AI signal.">
          <div className="space-y-2">
            {insights.map((insight) => (
              <button
                key={insight.id}
                type="button"
                onClick={() => setActiveId(insight.id)}
                className={[
                  "w-full rounded-2xl border px-4 py-4 text-left transition",
                  activeInsight?.id === insight.id ? "border-gov-300 bg-gov-50" : "border-slate-200 bg-white",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{insight.entityName}</p>
                    <p className="mt-1 text-sm text-slate-600">{insight.summary}</p>
                  </div>
                  <Badge tone={toneByLevel(insight.level)}>{aiService.getRiskLabel(insight.level)}</Badge>
                </div>
              </button>
            ))}
          </div>
        </AppCard>

        {activeInsight ? <InsightDetail insight={activeInsight} /> : null}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <AppCard title="Prediction history" description="Recent AI output changes.">
          <div className="space-y-3">
            {history.map((entry) => (
              <div key={entry.id} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{entry.entityName}</p>
                    <p className="mt-1 text-sm text-slate-600">{entry.note}</p>
                  </div>
                  <span className={entry.delta >= 0 ? "text-amber-700" : "text-emerald-700"}>
                    {entry.delta >= 0 ? "+" : ""}
                    {entry.delta}
                  </span>
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-slate-500">{entry.date}</p>
              </div>
            ))}
          </div>
        </AppCard>

        <AppCard title="Operational shortcuts" description="Jump to the most affected workflow areas.">
          <div className="grid gap-3">
            {insights.map((insight) => (
              <Link
                key={insight.id}
                to={insight.route}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-gov-300 hover:bg-gov-50"
              >
                <p className="font-semibold text-slate-900">{insight.entityName}</p>
                <p className="mt-1 text-sm text-slate-600">{insight.recommendation}</p>
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link to="/reports" className="inline-flex">
              <Button variant="secondary" leadingIcon={LineChart}>
                Open reports
              </Button>
            </Link>
          </div>
        </AppCard>
      </div>
    </div>
  );
}

function InsightDetail({ insight }: { insight: AIInsight }) {
  return (
    <AppCard title="Selected insight" description={insight.summary}>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={toneByLevel(insight.level)}>{aiService.getRiskLabel(insight.level)} risk</Badge>
          <Badge tone="neutral">{insight.domain}</Badge>
          <Badge tone="neutral">Confidence {insight.confidence}%</Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Info label="Owner" value={insight.owner} />
          <Info label="Updated" value={insight.updatedAt} />
          <Info label="Score" value={`${insight.score}/100`} />
          <Info label="Route" value={insight.route} />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Drivers</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {insight.drivers.map((driver) => (
              <Badge key={driver} tone="neutral">
                {driver}
              </Badge>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-gov-50 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gov-700">Recommended action</p>
          <p className="mt-2 text-sm leading-6 text-gov-900">{insight.recommendation}</p>
        </div>
      </div>
    </AppCard>
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

function toneByLevel(level: AIInsight["level"]) {
  switch (level) {
    case "low":
      return "success";
    case "medium":
      return "warning";
    case "high":
      return "primary";
    case "critical":
      return "danger";
  }
}
