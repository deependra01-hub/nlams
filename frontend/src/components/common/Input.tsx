import type { ComponentType, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  leadingIcon?: ComponentType<{ className?: string }>;
}

export function Input({
  label,
  hint,
  error,
  leadingIcon: Icon,
  className = "",
  id,
  ...props
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>
      <div className="relative">
        {Icon ? (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        ) : null}
        <input
          id={id}
          className={[
            "nlams-control w-full py-2 text-sm shadow-sm transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-gov-500",
            Icon ? "pl-9 pr-3" : "px-3",
            error ? "border-red-300" : "",
            className,
          ].join(" ")}
          {...props}
        />
      </div>
      {error ? (
        <span className="mt-2 block text-xs font-medium text-red-700">{error}</span>
      ) : hint ? (
        <span className="mt-2 block text-xs text-slate-500">{hint}</span>
      ) : null}
    </label>
  );
}

export function Textarea({
  label,
  hint,
  error,
  className = "",
  id,
  rows = 4,
  ...props
}: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>
      <textarea
        id={id}
        rows={rows}
        className={[
          "nlams-control w-full px-3 py-2 text-sm shadow-sm transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-gov-500",
          error ? "border-red-300" : "",
          className,
        ].join(" ")}
        {...props}
      />
      {error ? (
        <span className="mt-2 block text-xs font-medium text-red-700">{error}</span>
      ) : hint ? (
        <span className="mt-2 block text-xs text-slate-500">{hint}</span>
      ) : null}
    </label>
  );
}
