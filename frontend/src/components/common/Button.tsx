import type { ButtonHTMLAttributes, ComponentType } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leadingIcon?: ComponentType<{ className?: string }>;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#6d5dfc_0%,#2e7af0_100%)] text-white hover:brightness-105 focus-visible:ring-violet-500 border border-transparent shadow-[0_10px_28px_rgba(83,92,255,0.24)]",
  secondary:
    "bg-white text-slate-800 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(246,248,255,0.96))] focus-visible:ring-violet-500 border border-sky-100 shadow-[0_1px_1px_rgba(15,29,47,0.03)]",
  ghost:
    "bg-transparent text-slate-700 hover:bg-sky-50 focus-visible:ring-violet-500 border border-transparent",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 border border-transparent shadow-[0_8px_24px_rgba(185,28,28,0.14)]",
};

export function Button({
  variant = "primary",
  leadingIcon: Icon,
  className = "",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variantClasses[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </button>
  );
}
