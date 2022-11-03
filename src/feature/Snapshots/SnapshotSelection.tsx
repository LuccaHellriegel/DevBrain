import { FC } from "react";
import { Snapshot } from "./useCreateSnapshot";
import { useDevBrainStore } from "../../store";

const SnapshotElement: FC<{ snapshot: Snapshot }> = ({ snapshot }) => {
  const removeSnapshot = useDevBrainStore((state) => state.removeSnapshot);
  const selectSnapshot = useDevBrainStore((state) => state.selectSnapshot);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div onClick={() => selectSnapshot(snapshot.id)}>
        {snapshot.root.name +
          "(" +
          new Date(snapshot.time).toLocaleString() +
          ")"}
      </div>
      <button onClick={() => removeSnapshot(snapshot.id)}>-</button>
    </div>
  );
};

export const SnapshotSelection: FC = () => {
  const snapshots = useDevBrainStore((state) => Object.values(state.snapshots));

  return (
    <div>
      {snapshots.map((snapshot) => (
        <SnapshotElement snapshot={snapshot} />
      ))}
    </div>
  );
};
