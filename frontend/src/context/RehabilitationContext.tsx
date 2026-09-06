import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";
import { rehabilitationService } from "../services/rehabilitation.service";
import type { RRFamily, RRStatus } from "../types/rr.types";

interface RehabilitationContextValue {
  families: RRFamily[];
  activeFamilyId: string | null;
  activeFamily: RRFamily | null;
  setActiveFamilyId: (familyId: string | null) => void;
  getFamilyById: (familyId: string) => RRFamily | null;
  getFamiliesByStatus: (status?: RRStatus) => RRFamily[];
  summary: ReturnType<typeof rehabilitationService.getSummary>;
  milestones: ReturnType<typeof rehabilitationService.getMilestones>;
}

const RehabilitationContext = createContext<RehabilitationContextValue | undefined>(undefined);

export function RehabilitationProvider({ children }: PropsWithChildren) {
  const [activeFamilyId, setActiveFamilyId] = useState<string | null>(null);
  const families = rehabilitationService.getFamilies();
  const summary = rehabilitationService.getSummary();
  const milestones = rehabilitationService.getMilestones();
  const activeFamily = families.find((family) => family.id === activeFamilyId) ?? null;

  const value = useMemo<RehabilitationContextValue>(
    () => ({
      families,
      activeFamilyId,
      activeFamily,
      setActiveFamilyId,
      getFamilyById: rehabilitationService.getFamilyById,
      getFamiliesByStatus: (status?: RRStatus) => (status ? families.filter((family) => family.status === status) : families),
      summary,
      milestones,
    }),
    [activeFamily, activeFamilyId, families, milestones, summary],
  );

  return <RehabilitationContext.Provider value={value}>{children}</RehabilitationContext.Provider>;
}

export function useRehabilitation() {
  const context = useContext(RehabilitationContext);
  if (!context) {
    throw new Error("useRehabilitation must be used within RehabilitationProvider");
  }
  return context;
}
