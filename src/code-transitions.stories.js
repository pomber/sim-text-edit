import React from "react";
import "./transition.stories.css";
import { storiesOf } from "@storybook/react";
import fixtures from "./fixtures";
import { history } from "./history";
import { Code } from "./code";

const stories = storiesOf("Code Transition");
const fixtureNames = Object.keys(fixtures);

fixtureNames.forEach((fixtureName) => {
  const [prev, next] = fixtures[fixtureName];
  stories.add(fixtureName, () => <CodeTransition prev={prev} next={next} />);
});

function CodeTransition({ prev, next }) {
  const steps = history(prev, next);
  return (
    <WithProgress length={steps.length}>
      {(progress) => {
        const step = steps[Math.floor(progress)];
        const nextStep = steps[Math.floor(progress + 1)];
        const cursor =
          step.cursorAfter != null ? step.cursorAfter : nextStep.cursorBefore;
        return <Code code={step.value} cursor={cursor} />;
      }}
    </WithProgress>
  );
}

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
