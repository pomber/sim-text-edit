import { newDiff } from "./diff";

export function history(prev, next) {
  const chunks = newDiff(prev, next);

  let history = [prev];

  chunks.forEach((chunk) => {
    const current = history[history.length - 1];
    if (chunk.type === "delete") {
      history = history.concat(deletionHistory(current, chunk));
    } else if (chunk.type === "insert") {
      history = history.concat(insertionHistory(current, chunk));
    }
  });
  return history;
}

function deletionHistory(start, chunk) {
  const history = [];
  const after = start.slice(chunk.at + chunk.count);
  for (let i = chunk.count - 1; i >= 0; i--) {
    history.push(start.slice(0, chunk.at + i) + after);
  }
  return history;
}

function insertionHistory(start, chunk) {
  const history = [];
  let prev = start;
  for (let i = 0; i < chunk.value.length; i++) {
    prev =
      prev.slice(0, chunk.at + i) + chunk.value[i] + prev.slice(chunk.at + i);

    history.push(prev);
  }
  return history;
}