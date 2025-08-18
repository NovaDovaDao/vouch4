import { create } from "zustand";

interface AppStore {
  selectedGymId?: string;
  setSelectedGymId: (id: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  selectedGymId: "",
  setSelectedGymId: (id: string) => set({ selectedGymId: id }),
}));
