export type ParcelStatus =
  | "mapped"
  | "under_review"
  | "objection"
  | "verified"
  | "ready_for_award";

export type ParcelVerificationStatus = "pending" | "in_review" | "approved" | "rejected";

export interface ParcelIssue {
  id: string;
  title: string;
  severity: "low" | "medium" | "high" | "critical";
}

export interface Parcel {
  id: string;
  surveyNo: string;
  khataNo: string;
  village: string;
  district: string;
  state: string;
  landUse: string;
  areaHectare: number;
  ownerName: string;
  fatherName: string;
  possessionType: string;
  status: ParcelStatus;
  verificationStatus: ParcelVerificationStatus;
  valuationLakh: number;
  mutationStatus: string;
  lastUpdated: string;
  linkedProjectCode: string;
  issues: ParcelIssue[];
  remarks: string;
}
