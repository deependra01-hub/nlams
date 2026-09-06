import type { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";

export function SearchInput({
  label,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        className={[
          "nlams-control h-10 w-full min-w-[12rem] pl-9 pr-3 text-sm shadow-sm transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-gov-500",
          className,
        ].join(" ")}
        {...props}
      />
    </label>
  );
}
