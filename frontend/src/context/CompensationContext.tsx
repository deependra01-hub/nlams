import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";
import { compensationService } from "../services/compensation.service";
import type { CompensationCase, CompensationStatus } from "../types/compensation.types";

interface CompensationContextValue {
  cases: CompensationCase[];
  activeCaseId: string | null;
  activeCase: CompensationCase | null;
  setActiveCaseId: (caseId: string | null) => void;
  getCaseById: (caseId: string) => CompensationCase | null;
  getCasesByStatus: (status?: CompensationStatus) => CompensationCase[];
  summary: ReturnType<typeof compensationService.getSummary>;
}

const CompensationContext = createContext<CompensationContextValue | undefined>(undefined);

export function CompensationProvider({ children }: PropsWithChildren) {
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const cases = compensationService.getCases();
  const summary = compensationService.getSummary();
  const activeCase = cases.find((entry) => entry.id === activeCaseId) ?? null;

  const value = useMemo<CompensationContextValue>(
    () => ({
      cases,
      activeCaseId,
      activeCase,
      setActiveCaseId,
      getCaseById: compensationService.getCaseById,
      getCasesByStatus: (status?: CompensationStatus) =>
        status ? cases.filter((entry) => entry.status === status) : cases,
      summary,
    }),
    [activeCase, activeCaseId, cases, summary],
  );

  return <CompensationContext.Provider value={value}>{children}</CompensationContext.Provider>;
}

export function useCompensation() {
  const context = useContext(CompensationContext);
  if (!context) {
    throw new Error("useCompensation must be used within CompensationProvider");
  }
  return context;
}
