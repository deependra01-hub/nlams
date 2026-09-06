import type { GisFeature, GisLayerId } from "../types/gis.types";

export function layerColor(layer: GisLayerId) {
  switch (layer) {
    case "projects":
      return "#1d4ed8";
    case "parcels":
      return "#0f766e";
    case "villages":
      return "#d97706";
    case "boundaries":
      return "#7c3aed";
    default:
      return "#334155";
  }
}

export function riskTone(risk: number) {
  if (risk >= 80) return "danger";
  if (risk >= 60) return "warning";
  if (risk >= 30) return "primary";
  return "success";
}

export function formatCoordinates(feature: Pick<GisFeature, "lat" | "lng">) {
  return `${feature.lat.toFixed(4)}, ${feature.lng.toFixed(4)}`;
}
