import { FC } from "react";
import {
  CodebaseNode,
  CodebaseNodeIdMap,
  useCreateSnapshot,
} from "./snapshots";
import { useStore } from "./store";

const FileCmp: FC<{ data: CodebaseNode }> = ({ data }) => {
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

const NodeCmp: FC<{ data: CodebaseNode; map: CodebaseNodeIdMap }> = ({
  data,
  map,
}) => {
  if (!data.childIds) {
    return <FileCmp data={data} />;
  }

  return (
    <div>
      <div>{data.name}</div>
      <div
        style={{ paddingLeft: "15px", paddingTop: "4px", paddingBottom: "4px" }}
      >
        {data.childIds?.map((val, index) => (
          <NodeCmp data={map[val]} map={map} key={data.id + " " + index} />
        ))}
      </div>
    </div>
  );
};

function App() {
  const createSnapshot = useCreateSnapshot();
  const snapshot = useStore((state) => state.snapshots[0]);
  const files = useStore((state) => state.files);

  return (
    <div>
      <button onClick={createSnapshot}></button>
      {snapshot && (
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <NodeCmp data={snapshot.root} map={snapshot.map} />
          <div>
            {files.map((file) => (
              <li>{file}</li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
