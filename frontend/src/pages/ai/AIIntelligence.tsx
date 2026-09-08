import { useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { InfoRibbon } from "../../components/common/InfoRibbon";
import { MetricCard } from "../../components/common/MetricCard";
import { aiService } from "../../services/ai.service";
import type { AIInsight } from "../../types/ai.types";
import { AlertTriangle, Brain, CircleGauge, Sparkles } from "lucide-react";

export function AIIntelligence() {
  const navigate = useNavigate();
  const insights = aiService.getInsights();
  const summary = aiService.getSummary();

  return (
    <div className="space-y-7">
      <InfoRibbon
        title="AI ribbon"
        description="Risk scan totals, average score, and critical items stay visible in a slim ribbon instead of a dense panel."
        items={[
          { label: "Scans", value: String(summary.totalScans) },
          { label: "Average", value: `${summary.averageScore}/100` },
          { label: "Critical", value: String(summary.criticalRisks) },
          { label: "Actions", value: String(summary.recommendedActions) },
        ]}
      />

      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
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
            <MiniLine label="Mode" value="Open details only" />
          </div>
        </AppCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {insights.map((insight) => (
          <article
            key={insight.id}
            className="rounded-[28px] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.94)_100%)] p-6 shadow-[0_12px_40px_rgba(15,29,47,0.05)]"
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
              <Button onClick={() => navigate(insight.route)}>Open</Button>
            </div>
          </article>
        ))}
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
