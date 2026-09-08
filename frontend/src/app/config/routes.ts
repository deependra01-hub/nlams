export interface RouteHeader {
  title: string;
  description: string;
  breadcrumbs: Array<{ label: string; to?: string }>;
}

const ROUTE_HEADERS: Record<string, RouteHeader> = {
  "/dashboard": {
    title: "Dashboard",
    description: "Operational shell preview for national land acquisition monitoring.",
    breadcrumbs: [{ label: "Dashboard" }],
  },
  "/projects": {
    title: "Projects",
    description: "Portfolio overview for acquisition, award, and possession tracking.",
    breadcrumbs: [{ label: "Projects" }],
  },
  "/projects/create": {
    title: "Create Project",
    description: "Draft a new acquisition portfolio entry.",
    breadcrumbs: [
      { label: "Projects", to: "/projects" },
      { label: "Create Project" },
    ],
  },
  "/parcels": {
    title: "Parcels",
    description: "Parcel registry and land record verification overview.",
    breadcrumbs: [{ label: "Parcels" }],
  },
  "/land-verification": {
    title: "Land Verification",
    description: "Parcel review workflow for ownership and mutation confirmation.",
    breadcrumbs: [{ label: "Land Verification" }],
  },
  "/gis": {
    title: "GIS Explorer",
    description: "Spatial operations, layer toggles, and feature review.",
    breadcrumbs: [{ label: "GIS Explorer" }],
  },
  "/compensation": {
    title: "Compensation",
    description: "Award review, verification, and payment readiness workflow.",
    breadcrumbs: [{ label: "Compensation" }],
  },
  "/compensation/payments": {
    title: "Payments",
    description: "Disbursement queue and payment tracking.",
    breadcrumbs: [
      { label: "Compensation", to: "/compensation" },
      { label: "Payments" },
    ],
  },
  "/rr": {
    title: "R&R",
    description: "Rehabilitation and resettlement overview.",
    breadcrumbs: [{ label: "R&R" }],
  },
  "/rr/families": {
    title: "R&R Families",
    description: "Family rehabilitation records and progress tracking.",
    breadcrumbs: [
      { label: "R&R", to: "/rr" },
      { label: "Families" },
    ],
  },
  "/acquisition": {
    title: "Acquisition",
    description: "Acquisition workflow overview with surveys, hearings, awards, and possession.",
    breadcrumbs: [{ label: "Acquisition" }],
  },
  "/acquisition/awards": {
    title: "Awards",
    description: "Award notice review and issuance tracking.",
    breadcrumbs: [
      { label: "Acquisition", to: "/acquisition" },
      { label: "Awards" },
    ],
  },
  "/acquisition/hearings": {
    title: "Hearings",
    description: "Hearing calendar and objection resolution workflow.",
    breadcrumbs: [
      { label: "Acquisition", to: "/acquisition" },
      { label: "Hearings" },
    ],
  },
  "/acquisition/objections": {
    title: "Objections",
    description: "Objection queue and review status tracking.",
    breadcrumbs: [
      { label: "Acquisition", to: "/acquisition" },
      { label: "Objections" },
    ],
  },
  "/acquisition/possession": {
    title: "Possession",
    description: "Possession scheduling and handover preparation.",
    breadcrumbs: [
      { label: "Acquisition", to: "/acquisition" },
      { label: "Possession" },
    ],
  },
  "/acquisition/notifications": {
    title: "Notifications",
    description: "Notice distribution and operational alert tracking.",
    breadcrumbs: [
      { label: "Acquisition", to: "/acquisition" },
      { label: "Notifications" },
    ],
  },
  "/documents": {
    title: "Documents",
    description: "Versioned evidence repository for acquisition, compensation, and rehabilitation.",
    breadcrumbs: [{ label: "Documents" }],
  },
  "/documents/:documentId": {
    title: "Document Details",
    description: "Detailed review of one document and its linked records.",
    breadcrumbs: [
      { label: "Documents", to: "/documents" },
      { label: "Details" },
    ],
  },
  "/ai": {
    title: "AI Intelligence",
    description: "Risk scoring and next-action suggestions across the acquisition workflow.",
    breadcrumbs: [{ label: "AI Intelligence" }],
  },
  "/simulator": {
    title: "Impact Simulator",
    description: "Scenario comparison and planning workspace.",
    breadcrumbs: [{ label: "Impact Simulator" }],
  },
  "/simulator/create": {
    title: "Create Scenario",
    description: "Draft a new scenario for impact planning.",
    breadcrumbs: [
      { label: "Impact Simulator", to: "/simulator" },
      { label: "Create Scenario" },
    ],
  },
  "/reports": {
    title: "Reports",
    description: "Operational summaries and export-ready work products.",
    breadcrumbs: [{ label: "Reports" }],
  },
  "/reports/analytics": {
    title: "Analytics",
    description: "Compact performance view for the current demo data.",
    breadcrumbs: [
      { label: "Reports", to: "/reports" },
      { label: "Analytics" },
    ],
  },
  "/grievances": {
    title: "Grievances",
    description: "Complaint management and resolution workflow.",
    breadcrumbs: [{ label: "Grievances" }],
  },
  "/notifications": {
    title: "Notifications",
    description: "Operational alerts and preferences.",
    breadcrumbs: [{ label: "Notifications" }],
  },
  "/admin/users": {
    title: "Users",
    description: "User account management.",
    breadcrumbs: [{ label: "Administration", to: "/admin/users" }, { label: "Users" }],
  },
  "/admin/roles": {
    title: "Roles",
    description: "Role configuration and allocation.",
    breadcrumbs: [{ label: "Administration", to: "/admin/users" }, { label: "Roles" }],
  },
  "/admin/permissions": {
    title: "Permissions",
    description: "Access control matrix.",
    breadcrumbs: [{ label: "Administration", to: "/admin/users" }, { label: "Permissions" }],
  },
  "/admin/data-sources": {
    title: "Data Sources",
    description: "Integration health and sync status.",
    breadcrumbs: [{ label: "Administration", to: "/admin/users" }, { label: "Data Sources" }],
  },
  "/admin/audit-logs": {
    title: "Audit Logs",
    description: "Recent tracked actions and system history.",
    breadcrumbs: [{ label: "Administration", to: "/admin/users" }, { label: "Audit Logs" }],
  },
};

export function getRouteHeader(pathname: string): RouteHeader {
  return (
    ROUTE_HEADERS[pathname] ?? {
      title: humanizePath(pathname),
      description: "Navigation and layout shell for the NLAMS frontend.",
      breadcrumbs: pathname
        .split("/")
        .filter(Boolean)
        .map((segment, index, parts) => ({
          label: humanizeSegment(segment),
          to: `/${parts.slice(0, index + 1).join("/")}`,
        })),
    }
  );
}

function humanizePath(pathname: string) {
  return pathname
    .split("/")
    .filter(Boolean)
    .map(humanizeSegment)
    .join(" ");
}

function humanizeSegment(segment: string) {
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
