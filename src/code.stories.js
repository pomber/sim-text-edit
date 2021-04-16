import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import { storiesOf } from "@storybook/react";
import { Pre, PreContextProvider } from "./pre";
import "./cursor.css";

const exampleCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`;

storiesOf("Code").add("Basic", () => <Code code={exampleCode} />);

function Code({ code }) {
  const [displayWhitespaces, setDisplayWhitespaces] = React.useState(true);
  return (
    <PreContextProvider displayWhitespaces={displayWhitespaces}>
      <input
        type="checkbox"
        checked={displayWhitespaces}
        onChange={() => setDisplayWhitespaces((x) => !x)}
      ></input>
      <label>Display whitespaces</label>
      <Highlight {...defaultProps} code={code} language="jsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {renderTokens(tokens, getLineProps, getTokenProps)}
          </pre>
        )}
      </Highlight>
    </PreContextProvider>
  );
}
function renderTokens(tokens, getLineProps, getTokenProps) {
  const cursor = 5;
  let startPosition = 0;
  const lineElements = tokens.map((line, i) => {
    const lineLength =
      line[0].content == "\n"
        ? 1
        : line.reduce((length, token) => length + token.content.length, 1);
    const endPosition = startPosition + lineLength;
    let newLine = line;
    if (startPosition <= cursor && cursor < endPosition) {
      newLine = [];
      let columnsLeft = cursor - startPosition;
      let done = false;
      console.log({ line });
      line.forEach((token) => {
        console.log({ columnsLeft });
        if (!done && token.content.length >= columnsLeft) {
          const left = token.content.slice(0, columnsLeft);
          const right = token.content.slice(columnsLeft);
          console.log({ left, right });
          if (left.length > 0) {
            newLine.push({ types: token.types, content: left });
          }
          newLine.push({ type: "cursor" });
          if (right.length > 0) {
            newLine.push({ types: token.types, content: right });
          }
          done = true;
        } else {
          newLine.push(token);
        }
        columnsLeft -= token.content.length;
      });
    }

    startPosition = endPosition;
    return (
      <div {...getLineProps({ line, key: i })}>
        {newLine.map((token, key) =>
          token.type === "cursor" ? (
            <Cursor />
          ) : (
            <span {...getTokenProps({ token, key })} />
          )
        )}
      </div>
    );
  });

  return (
    <>
      {lineElements}
      {tokens.map((line, index) => (
        <Pre key={index}>
          {line.reduce((allLine, token) => allLine + token.content, "")}
        </Pre>
      ))}
    </>
  );
}

function Cursor() {
  return (
    <span
      className="cursor"
      style={{
        position: "absolute",
        // color: "red",
        marginLeft: "-0.35rem",
        marginTop: "-0.35rem",
        fontSize: "1.2rem",
      }}
    >
      |
    </span>
  );
}
