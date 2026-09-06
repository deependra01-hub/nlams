export type GisLayerId = "projects" | "parcels" | "villages" | "boundaries";

export type GisFeatureKind = "project" | "parcel" | "village" | "boundary";

export interface GisFeature {
  id: string;
  kind: GisFeatureKind;
  label: string;
  subtitle: string;
  description: string;
  district: string;
  state: string;
  lat: number;
  lng: number;
  status: string;
  progress: number;
  risk: number;
  layer: GisLayerId;
}

export interface GisLayerSummary {
  id: GisLayerId;
  label: string;
  description: string;
  count: number;
}
