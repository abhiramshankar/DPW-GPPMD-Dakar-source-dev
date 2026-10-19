import { create } from "zustand";

interface IMainNavigationState {
  activeModule: string;
  setActiveModule: (activeModule: string) => void;
  reloadModule: () => void;
}

const useMainNavigationStore = create<IMainNavigationState>()((set, get) => ({
  activeModule: "My Actions",
  setActiveModule: (module) => set({ activeModule: module }),
  reloadModule: () => set({ activeModule: get().activeModule }),
}));
export default useMainNavigationStore;
