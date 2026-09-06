import type { GisFeature, GisLayerId, GisLayerSummary } from "../types/gis.types";

const GIS_FEATURES: GisFeature[] = [
  {
    id: "gis-project-1",
    kind: "project",
    label: "NH-07 Widening",
    subtitle: "Varanasi corridor",
    description: "Acquisition, compensation, and possession workstream at mid-phase.",
    district: "Varanasi",
    state: "Uttar Pradesh",
    lat: 25.3176,
    lng: 82.9739,
    status: "Acquisition",
    progress: 68,
    risk: 78,
    layer: "projects",
  },
  {
    id: "gis-project-2",
    kind: "project",
    label: "Industrial Ring Road",
    subtitle: "Indore urban segment",
    description: "Project area around the eastern ring road with utility shifting underway.",
    district: "Indore",
    state: "Madhya Pradesh",
    lat: 22.7196,
    lng: 75.8577,
    status: "Award",
    progress: 84,
    risk: 42,
    layer: "projects",
  },
  {
    id: "gis-parcel-1",
    kind: "parcel",
    label: "Survey 101/3",
    subtitle: "Sarnath parcel",
    description: "Parcel currently under review because of a boundary overlap and mutation update.",
    district: "Varanasi",
    state: "Uttar Pradesh",
    lat: 25.3817,
    lng: 82.9817,
    status: "Under review",
    progress: 46,
    risk: 84,
    layer: "parcels",
  },
  {
    id: "gis-parcel-2",
    kind: "parcel",
    label: "Survey 204/1",
    subtitle: "Mhow parcel",
    description: "Verified residential parcel ready for downstream award processing.",
    district: "Indore",
    state: "Madhya Pradesh",
    lat: 22.5465,
    lng: 75.7471,
    status: "Verified",
    progress: 92,
    risk: 28,
    layer: "parcels",
  },
  {
    id: "gis-village-1",
    kind: "village",
    label: "Sarnath cluster",
    subtitle: "Village review zone",
    description: "Village with multiple parcels linked to the current corridor alignment.",
    district: "Varanasi",
    state: "Uttar Pradesh",
    lat: 25.3749,
    lng: 82.9935,
    status: "Review zone",
    progress: 61,
    risk: 57,
    layer: "villages",
  },
  {
    id: "gis-village-2",
    kind: "village",
    label: "Kanke belt",
    subtitle: "Boundary concern area",
    description: "Spatial cluster with map overlap and title review items.",
    district: "Ranchi",
    state: "Jharkhand",
    lat: 23.4569,
    lng: 85.3188,
    status: "Boundary watch",
    progress: 33,
    risk: 87,
    layer: "villages",
  },
  {
    id: "gis-boundary-1",
    kind: "boundary",
    label: "Corridor boundary",
    subtitle: "Route envelope",
    description: "High-level acquisition envelope for the national corridor segment.",
    district: "Varanasi",
    state: "Uttar Pradesh",
    lat: 25.3405,
    lng: 82.9851,
    status: "Active",
    progress: 74,
    risk: 62,
    layer: "boundaries",
  },
];

const LAYER_META: Record<GisLayerId, Omit<GisLayerSummary, "count">> = {
  projects: {
    id: "projects",
    label: "Projects",
    description: "Operational project footprints and progress signals.",
  },
  parcels: {
    id: "parcels",
    label: "Parcels",
    description: "Survey points with land and verification context.",
  },
  villages: {
    id: "villages",
    label: "Villages",
    description: "Cluster-level spatial review areas.",
  },
  boundaries: {
    id: "boundaries",
    label: "Boundaries",
    description: "Route envelope and broad boundary overlays.",
  },
};

export const gisService = {
  getFeatures() {
    return GIS_FEATURES.slice();
  },

  getLayers() {
    return (Object.keys(LAYER_META) as GisLayerId[]).map((id) => ({
      ...LAYER_META[id],
      count: GIS_FEATURES.filter((feature) => feature.layer === id).length,
    }));
  },

  getFeaturesByLayer(layer: GisLayerId) {
    return GIS_FEATURES.filter((feature) => feature.layer === layer);
  },

  getFeatureById(featureId: string) {
    return GIS_FEATURES.find((feature) => feature.id === featureId) ?? null;
  },

  getMapCenter() {
    const points = GIS_FEATURES.slice(0, 4);
    return {
      lat: points.reduce((sum, feature) => sum + feature.lat, 0) / points.length,
      lng: points.reduce((sum, feature) => sum + feature.lng, 0) / points.length,
    };
  },

  getStats() {
    const total = GIS_FEATURES.length;
    const highRisk = GIS_FEATURES.filter((feature) => feature.risk >= 70).length;
    const averageProgress = Math.round(
      GIS_FEATURES.reduce((sum, feature) => sum + feature.progress, 0) / total,
    );

    return {
      total,
      highRisk,
      averageProgress,
      projectCount: GIS_FEATURES.filter((feature) => feature.kind === "project").length,
      parcelCount: GIS_FEATURES.filter((feature) => feature.kind === "parcel").length,
    };
  },
};
