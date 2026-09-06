import type { NotificationPreference, NotificationRecord, NotificationKind } from "../types/notification.types";

const NOTIFICATIONS: NotificationRecord[] = [
  {
    id: "nt-001",
    title: "Award notice published",
    message: "NH-07 award notice has been published for stakeholder review.",
    kind: "update",
    audience: "State officer",
    route: "/acquisition/awards",
    createdAt: "2026-09-05",
    read: false,
  },
  {
    id: "nt-002",
    title: "High-risk parcel flagged",
    message: "Parcel 317/8 has been flagged for critical review.",
    kind: "alert",
    audience: "Field officer",
    route: "/parcels/parcel-317",
    createdAt: "2026-09-06",
    read: false,
  },
  {
    id: "nt-003",
    title: "Report export ready",
    message: "The weekly operations report is ready for download.",
    kind: "reminder",
    audience: "Operations cell",
    route: "/reports",
    createdAt: "2026-09-04",
    read: true,
  },
];

const PREFERENCES: NotificationPreference[] = [
  { label: "Email notices", enabled: true },
  { label: "SMS alerts", enabled: false },
  { label: "In-app alerts", enabled: true },
  { label: "Daily summary", enabled: true },
];

export const notificationService = {
  getNotifications() {
    return NOTIFICATIONS.slice();
  },

  getPreferences() {
    return PREFERENCES.slice();
  },

  getUnreadCount() {
    return NOTIFICATIONS.filter((notification) => !notification.read).length;
  },

  getKindLabel(kind: NotificationKind) {
    switch (kind) {
      case "alert":
        return "Alert";
      case "update":
        return "Update";
      case "reminder":
        return "Reminder";
      case "system":
        return "System";
    }
  },
};
