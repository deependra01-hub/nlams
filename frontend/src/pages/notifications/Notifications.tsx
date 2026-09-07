import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { HeadsUpDialog } from "../../components/common/HeadsUpDialog";
import { MetricCard } from "../../components/common/MetricCard";
import { notificationService } from "../../services/notification.service";
import { BellRing, Settings2 } from "lucide-react";

export function Notifications() {
  const navigate = useNavigate();
  const notifications = notificationService.getNotifications();
  const preferences = notificationService.getPreferences();
  const unreadCount = notificationService.getUnreadCount();
  const [activeNotificationId, setActiveNotificationId] = useState<string | null>(notifications[0]?.id ?? null);
  const activeNotification = notifications.find((item) => item.id === activeNotificationId) ?? notifications[0] ?? null;
  const launchNotifications = notifications.slice(0, 4);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
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
            <MiniLine label="View" value="Heads up cards" />
          </div>
        </AppCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {launchNotifications.map((notification) => (
          <article
            key={notification.id}
            className="rounded-[28px] border border-slate-100 bg-white p-5 shadow-[0_12px_40px_rgba(15,29,47,0.05)]"
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
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => setActiveNotificationId(notification.id)}>
                  Heads up
                </Button>
                <Link to={notification.route} className="inline-flex">
                  <Button>Open</Button>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <AppCard title="Preferences" description="Only the toggles needed for the demo profile.">
        <div className="grid gap-3 sm:grid-cols-2">
          {preferences.map((preference) => (
            <div key={preference.label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
              <div className="flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-gov-700" />
                <span className="font-semibold text-slate-800">{preference.label}</span>
              </div>
              <Badge tone={preference.enabled ? "success" : "neutral"}>{preference.enabled ? "On" : "Off"}</Badge>
            </div>
          ))}
        </div>
      </AppCard>

      <HeadsUpDialog
        open={Boolean(activeNotification)}
        title={activeNotification?.title ?? ""}
        description={activeNotification?.message ?? ""}
        onClose={() => setActiveNotificationId(null)}
        primaryAction={activeNotification ? <Button onClick={() => navigate(activeNotification.route)}>Open</Button> : null}
      >
        {activeNotification ? (
          <div className="grid gap-3 sm:grid-cols-3">
            <MiniLine label="Audience" value={activeNotification.audience} />
            <MiniLine label="Kind" value={notificationService.getKindLabel(activeNotification.kind)} />
            <MiniLine label="Route" value={activeNotification.route} />
          </div>
        ) : null}
      </HeadsUpDialog>
    </div>
  );
}

function MiniLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
