import { FC } from "react";
import { AppBar } from "./AppBar";
import { PlanView } from "./Plan";

export const Layout: FC = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <AppBar />
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "flex-start",
          padding: "7px",
        }}
      >
        <PlanView />
      </div>
    </div>
  );
};
