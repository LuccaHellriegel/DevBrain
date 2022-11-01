import { invoke } from "@tauri-apps/api";

export interface SnapshotEntry {
  path: string;
  content: string;
}

export interface SnapshotConfiguration {
  path: string;
  extensions: string[];
  pathParts: string[];
}

export const createSnapshot = ({
  path,
  extensions,
  pathParts,
}: SnapshotConfiguration): Promise<SnapshotEntry[]> => {
  return invoke("read_files", {
    path,
    extensions,
    pathParts,
  });
};
