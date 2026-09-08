import { useState } from "react";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Link } from "react-router-dom";

export function ScenarioCreate() {
  const [saved, setSaved] = useState(false);

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
        {saved ? <Badge tone="success">Saved locally</Badge> : null}
      </div>
      {saved ? (
        <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          Scenario draft saved for frontend review.
        </div>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={() => setSaved(true)}>Save draft</Button>
        <Link to="/simulator" className="inline-flex">
          <Button variant="secondary">Back to simulator</Button>
        </Link>
      </div>
    </AppCard>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-sky-100 bg-white/90 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{label}</p>
      <p className="mt-2 text-sm font-semibold text-blue-950">{value}</p>
    </div>
  );
}
