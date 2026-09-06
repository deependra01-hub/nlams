import { create } from "zustand";

interface MapState {
  activeLayerId: string | null;
  setActiveLayerId: (layerId: string | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  activeLayerId: null,
  setActiveLayerId: (activeLayerId) => set({ activeLayerId }),
}));
