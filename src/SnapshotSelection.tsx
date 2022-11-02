import { FC } from "react";
import { Snapshot } from "./snapshots";
import { useStore } from "./store";

const Snapshot: FC<{ snapshot: Snapshot }> = ({ snapshot }) => {
  return <div>{snapshot.root.name + "(" + new Date(snapshot.time) + ")"}</div>;
};

export const SnapshotSelection: FC = () => {
  const snapshots = useStore((state) => state.snapshots);

  return (
    <div>
      {snapshots.map((snapshot) => (
        <Snapshot snapshot={snapshot} />
      ))}
    </div>
  );
};
