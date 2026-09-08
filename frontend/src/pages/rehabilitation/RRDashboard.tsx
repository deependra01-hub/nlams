import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { HeadsUpDialog } from "../../components/common/HeadsUpDialog";
import { MetricCard } from "../../components/common/MetricCard";
import { useRehabilitation } from "../../hooks/useRehabilitation";
import { rehabilitationService } from "../../services/rehabilitation.service";
import { formatCurrencyInCrore } from "../../utils/formatters";
import { Home, MapPinned, ShieldCheck, Users } from "lucide-react";

export function RRDashboard() {
  const navigate = useNavigate();
  const { families, summary, milestones, setActiveFamilyId } = useRehabilitation();
  const [activeFamilyId, setActiveFamilyIdLocal] = useState<string | null>(null);

  const activeFamily = activeFamilyId ? rehabilitationService.getFamilyById(activeFamilyId) : null;

  const openFamily = (familyId: string) => {
    setActiveFamilyId(familyId);
    navigate("/rr/families");
  };

  return (
    <div className="space-y-7">
      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <AppCard title="R&R" description="A lighter view for family rehabilitation and resettlement.">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Families" value={String(summary.totalFamilies)} detail="Current queue" icon={Users} />
            <MetricCard label="Completed" value={String(summary.completedFamilies)} detail="Marked complete" icon={ShieldCheck} />
            <MetricCard label="In progress" value={String(summary.inProgressFamilies)} detail="Active support" icon={MapPinned} />
            <MetricCard label="Benefits" value={formatCurrencyInCrore(summary.totalBenefitLakh / 100)} detail="Support total" icon={Home} />
          </div>
        </AppCard>

        <AppCard title="Status" description="Only the essentials.">
          <div className="grid gap-3">
            <MiniLine label="Pending house sites" value={String(summary.pendingHouseSites)} />
            <MiniLine label="Completion rate" value={`${Math.round((summary.completedFamilies / summary.totalFamilies) * 100)}%`} />
            <MiniLine label="Milestones" value={String(milestones.length)} />
          </div>
        </AppCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {families.map((family) => (
          <article key={family.id} className="rounded-[28px] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.94)_100%)] p-6 shadow-[0_12px_40px_rgba(15,29,47,0.05)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{family.village}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">{family.headName}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{family.remarks}</p>
              </div>
              <Badge tone={family.status === "completed" ? "success" : family.status === "partially_completed" ? "warning" : "neutral"}>
                {rehabilitationService.getStatusLabel(family.status)}
              </Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="neutral">
                {family.district}, {family.state}
              </Badge>
              <Badge tone="neutral">{family.displacementType}</Badge>
              <Badge tone="neutral">{family.members} members</Badge>
            </div>
            <div className="mt-5 flex flex-wrap justify-between gap-3">
              <p className="text-sm text-slate-500">{family.livelihoodSource}</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => setActiveFamilyIdLocal(family.id)}>
                  Heads up
                </Button>
                <Button onClick={() => openFamily(family.id)}>Open</Button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <AppCard title="Timeline" description="The workflow stays visual but compact.">
          <div className="space-y-3">
            {milestones.map((milestone) => (
              <div key={milestone.label} className="rounded-2xl border border-sky-100 bg-white/90 px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-950">{milestone.label}</p>
                  <Badge tone={milestone.status === "done" ? "success" : milestone.status === "current" ? "primary" : "neutral"}>
                    {milestone.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => navigate("/rr/families")}>
              Open families
            </Button>
          </div>
        </AppCard>

        <AppCard title="Related records" description="Quick exits, not deep navigation.">
          <div className="grid gap-3">
            <Link to="/compensation" className="rounded-2xl border border-sky-100 bg-white/90 px-4 py-4 transition hover:border-gov-200 hover:bg-gov-50">
              <p className="font-semibold text-slate-950">Compensation</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">Open the linked compensation cases.</p>
            </Link>
            <Link to="/parcels" className="rounded-2xl border border-sky-100 bg-white/90 px-4 py-4 transition hover:border-gov-200 hover:bg-gov-50">
              <p className="font-semibold text-slate-950">Parcels</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">Check the parcel behind the family record.</p>
            </Link>
          </div>
        </AppCard>
      </section>

      <HeadsUpDialog
        open={Boolean(activeFamily)}
        title={activeFamily?.headName ?? ""}
        description={activeFamily?.remarks ?? ""}
        onClose={() => setActiveFamilyIdLocal(null)}
        primaryAction={activeFamily ? <Button onClick={() => openFamily(activeFamily.id)}>Open family page</Button> : null}
      >
        {activeFamily ? (
          <div className="grid gap-3 sm:grid-cols-3">
            <MiniLine label="Housing" value={activeFamily.housingOption} />
            <MiniLine label="Benefit" value={formatCurrencyInCrore(activeFamily.rehabilitationBenefitLakh / 100)} />
            <MiniLine label="Status" value={rehabilitationService.getStatusLabel(activeFamily.status)} />
          </div>
        ) : null}
      </HeadsUpDialog>
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
