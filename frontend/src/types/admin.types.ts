export interface AdminUser {
  id: string;
  name: string;
  role: string;
  status: "active" | "pending" | "disabled";
  lastLogin: string;
  department: string;
}

export interface AdminRole {
  id: string;
  name: string;
  description: string;
  users: number;
}

export interface AdminPermission {
  id: string;
  name: string;
  scope: string;
  grantedTo: string[];
}

export interface DataSourceRecord {
  id: string;
  name: string;
  type: string;
  status: "connected" | "degraded" | "offline";
  lastSync: string;
}

export interface AuditLogRecord {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
}
