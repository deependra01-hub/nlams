import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Link } from "react-router-dom";

export function ScenarioCreate() {
  return (
    <AppCard title="Create scenario" description="Draft a new impact scenario for acquisition planning.">
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Scenario name" value="Accelerated possession plan" />
        <Field label="Project" value="NH-07 Varanasi corridor" />
        <Field label="Expected cost" value="42 lakh" />
        <Field label="Expected delay" value="-1 week" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="neutral">Planning</Badge>
        <Badge tone="neutral">Cost sensitive</Badge>
        <Badge tone="neutral">Low dispute risk</Badge>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button>Save draft</Button>
        <Link to="/simulator" className="inline-flex">
          <Button variant="secondary">Back to simulator</Button>
        </Link>
      </div>
    </AppCard>
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
