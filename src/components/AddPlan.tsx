import { nanoid } from "nanoid";
import { FC, useState } from "react";
import { useDevBrainStore } from "../store";

export const AddPlan: FC = () => {
  const addPlan = useDevBrainStore((state) => state.addPlan);

  const [planName, setPlanName] = useState("");

  return (
    <div style={{ padding: "4px" }}>
      <button
        onClick={() => {
          if (planName === "") return;
          const plan = { id: nanoid(), items: [], name: planName };
          addPlan(plan);
        }}
      >
        Add Plan
      </button>
      <input
        type="text"
        onChange={(event) => setPlanName(event.target.value)}
      ></input>
    </div>
  );
};
