import type { ButtonHTMLAttributes, ComponentType } from "react";

export function IconButton({
  icon: Icon,
  label,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={[
        "inline-flex h-10 w-10 items-center justify-center rounded-control border border-sky-100 bg-white text-slate-700 shadow-sm transition hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(244,247,255,0.98))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2",
        className,
      ].join(" ")}
      {...props}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
