import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Bell, ChevronDown, HelpCircle, Menu, Plus, Sparkles, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFilterStore } from "../../store/filter.store";
import { useUiStore } from "../../store/ui.store";
import { useNotificationStore } from "../../store/notification.store";
import { IconButton } from "../common/IconButton";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { getRouteHeader } from "../../app/config/routes";
import { GEO_FILTER_OPTIONS, getRoleLabel } from "../../app/config/navigation";
import { Button } from "../common/Button";
import { InfoRibbon } from "../common/InfoRibbon";
import { SearchBar } from "../common/SearchBar";
import { Select } from "../common/Select";
import { MobileNavigation } from "./MobileNavigation";
import { useAuth } from "../../context/AuthContext";
import { notificationService } from "../../services/notification.service";

export function MainLayout() {
  const location = useLocation();
  const { user, hasSeenSessionHeadsUp, markSessionHeadsUpSeen } = useAuth();
  const { mobileNavOpen, setMobileNavOpen } = useUiStore();
  const { searchText, setSearchText, geographicScope, setGeographicScope } = useFilterStore();
  const { unreadCount } = useNotificationStore();
  const navigate = useNavigate();
  const routeHeader = useMemo(() => getRouteHeader(location.pathname), [location.pathname]);
  const [sessionRibbonVisible, setSessionRibbonVisible] = useState(false);
  const welcomeRequested = (location.state as { showWelcome?: boolean } | null)?.showWelcome === true;

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname, setMobileNavOpen]);

  useEffect(() => {
    if (!user) {
      setSessionRibbonVisible(false);
      return;
    }

    setSessionRibbonVisible(Boolean(welcomeRequested && !hasSeenSessionHeadsUp));
  }, [hasSeenSessionHeadsUp, user, welcomeRequested]);

  const closeSessionRibbon = () => {
    markSessionHeadsUpSeen();
    setSessionRibbonVisible(false);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.98),transparent_34%),radial-gradient(circle_at_top_right,rgba(233,229,255,0.86),transparent_24%),linear-gradient(180deg,#f7f9ff_0%,#edf3ff_100%)] text-slate-900">
      <MobileNavigation open={mobileNavOpen} onClose={() => setMobileNavOpen(false)}>
        <Sidebar
          mobile
          onCloseMobile={() => setMobileNavOpen(false)}
        />
      </MobileNavigation>

      <div className="mx-auto flex min-h-screen w-full max-w-[1520px] gap-6 px-3 py-3 md:px-5 lg:px-6">
        <div className="sticky top-3 hidden h-[calc(100vh-1.5rem)] lg:block">
          <Sidebar />
        </div>

        <div className="min-w-0 flex-1 space-y-5">
          <header className="sticky top-3 z-20 rounded-[28px] border border-white/80 bg-white/92 px-4 py-3 shadow-[0_18px_50px_rgba(15,29,47,0.08)] backdrop-blur-xl">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-center gap-3">
                <IconButton
                  icon={Menu}
                  label="Open navigation"
                  className="lg:hidden"
                  onClick={() => setMobileNavOpen(true)}
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-700">
                    NLAMS
                  </p>
                  <p className="text-sm font-semibold text-slate-900">{getRoleLabel(user?.role)}</p>
                </div>
              </div>

              <div className="flex flex-1 flex-wrap items-center gap-2 xl:justify-end">
                <SearchBar
                  label="Global search"
                  placeholder="Search projects, parcels, officers"
                  className="max-w-xl"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                />
                <Select
                  label="Geographic scope"
                  value={geographicScope}
                  onChange={(event) => setGeographicScope(event.target.value)}
                >
                  {GEO_FILTER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>

                <Button
                  variant="secondary"
                  leadingIcon={Sparkles}
                  className="hidden border-violet-200 bg-[linear-gradient(90deg,rgba(109,93,252,0.12)_0%,rgba(46,122,240,0.12)_100%)] text-violet-800 sm:inline-flex"
                >
                  NLAMS AI
                </Button>

                <IconButton icon={Plus} label="Create new item" />
                <IconButton icon={HelpCircle} label="Help center" />

                <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 sm:flex">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Live
                </div>

                <div className="relative">
                  <IconButton
                    icon={Bell}
                    label={`Notifications, ${unreadCount} unread`}
                    onClick={() => navigate("/notifications")}
                  />
                  {unreadCount > 0 ? (
                    <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold text-white">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  ) : null}
                </div>
                <ProfileMenu />
              </div>
            </div>
          </header>

          <Header
            title={routeHeader.title}
            description={routeHeader.description}
            breadcrumbs={routeHeader.breadcrumbs}
          />

          {sessionRibbonVisible ? (
            <InfoRibbon
              title="Notifications and alerts"
              description="A quick session heads-up for unread notifications and active alerts."
              icon={Bell}
              items={[
                { label: "Unread", value: String(notificationService.getUnreadCount()) },
                { label: "Alerts", value: String(notificationService.getNotifications().filter((item) => item.kind === "alert").length) },
                { label: "Updates", value: String(notificationService.getNotifications().filter((item) => item.kind !== "alert").length) },
              ]}
              onDismiss={closeSessionRibbon}
            >
              <div className="grid gap-3 sm:grid-cols-3">
                {notificationService.getNotifications().slice(0, 3).map((item) => (
                  <div key={item.id} className="rounded-2xl border border-white/70 bg-white/85 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{item.kind}</p>
                    <p className="mt-2 text-sm font-semibold text-blue-950">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-blue-700/75">{item.message}</p>
                  </div>
                ))}
              </div>
            </InfoRibbon>
          ) : null}

          <main className="min-w-0 pb-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

function ProfileMenu() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSignOut = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <details className="group relative">
      <summary
        className="list-none inline-flex cursor-pointer items-center gap-2 rounded-control border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gov-500 focus-visible:ring-offset-2"
      >
        <UserCircle2 className="h-4 w-4 text-slate-600" />
        <span className="hidden sm:inline">Profile</span>
        <ChevronDown className="h-4 w-4 text-slate-500 transition group-open:rotate-180" />
      </summary>
      <div className="absolute right-0 z-20 mt-2 w-64 rounded-[24px] border border-white/70 bg-white/96 p-3 shadow-[0_18px_50px_rgba(15,29,47,0.10)] backdrop-blur-xl">
        <div className="rounded-2xl bg-slate-50 px-3 py-2">
          <p className="text-sm font-semibold text-slate-900">{user?.name ?? "Demo Officer"}</p>
          <p className="text-xs text-slate-500">{getRoleLabel(user?.role)}</p>
        </div>
        <div className="mt-3 space-y-1 text-sm">
          <MenuButton label="Sign out" tone="danger" onClick={handleSignOut} />
        </div>
      </div>
    </details>
  );
}

function MenuButton({
  label,
  onClick,
  tone = "default",
}: {
  label: string;
  onClick: () => void;
  tone?: "default" | "danger";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full rounded-xl px-3 py-2 text-left font-medium transition",
        tone === "danger" ? "text-red-700 hover:bg-red-50" : "text-slate-700 hover:bg-slate-50",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
