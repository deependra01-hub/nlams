export type CompensationStatus = "draft" | "review" | "approved" | "disbursed";

export type PaymentMode = "bank_transfer" | "cheque" | "neft" | "rtgs";

export interface CompensationPayment {
  id: string;
  beneficiary: string;
  parcelId: string;
  projectId: string;
  amountLakh: number;
  mode: PaymentMode;
  status: CompensationStatus;
  dueDate: string;
  paidDate?: string;
  verifiedBy: string;
  remarks: string;
}

export interface CompensationCase {
  id: string;
  parcelId: string;
  projectId: string;
  ownerName: string;
  village: string;
  district: string;
  state: string;
  awardAmountLakh: number;
  solatiumLakh: number;
  interestLakh: number;
  totalAmountLakh: number;
  status: CompensationStatus;
  reviewOwner: string;
  paymentMode: PaymentMode;
  bankStatus: "pending" | "verified" | "rejected";
  auditFlag: string;
  lastUpdated: string;
}

export interface CompensationSummary {
  totalCases: number;
  approvedCases: number;
  disbursedCases: number;
  totalPayoutLakh: number;
  pendingPayoutLakh: number;
  auditFlags: number;
}
