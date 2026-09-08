import { useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { InfoRibbon } from "../../components/common/InfoRibbon";
import { MetricCard } from "../../components/common/MetricCard";
import { notificationService } from "../../services/notification.service";
import { BellRing, Settings2 } from "lucide-react";

export function Notifications() {
  const navigate = useNavigate();
  const notifications = notificationService.getNotifications();
  const preferences = notificationService.getPreferences();
  const unreadCount = notificationService.getUnreadCount();
  const launchNotifications = notifications.slice(0, 4);

  return (
    <div className="space-y-7">
      <InfoRibbon
        title="Notifications ribbon"
        description="Unread counts, inbox size, and delivery settings stay visible as a ribbon instead of a dialog."
        items={[
          { label: "Unread", value: String(unreadCount) },
          { label: "Inbox", value: String(notifications.length) },
          { label: "Preferences", value: String(preferences.length) },
          { label: "Mode", value: "Minimal" },
        ]}
      />

      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <AppCard title="Notifications" description="A light inbox for updates, reminders, and alerts.">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Unread" value={String(unreadCount)} detail="Pending attention" icon={BellRing} />
            <MetricCard label="Inbox" value={String(notifications.length)} detail="Tracked notices" icon={Settings2} />
            <MetricCard label="Preferences" value={String(preferences.length)} detail="Delivery toggles" icon={Settings2} />
            <MetricCard label="Mode" value="Minimal" detail="Click-to-open" icon={BellRing} />
          </div>
        </AppCard>

        <AppCard title="Status" description="The inbox stays thin on the surface.">
          <div className="grid gap-3">
            <MiniLine label="Unread" value={`${unreadCount}`} />
            <MiniLine label="Delivery" value="In-app and email" />
            <MiniLine label="View" value="Open cards" />
          </div>
        </AppCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {launchNotifications.map((notification) => (
          <article
            key={notification.id}
            className="rounded-[28px] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.94)_100%)] p-6 shadow-[0_12px_40px_rgba(15,29,47,0.05)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{notification.kind}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">{notification.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{notification.message}</p>
              </div>
              <Badge tone={notification.read ? "neutral" : "success"}>
                {notificationService.getKindLabel(notification.kind)}
              </Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="neutral">{notification.audience}</Badge>
              <Badge tone="neutral">{notification.createdAt}</Badge>
            </div>
            <div className="mt-5 flex flex-wrap justify-between gap-3">
              <p className="text-sm text-slate-500">{notification.route}</p>
              <Button onClick={() => navigate(notification.route)}>Open</Button>
            </div>
          </article>
        ))}
      </section>

      <AppCard title="Preferences" description="Only the toggles needed for the demo profile.">
        <div className="grid gap-3 sm:grid-cols-2">
          {preferences.map((preference) => (
            <div key={preference.label} className="flex items-center justify-between rounded-2xl border border-sky-100 bg-white/90 px-4 py-4">
              <div className="flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-gov-700" />
                <span className="font-semibold text-slate-800">{preference.label}</span>
              </div>
              <Badge tone={preference.enabled ? "success" : "neutral"}>{preference.enabled ? "On" : "Off"}</Badge>
            </div>
          ))}
        </div>
      </AppCard>
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
