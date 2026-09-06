import { parcelService } from "./parcel.service";
import { projectService } from "./project.service";
import type {
  CompensationCase,
  CompensationPayment,
  CompensationStatus,
  CompensationSummary,
} from "../types/compensation.types";

const COMPENSATION_CASES: CompensationCase[] = [
  {
    id: "comp-001",
    parcelId: "parcel-101",
    projectId: "prj-nh-07",
    ownerName: "Ramesh Singh",
    village: "Sarnath",
    district: "Varanasi",
    state: "Uttar Pradesh",
    awardAmountLakh: 48,
    solatiumLakh: 19,
    interestLakh: 4,
    totalAmountLakh: 71,
    status: "review",
    reviewOwner: "Compensation desk",
    paymentMode: "neft",
    bankStatus: "pending",
    auditFlag: "Awaiting bank verification",
    lastUpdated: "2026-09-02",
  },
  {
    id: "comp-002",
    parcelId: "parcel-204",
    projectId: "prj-ir-01",
    ownerName: "Sunita Verma",
    village: "Mhow",
    district: "Indore",
    state: "Madhya Pradesh",
    awardAmountLakh: 72,
    solatiumLakh: 28,
    interestLakh: 6,
    totalAmountLakh: 106,
    status: "approved",
    reviewOwner: "District officer",
    paymentMode: "rtgs",
    bankStatus: "verified",
    auditFlag: "Ready for disbursement",
    lastUpdated: "2026-09-01",
  },
  {
    id: "comp-003",
    parcelId: "parcel-317",
    projectId: "prj-wr-12",
    ownerName: "Amit Oraon",
    village: "Kanke",
    district: "Ranchi",
    state: "Jharkhand",
    awardAmountLakh: 95,
    solatiumLakh: 37,
    interestLakh: 9,
    totalAmountLakh: 141,
    status: "draft",
    reviewOwner: "Survey liaison",
    paymentMode: "bank_transfer",
    bankStatus: "rejected",
    auditFlag: "Title objection blocks disbursement",
    lastUpdated: "2026-09-03",
  },
  {
    id: "comp-004",
    parcelId: "parcel-418",
    projectId: "prj-ir-01",
    ownerName: "Mohan Patel",
    village: "Shivpuri",
    district: "Indore",
    state: "Madhya Pradesh",
    awardAmountLakh: 51,
    solatiumLakh: 18,
    interestLakh: 3,
    totalAmountLakh: 72,
    status: "disbursed",
    reviewOwner: "Finance wing",
    paymentMode: "cheque",
    bankStatus: "verified",
    auditFlag: "Paid and archived",
    lastUpdated: "2026-08-29",
  },
];

const PAYMENTS: CompensationPayment[] = [
  {
    id: "pay-001",
    beneficiary: "Sunita Verma",
    parcelId: "parcel-204",
    projectId: "prj-ir-01",
    amountLakh: 106,
    mode: "rtgs",
    status: "approved",
    dueDate: "2026-09-08",
    verifiedBy: "District officer",
    remarks: "Approved by review committee; awaiting payment run.",
  },
  {
    id: "pay-002",
    beneficiary: "Mohan Patel",
    parcelId: "parcel-418",
    projectId: "prj-ir-01",
    amountLakh: 72,
    mode: "cheque",
    status: "disbursed",
    dueDate: "2026-08-29",
    paidDate: "2026-08-30",
    verifiedBy: "Finance wing",
    remarks: "Disbursed and reconciliation completed.",
  },
  {
    id: "pay-003",
    beneficiary: "Ramesh Singh",
    parcelId: "parcel-101",
    projectId: "prj-nh-07",
    amountLakh: 71,
    mode: "neft",
    status: "review",
    dueDate: "2026-09-10",
    verifiedBy: "Compensation desk",
    remarks: "Review pending bank verification and title reconciliation.",
  },
];

export const compensationService = {
  getCases() {
    return COMPENSATION_CASES.slice();
  },

  getPayments() {
    return PAYMENTS.slice();
  },

  getCaseById(caseId: string) {
    return COMPENSATION_CASES.find((entry) => entry.id === caseId) ?? null;
  },

  getCaseByParcel(parcelId: string) {
    return COMPENSATION_CASES.find((entry) => entry.parcelId === parcelId) ?? null;
  },

  getSummary(): CompensationSummary {
    return {
      totalCases: COMPENSATION_CASES.length,
      approvedCases: COMPENSATION_CASES.filter((entry) => entry.status === "approved").length,
      disbursedCases: COMPENSATION_CASES.filter((entry) => entry.status === "disbursed").length,
      totalPayoutLakh: COMPENSATION_CASES.reduce((sum, entry) => sum + entry.totalAmountLakh, 0),
      pendingPayoutLakh: COMPENSATION_CASES
        .filter((entry) => entry.status !== "disbursed")
        .reduce((sum, entry) => sum + entry.totalAmountLakh, 0),
      auditFlags: COMPENSATION_CASES.filter((entry) => entry.auditFlag).length,
    };
  },

  getStatusLabel(status: CompensationStatus) {
    switch (status) {
      case "draft":
        return "Draft";
      case "review":
        return "In review";
      case "approved":
        return "Approved";
      case "disbursed":
        return "Disbursed";
      default:
        return "Unknown";
    }
  },

  getLinkContext(caseId: string) {
    const compensationCase = this.getCaseById(caseId);
    if (!compensationCase) {
      return null;
    }

    const parcel = parcelService.getParcelById(compensationCase.parcelId);
    const project = projectService.getProjectById(compensationCase.projectId);
    return { compensationCase, parcel, project };
  },
};
