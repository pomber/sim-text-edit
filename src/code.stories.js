import React from "react";
import { storiesOf } from "@storybook/react";
import { Code } from "./code";

const exampleCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`;

storiesOf("Code").add("Basic", () => <Code code={exampleCode} cursor={9} />);
