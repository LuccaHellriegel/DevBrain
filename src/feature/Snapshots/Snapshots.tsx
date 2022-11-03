import {FC} from "react";
import {SnapshotSelection} from "./SnapshotSelection";
import {useCreateSnapshot} from "./useCreateSnapshot";

const FolderSelection: FC = () => {
  return (
    <input
      type="file"
      //@ts-ignore next-line
      webkitdirectory
      onChange={(event) => {
        event;
      }}
    />
  );
};

export const Snapshots: FC = () => {
  const createSnapshot = useCreateSnapshot();

  return (
    <div>
      <FolderSelection />
      <SnapshotSelection />
      <button onClick={createSnapshot}>Add Snapshot</button>
    </div>
  );
};
