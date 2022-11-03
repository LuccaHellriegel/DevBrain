import { invoke } from "@tauri-apps/api";
import { nanoid } from "nanoid";
import { useDevBrainStore } from "../../store";

export interface CodebaseNode {
  name: string;
  id: string;
  open: boolean;
  parentId?: string;
  childIds?: string[];
}

export type CodebaseNodeIdMap = Record<string, CodebaseNode>;

export interface Snapshot {
  time: number;
  id: string;
  root: CodebaseNode;
  map: CodebaseNodeIdMap;
}

export interface SnapshotEntry {
  path: string;
  content: string;
}

export interface SnapshotConfiguration {
  path: string;
  extensions: string[];
  pathParts: string[];
}

export interface CodebaseFileEntry {
  path: string;
  content: string;
}

export const createSnapshot = ({
  path,
  extensions,
  pathParts,
}: SnapshotConfiguration): Promise<Snapshot> => {
  return invoke("read_files", {
    path,
    extensions,
    pathParts,
  }).then((entries) => {
    if ((entries as []).length == 0) {
      throw "No entries found";
    }

    return mapToTree(entries as CodebaseFileEntry[]);
  });
};

const defaultNode = (name: string, childIds?: string[]): CodebaseNode => {
  return { name: name, id: nanoid(), open: true, childIds };
};

function mapToTree(entries: CodebaseFileEntry[]): Snapshot {
  //used for finding parents
  const nodeNameMap: Record<string, CodebaseNode> = {};
  const nodeIdMap: CodebaseNodeIdMap = {};
  let root: CodebaseNode = defaultNode("", []);
  nodeNameMap[""] = root;
  nodeIdMap[root.id] = root;
  for (const entry of entries) {
    let pathParts = entry.path.split("/");
    if (entry.path.startsWith("/")) {
      pathParts = pathParts.slice(1);
    }

    let cur = "";
    for (const part of pathParts) {
      const parent = nodeNameMap[cur];
      if (part.split(".").length > 1) {
        //file
        const fileNode = defaultNode(cur + part);
        parent.childIds?.push(fileNode.id);
        //need to add for post processing
        nodeNameMap[fileNode.name] = fileNode;
        nodeIdMap[fileNode.id] = fileNode;
      } else {
        //folder
        cur += part + "/";
        if (!nodeNameMap[cur]) {
          const node = defaultNode(cur, []);
          node.parentId = parent.id;
          nodeNameMap[cur] = node;
          nodeIdMap[node.id] = node;
          //there are no dirs without children, because we map from the file paths
          parent.childIds?.push(node.id);
        }
      }
    }
  }

  //find actual root
  while (root.childIds?.length === 1) {
    delete nodeNameMap[root.name];
    delete nodeIdMap[root.id];
    root = nodeIdMap[root.childIds[0]] as CodebaseNode;
  }

  //cut off unrelated file path
  const pathToCutOff = root.name.split("/").slice(0, -2).join("/");

  //post processing
  Object.values(nodeNameMap).forEach((node) => {
    node.name = node.name.slice(pathToCutOff.length + 1);
    if (node.name.endsWith("/")) {
      node.name = node.name.slice(0, -1);
    }
    node.name = node.name.split("/").pop() as string;
    if (node.childIds) {
      node.childIds.sort((id1, id2) => {
        const a = nodeIdMap[id1];
        const b = nodeIdMap[id2];

        if ((a.childIds && b.childIds) || (!a.childIds && !b.childIds)) {
          return a.name.localeCompare(b.name);
        }

        if (!a.childIds) return -1;
        return 1;
      });
    }
  });

  return { root, map: nodeIdMap, time: Date.now(), id: nanoid() };
}

export const useCreateSnapshot = () => {
  const addSnapshot = useDevBrainStore((state) => state.addSnapshot);
  return (config: SnapshotConfiguration) => {
    console.log("Adding Snapshot.");
    createSnapshot(config).then((snapshot) => {
      console.log("Retrieved Snapshot: ", snapshot);
      addSnapshot(snapshot);
    });
  };
};
