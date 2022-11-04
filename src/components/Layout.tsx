import {FC} from "react";
import {AppBar} from "./AppBar";
import {PlanView} from "./PlanView";
import {SnapshotView} from "./SnapshotView";

export const Layout: FC = () => {
  return (
    <div style={{width: "100vw", height: "100vh"}}>
      <AppBar />
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "flex-start",
          padding: "7px",
        }}
      >
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "flex-start",
            gap: "40px",
          }}
        >
          <SnapshotView />
          <PlanView />
        </div>
      </div>
    </div>
  );
};
