import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { notificationService } from "../../services/notification.service";
import { BellRing, Settings2 } from "lucide-react";
import { Link } from "react-router-dom";

export function Notifications() {
  const notifications = notificationService.getNotifications();
  const preferences = notificationService.getPreferences();
  const unreadCount = notificationService.getUnreadCount();

  return (
    <div className="space-y-4">
      <AppCard title="Notifications" description="Operational updates and alerts for the NLAMS shell.">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="primary">{unreadCount} unread</Badge>
          <Badge tone="neutral">In-app</Badge>
          <Badge tone="neutral">Email</Badge>
        </div>
      </AppCard>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <AppCard title="Inbox" description="Most recent notices.">
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Link
                key={notification.id}
                to={notification.route}
                className="block rounded-2xl border border-slate-200 bg-white px-4 py-4 transition hover:border-gov-300 hover:bg-gov-50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{notification.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{notification.message}</p>
                  </div>
                  <Badge tone={notification.read ? "neutral" : "success"}>{notificationService.getKindLabel(notification.kind)}</Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                  <span>{notification.audience}</span>
                  <span>{notification.createdAt}</span>
                </div>
              </Link>
            ))}
          </div>
        </AppCard>

        <AppCard title="Preferences" description="Delivery toggles for the demo profile.">
          <div className="space-y-3">
            {preferences.map((preference) => (
              <div key={preference.label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Settings2 className="h-4 w-4 text-gov-700" />
                  <span className="font-semibold text-slate-800">{preference.label}</span>
                </div>
                <Badge tone={preference.enabled ? "success" : "neutral"}>{preference.enabled ? "On" : "Off"}</Badge>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button leadingIcon={BellRing}>Update preferences</Button>
          </div>
        </AppCard>
      </div>
    </div>
  );
}
