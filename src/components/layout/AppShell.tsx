import { useEffect, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Bell, ChevronDown, Menu, UserCircle2 } from "lucide-react";
import { useUiStore } from "../../stores/ui.store";
import { useFilterStore } from "../../stores/filter.store";
import { useNotificationStore } from "../../stores/notification.store";
import { Drawer } from "../common/Drawer";
import { IconButton } from "../common/IconButton";
import { PageHeader } from "./PageHeader";
import { Sidebar } from "./Sidebar";
import { getRouteHeader } from "../../app/config/routes";
import { DEMO_ROLE_LABEL, GEO_FILTER_OPTIONS } from "../../app/config/navigation";
import { Button } from "../common/Button";
import { SearchInput } from "../common/SearchInput";
import { Select } from "../common/Select";
import { Badge } from "../common/Badge";

export function AppShell() {
  const location = useLocation();
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileNavOpen,
    setMobileNavOpen,
  } = useUiStore();
  const { searchText, setSearchText } = useFilterStore();
  const { unreadCount } = useNotificationStore();
  const routeHeader = useMemo(() => getRouteHeader(location.pathname), [location.pathname]);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname, setMobileNavOpen]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f5f7fb_0%,#eef3f9_100%)] text-slate-900">
      <Drawer open={mobileNavOpen} onClose={() => setMobileNavOpen(false)}>
        <Sidebar
          mobile
          collapsed={false}
          onToggleCollapse={() => {
            setSidebarCollapsed(!sidebarCollapsed);
          }}
          onCloseMobile={() => setMobileNavOpen(false)}
        />
      </Drawer>

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
                <SearchInput
                  label="Global search"
                  placeholder="Search projects, parcels, officers"
                  className="max-w-md"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                />
                <Select
                  label="Geographic scope"
                  defaultValue={GEO_FILTER_OPTIONS[0]?.value}
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
                  <IconButton icon={Bell} label={`Notifications, ${unreadCount} unread`} />
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

          <PageHeader
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
          <p className="text-sm font-semibold text-slate-900">Demo Officer</p>
          <p className="text-xs text-slate-500">{DEMO_ROLE_LABEL}</p>
        </div>
        <div className="mt-3 space-y-1 text-sm">
          <MenuRow label="View profile" />
          <MenuRow label="Session preferences" />
          <MenuRow label="Sign out" />
        </div>
      </div>
    </details>
  );
}

function MenuRow({ label }: { label: string }) {
  return (
    <div className="rounded-xl px-3 py-2 font-medium text-slate-700">
      {label}
    </div>
  );
}
