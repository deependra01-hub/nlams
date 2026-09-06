import { AppCard } from "../common/AppCard";
import type { AcquisitionCase } from "../../types/acquisition.types";

export function NotificationPanel({ acquisitionCase }: { acquisitionCase: AcquisitionCase }) {
  return (
    <AppCard title="Notification panel" description="Operational notices sent to stakeholders.">
      <div className="space-y-2">
        {acquisitionCase.notifications.map((notification) => (
          <div key={notification} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
            {notification}
          </div>
        ))}
      </div>
    </AppCard>
  );
}
