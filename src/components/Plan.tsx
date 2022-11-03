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
  name: string;
  items: PlanItem[];
}

export const PlanView: FC = () => {
  const plan = useDevBrainStore((state) => Object.values(state.plans)[0]);
  const selectedSnapshot = useDevBrainStore((state) => state.selectedSnapshot);
  const snapshots = useDevBrainStore((state) => state.snapshots);

  return (
    <div>
      {plan && selectedSnapshot && (
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "flex-start",
            gap: "40px",
          }}
        >
          <CodeNode
            snapshotId={selectedSnapshot}
            nodeId={snapshots[selectedSnapshot].root.id}
          />
          <div>
            <h1>{plan.name}</h1>
            <div>
              {plan.items.map((item) => (
                <li>{snapshots[item.snapshotId].map[item.nodeId].name}</li>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
