import { parcelService } from "./parcel.service";
import { projectService } from "./project.service";
import type {
  AcquisitionCase,
  AcquisitionStage,
  AcquisitionStatus,
  AcquisitionSummary,
} from "../types/acquisition.types";

const ACQUISITION_CASES: AcquisitionCase[] = [
  {
    id: "aq-001",
    projectId: "prj-nh-07",
    parcelId: "parcel-101",
    title: "NH-07 Varanasi corridor",
    district: "Varanasi",
    state: "Uttar Pradesh",
    stage: "award",
    status: "in_progress",
    progress: 72,
    priority: "high",
    owner: "Compensation wing",
    summary:
      "Survey and hearing records are complete, with award notices issued and possession scheduling underway.",
    lastUpdated: "2026-09-04",
    notices: [
      {
        id: "n1",
        title: "Public survey notice",
        noticeDate: "2026-05-02",
        issuedBy: "District officer",
        summary: "Notice published for corridor alignment and boundary verification.",
      },
      {
        id: "n2",
        title: "Award publication notice",
        noticeDate: "2026-08-20",
        issuedBy: "Compensation desk",
        summary: "Award notice shared with affected families and project team.",
      },
    ],
    hearings: [
      {
        id: "h1",
        hearingDate: "2026-07-18",
        venue: "Varanasi collectorate",
        officer: "Land acquisition officer",
        outcome: "closed",
        remarks: "All major objections were heard and documented.",
      },
    ],
    objections: [
      {
        id: "o1",
        raisedBy: "Ramesh Singh",
        category: "Boundary overlap",
        status: "resolved",
        raisedAt: "2026-07-10",
        notes: "Field measurement updated and accepted by both parties.",
      },
    ],
    award: {
      id: "a1",
      awardNo: "AWD/NH07/VNS/2026-08",
      awardDate: "2026-08-19",
      amountLakh: 71,
      approvedBy: "State review cell",
      remarks: "Award issued after hearing closure and parcel verification.",
    },
    possession: {
      id: "p1",
      possessionDate: "2026-10-20",
      handoverOfficer: "District officer",
      status: "scheduled",
      notes: "Possession handoff planned after payment confirmation.",
    },
    notifications: ["Survey notice sent", "Award notice published", "Possession slot reserved"],
  },
  {
    id: "aq-002",
    projectId: "prj-ir-01",
    parcelId: "parcel-204",
    title: "Industrial Ring Road Indore section",
    district: "Indore",
    state: "Madhya Pradesh",
    stage: "hearing",
    status: "in_progress",
    progress: 54,
    priority: "medium",
    owner: "Project agency",
    summary:
      "The corridor is in hearing and objection review, with award preparation waiting on final record correction.",
    lastUpdated: "2026-09-03",
    notices: [
      {
        id: "n1",
        title: "Section hearing notice",
        noticeDate: "2026-08-12",
        issuedBy: "Project agency",
        summary: "Schedule shared with landowners and field staff for the Indore section.",
      },
    ],
    hearings: [
      {
        id: "h1",
        hearingDate: "2026-08-28",
        venue: "Indore divisional office",
        officer: "District officer",
        outcome: "adjourned",
        remarks: "One title objection remains open for record correction.",
      },
    ],
    objections: [
      {
        id: "o1",
        raisedBy: "Sunita Verma",
        category: "Mutation record",
        status: "under_review",
        raisedAt: "2026-08-25",
        notes: "Document review in progress with revenue liaison.",
      },
    ],
    award: null,
    possession: {
      id: "p1",
      possessionDate: null,
      handoverOfficer: "Project agency",
      status: "pending",
      notes: "Cannot schedule until objection review is closed.",
    },
    notifications: ["Hearing notice issued", "Objection review pending", "Award draft queued"],
  },
  {
    id: "aq-003",
    projectId: "prj-wr-12",
    parcelId: "parcel-317",
    title: "Western Rail Link Ranchi approach road",
    district: "Ranchi",
    state: "Jharkhand",
    stage: "survey",
    status: "blocked",
    progress: 28,
    priority: "critical",
    owner: "Survey liaison",
    summary:
      "Survey work is blocked by a parcel-level title dispute and must be reopened after the records team closes the objection.",
    lastUpdated: "2026-09-05",
    notices: [
      {
        id: "n1",
        title: "Survey rescheduling note",
        noticeDate: "2026-09-01",
        issuedBy: "Field officer",
        summary: "Teams notified that the survey will restart after objection closure.",
      },
    ],
    hearings: [
      {
        id: "h1",
        hearingDate: "2026-09-04",
        venue: "Ranchi records office",
        officer: "Revenue officer",
        outcome: "pending",
        remarks: "Hearing postponed until map correction arrives.",
      },
    ],
    objections: [
      {
        id: "o1",
        raisedBy: "Amit Oraon",
        category: "Title dispute",
        status: "open",
        raisedAt: "2026-09-02",
        notes: "Blocker remains active until cadastral records are updated.",
      },
    ],
    award: null,
    possession: null,
    notifications: ["Survey paused", "Title dispute escalated", "Records team assigned"],
  },
];

function matchesStatus(status: AcquisitionStatus | undefined, item: AcquisitionCase) {
  return !status || item.status === status;
}

export const acquisitionService = {
  getCases() {
    return ACQUISITION_CASES.slice();
  },

  getCaseById(caseId: string) {
    return ACQUISITION_CASES.find((entry) => entry.id === caseId) ?? null;
  },

  listCases(status?: AcquisitionStatus, query?: string) {
    const normalizedQuery = query?.trim().toLowerCase() ?? "";
    return ACQUISITION_CASES.filter((entry) => {
      const text = [
        entry.title,
        entry.district,
        entry.state,
        entry.owner,
        entry.summary,
        ...entry.notifications,
      ]
        .join(" ")
        .toLowerCase();
      return matchesStatus(status, entry) && (normalizedQuery.length === 0 || text.includes(normalizedQuery));
    });
  },

  getSummary(): AcquisitionSummary {
    return {
      totalCases: ACQUISITION_CASES.length,
      activeCases: ACQUISITION_CASES.filter((entry) => entry.status === "in_progress").length,
      blockedCases: ACQUISITION_CASES.filter((entry) => entry.status === "blocked").length,
      completedCases: ACQUISITION_CASES.filter((entry) => entry.status === "completed").length,
      pendingHearings: ACQUISITION_CASES.filter((entry) =>
        entry.hearings.some((hearing) => hearing.outcome === "pending" || hearing.outcome === "adjourned"),
      ).length,
      pendingPossessions: ACQUISITION_CASES.filter((entry) => entry.possession?.status !== "handed_over").length,
    };
  },

  getStageLabel(stage: AcquisitionStage) {
    switch (stage) {
      case "survey":
        return "Survey";
      case "hearing":
        return "Hearing";
      case "award":
        return "Award";
      case "disbursement":
        return "Disbursement";
      case "possession":
        return "Possession";
      default:
        return "Unknown";
    }
  },

  getStatusLabel(status: AcquisitionStatus) {
    switch (status) {
      case "planning":
        return "Planning";
      case "in_progress":
        return "In progress";
      case "blocked":
        return "Blocked";
      case "completed":
        return "Completed";
      default:
        return "Unknown";
    }
  },

  getLinkContext(caseId: string) {
    const acquisitionCase = this.getCaseById(caseId);
    if (!acquisitionCase) return null;
    return {
      acquisitionCase,
      project: projectService.getProjectById(acquisitionCase.projectId),
      parcel: parcelService.getParcelById(acquisitionCase.parcelId),
    };
  },
};
