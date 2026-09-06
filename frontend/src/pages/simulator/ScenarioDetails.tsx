import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { simulatorService } from "../../services/simulator.service";

export function ScenarioDetails() {
  const { scenarioId } = useParams();
  const scenario = useMemo(() => (scenarioId ? simulatorService.getScenarioById(scenarioId) : null), [scenarioId]);

  if (!scenarioId) {
    return <Navigate to="/simulator" replace />;
  }

  if (!scenario) {
    return (
      <AppCard title="Scenario not found" description="The requested scenario is not available.">
        <Link to="/simulator" className="inline-flex">
          <Button variant="secondary">Back to simulator</Button>
        </Link>
      </AppCard>
    );
  }

  return (
    <div className="space-y-4">
      <AppCard title={scenario.name} description={scenario.description}>
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">{simulatorService.getStatusLabel(scenario.status)}</Badge>
          <Badge tone="neutral">{scenario.projectId}</Badge>
          <Badge tone="neutral">{scenario.parcelId}</Badge>
        </div>
      </AppCard>
      <AppCard title="Scenario profile" description="Cost, delay, and risk tradeoffs.">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <Field label="Cost" value={`${scenario.costLakh} lakh`} />
          <Field label="Delay" value={`${scenario.delayWeeks} weeks`} />
          <Field label="Dispute risk" value={`${scenario.disputeRisk}/100`} />
          <Field label="Confidence" value={`${scenario.confidence}%`} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {scenario.assumptions.map((item) => (
            <Badge key={item} tone="neutral">
              {item}
            </Badge>
          ))}
        </div>
      </AppCard>
      <Link to="/simulator" className="inline-flex">
        <Button variant="secondary">Back to simulator</Button>
      </Link>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
