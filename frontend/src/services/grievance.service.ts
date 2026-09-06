import type { GrievanceRecord, GrievanceSummary, GrievanceStatus } from "../types/grievance.types";

const GRIEVANCES: GrievanceRecord[] = [
  {
    id: "g-001",
    subject: "Boundary disagreement at Sarnath",
    complainant: "Ramesh Singh",
    district: "Varanasi",
    projectId: "prj-nh-07",
    status: "investigating",
    priority: "high",
    category: "survey",
    assignedTo: "Field officer",
    openedAt: "2026-09-01",
    summary: "The complainant contests the mapped boundary and requested a second field review.",
    updates: [
      { id: "u1", date: "2026-09-02", author: "Field officer", note: "Second survey booked for verification." },
      { id: "u2", date: "2026-09-04", author: "Records unit", note: "Map overlay updated with corrected edge." },
    ],
  },
  {
    id: "g-002",
    subject: "Compensation payout delay",
    complainant: "Sunita Verma",
    district: "Indore",
    projectId: "prj-ir-01",
    status: "resolved",
    priority: "medium",
    category: "finance",
    assignedTo: "Compensation desk",
    openedAt: "2026-08-29",
    summary: "Payout was delayed by bank verification and has now been queued for disbursement.",
    updates: [
      { id: "u1", date: "2026-08-30", author: "Compensation desk", note: "Bank details matched." },
      { id: "u2", date: "2026-09-01", author: "District officer", note: "Resolution shared with the complainant." },
    ],
  },
  {
    id: "g-003",
    subject: "R&R package clarification",
    complainant: "Amit Oraon",
    district: "Ranchi",
    projectId: "prj-wr-12",
    status: "new",
    priority: "critical",
    category: "rehabilitation",
    assignedTo: "RR cell",
    openedAt: "2026-09-05",
    summary: "The family needs guidance on house-site eligibility and livelihood support sequencing.",
    updates: [{ id: "u1", date: "2026-09-05", author: "RR cell", note: "Initial acknowledgement sent." }],
  },
];

export const grievanceService = {
  getGrievances() {
    return GRIEVANCES.slice();
  },

  getGrievanceById(grievanceId: string) {
    return GRIEVANCES.find((entry) => entry.id === grievanceId) ?? null;
  },

  getSummary(): GrievanceSummary {
    return {
      total: GRIEVANCES.length,
      open: GRIEVANCES.filter((entry) => entry.status === "new").length,
      investigating: GRIEVANCES.filter((entry) => entry.status === "investigating").length,
      resolved: GRIEVANCES.filter((entry) => entry.status === "resolved" || entry.status === "closed").length,
    };
  },

  getStatusLabel(status: GrievanceStatus) {
    switch (status) {
      case "new":
        return "New";
      case "investigating":
        return "Investigating";
      case "resolved":
        return "Resolved";
      case "closed":
        return "Closed";
    }
  },
};
