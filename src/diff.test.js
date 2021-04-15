import { diff } from "./diff";

it("works", () => {
  const result = diff("a", "b");
  expect(result).toMatchSnapshot();
});
