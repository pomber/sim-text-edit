import React from "react";
import { history } from "./history";
import { Pre } from "./pre";

export function Transition({ prev, next, progress }) {
  const steps = useSteps(prev, next);
  const index = Math.min(Math.floor(progress * steps.length), steps.length - 1);
  return (
    <Pre style={{ padding: 0, margin: 0 }}>{steps[index].value}</Pre>
    // <pre>
    //   {JSON.stringify(changes, null, 2)}
    //   <br />
    //   {JSON.stringify(steps, null, 2)}
    // </pre>
  );
}

function useSteps(prev, next) {
  return React.useMemo(() => {
    return history(prev, next);
  }, [prev, next]);
}
