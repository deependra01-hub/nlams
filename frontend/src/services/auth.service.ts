import type { User } from "../types/domain";

const STORAGE_KEY = "nlams.currentUser";

const DEMO_USERS: User[] = [
  {
    id: "u-central-admin",
    name: "Central Administrator",
    role: "central_admin",
    permissions: [
      "view_national_dashboard",
      "view_state_dashboard",
      "view_district_dashboard",
      "view_projects",
      "edit_project",
      "view_gis",
      "view_trust_center",
      "view_ai",
      "view_simulator",
    ],
  },
  {
    id: "u-state-officer",
    name: "State Officer",
    role: "state_officer",
    permissions: [
      "view_state_dashboard",
      "view_district_dashboard",
      "view_projects",
      "view_gis",
      "view_trust_center",
    ],
  },
  {
    id: "u-district-officer",
    name: "District Officer",
    role: "district_officer",
    permissions: ["view_district_dashboard", "view_projects", "view_gis"],
  },
];

export const authService = {
  getCurrentUser(): User | null {
    if (typeof window === "undefined") {
      return null;
    }

    const rawUser = window.localStorage.getItem(STORAGE_KEY);
    if (!rawUser) {
      return null;
    }

    try {
      return JSON.parse(rawUser) as User;
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  },

  signIn(role: User["role"]): User {
    const user =
      DEMO_USERS.find((candidate) => candidate.role === role) ?? DEMO_USERS[0];
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
    return user;
  },

  signOut(): void {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  },

  getDemoUsers(): User[] {
    return DEMO_USERS;
  },
};
