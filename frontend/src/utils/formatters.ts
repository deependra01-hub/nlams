export function formatCurrencyInCrore(value: number) {
  return `₹${value.toLocaleString("en-IN")} cr`;
}

export function formatPercentage(value: number) {
  return `${value}%`;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function formatCount(value: number) {
  return value.toLocaleString("en-IN");
}
