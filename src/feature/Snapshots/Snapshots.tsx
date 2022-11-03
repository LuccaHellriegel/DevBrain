import { FC, useState } from "react";
import { SnapshotSelection } from "./SnapshotSelection";
import { useCreateSnapshot } from "./useCreateSnapshot";
import { open } from "@tauri-apps/api/dialog";

const FolderSelection: FC<{
  setFolderPath: (path: string) => void;
  folderPath: string;
}> = ({ setFolderPath, folderPath }) => {
  return (
    <div>
      <button
        onClick={async () => {
          const selected = await open({
            directory: true,
          });
          if (typeof selected === "string") {
            setFolderPath(selected);
          }
        }}
      >
        Select folder
      </button>
      {folderPath}
    </div>
  );
};

const RELEVANT_EXTENSIONS = [".java"];

const RELEVANT_PATH_PARTS = ["/src/main/"];

export const Snapshots: FC = () => {
  const createSnapshot = useCreateSnapshot();
  const [folderPath, setFolderPath] = useState<string>("");

  return (
    <div>
      <FolderSelection setFolderPath={setFolderPath} folderPath={folderPath} />
      <SnapshotSelection />
      <button
        onClick={async () => {
          if (folderPath === "") return;

          await createSnapshot({
            path: folderPath,
            extensions: RELEVANT_EXTENSIONS,
            pathParts: RELEVANT_PATH_PARTS,
          });
        }}
      >
        Add Snapshot
      </button>
    </div>
  );
};
