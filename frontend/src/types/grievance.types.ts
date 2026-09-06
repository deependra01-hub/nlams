export type GrievanceStatus = "new" | "investigating" | "resolved" | "closed";
export type GrievancePriority = "low" | "medium" | "high" | "critical";

export interface GrievanceUpdate {
  id: string;
  date: string;
  author: string;
  note: string;
}

export interface GrievanceRecord {
  id: string;
  subject: string;
  complainant: string;
  district: string;
  projectId: string;
  status: GrievanceStatus;
  priority: GrievancePriority;
  category: string;
  assignedTo: string;
  openedAt: string;
  summary: string;
  updates: GrievanceUpdate[];
}

export interface GrievanceSummary {
  total: number;
  open: number;
  investigating: number;
  resolved: number;
}
