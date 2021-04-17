import { newDiff } from "./diff";

export function history(prev, next) {
  const chunks = newDiff(prev, next);

  let history = [{ value: prev }];

  chunks.forEach((chunk) => {
    const current = history[history.length - 1].value;
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
    history.push({
      value: start.slice(0, chunk.at + i) + after,
      cursorBefore: chunk.at + i + 1,
      cursorAfter: chunk.at + i,
    });
  }
  return history;
}

function insertionHistory(start, chunk) {
  const history = [];
  let prev = start;
  let value = chunk.value;
  const newLineEnd = value.match(/\n\s*$/);

  if (newLineEnd) {
    value = value.slice(0, newLineEnd.index);
    const end = newLineEnd[0];
    prev = start.slice(0, chunk.at) + end + prev.slice(chunk.at);
    history.push({
      value: prev,
      cursorBefore: chunk.at,
      cursorAfter: chunk.at,
    });
  }

  for (let i = 0; i < value.length; i++) {
    prev = prev.slice(0, chunk.at + i) + value[i] + prev.slice(chunk.at + i);

    history.push({
      value: prev,
      cursorBefore: chunk.at + i,
      cursorAfter: chunk.at + i + 1,
    });
  }
  return history;
}
