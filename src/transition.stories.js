import React from "react";
import { Transition } from "./transition";
import "./transition.stories.css";
import { diff, newDiff } from "./diff";
import { storiesOf } from "@storybook/react";
import fixtures from "./fixtures";
import { Pre, PreContextProvider } from "./pre";
import { history } from "./history";

const stories = storiesOf("Transition");
const fixtureNames = Object.keys(fixtures);

fixtureNames.forEach((fixtureName) => {
  const [prev, next] = fixtures[fixtureName];
  stories.add(fixtureName, () => <TransitionStory prev={prev} next={next} />);
});

function TransitionStory({ prev, next }) {
  const [displayWhitespaces, setDisplayWhitespaces] = React.useState(false);
  return (
    <PreContextProvider displayWhitespaces={displayWhitespaces}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <input
          type="checkbox"
          checked={displayWhitespaces}
          onChange={() => setDisplayWhitespaces((x) => !x)}
        ></input>
        <label>Display whitespaces</label>
        <hr />
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
        <pre>{JSON.stringify(newDiff(prev, next), null, 2)}</pre>
        <hr />
        History:
        <pre>{JSON.stringify(history(prev, next), null, 2)}</pre>
      </div>
    </PreContextProvider>
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
      <div style={{ background: "#444", color: "#fafafa" }}>
        {children(progress, backward)}
      </div>
    </div>
  );
}
