export type ReportCategory = "operations" | "finance" | "governance" | "delivery";

export interface ReportRecord {
  id: string;
  title: string;
  category: ReportCategory;
  owner: string;
  format: "pdf" | "xlsx" | "dashboard";
  status: "ready" | "draft" | "scheduled";
  updatedAt: string;
  summary: string;
}

export interface ReportMetric {
  label: string;
  value: string;
  detail: string;
}
