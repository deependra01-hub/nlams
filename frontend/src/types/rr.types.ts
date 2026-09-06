export type RRStatus = "not_started" | "in_progress" | "partially_completed" | "completed";

export type DisplacementType = "full" | "partial" | "temporary";

export interface RRFamily {
  id: string;
  headName: string;
  village: string;
  district: string;
  state: string;
  parcelId: string;
  projectId: string;
  displacementType: DisplacementType;
  members: number;
  livelihoodSource: string;
  housingOption: string;
  rehabilitationBenefitLakh: number;
  status: RRStatus;
  counsellor: string;
  lastVisit: string;
  remarks: string;
}

export interface RRMilestone {
  label: string;
  status: "done" | "current" | "upcoming";
}

export interface RRSummary {
  totalFamilies: number;
  completedFamilies: number;
  inProgressFamilies: number;
  totalBenefitLakh: number;
  pendingHouseSites: number;
}
