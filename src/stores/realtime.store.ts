import { create } from "zustand";

interface RealtimeState {
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
}

export const useRealtimeStore = create<RealtimeState>((set) => ({
  isConnected: false,
  setIsConnected: (isConnected) => set({ isConnected }),
}));
