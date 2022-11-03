import create from "zustand";
import {persist, StateStorage} from "zustand/middleware";
import localForage from "localforage";
import {Snapshot} from "./feature/Snapshots/useCreateSnapshot";

interface State {
  files: string[];
  snapshots: Record<string, Snapshot>;
  addFile: (file: string) => void;
  addSnapshot: (snapshot: Snapshot) => void;
  removeSnapshot: (id: string) => void;
  path: string | undefined;
  setFolder: (path: string) => void;
}

export const useDevBrainStore = create<State>()(
  persist(
    (set) => ({
      files: [],
      snapshots: {},
      addFile: (file) => set((state) => ({files: [...state.files, file]})),
      addSnapshot: (snapshot) =>
        set((state) => ({
          snapshots: {...state.snapshots, [snapshot.id]: snapshot},
        })),
      removeSnapshot: (id) =>
        set((state) => ({
          snapshots: Object.fromEntries(
            Object.entries(state.snapshots).filter((arr) => arr[0] !== id)
          ),
        })),
      path: undefined,
      setFolder: (path) => set({path}),
    }),
    {
      name: "devbrain",
      getStorage: () => localForage as StateStorage,
    }
  )
);
