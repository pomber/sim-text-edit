import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import { Pre, PreContextProvider } from "./pre";
import "./cursor.css";
import synthwave84 from "prism-react-renderer/themes/synthwave84";

export function Code({ code, cursor }) {
  const [displayWhitespaces, setDisplayWhitespaces] = React.useState(true);
  return (
    <PreContextProvider displayWhitespaces={displayWhitespaces}>
      {/* <input
        type="checkbox"
        checked={displayWhitespaces}
        onChange={() => setDisplayWhitespaces((x) => !x)}
      ></input>
      <label>Display whitespaces</label> */}
      <Highlight
        {...defaultProps}
        code={code}
        language="jsx"
        theme={synthwave84}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, padding: 8 }}>
            {renderTokens(tokens, getLineProps, getTokenProps, cursor)}
          </pre>
        )}
      </Highlight>
    </PreContextProvider>
  );
}

function renderTokens(tokens, getLineProps, getTokenProps, cursor = -1) {
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
            <Cursor key="cursor" />
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
      {/* {tokens.map((line, index) => (
        <Pre key={index}>
          {line.reduce((allLine, token) => allLine + token.content, "")}
        </Pre>
      ))} */}
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
        marginLeft: "-0.3em",
        marginTop: "-0.2em",
        fontSize: "1.1em",
      }}
    >
      |
    </span>
  );
}
