import create from "zustand";
import { persist, StateStorage } from "zustand/middleware";
import localForage from "localforage";

interface State {
  files: string[];
  addFile: (file: string) => void;
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      files: [],
      addFile: (file: string) => set({ files: [...get().files, file] }),
    }),
    {
      name: "devbrain",
      getStorage: () => localForage as StateStorage,
    }
  )
);
