import { useNavigate } from "react-router-dom";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { notificationService } from "../../services/notification.service";

export function Notifications() {
  const navigate = useNavigate();
  const notifications = notificationService.getNotifications();
  const launchNotifications = notifications.slice(0, 4);

  return (
    <div className="space-y-7">
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
    </div>
  );
}
