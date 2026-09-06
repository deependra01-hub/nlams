import { AppCard } from "../../components/common/AppCard";
import { adminService } from "../../services/admin.service";

export function AuditLogs() {
  const logs = adminService.getAuditLogs();
  return (
    <AppCard title="Audit logs" description="Recent tracked actions from the frontend demo.">
      <div className="space-y-3">
        {logs.map((log) => (
          <div key={log.id} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{log.action}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {log.actor} · {log.resource}
                </p>
              </div>
              <span className="text-xs uppercase tracking-[0.16em] text-slate-500">{log.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </AppCard>
  );
}
