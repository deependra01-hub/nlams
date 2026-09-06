import { create } from "zustand";

interface FilterState {
  searchText: string;
  setSearchText: (value: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchText: "",
  setSearchText: (searchText) => set({ searchText }),
}));
