export type DocumentType =
  | "award_notice"
  | "survey_report"
  | "mutation_record"
  | "identity_proof"
  | "consent_deed"
  | "compensation_receipt"
  | "rr_order"
  | "boundary_map";

export type DocumentStatus = "draft" | "under_review" | "verified" | "rejected" | "archived";
export type DocumentVerificationStatus = "pending" | "verified" | "rejected";

export interface DocumentVersion {
  id: string;
  version: string;
  fileName: string;
  sizeKb: number;
  uploadedBy: string;
  uploadedAt: string;
  notes: string;
}

export interface DocumentVerification {
  status: DocumentVerificationStatus;
  reviewer: string;
  reviewedAt: string | null;
  notes: string;
}

export interface DocumentLinks {
  projectId?: string;
  parcelId?: string;
  compensationCaseId?: string;
  familyId?: string;
}

export interface DocumentRecord {
  id: string;
  title: string;
  referenceNo: string;
  type: DocumentType;
  status: DocumentStatus;
  summary: string;
  ownerDepartment: string;
  uploadedAt: string;
  lastReviewedAt: string | null;
  fileName: string;
  fileSizeKb: number;
  pageCount: number;
  versionCount: number;
  source: string;
  tags: string[];
  linkedTo: DocumentLinks;
  versions: DocumentVersion[];
  verification: DocumentVerification;
}
