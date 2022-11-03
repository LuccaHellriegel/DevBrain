import { nanoid } from "nanoid";
import { FC } from "react";
import { useDevBrainStore } from "../store";
import { CodeNode } from "./CodeNode";

export interface PlanItem {
  snapshotId: string;
  nodeId: string;
}

export interface Plan {
  id: string;
  items: PlanItem[];
}

export const PlanView: FC = () => {
  const addPlan = useDevBrainStore((state) => state.addPlan);
  const selectPlan = useDevBrainStore((state) => state.selectPlan);
  const plan = useDevBrainStore((state) => Object.values(state.plans)[0]);
  const selectedSnapshot = useDevBrainStore((state) => state.selectedSnapshot);
  const snapshots = useDevBrainStore((state) => state.snapshots);

  return (
    <div>
      <button
        onClick={() => {
          const plan = { id: nanoid(), items: [] };
          addPlan(plan);
          selectPlan(plan.id);
        }}
      >
        Add Plan
      </button>
      {plan && selectedSnapshot && (
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <CodeNode
            snapshotId={selectedSnapshot}
            nodeId={snapshots[selectedSnapshot].root.id}
          />
          <div>
            {plan.items.map((item) => (
              <li>{snapshots[item.snapshotId].map[item.nodeId].name}</li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
