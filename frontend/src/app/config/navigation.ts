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
    available: false,
  },
  {
    label: "Land Parcels",
    path: "/parcels",
    icon: Landmark,
    description: "Parcel registry",
    available: false,
  },
  {
    label: "GIS Explorer",
    path: "/gis",
    icon: Map,
    description: "Spatial operations",
    available: false,
  },
  {
    label: "Acquisition",
    path: "/acquisition",
    icon: Workflow,
    description: "Lifecycle tracking",
    available: false,
  },
  {
    label: "Compensation",
    path: "/compensation",
    icon: ReceiptText,
    description: "Assessments and payouts",
    available: false,
  },
  {
    label: "R&R",
    path: "/rr",
    icon: ShieldCheck,
    description: "Families and rehabilitation",
    available: false,
  },
  {
    label: "Documents",
    path: "/documents",
    icon: FileText,
    description: "Versioned evidence",
    available: false,
  },
  {
    label: "AI Intelligence",
    path: "/ai",
    icon: Radar,
    description: "Risk prediction and explanation",
    available: false,
  },
  {
    label: "Impact Simulator",
    path: "/simulator",
    icon: Sparkles,
    description: "Scenario comparison",
    available: false,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: ChartColumnBig,
    description: "Exports and summaries",
    available: false,
  },
  {
    label: "Grievances",
    path: "/grievances",
    icon: NotebookPen,
    description: "Issue tracking",
    available: false,
  },
  {
    label: "Notifications",
    path: "/notifications",
    icon: Bell,
    description: "Operational alerts",
    available: false,
  },
  {
    label: "Administration",
    path: "/admin/users",
    icon: Users,
    description: "Users and permissions",
    available: false,
  },
];

export const SECONDARY_NAV_ITEMS: NavItem[] = [
  {
    label: "Audit Logs",
    path: "/audit",
    icon: Workflow,
    description: "Immutable event history",
    available: false,
  },
];

export const GEO_FILTER_OPTIONS: GeoOption[] = [
  { label: "National", value: "national", detail: "All regions" },
  { label: "State", value: "state", detail: "State-wide scope" },
  { label: "District", value: "district", detail: "District focus" },
];

export const DEMO_ROLE_LABEL = "Central Administrator";
