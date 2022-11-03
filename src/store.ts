import create from "zustand";
import { persist, StateStorage } from "zustand/middleware";
import localForage from "localforage";
import { Snapshot } from "./components/useCreateSnapshot";
import { Plan } from "./components/Plan";
import produce from "immer";

interface State {
  plans: Record<string, Plan>;
  selectedPlan?: string;
  selectPlan: (planId: string) => void;
  addPlan: (plan: Plan) => void;
  removePlan: (id: string) => void;
  addToCurrentPlan: (nodeId: string) => void;

  snapshots: Record<string, Snapshot>;
  selectedSnapshot?: string;
  selectSnapshot: (snapshotId: string) => void;
  toggleCodebaseNode: (snapshotId: string, nodeId: string) => void;
  addSnapshot: (snapshot: Snapshot) => void;
  removeSnapshot: (id: string) => void;
}

const prod = produce<(state: State) => void>;

export const useDevBrainStore = create<State>()(
  persist(
    (set) => ({
      plans: {},
      selectPlan: (planId) =>
        set(
          prod((state) => {
            state.selectedPlan = planId;
          })
        ),
      addPlan: (plan) =>
        set(
          prod((state) => {
            state.plans[plan.id] = plan;
          })
        ),
      removePlan: (id) =>
        set(
          prod((state) => {
            delete state.plans[id];
          })
        ),
      addToCurrentPlan: (nodeId) =>
        set(
          prod((state) => {
            if (!state.selectedPlan || !state.selectedSnapshot) return;
            state.plans[state.selectedPlan].items.push({
              snapshotId: state.selectedSnapshot,
              nodeId,
            });
          })
        ),
      snapshots: {},
      selectSnapshot: (snapshotId) =>
        set(
          prod((state) => {
            state.selectedSnapshot = snapshotId;
          })
        ),
      toggleCodebaseNode: (snapshotId, nodeId) =>
        set(
          prod((state) => {
            state.snapshots[snapshotId].map[nodeId].open =
              !state.snapshots[snapshotId].map[nodeId].open;
          })
        ),
      addSnapshot: (snapshot) =>
        set(
          prod((state) => {
            state.snapshots[snapshot.id] = snapshot;
          })
        ),
      removeSnapshot: (id) =>
        set(
          prod((state) => {
            delete state.snapshots[id];
          })
        ),
    }),
    {
      name: "devbrain",
      getStorage: () => localForage as StateStorage,
    }
  )
);
