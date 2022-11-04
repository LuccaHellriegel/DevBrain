import {FC, ReactNode, useState} from "react";
import {useDevBrainStore} from "../store";
import {AddPlan} from "./AddPlan";
import {AddSnapshot} from "./AddSnapshot";
import {PlanSelection} from "./PlanSelection";
import {SnapshotSelection} from "./SnapshotSelection";
import {DropdownMenu} from "./DropdownMenu";

const SnapshotMenu: FC = () => {
  return (
    <DropdownMenu name="Snapshots">
      <AddSnapshot />
      <SnapshotSelection />
    </DropdownMenu>
  );
};

const PlanMenu: FC = () => {
  return (
    <DropdownMenu name="Plans">
      <AddPlan />
      <PlanSelection />
    </DropdownMenu>
  );
};

export const AppBar: FC = () => {
  return (
    <div
      style={{
        backgroundColor: "ButtonShadow",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: "4px",
        paddingRight: "4px",
      }}
    >
      <SnapshotMenu />
      <PlanMenu />
    </div>
  );
};
