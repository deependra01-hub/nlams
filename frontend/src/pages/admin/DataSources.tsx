import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { adminService } from "../../services/admin.service";

export function DataSources() {
  const sources = adminService.getDataSources();
  return (
    <AppCard title="Data sources" description="Integration status and last sync information.">
      <div className="space-y-3">
        {sources.map((source) => (
          <div key={source.id} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{source.name}</p>
                <p className="mt-1 text-sm text-slate-600">{source.type}</p>
              </div>
              <Badge tone={source.status === "connected" ? "success" : source.status === "degraded" ? "warning" : "danger"}>
                {source.status}
              </Badge>
            </div>
            <p className="mt-3 text-sm text-slate-600">Last sync: {source.lastSync}</p>
          </div>
        ))}
      </div>
    </AppCard>
  );
}
