import React from "react";
import { Transition } from "./transition";
import "./transition.stories.css";
import { diff } from "./diff";
import { storiesOf } from "@storybook/react";
import fixtures from "./fixtures";
import { Pre } from "./pre";

const stories = storiesOf("Transition");
const fixtureNames = Object.keys(fixtures);

console.log({ fixtureNames });

fixtureNames.forEach((fixtureName) => {
  const [prev, next] = fixtures[fixtureName];
  console.log(fixtureName, prev, next);
  stories.add(fixtureName, () => <TransitionStory prev={prev} next={next} />);
});

function TransitionStory({ prev, next }) {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          From:<Pre>{prev}</Pre>
        </div>
        <div style={{ flex: 1 }}>
          To:<Pre>{next}</Pre>
        </div>
      </div>
      <hr />
      Result:
      <WithProgress>
        {(progress) => (
          <Transition prev={prev} next={next} progress={progress} />
        )}
      </WithProgress>
      <hr />
      Changes:
      <pre>{JSON.stringify(diff(prev, next), null, 2)}</pre>
    </div>
  );
}

function WithProgress({ children, length = 2 }) {
  const [{ progress, backward }, setState] = React.useState({
    progress: 0,
    backward: false,
  });
  return (
    <div style={{ height: 200 }}>
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
      <div style={{ background: "#444", color: "#fafafa" }}>
        {children(progress, backward)}
      </div>
    </div>
  );
}
