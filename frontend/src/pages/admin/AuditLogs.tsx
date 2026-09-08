import { useState } from "react";
import { AppCard } from "../../components/common/AppCard";
import { Button } from "../../components/common/Button";
import { HeadsUpDialog } from "../../components/common/HeadsUpDialog";
import { adminService } from "../../services/admin.service";

export function AuditLogs() {
  const logs = adminService.getAuditLogs();
  const [activeLogId, setActiveLogId] = useState<string | null>(null);
  const activeLog = activeLogId ? logs.find((log) => log.id === activeLogId) ?? null : null;

  return (
    <div className="space-y-7">
      <AppCard title="Audit logs" description="Recent tracked actions in a calm, compact feed.">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MiniLine label="Events" value={String(logs.length)} />
          <MiniLine label="Focus" value="Latest actions" />
          <MiniLine label="Mode" value="Click to open" />
          <MiniLine label="Scope" value="Frontend demo" />
        </div>
      </AppCard>

      <section className="grid gap-4 xl:grid-cols-2">
        {logs.map((log) => (
          <article
            key={log.id}
            className="rounded-[28px] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.94)_100%)] p-6 shadow-[0_12px_40px_rgba(15,29,47,0.05)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{log.actor}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">{log.action}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{log.resource}</p>
              </div>
              <span className="text-xs uppercase tracking-[0.16em] text-slate-500">{log.timestamp}</span>
            </div>
            <div className="mt-5 flex justify-end">
              <Button variant="secondary" onClick={() => setActiveLogId(log.id)}>
                Heads up
              </Button>
            </div>
          </article>
        ))}
      </section>

      <HeadsUpDialog
        open={Boolean(activeLog)}
        title={activeLog?.action ?? ""}
        description={activeLog?.resource ?? ""}
        onClose={() => setActiveLogId(null)}
      >
        {activeLog ? (
          <div className="grid gap-3 sm:grid-cols-3">
            <MiniLine label="Actor" value={activeLog.actor} />
            <MiniLine label="Resource" value={activeLog.resource} />
            <MiniLine label="Time" value={activeLog.timestamp} />
          </div>
        ) : null}
      </HeadsUpDialog>
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
