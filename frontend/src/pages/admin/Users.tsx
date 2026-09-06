import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { adminService } from "../../services/admin.service";

export function Users() {
  const users = adminService.getUsers();

  return (
    <AppCard title="Users" description="Active users and approval state.">
      <div className="space-y-3">
        {users.map((user) => (
          <div key={user.id} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{user.name}</p>
                <p className="mt-1 text-sm text-slate-600">{user.department}</p>
              </div>
              <Badge tone={user.status === "active" ? "success" : user.status === "pending" ? "warning" : "neutral"}>
                {user.status}
              </Badge>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3 text-sm text-slate-600">
              <Info label="Role" value={user.role} />
              <Info label="Last login" value={user.lastLogin} />
              <Info label="Department" value={user.department} />
            </div>
          </div>
        ))}
      </div>
    </AppCard>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
