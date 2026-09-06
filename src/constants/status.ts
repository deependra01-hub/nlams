export type StatusKey = "verified" | "unverified" | "pending" | "blocked" | "delayed";

export const STATUS_META: Array<{
  key: StatusKey;
  label: string;
  className: string;
}> = [
  { key: "verified", label: "Verified", className: "text-emerald-700" },
  { key: "unverified", label: "Unverified", className: "text-slate-600" },
  { key: "pending", label: "Pending", className: "text-amber-700" },
  { key: "blocked", label: "Blocked", className: "text-red-700" },
  { key: "delayed", label: "Delayed", className: "text-orange-700" },
];

export const APP_NAME = "NLAMS";
