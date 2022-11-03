import { FC, ReactNode, useState } from "react";
import { useDevBrainStore } from "../store";
import { AddPlan } from "./AddPlan";
import { AddSnapshot } from "./AddSnapshot";
import { PlanSelection } from "./PlanSelection";
import { SnapshotSelection } from "./SnapshotSelection";
import { useDetectClickOutside } from "react-detect-click-outside";

const MenuItem: FC<{ name: string; children: ReactNode }> = ({
  name,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useDetectClickOutside({ onTriggered: () => setOpen(false) });

  return (
    <div style={{ position: "relative", display: "inline-block" }} ref={ref}>
      <button onClick={() => setOpen(!open)}>{name}</button>
      <div
        style={{
          display: open ? "block" : "none",
          position: "absolute",
          backgroundColor: "#f1f1f1",
          minWidth: " 160px",
          boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
          zIndex: "1",
        }}
      >
        {children}
      </div>
    </div>
  );
};

const SnapshotMenu: FC = () => {
  return (
    <MenuItem name="Snapshots">
      <AddSnapshot />
      <SnapshotSelection />
    </MenuItem>
  );
};

const PlanMenu: FC = () => {
  return (
    <MenuItem name="Plans">
      <AddPlan />
      <PlanSelection />
    </MenuItem>
  );
};

export const AppBar: FC = () => {
  return (
    <div
      style={{
        width: "100vw",
        backgroundColor: "ButtonShadow",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <SnapshotMenu />
      <PlanMenu />
    </div>
  );
};
