import type { ButtonHTMLAttributes, ComponentType } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leadingIcon?: ComponentType<{ className?: string }>;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gov-700 text-white hover:bg-gov-800 focus-visible:ring-gov-500 border border-transparent shadow-[0_8px_24px_rgba(27,82,181,0.18)]",
  secondary:
    "bg-white text-slate-800 hover:bg-slate-50 focus-visible:ring-gov-500 border border-slate-200 shadow-[0_1px_1px_rgba(15,29,47,0.03)]",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-gov-500 border border-transparent",
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
