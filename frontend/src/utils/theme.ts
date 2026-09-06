export const SEMANTIC_SURFACES = [
  { label: "Surface", value: "white", swatch: "bg-white" },
  { label: "Surface Subtle", value: "off-white", swatch: "bg-slate-50" },
  { label: "Surface Elevated", value: "raised", swatch: "bg-white" },
];

export const SEMANTIC_COLORS = [
  {
    label: "Primary",
    token: "gov blue",
    swatch: "bg-gov-700",
    textClass: "text-gov-700",
  },
  {
    label: "Success",
    token: "verified / success",
    swatch: "bg-emerald-600",
    textClass: "text-emerald-700",
  },
  {
    label: "Warning",
    token: "warning / delayed",
    swatch: "bg-amber-600",
    textClass: "text-amber-700",
  },
  {
    label: "Danger",
    token: "critical / blocked",
    swatch: "bg-red-600",
    textClass: "text-red-700",
  },
  {
    label: "Neutral",
    token: "inactive / muted",
    swatch: "bg-slate-400",
    textClass: "text-slate-600",
  },
];

export const RISK_LEVELS = [
  {
    key: "low",
    label: "Low",
    tone: "Verified",
    className: "border-emerald-200 bg-emerald-50 text-emerald-800",
  },
  {
    key: "moderate",
    label: "Moderate",
    tone: "Watch",
    className: "border-amber-200 bg-amber-50 text-amber-800",
  },
  {
    key: "high",
    label: "High",
    tone: "Attention",
    className: "border-orange-200 bg-orange-50 text-orange-800",
  },
  {
    key: "critical",
    label: "Critical",
    tone: "Escalate",
    className: "border-red-200 bg-red-50 text-red-800",
  },
] as const;

export const TRUST_LEVELS = [
  {
    key: "trusted",
    label: "Trusted",
    className: "border-emerald-200 bg-emerald-50 text-emerald-800",
  },
  {
    key: "review",
    label: "Review Required",
    className: "border-amber-200 bg-amber-50 text-amber-800",
  },
  {
    key: "mismatch",
    label: "Mismatch Detected",
    className: "border-red-200 bg-red-50 text-red-800",
  },
] as const;
