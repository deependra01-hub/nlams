import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { adminService } from "../../services/admin.service";

export function DataSources() {
  const sources = adminService.getDataSources();
  return (
    <AppCard title="Data sources" description="Integration status and last sync information.">
      <div className="space-y-3">
        {sources.map((source) => (
          <div
            key={source.id}
            className="rounded-[28px] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.94)_100%)] px-5 py-5 shadow-[0_12px_40px_rgba(15,29,47,0.05)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-950">{source.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{source.type}</p>
              </div>
              <Badge tone={source.status === "connected" ? "success" : source.status === "degraded" ? "warning" : "danger"}>
                {source.status}
              </Badge>
            </div>
            <p className="mt-4 text-sm text-slate-600">Last sync: {source.lastSync}</p>
          </div>
        ))}
      </div>
    </AppCard>
  );
}
