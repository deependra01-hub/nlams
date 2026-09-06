import { compensationService } from "./compensation.service";
import { parcelService } from "./parcel.service";
import { projectService } from "./project.service";
import type { RRFamily, RRMilestone, RRSummary, RRStatus } from "../types/rr.types";

const RR_FAMILIES: RRFamily[] = [
  {
    id: "rr-001",
    headName: "Ramesh Singh",
    village: "Sarnath",
    district: "Varanasi",
    state: "Uttar Pradesh",
    parcelId: "parcel-101",
    projectId: "prj-nh-07",
    displacementType: "partial",
    members: 5,
    livelihoodSource: "Agriculture",
    housingOption: "Self relocation support",
    rehabilitationBenefitLakh: 14,
    status: "in_progress",
    counsellor: "RR cell",
    lastVisit: "2026-09-03",
    remarks: "Family orientation completed; awaiting house site confirmation.",
  },
  {
    id: "rr-002",
    headName: "Sunita Verma",
    village: "Mhow",
    district: "Indore",
    state: "Madhya Pradesh",
    parcelId: "parcel-204",
    projectId: "prj-ir-01",
    displacementType: "temporary",
    members: 4,
    livelihoodSource: "Shop keeping",
    housingOption: "Rental allowance",
    rehabilitationBenefitLakh: 9,
    status: "completed",
    counsellor: "District officer",
    lastVisit: "2026-09-01",
    remarks: "Relocation package completed and settlement support documented.",
  },
  {
    id: "rr-003",
    headName: "Amit Oraon",
    village: "Kanke",
    district: "Ranchi",
    state: "Jharkhand",
    parcelId: "parcel-317",
    projectId: "prj-wr-12",
    displacementType: "full",
    members: 7,
    livelihoodSource: "Mixed farming",
    housingOption: "House site pending",
    rehabilitationBenefitLakh: 18,
    status: "not_started",
    counsellor: "Field liaison",
    lastVisit: "2026-09-02",
    remarks: "Legal objection is delaying the R&R intake interview.",
  },
  {
    id: "rr-004",
    headName: "Mohan Patel",
    village: "Shivpuri",
    district: "Indore",
    state: "Madhya Pradesh",
    parcelId: "parcel-418",
    projectId: "prj-ir-01",
    displacementType: "partial",
    members: 6,
    livelihoodSource: "Agriculture",
    housingOption: "In-situ development",
    rehabilitationBenefitLakh: 12,
    status: "partially_completed",
    counsellor: "RR coordinator",
    lastVisit: "2026-08-31",
    remarks: "House site approved; livelihood package remaining.",
  },
];

const RR_MILESTONES: RRMilestone[] = [
  { label: "Intake interview", status: "done" },
  { label: "Socio-economic survey", status: "done" },
  { label: "Benefit sanction", status: "current" },
  { label: "House site handoff", status: "upcoming" },
  { label: "Livelihood support", status: "upcoming" },
];

export const rehabilitationService = {
  getFamilies() {
    return RR_FAMILIES.slice();
  },

  getFamilyById(familyId: string) {
    return RR_FAMILIES.find((family) => family.id === familyId) ?? null;
  },

  getFamilyByParcel(parcelId: string) {
    return RR_FAMILIES.find((family) => family.parcelId === parcelId) ?? null;
  },

  getSummary(): RRSummary {
    return {
      totalFamilies: RR_FAMILIES.length,
      completedFamilies: RR_FAMILIES.filter((family) => family.status === "completed").length,
      inProgressFamilies: RR_FAMILIES.filter((family) => family.status === "in_progress" || family.status === "partially_completed").length,
      totalBenefitLakh: RR_FAMILIES.reduce((sum, family) => sum + family.rehabilitationBenefitLakh, 0),
      pendingHouseSites: RR_FAMILIES.filter((family) => family.housingOption.includes("pending")).length,
    };
  },

  getMilestones(): RRMilestone[] {
    return RR_MILESTONES.slice();
  },

  getStatusLabel(status: RRStatus) {
    switch (status) {
      case "not_started":
        return "Not started";
      case "in_progress":
        return "In progress";
      case "partially_completed":
        return "Partially completed";
      case "completed":
        return "Completed";
      default:
        return "Unknown";
    }
  },

  getLinkContext(familyId: string) {
    const family = this.getFamilyById(familyId);
    if (!family) return null;
    return {
      family,
      parcel: parcelService.getParcelById(family.parcelId),
      project: projectService.getProjectById(family.projectId),
      compensationCase: compensationService.getCaseByParcel(family.parcelId),
    };
  },
};
