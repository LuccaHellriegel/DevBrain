import { FC } from "react";
import { SnapshotSelection } from "./SnapshotSelection";
import { useCreateSnapshot } from "./useCreateSnapshot";
import { open } from "@tauri-apps/api/dialog";

export const AddSnapshot: FC = () => {
  const createSnapshot = useCreateSnapshot();
  return (
    <button
      onClick={async () => {
        const selected = await open({
          directory: true,
        });
        if (typeof selected === "string") {
          await createSnapshot({
            path: selected,
            extensions: RELEVANT_EXTENSIONS,
            pathParts: RELEVANT_PATH_PARTS,
          });
        }
      }}
    >
      Add Snapshot
    </button>
  );
};

const RELEVANT_EXTENSIONS = [".java"];

const RELEVANT_PATH_PARTS = ["/src/main/"];
