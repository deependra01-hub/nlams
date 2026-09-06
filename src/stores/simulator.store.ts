import { create } from "zustand";

interface SimulatorState {
  activeScenarioId: string | null;
  setActiveScenarioId: (scenarioId: string | null) => void;
}

export const useSimulatorStore = create<SimulatorState>((set) => ({
  activeScenarioId: null,
  setActiveScenarioId: (activeScenarioId) => set({ activeScenarioId }),
}));
