import type { Role } from "../types/domain";

type GeographicScope = "national" | "state" | "district" | string;

type SearchableRecord = {
  state?: string;
  district?: string;
};

type ScopeTarget = {
  label: string;
  state?: string;
  district?: string;
};

const ROLE_SCOPE_TARGETS: Record<Role, { state: string; district: string }> = {
  central_admin: { state: "Uttar Pradesh", district: "Varanasi" },
  state_officer: { state: "Madhya Pradesh", district: "Indore" },
  district_officer: { state: "Jharkhand", district: "Ranchi" },
  project_agency_officer: { state: "Uttar Pradesh", district: "Varanasi" },
  field_officer: { state: "Madhya Pradesh", district: "Indore" },
  reviewer: { state: "Uttar Pradesh", district: "Varanasi" },
};

const DISTRICT_STATES: Record<string, string> = {
  Varanasi: "Uttar Pradesh",
  Indore: "Madhya Pradesh",
  Ranchi: "Jharkhand",
};

export function getScopeTarget(scope: GeographicScope, role?: Role | null): ScopeTarget {
  if (scope === "national") {
    return { label: "National" };
  }

  const target = ROLE_SCOPE_TARGETS[role ?? "central_admin"];

  if (scope === "district") {
    return { label: `District: ${target.district}`, state: target.state, district: target.district };
  }

  return { label: `State: ${target.state}`, state: target.state };
}

export function matchesScope(record: SearchableRecord, scope: GeographicScope, role?: Role | null) {
  const target = getScopeTarget(scope, role);

  if (!target.state) {
    return true;
  }

  const matchesState = record.state === target.state;
  const matchesDistrict = !target.district || record.district === target.district;

  return matchesState && matchesDistrict;
}

export function matchesSearch(values: Array<string | number | null | undefined>, query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return values
    .filter((value): value is string | number => value !== null && value !== undefined)
    .join(" ")
    .toLowerCase()
    .includes(normalizedQuery);
}

export function inferStateFromDistrict(district?: string) {
  return district ? DISTRICT_STATES[district] : undefined;
}
