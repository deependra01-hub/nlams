import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { adminService } from "../../services/admin.service";

export function Permissions() {
  const permissions = adminService.getPermissions();
  return (
    <AppCard title="Permissions" description="Scope-based access control matrix.">
      <div className="space-y-3">
        {permissions.map((permission) => (
          <div
            key={permission.id}
            className="rounded-[28px] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.94)_100%)] px-5 py-5 shadow-[0_12px_40px_rgba(15,29,47,0.05)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-950">{permission.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{permission.scope}</p>
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
