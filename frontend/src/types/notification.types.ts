export type NotificationKind = "alert" | "update" | "reminder" | "system";

export interface NotificationRecord {
  id: string;
  title: string;
  message: string;
  kind: NotificationKind;
  audience: string;
  route: string;
  createdAt: string;
  read: boolean;
}

export interface NotificationPreference {
  label: string;
  enabled: boolean;
}
