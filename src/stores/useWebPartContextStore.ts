import { create } from "zustand";
import { WebPartContext } from "@microsoft/sp-webpart-base";

interface IWebPartContextState {
  context: WebPartContext;
  isController: boolean;
  setContext: (context: WebPartContext) => void;
  setIsController: (isController: boolean) => void;
  livestreamURL: string;
}

const useWebPartContextStore = create<IWebPartContextState>()((set) => ({
  context: {} as WebPartContext,
  setContext: (context) => set({ context: context }),
  isController: false,
  setIsController: (isController) => set({ isController: isController }),
  livestreamURL: "",
}));
export default useWebPartContextStore;

