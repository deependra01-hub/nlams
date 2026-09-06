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

export interface NavItem {
  label: string;
  path: string;
  icon: ComponentType<{ className?: string }>;
  description: string;
  available: boolean;
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
  },
  {
    label: "R&R",
    path: "/rr",
    icon: ShieldCheck,
    description: "Families and rehabilitation",
    available: true,
  },
  {
    label: "Documents",
    path: "/documents",
    icon: FileText,
    description: "Versioned evidence",
    available: true,
  },
  {
    label: "AI Intelligence",
    path: "/ai",
    icon: Radar,
    description: "Risk prediction and explanation",
    available: true,
  },
  {
    label: "Impact Simulator",
    path: "/simulator",
    icon: Sparkles,
    description: "Scenario comparison",
    available: true,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: ChartColumnBig,
    description: "Exports and summaries",
    available: true,
  },
  {
    label: "Grievances",
    path: "/grievances",
    icon: NotebookPen,
    description: "Issue tracking",
    available: true,
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
  },
];

export const SECONDARY_NAV_ITEMS: NavItem[] = [
  {
    label: "Land Verification",
    path: "/land-verification",
    icon: ShieldCheck,
    description: "Parcel review and approval",
    available: true,
  },
  {
    label: "R&R Families",
    path: "/rr/families",
    icon: Users,
    description: "Family rehab records",
    available: true,
  },
  {
    label: "Audit Logs",
    path: "/audit",
    icon: Workflow,
    description: "Immutable event history",
    available: true,
  },
];

export const GEO_FILTER_OPTIONS: GeoOption[] = [
  { label: "National", value: "national", detail: "All regions" },
  { label: "State", value: "state", detail: "State-wide scope" },
  { label: "District", value: "district", detail: "District focus" },
];

export const DEMO_ROLE_LABEL = "Central Administrator";
