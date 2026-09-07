import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Bell, ChevronDown, Menu, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUiStore } from "../../store/ui.store";
import { useFilterStore } from "../../store/filter.store";
import { useNotificationStore } from "../../store/notification.store";
import { IconButton } from "../common/IconButton";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { getRouteHeader } from "../../app/config/routes";
import { DEMO_ROLE_LABEL, GEO_FILTER_OPTIONS } from "../../app/config/navigation";
import { Button } from "../common/Button";
import { SearchBar } from "../common/SearchBar";
import { Select } from "../common/Select";
import { Badge } from "../common/Badge";
import { MobileNavigation } from "./MobileNavigation";
import { HeadsUpDialog } from "../common/HeadsUpDialog";
import { useAuth } from "../../context/AuthContext";

export function MainLayout() {
  const location = useLocation();
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileNavOpen,
    setMobileNavOpen,
  } = useUiStore();
  const { searchText, setSearchText, geographicScope, setGeographicScope } = useFilterStore();
  const { unreadCount } = useNotificationStore();
  const navigate = useNavigate();
  const routeHeader = useMemo(() => getRouteHeader(location.pathname), [location.pathname]);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname, setMobileNavOpen]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f5f7fb_0%,#eef3f9_100%)] text-slate-900">
      <MobileNavigation open={mobileNavOpen} onClose={() => setMobileNavOpen(false)}>
        <Sidebar
          mobile
          collapsed={false}
          onToggleCollapse={() => {
            setSidebarCollapsed(!sidebarCollapsed);
          }}
          onCloseMobile={() => setMobileNavOpen(false)}
        />
      </MobileNavigation>

      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] gap-4 px-4 py-4 md:px-6 lg:px-8">
        <div className="sticky top-4 hidden h-[calc(100vh-2rem)] lg:block">
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        <div className="min-w-0 flex-1 space-y-4">
          <header className="sticky top-4 z-20 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-soft backdrop-blur">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-center gap-3">
                <IconButton
                  icon={Menu}
                  label="Open navigation"
                  className="lg:hidden"
                  onClick={() => setMobileNavOpen(true)}
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gov-700">
                    NLAMS
                  </p>
                  <p className="text-sm font-semibold text-slate-900">{DEMO_ROLE_LABEL}</p>
                </div>
              </div>

              <div className="flex flex-1 flex-wrap items-center gap-2 xl:justify-end">
                <SearchBar
                  label="Global search"
                  placeholder="Search projects, parcels, officers"
                  className="max-w-md"
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
            actions={
              <>
                <Badge tone="primary">Demo mode</Badge>
                <Button variant="secondary" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                  {sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                </Button>
              </>
            }
          />

          <main className="min-w-0 pb-6">
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
  const [profileOpen, setProfileOpen] = useState(false);

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
      <div className="absolute right-0 z-20 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-panel">
        <div className="rounded-xl bg-slate-50 px-3 py-2">
          <p className="text-sm font-semibold text-slate-900">{user?.name ?? "Demo Officer"}</p>
          <p className="text-xs text-slate-500">{DEMO_ROLE_LABEL}</p>
        </div>
        <div className="mt-3 space-y-1 text-sm">
          <MenuButton label="View profile" onClick={() => setProfileOpen(true)} />
          <MenuButton label="Session preferences" onClick={() => navigate("/notifications")} />
          <MenuButton label="Sign out" tone="danger" onClick={handleSignOut} />
        </div>
      </div>
      <HeadsUpDialog
        open={profileOpen}
        title={user?.name ?? "Profile"}
        description="Session summary and account shortcuts."
        onClose={() => setProfileOpen(false)}
        primaryAction={<Button onClick={() => navigate("/dashboard")}>Go to dashboard</Button>}
      >
        <div className="grid gap-3 sm:grid-cols-3">
          <ProfileStat label="Role" value={user?.role ?? "Unknown"} />
          <ProfileStat label="Permissions" value={String(user?.permissions.length ?? 0)} />
          <ProfileStat label="Session" value={user ? "Active" : "Signed out"} />
        </div>
      </HeadsUpDialog>
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

function ProfileStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
