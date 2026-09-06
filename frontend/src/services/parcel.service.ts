import type { Parcel, ParcelStatus } from "../types/parcel.types";

const PARCELS: Parcel[] = [
  {
    id: "parcel-101",
    surveyNo: "101/3",
    khataNo: "K-0098",
    village: "Sarnath",
    district: "Varanasi",
    state: "Uttar Pradesh",
    landUse: "Agricultural",
    areaHectare: 0.84,
    ownerName: "Ramesh Singh",
    fatherName: "Late Mahendra Singh",
    possessionType: "Registered owner",
    status: "under_review",
    verificationStatus: "in_review",
    valuationLakh: 48,
    mutationStatus: "Pending mutation update",
    lastUpdated: "2026-08-28",
    linkedProjectCode: "NH-07/UP",
    issues: [
      { id: "i1", title: "Boundary overlap with adjoining parcel", severity: "high" },
      { id: "i2", title: "Mutation record not yet updated", severity: "medium" },
    ],
    remarks: "Measurements were rechecked during the latest field survey.",
  },
  {
    id: "parcel-204",
    surveyNo: "204/1",
    khataNo: "K-0135",
    village: "Mhow",
    district: "Indore",
    state: "Madhya Pradesh",
    landUse: "Residential",
    areaHectare: 0.36,
    ownerName: "Sunita Verma",
    fatherName: "Gopal Verma",
    possessionType: "Joint family possession",
    status: "verified",
    verificationStatus: "approved",
    valuationLakh: 72,
    mutationStatus: "Verified",
    lastUpdated: "2026-08-31",
    linkedProjectCode: "IR-01/MP",
    issues: [
      { id: "i1", title: "No active objections", severity: "low" },
    ],
    remarks: "Ownership documents and field verification agree on current boundaries.",
  },
  {
    id: "parcel-317",
    surveyNo: "317/8",
    khataNo: "K-0462",
    village: "Kanke",
    district: "Ranchi",
    state: "Jharkhand",
    landUse: "Mixed use",
    areaHectare: 1.12,
    ownerName: "Amit Oraon",
    fatherName: "Suresh Oraon",
    possessionType: "Leasehold",
    status: "objection",
    verificationStatus: "pending",
    valuationLakh: 95,
    mutationStatus: "Awaiting revenue record correction",
    lastUpdated: "2026-09-02",
    linkedProjectCode: "WR-12/JH",
    issues: [
      { id: "i1", title: "Title objection submitted", severity: "critical" },
      { id: "i2", title: "Revenue map mismatch", severity: "high" },
    ],
    remarks: "Parcel is blocked until title and map discrepancies are resolved.",
  },
  {
    id: "parcel-418",
    surveyNo: "418/5",
    khataNo: "K-0771",
    village: "Shivpuri",
    district: "Indore",
    state: "Madhya Pradesh",
    landUse: "Agricultural",
    areaHectare: 0.67,
    ownerName: "Mohan Patel",
    fatherName: "Keshav Patel",
    possessionType: "Tenant possession",
    status: "ready_for_award",
    verificationStatus: "approved",
    valuationLakh: 51,
    mutationStatus: "Completed",
    lastUpdated: "2026-08-21",
    linkedProjectCode: "IR-01/MP",
    issues: [],
    remarks: "Ready for award issuance after payment scheduling.",
  },
];

export const parcelService = {
  getParcels() {
    return PARCELS.slice();
  },

  listParcels(status?: ParcelStatus) {
    return status ? PARCELS.filter((parcel) => parcel.status === status) : PARCELS;
  },

  getParcelById(parcelId: string) {
    return PARCELS.find((parcel) => parcel.id === parcelId || parcel.surveyNo === parcelId) ?? null;
  },

  getStats() {
    return {
      totalParcels: PARCELS.length,
      verifiedParcels: PARCELS.filter((parcel) => parcel.verificationStatus === "approved").length,
      objectionCount: PARCELS.filter((parcel) => parcel.status === "objection").length,
      totalAreaHectare: PARCELS.reduce((sum, parcel) => sum + parcel.areaHectare, 0),
      averageValuationLakh: Math.round(
        PARCELS.reduce((sum, parcel) => sum + parcel.valuationLakh, 0) / PARCELS.length,
      ),
    };
  },
};
