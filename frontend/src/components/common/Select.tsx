import type { SelectHTMLAttributes } from "react";

export function Select({
  label,
  className = "",
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        className={[
          "nlams-control h-10 w-full min-w-[10rem] border-sky-100 bg-white px-3 text-sm shadow-sm transition focus-visible:ring-2 focus-visible:ring-violet-500",
          className,
        ].join(" ")}
        {...props}
      />
    </label>
  );
}
