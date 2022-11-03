import { FC } from "react";
import { Snapshot } from "./useCreateSnapshot";
import { useDevBrainStore } from "../store";

const SnapshotElement: FC<{ snapshot: Snapshot; selected: boolean }> = ({
  snapshot,
  selected,
}) => {
  const removeSnapshot = useDevBrainStore((state) => state.removeSnapshot);
  const selectSnapshot = useDevBrainStore((state) => state.selectSnapshot);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: selected ? "ActiveBorder" : "Background",
        cursor: "pointer",
        justifyContent: "space-between",
      }}
    >
      <div onClick={() => selectSnapshot(snapshot.id)}>
        {snapshot.root.name +
          " (" +
          new Date(snapshot.time).toLocaleString() +
          ")"}
      </div>
      <button onClick={() => removeSnapshot(snapshot.id)}>-</button>
    </div>
  );
};

export const SnapshotSelection: FC = () => {
  const snapshots = useDevBrainStore((state) => Object.values(state.snapshots));
  const selectedSnapshot = useDevBrainStore((state) => state.selectedSnapshot);

  return (
    <div>
      {snapshots.map((snapshot) => (
        <SnapshotElement
          snapshot={snapshot}
          selected={snapshot.id === selectedSnapshot}
        />
      ))}
    </div>
  );
};
