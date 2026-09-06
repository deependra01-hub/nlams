import type { AdminPermission, AdminRole, AdminUser, AuditLogRecord, DataSourceRecord } from "../types/admin.types";

const USERS: AdminUser[] = [
  { id: "u1", name: "Deepak Sharma", role: "central_admin", status: "active", lastLogin: "2026-09-06", department: "Nodal HQ" },
  { id: "u2", name: "Meera Iyer", role: "state_officer", status: "active", lastLogin: "2026-09-05", department: "State office" },
  { id: "u3", name: "Rakesh Kumar", role: "district_officer", status: "pending", lastLogin: "2026-09-03", department: "District office" },
];

const ROLES: AdminRole[] = [
  { id: "r1", name: "central_admin", description: "Full system oversight and configuration.", users: 1 },
  { id: "r2", name: "state_officer", description: "State-level operational supervision.", users: 1 },
  { id: "r3", name: "district_officer", description: "District execution and review.", users: 1 },
];

const PERMISSIONS: AdminPermission[] = [
  { id: "p1", name: "view_dashboard", scope: "dashboard", grantedTo: ["central_admin", "state_officer", "district_officer"] },
  { id: "p2", name: "edit_case", scope: "workflow", grantedTo: ["central_admin", "state_officer"] },
  { id: "p3", name: "export_reports", scope: "reports", grantedTo: ["central_admin"] },
];

const SOURCES: DataSourceRecord[] = [
  { id: "ds1", name: "Land records", type: "revenue", status: "connected", lastSync: "2026-09-06" },
  { id: "ds2", name: "Payment ledger", type: "finance", status: "degraded", lastSync: "2026-09-05" },
  { id: "ds3", name: "Case registry", type: "workflow", status: "connected", lastSync: "2026-09-06" },
];

const AUDIT_LOGS: AuditLogRecord[] = [
  { id: "a1", timestamp: "2026-09-06 09:12", actor: "Deepak Sharma", action: "Updated role permissions", resource: "Administration" },
  { id: "a2", timestamp: "2026-09-06 08:41", actor: "Meera Iyer", action: "Reviewed award case", resource: "Acquisition" },
  { id: "a3", timestamp: "2026-09-05 18:07", actor: "System", action: "Synced land records", resource: "Data sources" },
];

export const adminService = {
  getUsers() {
    return USERS.slice();
  },

  getRoles() {
    return ROLES.slice();
  },

  getPermissions() {
    return PERMISSIONS.slice();
  },

  getDataSources() {
    return SOURCES.slice();
  },

  getAuditLogs() {
    return AUDIT_LOGS.slice();
  },
};
