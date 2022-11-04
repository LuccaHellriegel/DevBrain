import create from "zustand";
import {persist, StateStorage} from "zustand/middleware";
import localForage from "localforage";
import {Snapshot} from "./components/useCreateSnapshot";
import {Plan, PlanItem} from "./components/PlanView";
import produce from "immer";

//TODO: markdown export of plan, so I can add it to obsidian
//TODO: need to add test cases list!

interface State {
  plans: Record<string, Plan>;
  selectedPlan?: string;
  selectPlan: (planId: string) => void;
  updatePlan: (planId: string, delta: Partial<Plan>) => void;
  addPlan: (plan: Plan) => void;
  removePlan: (id: string) => void;
  addToCurrentPlan: (item: PlanItem) => void;

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
      updatePlan: (planId, delta) =>
        set(
          prod((state) => {
            state.plans[planId] = {...state.plans[planId], ...delta};
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
            if (state.selectedPlan === id) {
              delete state.selectedPlan;
            }
          })
        ),
      addToCurrentPlan: (item) =>
        set(
          prod((state) => {
            if (!state.selectedPlan || !state.selectedSnapshot) return;
            state.plans[state.selectedPlan].items.push(item);
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
            if (state.selectedSnapshot === id) {
              state.selectedSnapshot = undefined;
            }
            const deletedPlanItems: PlanItem[] = [];
            Object.values(state.plans).forEach((plan) => {
              plan.items = plan.items.filter((item) => {
                if (item.snapshotId === id) {
                  deletedPlanItems.push(item);
                  return false;
                }

                return true;
              });
            });
          })
        ),
    }),
    {
      name: "devbrain",
      getStorage: () => localForage as StateStorage,
    }
  )
);
