import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { IconButton } from "../common/IconButton";
import {
  PRIMARY_NAV_ITEMS,
  SECONDARY_NAV_ITEMS,
  getRoleLabel,
} from "../../app/config/navigation";
import { useAuth } from "../../context/AuthContext";

export function Sidebar({
  collapsed,
  mobile = false,
  onToggleCollapse,
  onCloseMobile,
}: {
  collapsed: boolean;
  mobile?: boolean;
  onToggleCollapse: () => void;
  onCloseMobile?: () => void;
}) {
  const location = useLocation();
  const { user } = useAuth();
  const role = user?.role;
  const primaryItems = PRIMARY_NAV_ITEMS.filter((item) => !item.hiddenRoles?.includes(role ?? "central_admin"));
  const secondaryItems = SECONDARY_NAV_ITEMS.filter((item) => !item.hiddenRoles?.includes(role ?? "central_admin"));

  return (
    <aside
      className={[
        "flex h-full flex-col border border-white/80 bg-white/92 shadow-[0_18px_50px_rgba(15,29,47,0.06)] backdrop-blur-xl",
        mobile ? "w-full" : collapsed ? "w-20" : "w-72",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#6d5dfc_0%,#2e7af0_100%)] text-sm font-bold text-white shadow-[0_10px_24px_rgba(77,92,255,0.28)]">
            NL
          </div>
          {!collapsed || mobile ? (
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">
                NLAMS
              </p>
              <p className="truncate text-sm font-semibold text-slate-900">{getRoleLabel(role)}</p>
            </div>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          {mobile ? (
            <IconButton icon={ChevronLeft} label="Close navigation" onClick={onCloseMobile} />
          ) : null}
          <IconButton
            icon={collapsed ? ChevronRight : ChevronLeft}
            label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={onToggleCollapse}
          />
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        <nav aria-label="Primary navigation" className="space-y-2">
          {primaryItems.map((item) => (
            <NavRow
              key={item.path}
              item={item}
              active={location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)}
              collapsed={collapsed && !mobile}
            />
          ))}
        </nav>

        <div className="border-t border-slate-100 pt-4">
          <p className={`px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 ${collapsed && !mobile ? "sr-only" : ""}`}>
            Quick links
          </p>
          <div className="mt-2 space-y-1">
            {secondaryItems.map((item) => (
              <NavRow
                key={item.path}
                item={item}
                active={location.pathname === item.path}
                collapsed={collapsed && !mobile}
              />
            ))}
          </div>
        </div>
      </div>

      {!collapsed || mobile ? (
        <div className="border-t border-slate-100 p-4">
          <div className="rounded-[24px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] px-4 py-4 shadow-[0_10px_30px_rgba(15,29,47,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              Workspace
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">Oxl... inspired workspace</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Lightweight navigation with role-based visibility.
            </p>
            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                <span>Storage used</span>
                <span>68%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[68%] rounded-full bg-[linear-gradient(90deg,#6d5dfc_0%,#2e7af0_100%)]" />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </aside>
  );
}

function NavRow({
  item,
  active,
  collapsed,
  disabled = false,
}: {
  item: (typeof PRIMARY_NAV_ITEMS)[number];
  active: boolean;
  collapsed: boolean;
  disabled?: boolean;
}) {
  const content = (
    <>
      <span
        className={[
          "inline-flex h-9 w-9 items-center justify-center rounded-xl",
          active ? "bg-gov-50 text-gov-700" : "bg-slate-100 text-slate-600",
        ].join(" ")}
      >
        <item.icon className="h-4.5 w-4.5" />
      </span>
      {!collapsed ? (
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold">{item.label}</span>
          <span className="block truncate text-xs text-slate-500">{item.description}</span>
        </span>
      ) : null}
    </>
  );

  const baseClasses = [
    "group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition",
    active
      ? "bg-[linear-gradient(90deg,rgba(109,93,252,0.13)_0%,rgba(46,122,240,0.10)_100%)] text-violet-900 shadow-[0_8px_24px_rgba(83,92,255,0.10)]"
      : "text-slate-700 hover:bg-slate-50/80 hover:text-slate-900",
    disabled ? "cursor-not-allowed opacity-55" : "",
  ].join(" ");

  if (disabled || !item.available) {
    return (
      <button type="button" className={baseClasses} aria-disabled="true" disabled>
        {content}
      </button>
    );
  }

  return (
    <Link to={item.path} className={baseClasses} title={item.label}>
      {content}
    </Link>
  );
}
