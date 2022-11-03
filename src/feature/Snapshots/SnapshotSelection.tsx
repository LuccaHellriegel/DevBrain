import {FC} from "react";
import {Snapshot} from "./useCreateSnapshot";
import {useDevBrainStore} from "../../store";
import {Link} from "react-router-dom";

const SnapshotElement: FC<{snapshot: Snapshot}> = ({snapshot}) => {
  const removeSnapshot = useDevBrainStore((state) => state.removeSnapshot);

  return (
    <div style={{display: "flex", flexDirection: "row"}}>
      <Link to={"/" + snapshot.id}>
        <div>{snapshot.root.name + "(" + new Date(snapshot.time) + ")"}</div>
      </Link>
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
