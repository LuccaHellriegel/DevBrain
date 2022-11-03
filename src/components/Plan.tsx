import { nanoid } from "nanoid";
import { FC, useEffect, useState } from "react";
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

export const PlanName: FC<{ plan: Plan }> = ({ plan }) => {
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(plan.name);
  const updatePlan = useDevBrainStore((state) => state.updatePlan);

  useEffect(() => {
    setEditedName(plan.name);
    setEditing(false);
  }, [plan]);

  return editing ? (
    <input
      type="text"
      style={{ fontWeight: "bold", padding: "10px", fontSize: "2em" }}
      value={editedName}
      onChange={(event) => setEditedName(event.target.value)}
      onKeyDown={(event) => {
        console.log(event.key);
        if (event.key === "Enter") {
          event.preventDefault();
          updatePlan(plan.id, { name: editedName });
        }
        if (event.key === "Escape") {
          event.preventDefault();
          setEditedName(plan.name);
          setEditing(false);
        }
      }}
    />
  ) : (
    <div
      style={{ fontWeight: "bold", padding: "10px", fontSize: "2em" }}
      onClick={() => setEditing(true)}
    >
      {plan.name}
    </div>
  );
};

export const PlanView: FC = () => {
  const plan = useDevBrainStore((state) =>
    state.selectedPlan ? state.plans[state.selectedPlan] : undefined
  );
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
            <PlanName plan={plan} />
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
