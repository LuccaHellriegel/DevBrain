import {FC} from "react";
import {useDevBrainStore} from "../../store";
import {CodebaseNode, CodebaseNodeIdMap} from "../Snapshots/useCreateSnapshot";

export const CodeNode: FC<{data: CodebaseNode; map: CodebaseNodeIdMap}> = ({
  data,
  map,
}) => {
  if (!data.childIds) {
    return <CodeFile data={data} />;
  }

  return (
    <div>
      <div>{data.name}</div>
      <div
        style={{paddingLeft: "15px", paddingTop: "4px", paddingBottom: "4px"}}
      >
        {data.childIds?.map((val, index) => (
          <CodeNode data={map[val]} map={map} key={data.id + " " + index} />
        ))}
      </div>
    </div>
  );
};
const CodeFile: FC<{data: CodebaseNode}> = ({data}) => {
  const addFile = useDevBrainStore((state) => state.addFile);

  return (
    <div style={{flexDirection: "row", display: "flex", alignItems: "center"}}>
      <div>{data.name}</div>
      <button onClick={() => addFile(data.name)}>+</button>
    </div>
  );
};
