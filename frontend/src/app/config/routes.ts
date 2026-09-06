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
