export function Pre({ children, ...props }) {
  return <pre {...props}>{showWhitespace(children)}</pre>;
}

function showWhitespace(text) {
  return text
    .replaceAll(" ", "␣")
    .replaceAll("\t", "→→")
    .replaceAll("\n", "↵\n");
}
