import { useMemo, useState } from "react";
import { AppCard } from "../../components/common/AppCard";
import { AcquisitionStage } from "../../components/acquisition/AcquisitionStage";
import { AwardPanel } from "../../components/acquisition/AwardPanel";
import { useAcquisition } from "../../hooks/useAcquisition";
import { acquisitionService } from "../../services/acquisition.service";

export function Awards() {
  const { cases, setActiveCaseId } = useAcquisition();
  const [activeId, setActiveId] = useState(cases[0]?.id ?? null);
  const activeCase = useMemo(() => acquisitionService.getCaseById(activeId ?? "") ?? cases[0] ?? null, [activeId, cases]);

  if (!activeCase) {
    return <AppCard title="Awards" description="No acquisition cases available." />;
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
      <AppCard title="Award cases" description="Select a case to inspect the award state.">
        <div className="space-y-2">
          {cases.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => {
                setActiveId(entry.id);
                setActiveCaseId(entry.id);
              }}
              className={[
                "w-full rounded-2xl border px-4 py-4 text-left transition",
                activeCase.id === entry.id ? "border-gov-300 bg-gov-50" : "border-slate-200 bg-white",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{entry.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{entry.district}, {entry.state}</p>
                </div>
                <AcquisitionStage stage={entry.stage} />
              </div>
            </button>
          ))}
        </div>
      </AppCard>
      <AwardPanel acquisitionCase={activeCase} />
    </div>
  );
}
