import React from "react";

export function Pre({ children, ...props }) {
  const displayWhitespaces = React.useContext(PreContext);
  return (
    <pre {...props}>
      {displayWhitespaces ? showWhitespace(children) : children}
    </pre>
  );
}

function showWhitespace(text) {
  return text
    .replaceAll(" ", "␣")
    .replaceAll("\t", "→→")
    .replaceAll("\n", "↵\n");
}

const PreContext = React.createContext();

export function PreContextProvider({ displayWhitespaces, children }) {
  return (
    <PreContext.Provider value={displayWhitespaces}>
      {children}
    </PreContext.Provider>
  );
}
