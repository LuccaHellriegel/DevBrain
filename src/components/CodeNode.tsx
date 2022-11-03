import { FC } from "react";
import { useDevBrainStore } from "../store";
import { CodebaseNode } from "./useCreateSnapshot";

export const CodeNode: FC<{ snapshotId: string; nodeId: string }> = ({
  snapshotId,
  nodeId,
}) => {
  const data = useDevBrainStore(
    (state) => state.snapshots[snapshotId].map[nodeId]
  );
  const toggle = useDevBrainStore((state) => state.toggleCodebaseNode);

  if (!data.childIds) {
    return <CodeFile data={data} />;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "4px",
          backgroundColor: "violet",
          userSelect: "none",
        }}
      >
        <div>{data.name}</div>
        <div onClick={() => toggle(snapshotId, nodeId)}>
          {data.open ? ">" : "<"}
        </div>
      </div>
      <div
        style={{ paddingLeft: "15px", paddingTop: "4px", paddingBottom: "4px" }}
      >
        {data.open &&
          data.childIds?.map((val, index) => (
            <CodeNode
              snapshotId={snapshotId}
              nodeId={val}
              key={data.id + " " + index}
            />
          ))}
      </div>
    </div>
  );
};
const CodeFile: FC<{ data: CodebaseNode }> = ({ data }) => {
  const addToCurrentPlan = useDevBrainStore((state) => state.addToCurrentPlan);

  return (
    <div
      style={{ flexDirection: "row", display: "flex", alignItems: "center" }}
    >
      <div>{data.name}</div>
      <button onClick={() => addToCurrentPlan(data.id)}>+</button>
    </div>
  );
};
