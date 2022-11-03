import { nanoid } from "nanoid";
import { FC, useState } from "react";
import { useDevBrainStore } from "../store";

export const AddPlan: FC = () => {
  const addPlan = useDevBrainStore((state) => state.addPlan);

  const [planName, setPlanName] = useState("");

  const handler = () => {
    if (planName === "") return;
    const plan = { id: nanoid(), items: [], name: planName };
    addPlan(plan);
    setPlanName("");
  };

  return (
    <div style={{ padding: "4px" }}>
      <button onClick={handler}>Add Plan</button>
      <input
        type="text"
        value={planName}
        onChange={(event) => setPlanName(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            handler();
          }
        }}
      ></input>
    </div>
  );
};
