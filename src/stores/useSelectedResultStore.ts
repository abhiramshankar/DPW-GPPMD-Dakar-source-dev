import { create } from "zustand";

interface ISelectedResultState {
  selectedItem: any;
  setSelectedItem: (selected: any) => void;
}

const useSelectedResultStore = create<ISelectedResultState>()((set) => ({
  selectedItem: undefined,
  setSelectedItem: (item) => set({ selectedItem: item })
}));
export default useSelectedResultStore;

