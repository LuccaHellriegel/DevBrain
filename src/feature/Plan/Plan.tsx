import {FC} from "react";
import {useParams} from "react-router-dom";
import {useDevBrainStore} from "../../store";
import {CodeNode} from "./CodeNode";

export const Plan: FC = () => {
  const {snapshotId} = useParams();
  const snapshot = useDevBrainStore((state) =>
    snapshotId ? state.snapshots[snapshotId] : undefined
  );
  const files = useDevBrainStore((state) => state.files);

  return (
    <div>
      {snapshot && (
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <CodeNode data={snapshot.root} map={snapshot.map} />
          <div>
            {files.map((file) => (
              <li>{file}</li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
