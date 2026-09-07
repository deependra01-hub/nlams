import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { HeadsUpDialog } from "../../components/common/HeadsUpDialog";
import { MetricCard } from "../../components/common/MetricCard";
import { aiService } from "../../services/ai.service";
import type { AIInsight } from "../../types/ai.types";
import { AlertTriangle, Brain, CircleGauge, Sparkles } from "lucide-react";

export function AIIntelligence() {
  const navigate = useNavigate();
  const insights = aiService.getInsights();
  const summary = aiService.getSummary();
  const [activeId, setActiveId] = useState<string | null>(insights[0]?.id ?? null);
  const activeInsight = useMemo(
    () => insights.find((insight) => insight.id === activeId) ?? insights[0] ?? null,
    [activeId, insights],
  );

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <AppCard title="AI intelligence" description="A minimal risk surface with just enough signal to act.">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Scans" value={String(summary.totalScans)} detail="Analyzed records" icon={Brain} />
            <MetricCard label="Average risk" value={`${summary.averageScore}/100`} detail="Portfolio level" icon={CircleGauge} />
            <MetricCard label="Critical" value={String(summary.criticalRisks)} detail="Urgent reviews" icon={AlertTriangle} />
            <MetricCard label="Actions" value={String(summary.recommendedActions)} detail="Suggested steps" icon={Sparkles} />
          </div>
        </AppCard>

        <AppCard title="Signal" description="Short prompts, not a full analytics wall.">
          <div className="grid gap-3">
            <MiniLine label="Risk queue" value={String(insights.length)} />
            <MiniLine label="Default view" value={insights[0]?.entityName ?? "None"} />
            <MiniLine label="Mode" value="Heads up launchpad" />
          </div>
        </AppCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {insights.map((insight) => (
          <article
            key={insight.id}
            className="rounded-[28px] border border-slate-100 bg-white p-5 shadow-[0_12px_40px_rgba(15,29,47,0.05)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{insight.domain}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">{insight.entityName}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{insight.summary}</p>
              </div>
              <Badge tone={toneByLevel(insight.level)}>{aiService.getRiskLabel(insight.level)}</Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="neutral">Confidence {insight.confidence}%</Badge>
              <Badge tone="neutral">Score {insight.score}/100</Badge>
            </div>
            <div className="mt-5 flex flex-wrap justify-between gap-3">
              <p className="text-sm text-slate-500">{insight.updatedAt}</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => setActiveId(insight.id)}>
                  Heads up
                </Button>
                <Link to={insight.route} className="inline-flex">
                  <Button>Open</Button>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <HeadsUpDialog
        open={Boolean(activeInsight)}
        title={activeInsight?.entityName ?? ""}
        description={activeInsight?.recommendation ?? ""}
        onClose={() => setActiveId(null)}
        primaryAction={activeInsight ? <Button onClick={() => navigate(activeInsight.route)}>Open</Button> : null}
      >
        {activeInsight ? (
          <div className="grid gap-3 sm:grid-cols-3">
            <MiniLine label="Owner" value={activeInsight.owner} />
            <MiniLine label="Route" value={activeInsight.route} />
            <MiniLine label="Drivers" value={String(activeInsight.drivers.length)} />
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
  return "neutral";
}
