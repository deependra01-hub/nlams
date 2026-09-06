import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { EmptyState } from "../../components/common/EmptyState";
import { MetricCard } from "../../components/common/MetricCard";
import { DisplacementPanel } from "../../components/rehabilitation/DisplacementPanel";
import { FamilyDetails } from "../../components/rehabilitation/FamilyDetails";
import { FamilyTable } from "../../components/rehabilitation/FamilyTable";
import { RRPlan } from "../../components/rehabilitation/RRPlan";
import { RRProgress } from "../../components/rehabilitation/RRProgress";
import { useRehabilitation } from "../../hooks/useRehabilitation";
import { rehabilitationService } from "../../services/rehabilitation.service";
import { formatCurrencyInCrore, formatPercentage } from "../../utils/formatters";
import { Home, MapPinned, ShieldCheck, Users } from "lucide-react";

export function RRDashboard() {
  const { families, summary, milestones, setActiveFamilyId } = useRehabilitation();
  const [selectedFamilyId, setSelectedFamilyId] = useState(families[0]?.id ?? null);

  const selectedFamily = useMemo(
    () => rehabilitationService.getFamilyById(selectedFamilyId ?? "") ?? families[0] ?? null,
    [families, selectedFamilyId],
  );

  const openFamily = (familyId: string) => {
    setSelectedFamilyId(familyId);
    setActiveFamilyId(familyId);
  };

  return (
    <div className="space-y-4">
      <AppCard
        title="R&R dashboard"
        description="Track family rehabilitation, relocation support, and completion progress."
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Families" value={String(summary.totalFamilies)} detail="Tracked in the current workflow." icon={Users} />
          <MetricCard label="Completed" value={String(summary.completedFamilies)} detail="Families marked complete." icon={ShieldCheck} />
          <MetricCard label="In progress" value={String(summary.inProgressFamilies)} detail="Families with active support." icon={MapPinned} />
          <MetricCard label="Benefits" value={formatCurrencyInCrore(summary.totalBenefitLakh / 100)} detail="Total rehabilitation support." icon={Home} />
        </div>
      </AppCard>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <AppCard title="Family queue" description="Select a family to review the R&R workflow.">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge tone="primary">Demo phase</Badge>
            <Badge tone="neutral">{formatPercentage(Math.round((summary.completedFamilies / summary.totalFamilies) * 100))} complete</Badge>
          </div>

          {families.length > 0 ? (
            <FamilyTable families={families} onOpen={openFamily} />
          ) : (
            <EmptyState
              title="No families found"
              description="Add R&R records to begin the rehabilitation workflow."
              icon={Users}
            />
          )}
        </AppCard>

        {selectedFamily ? (
          <div className="grid gap-4">
            <FamilyDetails family={selectedFamily} />
            <DisplacementPanel family={selectedFamily} />
            <RRProgress family={selectedFamily} />
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <RRPlan milestones={milestones} />
        <AppCard title="Cross links" description="Jump to adjacent operational records.">
          <div className="grid gap-3">
            <Link
              to="/compensation"
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-gov-300 hover:bg-gov-50"
            >
              <p className="font-semibold text-slate-900">Open compensation</p>
              <p className="mt-1 text-sm text-slate-600">Review linked compensation cases and payment queue.</p>
            </Link>
            <Link
              to="/parcels"
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-gov-300 hover:bg-gov-50"
            >
              <p className="font-semibold text-slate-900">Open parcels</p>
              <p className="mt-1 text-sm text-slate-600">Check the parcel record backing the family entry.</p>
            </Link>
          </div>
        </AppCard>
      </div>
    </div>
  );
}
