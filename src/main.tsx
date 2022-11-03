import React from "react";
import ReactDOM from "react-dom/client";
import { AppBar } from "./components/AppBar";
import { PlanView } from "./components/Plan";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppBar />
    <div
      style={{
        flexDirection: "row",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <PlanView />
    </div>
  </React.StrictMode>
);
