import { useMemo, useState } from "react";
import { AppCard } from "../../components/common/AppCard";
import { EmptyState } from "../../components/common/EmptyState";
import { MetricCard } from "../../components/common/MetricCard";
import { FamilyDetails } from "../../components/rehabilitation/FamilyDetails";
import { FamilyTable } from "../../components/rehabilitation/FamilyTable";
import { DisplacementPanel } from "../../components/rehabilitation/DisplacementPanel";
import { useRehabilitation } from "../../hooks/useRehabilitation";
import { rehabilitationService } from "../../services/rehabilitation.service";
import type { RRStatus } from "../../types/rr.types";
import { formatCurrencyInCrore } from "../../utils/formatters";
import { Home, Users } from "lucide-react";

export function Families() {
  const { families, summary, setActiveFamilyId } = useRehabilitation();
  const [status, setStatus] = useState<RRStatus | "all">("all");
  const [selectedFamilyId, setSelectedFamilyId] = useState(families[0]?.id ?? null);

  const filteredFamilies = useMemo(
    () => (status === "all" ? families : families.filter((family) => family.status === status)),
    [families, status],
  );

  const selectedFamily = useMemo(
    () => rehabilitationService.getFamilyById(selectedFamilyId ?? "") ?? filteredFamilies[0] ?? null,
    [filteredFamilies, selectedFamilyId],
  );

  const openFamily = (familyId: string) => {
    setSelectedFamilyId(familyId);
    setActiveFamilyId(familyId);
  };

  return (
    <div className="space-y-4">
      <AppCard
        title="R&R families"
        description="Browse household records, support packages, and completion status."
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Families" value={String(summary.totalFamilies)} detail="Households in the R&R phase." icon={Users} />
          <MetricCard label="Completed" value={String(summary.completedFamilies)} detail="Marked complete." icon={Home} />
          <MetricCard label="Benefits" value={formatCurrencyInCrore(summary.totalBenefitLakh / 100)} detail="Total support value." icon={Home} />
          <MetricCard label="Pending sites" value={String(summary.pendingHouseSites)} detail="House sites still pending." icon={Users} />
        </div>
      </AppCard>

      <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
        {(["all", "not_started", "in_progress", "partially_completed", "completed"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setStatus(item)}
            className={[
              "rounded-full border px-3 py-2 text-sm font-semibold transition",
              status === item ? "border-gov-300 bg-gov-50 text-gov-800" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
            ].join(" ")}
          >
            {item.replaceAll("_", " ")}
          </button>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        {filteredFamilies.length > 0 ? (
          <FamilyTable families={filteredFamilies} onOpen={openFamily} />
        ) : (
          <EmptyState
            title="No families match the selected status"
            description="Try another status filter to review the full R&R queue."
            icon={Users}
          />
        )}

        {selectedFamily ? (
          <div className="grid gap-4">
            <FamilyDetails family={selectedFamily} />
            <DisplacementPanel family={selectedFamily} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
