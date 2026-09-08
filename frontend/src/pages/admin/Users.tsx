import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { adminService } from "../../services/admin.service";

export function Users() {
  const users = adminService.getUsers();

  return (
    <div className="space-y-7">
      <AppCard title="Users" description="A tiny roster with click-to-open detail.">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MiniLine label="Users" value={String(users.length)} />
          <MiniLine label="Active" value={String(users.filter((user) => user.status === "active").length)} />
          <MiniLine label="Pending" value={String(users.filter((user) => user.status === "pending").length)} />
          <MiniLine label="Disabled" value={String(users.filter((user) => user.status === "disabled").length)} />
        </div>
      </AppCard>

      <section className="grid gap-4 xl:grid-cols-2">
        {users.map((user) => (
          <article
            key={user.id}
            className="rounded-[28px] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.94)_100%)] p-6 shadow-[0_12px_40px_rgba(15,29,47,0.05)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{user.department}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">{user.name}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{user.role}</p>
              </div>
              <Badge tone={user.status === "active" ? "success" : user.status === "pending" ? "warning" : "neutral"}>
                {user.status}
              </Badge>
            </div>
            <div className="mt-5 flex flex-wrap justify-between gap-3">
              <p className="text-sm text-slate-500">{user.lastLogin}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function MiniLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-sky-100 bg-white/90 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{label}</p>
      <p className="mt-2 text-sm font-semibold text-blue-950">{value}</p>
    </div>
  );
}
