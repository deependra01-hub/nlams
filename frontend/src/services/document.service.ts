import { compensationService } from "./compensation.service";
import { parcelService } from "./parcel.service";
import { projectService } from "./project.service";
import { rehabilitationService } from "./rehabilitation.service";
import type {
  DocumentRecord,
  DocumentStatus,
  DocumentType,
  DocumentVerificationStatus,
} from "../types/document.types";

const DOCUMENTS: DocumentRecord[] = [
  {
    id: "doc-award-001",
    title: "Award Notice for NH-07 Varanasi Segment",
    referenceNo: "AWD/NH07/VNS/2026-08",
    type: "award_notice",
    status: "verified",
    summary:
      "Official award notice issued after survey closure, linked to the NH-07 acquisition package and ready for downstream payment processing.",
    ownerDepartment: "Compensation wing",
    uploadedAt: "2026-08-26",
    lastReviewedAt: "2026-09-03",
    fileName: "award_notice_nh07_varanasi.pdf",
    fileSizeKb: 842,
    pageCount: 6,
    versionCount: 3,
    source: "District records office",
    tags: ["award", "payment-ready", "verified"],
    linkedTo: {
      projectId: "prj-nh-07",
      parcelId: "parcel-101",
      compensationCaseId: "comp-001",
      familyId: "rr-001",
    },
    versions: [
      {
        id: "ver-1",
        version: "1.0",
        fileName: "award_notice_nh07_varanasi_v1.pdf",
        sizeKb: 816,
        uploadedBy: "District officer",
        uploadedAt: "2026-08-21",
        notes: "Initial scan from records room.",
      },
      {
        id: "ver-2",
        version: "1.1",
        fileName: "award_notice_nh07_varanasi_v1_1.pdf",
        sizeKb: 828,
        uploadedBy: "Records clerk",
        uploadedAt: "2026-08-24",
        notes: "Metadata corrected and pages reindexed.",
      },
      {
        id: "ver-3",
        version: "1.2",
        fileName: "award_notice_nh07_varanasi_final.pdf",
        sizeKb: 842,
        uploadedBy: "Compensation wing",
        uploadedAt: "2026-08-26",
        notes: "Final signed copy uploaded for archive.",
      },
    ],
    verification: {
      status: "verified",
      reviewer: "State review cell",
      reviewedAt: "2026-09-03",
      notes: "Signature, dates, and parcel references align with the compensation case.",
    },
  },
  {
    id: "doc-survey-002",
    title: "Survey Report for Industrial Ring Road",
    referenceNo: "SRV/IR01/IND/2026-06",
    type: "survey_report",
    status: "under_review",
    summary:
      "Boundary survey report used by field staff to reconcile map differences and title objections across the Indore corridor.",
    ownerDepartment: "Survey unit",
    uploadedAt: "2026-08-30",
    lastReviewedAt: "2026-09-02",
    fileName: "survey_report_ir01_indore.pdf",
    fileSizeKb: 1296,
    pageCount: 18,
    versionCount: 2,
    source: "Field survey tablet",
    tags: ["survey", "boundary", "review"],
    linkedTo: {
      projectId: "prj-ir-01",
      parcelId: "parcel-204",
    },
    versions: [
      {
        id: "ver-1",
        version: "1.0",
        fileName: "survey_report_ir01_indore_draft.pdf",
        sizeKb: 1240,
        uploadedBy: "Surveyor team",
        uploadedAt: "2026-08-27",
        notes: "Draft report captured in the field.",
      },
      {
        id: "ver-2",
        version: "1.1",
        fileName: "survey_report_ir01_indore_review.pdf",
        sizeKb: 1296,
        uploadedBy: "GIS analyst",
        uploadedAt: "2026-08-30",
        notes: "Boundary annotations and coordinate table appended.",
      },
    ],
    verification: {
      status: "pending",
      reviewer: "District officer",
      reviewedAt: null,
      notes: "Awaiting final title reconciliation before verification can close.",
    },
  },
  {
    id: "doc-mutation-003",
    title: "Mutation Record for Parcel 317/8",
    referenceNo: "MUT/KAN/2026-09",
    type: "mutation_record",
    status: "draft",
    summary:
      "Revenue mutation record prepared after boundary correction, currently held for objection settlement and supporting evidence updates.",
    ownerDepartment: "Revenue liaison",
    uploadedAt: "2026-09-01",
    lastReviewedAt: "2026-09-01",
    fileName: "mutation_record_parcel_317_8.pdf",
    fileSizeKb: 604,
    pageCount: 9,
    versionCount: 1,
    source: "Revenue office",
    tags: ["mutation", "parcel", "revenue"],
    linkedTo: {
      projectId: "prj-wr-12",
      parcelId: "parcel-317",
    },
    versions: [
      {
        id: "ver-1",
        version: "0.9",
        fileName: "mutation_record_parcel_317_8_draft.pdf",
        sizeKb: 604,
        uploadedBy: "Revenue clerk",
        uploadedAt: "2026-09-01",
        notes: "Draft mutation record prepared for objection review.",
      },
    ],
    verification: {
      status: "pending",
      reviewer: "Field officer",
      reviewedAt: null,
      notes: "Pending map correction and supporting signatures.",
    },
  },
  {
    id: "doc-rr-004",
    title: "R&R Sanction Order for Shivpuri Family",
    referenceNo: "RR/IR01/SHV/2026-08",
    type: "rr_order",
    status: "verified",
    summary:
      "Sanction order documenting rehabilitation entitlement, house-site support, and livelihood assistance for the Shivpuri family.",
    ownerDepartment: "R&R cell",
    uploadedAt: "2026-08-29",
    lastReviewedAt: "2026-09-04",
    fileName: "rr_sanction_order_shivpuri.pdf",
    fileSizeKb: 918,
    pageCount: 7,
    versionCount: 2,
    source: "R&R tracker",
    tags: ["rr", "sanction", "verified"],
    linkedTo: {
      projectId: "prj-ir-01",
      parcelId: "parcel-418",
      familyId: "rr-004",
      compensationCaseId: "comp-004",
    },
    versions: [
      {
        id: "ver-1",
        version: "1.0",
        fileName: "rr_sanction_order_shivpuri_v1.pdf",
        sizeKb: 890,
        uploadedBy: "RR coordinator",
        uploadedAt: "2026-08-25",
        notes: "Initial sanction order with entitlement summary.",
      },
      {
        id: "ver-2",
        version: "1.1",
        fileName: "rr_sanction_order_shivpuri_final.pdf",
        sizeKb: 918,
        uploadedBy: "R&R cell",
        uploadedAt: "2026-08-29",
        notes: "House-site and livelihood references aligned with the case file.",
      },
    ],
    verification: {
      status: "verified",
      reviewer: "Rehabilitation officer",
      reviewedAt: "2026-09-04",
      notes: "The order is complete and consistent with the family rehabilitation record.",
    },
  },
];

export const documentService = {
  getDocuments() {
    return DOCUMENTS.slice();
  },

  listDocuments(status?: DocumentStatus, query?: string) {
    const normalizedQuery = query?.trim().toLowerCase() ?? "";
    return DOCUMENTS.filter((document) => {
      const matchesStatus = !status || document.status === status;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          document.title,
          document.referenceNo,
          document.fileName,
          document.source,
          document.summary,
          ...document.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesStatus && matchesQuery;
    });
  },

  getDocumentById(documentId: string) {
    return DOCUMENTS.find((document) => document.id === documentId) ?? null;
  },

  getDocumentStats() {
    return {
      totalDocuments: DOCUMENTS.length,
      verifiedDocuments: DOCUMENTS.filter((document) => document.status === "verified").length,
      pendingReviewDocuments: DOCUMENTS.filter((document) => document.verification.status === "pending").length,
      linkedProjects: new Set(
        DOCUMENTS.flatMap((document) => Object.values(document.linkedTo).filter(Boolean)),
      ).size,
      totalVersions: DOCUMENTS.reduce((sum, document) => sum + document.versions.length, 0),
    };
  },

  getTypeLabel(type: DocumentType) {
    switch (type) {
      case "award_notice":
        return "Award notice";
      case "survey_report":
        return "Survey report";
      case "mutation_record":
        return "Mutation record";
      case "identity_proof":
        return "Identity proof";
      case "consent_deed":
        return "Consent deed";
      case "compensation_receipt":
        return "Compensation receipt";
      case "rr_order":
        return "R&R order";
      case "boundary_map":
        return "Boundary map";
      default:
        return "Document";
    }
  },

  getStatusLabel(status: DocumentStatus) {
    switch (status) {
      case "draft":
        return "Draft";
      case "under_review":
        return "Under review";
      case "verified":
        return "Verified";
      case "rejected":
        return "Rejected";
      case "archived":
        return "Archived";
      default:
        return "Unknown";
    }
  },

  getVerificationLabel(status: DocumentVerificationStatus) {
    switch (status) {
      case "pending":
        return "Pending";
      case "verified":
        return "Verified";
      case "rejected":
        return "Rejected";
      default:
        return "Unknown";
    }
  },

  getRelatedProject(document: DocumentRecord) {
    return document.linkedTo.projectId ? projectService.getProjectById(document.linkedTo.projectId) : null;
  },

  getRelatedParcel(document: DocumentRecord) {
    return document.linkedTo.parcelId ? parcelService.getParcelById(document.linkedTo.parcelId) : null;
  },

  getRelatedCompensation(document: DocumentRecord) {
    return document.linkedTo.compensationCaseId
      ? compensationService.getCaseById(document.linkedTo.compensationCaseId)
      : null;
  },

  getRelatedFamily(document: DocumentRecord) {
    return document.linkedTo.familyId ? rehabilitationService.getFamilyById(document.linkedTo.familyId) : null;
  },
};
