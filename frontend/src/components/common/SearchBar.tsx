import type { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";

export function SearchBar({
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
          "nlams-control h-10 w-full min-w-[12rem] border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(245,248,255,0.95)_100%)] pl-9 pr-3 text-sm shadow-sm transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-violet-500",
          className,
        ].join(" ")}
        {...props}
      />
    </label>
  );
}
