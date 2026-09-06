import type { AcquisitionCase } from "../../types/acquisition.types";
import { AcquisitionStage } from "./AcquisitionStage";

const workflow: Array<{ key: AcquisitionCase["stage"]; label: string }> = [
  { key: "survey", label: "Survey" },
  { key: "hearing", label: "Hearing" },
  { key: "award", label: "Award" },
  { key: "disbursement", label: "Disbursement" },
  { key: "possession", label: "Possession" },
];

export function AcquisitionWorkflow({ acquisitionCase }: { acquisitionCase: AcquisitionCase }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{acquisitionCase.title}</p>
          <p className="mt-1 text-sm text-slate-600">{acquisitionCase.summary}</p>
        </div>
        <AcquisitionStage stage={acquisitionCase.stage} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-5">
        {workflow.map((step) => {
          const active = step.key === acquisitionCase.stage;
          const complete = workflow.findIndex((entry) => entry.key === step.key) < workflow.findIndex((entry) => entry.key === acquisitionCase.stage);
          return (
            <div
              key={step.key}
              className={[
                "rounded-2xl border px-3 py-3 text-center",
                active
                  ? "border-gov-300 bg-gov-50 text-gov-900"
                  : complete
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                    : "border-slate-200 bg-slate-50 text-slate-600",
              ].join(" ")}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em]">{step.label}</p>
              <p className="mt-2 text-sm font-semibold">{active ? "Current" : complete ? "Done" : "Pending"}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Meta label="Progress" value={`${acquisitionCase.progress}%`} />
        <Meta label="Owner" value={acquisitionCase.owner} />
        <Meta label="Last updated" value={acquisitionCase.lastUpdated} />
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
