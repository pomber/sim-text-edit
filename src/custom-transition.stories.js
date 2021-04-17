import React from "react";
import "./transition.stories.css";
import { storiesOf } from "@storybook/react";
import { history } from "./history";
import { Code } from "./code";
import "./custom.css";

const stories = storiesOf("Custom Code Transition");
stories.add("Custom", () => <CodeTransition />);

function CodeTransition() {
  const [prev, setPrev] = React.useState(defaultPrev);
  const [next, setNext] = React.useState(defaultNext);
  const steps = history(prev, next);
  return (
    <div>
      <div>From:</div>
      <textarea value={prev} onChange={(e) => setPrev(e.target.value)} />
      <div>To:</div>
      <textarea value={next} onChange={(e) => setNext(e.target.value)} />
      <hr />
      <WithProgress length={steps.length}>
        {(progress) => {
          const step = steps[Math.floor(progress)];
          const nextStep = steps[Math.floor(progress + 1)];
          const cursor =
            step.cursorAfter != null ? step.cursorAfter : nextStep.cursorBefore;
          return <Code code={step.value} cursor={cursor} />;
        }}
      </WithProgress>
    </div>
  );
}

const defaultPrev = `function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit;
  if (sit) {
    dolor = sit - amet(dolor);
  }
  return sit ? dolor : [];
}`;
const defaultNext = `function lorem(ipsum, elit, dolor = 1) {
  if (elit) {
    dolor = sit - amet(dolor);
  }  
  let dolore = 0;
  let magna = 0;
  const aliqua = new eiusmod(labore.ut(sit / ut));
  return aliqua;
}`;

function WithProgress({ children, length = 2 }) {
  const [{ progress, backward }, setState] = React.useState({
    progress: 0,
    backward: false,
  });
  return (
    <div style={{ minHeight: 200 }}>
      <div style={{ display: "flex", margin: "10px 0" }}>
        <input
          style={{ flex: "1" }}
          type="range"
          value={progress}
          max={length - 1}
          step={0.01}
          onChange={(e) => {
            const newProgress = +e.target.value;
            setState((oldState) => ({
              progress: newProgress,
              backward: oldState.progress > newProgress,
            }));
          }}
        />
        <span style={{ width: 40, textAlign: "right" }}>
          {progress.toFixed(2)}
        </span>
      </div>
      <div>{children(progress, backward)}</div>
    </div>
  );
}
