import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
}

export function Input({
  label,
  hint,
  error,
  className = "",
  id,
  ...props
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>
      <input
        id={id}
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
