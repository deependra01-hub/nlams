import {
  Bell,
  ChartColumnBig,
  FileText,
  Gauge,
  Landmark,
  Map,
  NotebookPen,
  Radar,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  SquareKanban,
  Users,
  Workflow,
} from "lucide-react";
import type { ComponentType } from "react";
import type { Role } from "../../types/domain";

export interface NavItem {
  label: string;
  path: string;
  icon: ComponentType<{ className?: string }>;
  description: string;
  available: boolean;
  hiddenRoles?: Role[];
}

export interface GeoOption {
  label: string;
  value: string;
  detail: string;
}

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: Gauge,
    description: "National command center",
    available: true,
  },
  {
    label: "Projects",
    path: "/projects",
    icon: SquareKanban,
    description: "Acquisition portfolio",
    available: true,
  },
  {
    label: "Land Parcels",
    path: "/parcels",
    icon: Landmark,
    description: "Parcel registry",
    available: true,
  },
  {
    label: "GIS Explorer",
    path: "/gis",
    icon: Map,
    description: "Spatial operations",
    available: true,
  },
  {
    label: "Acquisition",
    path: "/acquisition",
    icon: Workflow,
    description: "Lifecycle tracking",
    available: true,
  },
  {
    label: "Compensation",
    path: "/compensation",
    icon: ReceiptText,
    description: "Assessments and payouts",
    available: true,
    hiddenRoles: ["state_officer", "district_officer"],
  },
  {
    label: "R&R",
    path: "/rr",
    icon: ShieldCheck,
    description: "Families and rehabilitation",
    available: true,
    hiddenRoles: ["state_officer", "district_officer"],
  },
  {
    label: "Documents",
    path: "/documents",
    icon: FileText,
    description: "Versioned evidence",
    available: true,
    hiddenRoles: ["state_officer", "district_officer"],
  },
  {
    label: "AI Intelligence",
    path: "/ai",
    icon: Radar,
    description: "Risk prediction and explanation",
    available: true,
    hiddenRoles: ["state_officer", "district_officer"],
  },
  {
    label: "Impact Simulator",
    path: "/simulator",
    icon: Sparkles,
    description: "Scenario comparison",
    available: true,
    hiddenRoles: ["state_officer", "district_officer"],
  },
  {
    label: "Reports",
    path: "/reports",
    icon: ChartColumnBig,
    description: "Exports and summaries",
    available: true,
    hiddenRoles: ["state_officer", "district_officer"],
  },
  {
    label: "Grievances",
    path: "/grievances",
    icon: NotebookPen,
    description: "Issue tracking",
    available: true,
    hiddenRoles: ["state_officer", "district_officer"],
  },
  {
    label: "Notifications",
    path: "/notifications",
    icon: Bell,
    description: "Operational alerts",
    available: true,
  },
  {
    label: "Administration",
    path: "/admin/users",
    icon: Users,
    description: "Users and permissions",
    available: true,
    hiddenRoles: ["state_officer", "district_officer"],
  },
];

export const SECONDARY_NAV_ITEMS: NavItem[] = [
  {
    label: "Land Verification",
    path: "/land-verification",
    icon: ShieldCheck,
    description: "Parcel review and approval",
    available: true,
    hiddenRoles: ["state_officer", "district_officer"],
  },
  {
    label: "R&R Families",
    path: "/rr/families",
    icon: Users,
    description: "Family rehab records",
    available: true,
    hiddenRoles: ["state_officer", "district_officer"],
  },
  {
    label: "Audit Logs",
    path: "/admin/audit-logs",
    icon: Workflow,
    description: "Immutable event history",
    available: true,
    hiddenRoles: ["state_officer", "district_officer"],
  },
];

export const GEO_FILTER_OPTIONS: GeoOption[] = [
  { label: "National", value: "national", detail: "All regions" },
  { label: "State", value: "state", detail: "State-wide scope" },
  { label: "District", value: "district", detail: "District focus" },
];

export const ROLE_LABELS: Record<Role, string> = {
  central_admin: "Central Administrator",
  state_officer: "State Officer",
  district_officer: "District Officer",
  project_agency_officer: "Project Agency Officer",
  field_officer: "Field Officer",
  reviewer: "Reviewer",
};

export function getRoleLabel(role?: Role | null) {
  return role ? ROLE_LABELS[role] : "Central Administrator";
}
