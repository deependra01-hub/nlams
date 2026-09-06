import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { adminService } from "../../services/admin.service";

export function Permissions() {
  const permissions = adminService.getPermissions();
  return (
    <AppCard title="Permissions" description="Scope-based access control matrix.">
      <div className="space-y-3">
        {permissions.map((permission) => (
          <div key={permission.id} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{permission.name}</p>
                <p className="mt-1 text-sm text-slate-600">{permission.scope}</p>
              </div>
              <Badge tone="neutral">{permission.grantedTo.length} roles</Badge>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {permission.grantedTo.map((role) => (
                <Badge key={role} tone="primary">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppCard>
  );
}
