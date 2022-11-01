import { nanoid } from "nanoid";
import { FC } from "react";
import { useStore } from "./store";
import { CodebaseFileEntry, useFileEntries } from "./useFileEntries";

interface CodeBaseNode {
  name: string;
  id: string;
  parentId?: string;
  childIds?: string[];
  children?: CodeBaseNode[];
}

//TODO: switch to ID-based access
function mapToTree(entries: CodebaseFileEntry[]) {
  const nodeNameMap: Record<string, CodeBaseNode> = {};
  let root = { name: "", children: [], id: nanoid(), childIds: [] };
  nodeNameMap[""] = root;
  for (const entry of entries) {
    let pathParts = entry.path.split("/");
    if (entry.path.startsWith("/")) {
      pathParts = pathParts.slice(1);
    }

    let cur = "";
    for (const part of pathParts) {
      if (part.split(".").length > 1) {
        //file
        const node = nodeNameMap[cur];
        //TODO: methods?
        const fileNode = { name: cur + part, id: nanoid() };
        node.childIds?.push(fileNode.id);
        node.children?.push(fileNode);
        //need to add for post processing
        nodeNameMap[fileNode.name] = fileNode;
      } else {
        //folder
        const parent = nodeNameMap[cur];
        cur += part + "/";
        if (!nodeNameMap[cur]) {
          const node = {
            name: cur,
            children: [],
            id: nanoid(),
            childIds: [],
            parentId: parent.id,
          };
          nodeNameMap[cur] = node;
          //there are no dirs without children, because we map from the file paths
          parent.children?.push(node);
          parent.childIds?.push(node.id);
        }
      }
    }
  }

  //find actual root
  while (true) {
    if (root.children.length === 1) {
      delete nodeNameMap[root.name];
      root = root.children[0];
    } else {
      break;
    }
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
    if (node.children) {
      node.children.sort((a, b) => {
        if ((a.children && b.children) || (!a.children && !b.children)) {
          return a.name.localeCompare(b.name);
        }

        if (!a.children) return -1;
        return 1;
      });
    }
  });

  return root;
}

const FileCmp: FC<{ data: CodeBaseNode }> = ({ data }) => {
  const addFile = useStore((state) => state.addFile);

  return (
    <div
      style={{ flexDirection: "row", display: "flex", alignItems: "center" }}
    >
      <div>{data.name}</div>
      <button onClick={() => addFile(data.name)}>+</button>
    </div>
  );
};

const NodeCmp: FC<{ data: CodeBaseNode }> = ({ data }) => {
  if (!data.children) {
    return <FileCmp data={data} />;
  }

  return (
    <div>
      <div>{data.name}</div>
      <div
        style={{ paddingLeft: "15px", paddingTop: "4px", paddingBottom: "4px" }}
      >
        {data.children?.map((val, index) => (
          <NodeCmp data={val} key={data.name + index} />
        ))}
      </div>
    </div>
  );
};

function App() {
  const entries = useFileEntries();
  const files = useStore((state) => state.files);
  return (
    <div
      style={{
        flexDirection: "row",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <NodeCmp data={mapToTree(entries)} />
      <div>
        {files.map((file) => (
          <li>{file}</li>
        ))}
      </div>
    </div>
  );
}

export default App;
