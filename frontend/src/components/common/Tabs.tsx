import { useState, type ReactNode } from "react";

export function Tabs({
  tabs,
  defaultActiveId,
}: {
  tabs: Array<{ id: string; label: string; content: ReactNode }>;
  defaultActiveId?: string;
}) {
  const [activeId, setActiveId] = useState(defaultActiveId ?? tabs[0]?.id ?? "");

  return (
    <div>
      <div
        role="tablist"
        aria-label="Design system tabs"
        className="flex flex-wrap gap-2 rounded-xl bg-slate-100 p-1"
      >
        {tabs.map((tab) => {
          const active = tab.id === activeId;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active}
              className={[
                "rounded-lg px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gov-500",
                active ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900",
              ].join(" ")}
              type="button"
              onClick={() => setActiveId(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="mt-4">{tabs.find((tab) => tab.id === activeId)?.content}</div>
    </div>
  );
}
