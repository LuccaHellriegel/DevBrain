import React from "react";
import ReactDOM from "react-dom/client";
import { PlanView } from "./components/Plan";
import { Snapshots } from "./components/Snapshots";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div
      style={{
        flexDirection: "row",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <Snapshots />
      <PlanView />
    </div>
  </React.StrictMode>
);
