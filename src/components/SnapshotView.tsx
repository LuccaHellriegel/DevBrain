import produce from "immer";
import {FC, useState} from "react";
import {useDevBrainStore} from "../store";
import {DropdownMenu, useDropDownMenu} from "./DropdownMenu";
import {defaultPlanItem, PlanItem, PlanItemTodo} from "./PlanView";
import {CodebaseNode} from "./useCreateSnapshot";

const CodeNode: FC<{snapshotId: string; nodeId: string}> = ({
  snapshotId,
  nodeId,
}) => {
  const data = useDevBrainStore(
    (state) => state.snapshots[snapshotId].map[nodeId]
  );
  const toggle = useDevBrainStore((state) => state.toggleCodebaseNode);

  if (!data.childIds) {
    return <CodeFile data={data} snapshotId={snapshotId} />;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "4px",
          backgroundColor: "violet",
          userSelect: "none",
        }}
      >
        <div>{data.name}</div>
        <div
          onClick={() => toggle(snapshotId, nodeId)}
          style={{cursor: "pointer"}}
        >
          {data.open ? ">" : "<"}
        </div>
      </div>
      <div
        style={{paddingLeft: "15px", paddingTop: "4px", paddingBottom: "4px"}}
      >
        {data.open &&
          data.childIds?.map((val, index) => (
            <CodeNode
              snapshotId={snapshotId}
              nodeId={val}
              key={data.id + " " + index}
            />
          ))}
      </div>
    </div>
  );
};

const defaultTodo = (name: string): PlanItemTodo => ({
  action: name,
  notes: "",
  state: false,
});

const actions = ["Change", "Refactor", "Stub", "Test", "Delete"];

const CodeFileAdder: FC<{data: CodebaseNode; snapshotId: string}> = ({
  data,
  snapshotId,
}) => {
  const addToCurrentPlan = useDevBrainStore((state) => state.addToCurrentPlan);
  const [itemConfig, setItemConfig] = useState<PlanItem>(
    defaultPlanItem(snapshotId, data.id)
  );

  const {menu, close} = useDropDownMenu();

  const inputer = (name: string) => {
    return (
      <div>
        <div
          style={{cursor: "pointer"}}
          onClick={(event) => {
            event.preventDefault();
            setItemConfig(
              produce(itemConfig, (state) => {
                if (!state.todos[name.toLowerCase()]) {
                  state.todos[name.toLowerCase()] = defaultTodo(name);
                }

                state.todos[name.toLowerCase()].state =
                  !state.todos[name.toLowerCase()].state;
              })
            );
          }}
        >
          <input
            type="checkbox"
            checked={
              itemConfig.todos[name.toLowerCase()]
                ? itemConfig.todos[name.toLowerCase()].state
                : false
            }
          />
          {name}
        </div>
        <textarea
          onChange={(event) => {
            event.preventDefault();
            setItemConfig(
              produce(itemConfig, (state) => {
                if (!state.todos[name.toLowerCase()]) {
                  state.todos[name.toLowerCase()] = defaultTodo(name);
                }
                state.todos[name.toLowerCase()].notes = event.target.value;
              })
            );
          }}
        />
      </div>
    );
  };

  return menu({
    name: "+",
    children: [
      actions.map((action) => inputer(action)),
      <button
        onClick={() => {
          addToCurrentPlan(itemConfig);
          close();
        }}
      >
        Submit
      </button>,
    ],
  });

  // (
  //   <DropdownMenu name="+">
  //     {actions.map((action) => inputer(action))}
  //     <button onClick={() => addToCurrentPlan(itemConfig)}>Submit</button>
  //   </DropdownMenu>
  // );
};

const CodeFile: FC<{data: CodebaseNode; snapshotId: string}> = ({
  data,
  snapshotId,
}) => {
  return (
    <div style={{flexDirection: "row", display: "flex", alignItems: "center"}}>
      <div>{data.name}</div>
      <CodeFileAdder data={data} snapshotId={snapshotId} />
    </div>
  );
};

export const SnapshotView: FC = () => {
  const selectedSnapshot = useDevBrainStore((state) =>
    state.selectedSnapshot ? state.snapshots[state.selectedSnapshot] : undefined
  );

  return (
    <div>
      {selectedSnapshot && (
        <CodeNode
          snapshotId={selectedSnapshot.id}
          nodeId={selectedSnapshot.root.id}
        />
      )}
    </div>
  );
};
