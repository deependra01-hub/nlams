import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Plus } from "lucide-react";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";

const draftFields = [
  { label: "Project name", value: "Eastern Freight Spur" },
  { label: "State", value: "Assam" },
  { label: "District", value: "Guwahati" },
  { label: "Estimated area", value: "184 ha" },
];

export function ProjectCreate() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-7">
      <AppCard title="Create project" description="Prepare a lightweight project draft for the portfolio workspace.">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {draftFields.map((field) => (
            <div key={field.label} className="rounded-2xl border border-sky-100 bg-white/90 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{field.label}</p>
              <p className="mt-2 text-sm font-semibold text-blue-950">{field.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Badge tone="neutral">Draft</Badge>
          <Badge tone="neutral">Portfolio intake</Badge>
          {saved ? <Badge tone="success">Saved locally</Badge> : null}
        </div>

        {saved ? (
          <div className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
            <CheckCircle2 className="h-4 w-4" />
            Draft saved for frontend review.
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          <Button leadingIcon={Plus} onClick={() => setSaved(true)}>
            Save draft
          </Button>
          <Link to="/projects" className="inline-flex">
            <Button variant="secondary">Back to projects</Button>
          </Link>
        </div>
      </AppCard>
    </div>
  );
}
