import {FC} from "react";
import {Plan} from "./PlanView";
import {useDevBrainStore} from "../store";

const PlanElement: FC<{plan: Plan; selected: boolean}> = ({plan, selected}) => {
  const removePlan = useDevBrainStore((state) => state.removePlan);
  const selectPlan = useDevBrainStore((state) => state.selectPlan);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: selected ? "ActiveBorder" : "Background",
        cursor: "pointer",
        justifyContent: "space-between",
      }}
    >
      <div onClick={() => selectPlan(plan.id)}>{plan.name}</div>
      <button onClick={() => removePlan(plan.id)}>-</button>
    </div>
  );
};

export const PlanSelection: FC = () => {
  const plans = useDevBrainStore((state) => Object.values(state.plans));
  const selectedPlan = useDevBrainStore((state) => state.selectedPlan);

  return (
    <div>
      {plans.map((plan) => (
        <PlanElement
          plan={plan}
          selected={plan.id === selectedPlan}
          key={plan.id}
        />
      ))}
    </div>
  );
};
