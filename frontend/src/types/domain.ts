export type Role =
  | "central_admin"
  | "state_officer"
  | "district_officer"
  | "project_agency_officer"
  | "field_officer"
  | "reviewer";

export type Permission =
  | "view_national_dashboard"
  | "view_state_dashboard"
  | "view_district_dashboard"
  | "view_projects"
  | "edit_project"
  | "view_gis"
  | "view_trust_center"
  | "view_ai"
  | "view_simulator";

export interface User {
  id: string;
  name: string;
  role: Role;
  permissions: Permission[];
}

export interface State {
  id: string;
  name: string;
}

export interface District {
  id: string;
  name: string;
  stateId: string;
}
