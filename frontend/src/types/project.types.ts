export type ProjectStatus = "planning" | "survey" | "acquisition" | "award" | "possession";

export interface ProjectMilestone {
  id: string;
  title: string;
  status: "done" | "current" | "upcoming";
  date: string;
}

export interface ProjectIssue {
  id: string;
  title: string;
  severity: "low" | "medium" | "high" | "critical";
  owner: string;
}

export interface Project {
  id: string;
  code: string;
  name: string;
  state: string;
  district: string;
  agency: string;
  status: ProjectStatus;
  progress: number;
  riskScore: number;
  budgetCrore: number;
  parcels: number;
  affectedFamilies: number;
  startDate: string;
  targetDate: string;
  description: string;
  milestones: ProjectMilestone[];
  issues: ProjectIssue[];
}
