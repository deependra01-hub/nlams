import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";
import { acquisitionService } from "../services/acquisition.service";
import type { AcquisitionCase, AcquisitionStatus } from "../types/acquisition.types";

interface AcquisitionContextValue {
  cases: AcquisitionCase[];
  activeCaseId: string | null;
  activeCase: AcquisitionCase | null;
  setActiveCaseId: (caseId: string | null) => void;
  getCaseById: (caseId: string) => AcquisitionCase | null;
  getCasesByStatus: (status?: AcquisitionStatus) => AcquisitionCase[];
  summary: ReturnType<typeof acquisitionService.getSummary>;
}

const AcquisitionContext = createContext<AcquisitionContextValue | undefined>(undefined);

export function AcquisitionProvider({ children }: PropsWithChildren) {
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const cases = acquisitionService.getCases();
  const summary = acquisitionService.getSummary();
  const activeCase = cases.find((entry) => entry.id === activeCaseId) ?? null;

  const value = useMemo<AcquisitionContextValue>(
    () => ({
      cases,
      activeCaseId,
      activeCase,
      setActiveCaseId,
      getCaseById: acquisitionService.getCaseById,
      getCasesByStatus: (status?: AcquisitionStatus) => acquisitionService.listCases(status),
      summary,
    }),
    [activeCase, activeCaseId, cases, summary],
  );

  return <AcquisitionContext.Provider value={value}>{children}</AcquisitionContext.Provider>;
}

export function useAcquisition() {
  const context = useContext(AcquisitionContext);
  if (!context) {
    throw new Error("useAcquisition must be used within AcquisitionProvider");
  }
  return context;
}
