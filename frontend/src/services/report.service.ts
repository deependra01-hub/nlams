import type { ReportMetric, ReportRecord } from "../types/report.types";

const REPORTS: ReportRecord[] = [
  {
    id: "rep-001",
    title: "National operations snapshot",
    category: "operations",
    owner: "Operations cell",
    format: "dashboard",
    status: "ready",
    updatedAt: "2026-09-05",
    summary: "A live overview of projects, parcels, compensation, and rehabilitation throughput.",
  },
  {
    id: "rep-002",
    title: "Finance and payouts",
    category: "finance",
    owner: "Finance wing",
    format: "pdf",
    status: "scheduled",
    updatedAt: "2026-09-04",
    summary: "Award and disbursement summary for weekly finance review.",
  },
  {
    id: "rep-003",
    title: "Governance audit pack",
    category: "governance",
    owner: "Review cell",
    format: "xlsx",
    status: "draft",
    updatedAt: "2026-09-03",
    summary: "Exception log, approvals, and evidence trail for audit discussion.",
  },
];

const METRICS: ReportMetric[] = [
  { label: "Projects in motion", value: "3", detail: "Active portfolio items in the demo." },
  { label: "Verified parcels", value: "2", detail: "Approved in the current records set." },
  { label: "Payments queued", value: "1", detail: "Awaiting the next disbursement run." },
  { label: "Open grievances", value: "2", detail: "Issues still being reviewed." },
];

export const reportService = {
  getReports() {
    return REPORTS.slice();
  },

  getMetrics() {
    return METRICS.slice();
  },
};
