import React from "react";
import { diff } from "./diff";
import { Pre } from "./pre";

export function Transition({ prev, next, progress }) {
  const steps = useSteps(prev, next);
  const index = Math.min(Math.floor(progress * steps.length), steps.length - 1);
  return (
    <Pre style={{ padding: 0, margin: 0 }}>{steps[index]}</Pre>
    // <pre>
    //   {JSON.stringify(changes, null, 2)}
    //   <br />
    //   {JSON.stringify(steps, null, 2)}
    // </pre>
  );
}

function useSteps(prev, next) {
  return React.useMemo(() => {
    const changes = diff(prev, next);

    let cursor = 0;
    const steps = [prev];
    changes.forEach((change) => {
      if (!change.added && !change.removed) {
        cursor += change.value.length;
      } else if (change.added) {
        let changedValue = change.value;

        if (changedValue.endsWith("\n")) {
          var current = steps[steps.length - 1];
          steps.push(current.slice(0, cursor) + "\n" + current.slice(cursor));
          changedValue = changedValue.slice(0, -1);
        }

        for (let i = 0; i < changedValue.length; i++) {
          current = steps[steps.length - 1];
          var changed =
            current.slice(0, cursor) + changedValue[i] + current.slice(cursor);
          cursor++;
          steps.push(changed);
        }
      } else if (change.removed) {
        cursor += change.value.length;
        for (let i = 0; i < change.value.length; i++) {
          cursor--;
          var current = steps[steps.length - 1];
          var changed = current.slice(0, cursor) + current.slice(cursor + 1);
          steps.push(changed);
        }
      } else {
        throw new Error("Shouldn't happen");
      }
    });
    return steps;
  }, [prev, next]);
}
