import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { IconButton } from "../common/IconButton";
import {
  DEMO_ROLE_LABEL,
  PRIMARY_NAV_ITEMS,
  SECONDARY_NAV_ITEMS,
} from "../../app/config/navigation";

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

  return (
    <aside
      className={[
        "flex h-full flex-col border-r border-slate-200 bg-white",
        mobile ? "w-full" : collapsed ? "w-20" : "w-72",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gov-700 text-sm font-bold text-white">
            N
          </div>
          {!collapsed || mobile ? (
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gov-700">
                NLAMS
              </p>
              <p className="truncate text-sm font-semibold text-slate-900">{DEMO_ROLE_LABEL}</p>
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

      <div className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        <nav aria-label="Primary navigation" className="space-y-2">
          {PRIMARY_NAV_ITEMS.map((item) => (
            <NavRow
              key={item.path}
              item={item}
              active={location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)}
              collapsed={collapsed && !mobile}
            />
          ))}
        </nav>

        <div className="border-t border-slate-200 pt-4">
          <p className={`px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 ${collapsed && !mobile ? "sr-only" : ""}`}>
            Quick links
          </p>
          <div className="mt-2 space-y-1">
            {SECONDARY_NAV_ITEMS.map((item) => (
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
        <div className="border-t border-slate-200 p-4">
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Accessibility
            </p>
            <p className="mt-1 text-sm text-slate-700">
              Keyboard navigation, focus states, and clear labels are built into the shell.
            </p>
            <p className="mt-3 text-sm font-semibold text-gov-700">Layout review ready</p>
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
    "group flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left transition",
    active ? "bg-gov-50 text-gov-900" : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
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
