import { useMemo, useState } from "react";
import { AppCard } from "../../components/common/AppCard";
import { AcquisitionStage } from "../../components/acquisition/AcquisitionStage";
import { PossessionPanel } from "../../components/acquisition/PossessionPanel";
import { useAcquisition } from "../../hooks/useAcquisition";
import { acquisitionService } from "../../services/acquisition.service";

export function Possession() {
  const { cases, setActiveCaseId } = useAcquisition();
  const [activeId, setActiveId] = useState(cases[0]?.id ?? null);
  const activeCase = useMemo(() => acquisitionService.getCaseById(activeId ?? "") ?? cases[0] ?? null, [activeId, cases]);

  if (!activeCase) {
    return <AppCard title="Possession" description="No acquisition cases available." />;
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
      <AppCard title="Possession queue" description="Track handover readiness and scheduled possession.">
        <div className="space-y-3">
          {cases.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => {
                setActiveId(entry.id);
                setActiveCaseId(entry.id);
              }}
              className={[
                "w-full rounded-[28px] border px-4 py-4 text-left transition",
                activeCase.id === entry.id ? "border-gov-300 bg-gov-50" : "border-sky-100 bg-white/90 hover:border-gov-200 hover:bg-gov-50",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-950">{entry.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{entry.possession?.status ?? "Not scheduled"}</p>
                </div>
                <AcquisitionStage stage={entry.stage} />
              </div>
            </button>
          ))}
        </div>
      </AppCard>
      <PossessionPanel acquisitionCase={activeCase} />
    </div>
  );
}
