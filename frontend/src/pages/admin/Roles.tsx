import { AppCard } from "../../components/common/AppCard";
import { adminService } from "../../services/admin.service";

export function Roles() {
  const roles = adminService.getRoles();
  return (
    <AppCard title="Roles" description="System roles and their user counts.">
      <div className="grid gap-3 xl:grid-cols-3">
        {roles.map((role) => (
          <div key={role.id} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
            <p className="font-semibold text-slate-900">{role.name}</p>
            <p className="mt-1 text-sm text-slate-600">{role.description}</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">{role.users}</p>
          </div>
        ))}
      </div>
    </AppCard>
  );
}
