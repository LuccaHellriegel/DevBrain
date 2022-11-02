import create from "zustand";
import { persist, StateStorage } from "zustand/middleware";
import localForage from "localforage";
import { Snapshot } from "./snapshots";

interface State {
  files: string[];
  snapshots: Snapshot[];
  addFile: (file: string) => void;
  addSnapshot: (snapshot: Snapshot) => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      files: [],
      snapshots: [],
      addFile: (file: string) =>
        set((state) => ({ files: [...state.files, file] })),
      addSnapshot: (snapshot: Snapshot) =>
        set((state) => ({ snapshots: [...state.snapshots, snapshot] })),
    }),
    {
      name: "devbrain",
      getStorage: () => localForage as StateStorage,
    }
  )
);
