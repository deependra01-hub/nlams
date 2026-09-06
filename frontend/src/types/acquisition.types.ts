export type AcquisitionStage =
  | "survey"
  | "hearing"
  | "award"
  | "disbursement"
  | "possession";

export type AcquisitionStatus = "planning" | "in_progress" | "blocked" | "completed";

export interface AcquisitionNotice {
  id: string;
  title: string;
  noticeDate: string;
  issuedBy: string;
  summary: string;
}

export interface AcquisitionHearing {
  id: string;
  hearingDate: string;
  venue: string;
  officer: string;
  outcome: "pending" | "adjourned" | "closed";
  remarks: string;
}

export interface AcquisitionObjection {
  id: string;
  raisedBy: string;
  category: string;
  status: "open" | "under_review" | "resolved";
  raisedAt: string;
  notes: string;
}

export interface AcquisitionAward {
  id: string;
  awardNo: string;
  awardDate: string;
  amountLakh: number;
  approvedBy: string;
  remarks: string;
}

export interface AcquisitionPossession {
  id: string;
  possessionDate: string | null;
  handoverOfficer: string;
  status: "pending" | "scheduled" | "handed_over";
  notes: string;
}

export interface AcquisitionCase {
  id: string;
  projectId: string;
  parcelId: string;
  title: string;
  district: string;
  state: string;
  stage: AcquisitionStage;
  status: AcquisitionStatus;
  progress: number;
  priority: "low" | "medium" | "high" | "critical";
  owner: string;
  summary: string;
  lastUpdated: string;
  notices: AcquisitionNotice[];
  hearings: AcquisitionHearing[];
  objections: AcquisitionObjection[];
  award: AcquisitionAward | null;
  possession: AcquisitionPossession | null;
  notifications: string[];
}

export interface AcquisitionSummary {
  totalCases: number;
  activeCases: number;
  blockedCases: number;
  completedCases: number;
  pendingHearings: number;
  pendingPossessions: number;
}
