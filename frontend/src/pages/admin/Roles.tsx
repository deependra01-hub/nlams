import { AppCard } from "../../components/common/AppCard";
import { adminService } from "../../services/admin.service";

export function Roles() {
  const roles = adminService.getRoles();
  return (
    <AppCard title="Roles" description="System roles and their user counts.">
      <div className="grid gap-3 xl:grid-cols-3">
        {roles.map((role) => (
          <div
            key={role.id}
            className="rounded-[28px] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.94)_100%)] px-5 py-5 shadow-[0_12px_40px_rgba(15,29,47,0.05)]"
          >
            <p className="font-semibold text-slate-950">{role.name}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{role.description}</p>
            <p className="mt-4 text-2xl font-semibold text-blue-950">{role.users}</p>
          </div>
        ))}
      </div>
    </AppCard>
  );
}
